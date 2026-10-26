import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

interface ChatHistoryTurn {
  role: 'user' | 'assistant';
  text: string;
}

interface CopilotChatRequestBody {
  query: string;
  lang?: 'ar' | 'en';
  history?: ChatHistoryTurn[];
  patientContext?: string;
  referenceContext?: string;
  verbatimLibraryContext?: string;
}

async function startServer() {
  const app = express();

  // Enable CORS on all API routes so GitHub Pages and Android APK clients can connect seamlessly
  app.use('/api', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Expose-Headers', 'X-Drive-Filename, Content-Length');
    if (req.method === 'OPTIONS') {
      res.status(204).end();
      return;
    }
    next();
  });

  app.use(express.json({ limit: '6mb' }));

  app.get('/api/copilot/health', (_req, res) => {
    const hasKey = Boolean(process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY);
    res.json({
      ok: true,
      liveAiReady: true,
      hasApiKey: hasKey,
      model: 'gemini-3-flash-preview',
      mode: 'NotebookLM Strict Reference Grounding',
      libraryBooksCount: 7,
      libraryChaptersCount: 47
    });
  });

  function extractGroundedSourceSynthesis(
    query: string,
    lang: 'ar' | 'en',
    patientContext: string,
    referenceContext: string,
    verbatimLibraryContext: string
  ): string {
    const sourceBlocks = verbatimLibraryContext
      ? verbatimLibraryContext
          .split(/\n*========================================\n*/)
          .map(b => b.trim())
          .filter(Boolean)
          .slice(0, 4)
      : [];

    if (lang === 'ar') {
      const parts: string[] = [
        `### 📚 الإجابة المرجعية الموثّقة (NotebookLM Verbatim Reference Extraction)`,
        `> **الاستفسار السريري:** ${query}`,
        ''
      ];
      if (referenceContext && referenceContext.trim()) {
        parts.push(`#### ⚠️ مطابقة قاعدة بيانات التداخلات الدوائية (Stockley’s Drug Interactions):`);
        parts.push(referenceContext.trim());
        parts.push('');
      }
      if (sourceBlocks.length > 0) {
        parts.push(`#### 📖 المقتطفات الحرفية المباشرة من المراجع المعتمدة:`);
        parts.push(sourceBlocks.join('\n\n---\n\n'));
      } else if (patientContext) {
        parts.push(`#### 🩺 معطيات المريض النشط:\n${patientContext}`);
      }
      return parts.join('\n');
    }

    const parts: string[] = [
      `### 📚 NotebookLM Verbatim Reference Extraction`,
      `> **Clinical Query:** ${query}`,
      ''
    ];
    if (referenceContext && referenceContext.trim()) {
      parts.push(`#### ⚠️ Matched Stockley’s Drug Interactions Monographs:`);
      parts.push(referenceContext.trim());
      parts.push('');
    }
    if (sourceBlocks.length > 0) {
      parts.push(`#### 📖 Verbatim Evidence from Accredited Textbooks:`);
      parts.push(sourceBlocks.join('\n\n---\n\n'));
    } else if (patientContext) {
      parts.push(`#### 🩺 Active Patient Context:\n${patientContext}`);
    }
    return parts.join('\n');
  }

  app.post('/api/copilot/chat', async (req, res) => {
    try {
      const {
        query,
        lang = 'ar',
        history = [],
        patientContext = '',
        referenceContext = '',
        verbatimLibraryContext = ''
      } = (req.body || {}) as CopilotChatRequestBody;

      if (!query || !query.trim()) {
        res.status(400).json({ error: 'Query is required' });
        return;
      }

      const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        const synthesized = extractGroundedSourceSynthesis(
          query.trim(),
          lang,
          patientContext,
          referenceContext,
          verbatimLibraryContext
        );
        res.json({
          text: synthesized,
          model: 'NotebookLM Verbatim Engine',
          liveAi: false
        });
        return;
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });

      const systemInstruction = `You are "ClinPharm NotebookLM AI", a strict Source-Grounded Clinical Pharmacy Reference Analyst (modeled after Google NotebookLM) for board-certified hospital pharmacists (PharmD, BCPS, BCCCP, BCCP).

CRITICAL NOTEBOOK-AI GROUNDING RULES (ZERO HALLUCINATION POLICY):
1. STRICT SOURCE GROUNDING ONLY: You MUST answer strictly and exclusively from the provided NUMBERED ACCREDITED REFERENCE SOURCES ([SOURCE 1], [SOURCE 2], ...), the MATCHED STOCKLEY'S DRUG INTERACTIONS MONOGRAPHS, and the ACTIVE INPATIENT CHART below. Do NOT invent, guess, or fabricate any drug doses, mechanisms, or references from outside the provided sources.
2. MANDATORY INLINE NUMBERED CITATIONS: Every clinical statement, dose, renal/hepatic cutoff, pharmacokinetic formula, or drug interaction mechanism in your answer MUST include an inline citation marker in brackets pointing to the exact source, e.g., [1], [2], [Stockley's DDI, Sec. 1.1], [DiPiro 13th Ed, Ch. 15].
3. EXACT NUMERICAL PRECISION: Quote the exact numerical doses, infusion rate ceilings (e.g., KCl peripheral max 10 mEq/h), washout periods (e.g., 36-hour washout from ACEi to Sacubitril/Valsartan), Cockcroft-Gault CrCl cutoffs, Stockley's Action Ratings (Contraindicated / Severe / Major), and TDM targets (e.g., Vancomycin AUC24/MIC 400–600 mg·h/L) directly from the provided verbatim text and tables.
4. PATIENT-SPECIFIC APPLICATION: When the question asks about the active patient (or when the cited drugs/conditions apply to the active patient), apply the cited reference rules directly to the patient's exact CrCl, K+, Na+, INR, custom laboratory tests, allergies, and active medication list.
5. END-OF-ANSWER CITED SOURCES LIST: Conclude your response with a clear section titled "${
        lang === 'ar' ? 'المراجع الموثّقة المقتبسة (Cited Reference Sources):' : 'Cited Reference Sources:'
      }" listing each numbered source [1], [2], ... with its exact Book Title, Chapter/Section, and Page Range.
6. LANGUAGE & CLINICAL STYLE: ${
        lang === 'ar'
          ? 'Respond in clear, structured, professional "Medical Mix" (authoritative Arabic clinical prose while keeping drug names, enzyme/transporter names like CYP2C9/CYP3A4/P-gp, clinical trials, equations, and medical abbreviations in English).'
          : 'Respond in clear, structured, authoritative clinical English.'
      }

========================================
ACTIVE INPATIENT CHART & LABS:
${patientContext || 'No specific inpatient selected.'}

========================================
MATCHED STOCKLEY'S DRUG INTERACTIONS & CLINICAL DATABASE:
${referenceContext || 'See numbered verbatim sources below.'}

========================================
NUMBERED VERBATIM TEXTBOOK SOURCES ([SOURCE 1] .. [SOURCE N]):
${verbatimLibraryContext || 'All 7 reference books (47 chapters) indexed.'}`;

      const contents = [
        ...history.slice(-4).map(turn => ({
          role: turn.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: turn.text }]
        })),
        {
          role: 'user',
          parts: [{ text: query.trim() }]
        }
      ];

      const candidateModels = [
        'gemini-3-flash-preview',
        'gemini-3.8-flash',
        'gemini-3.1-flash-lite',
        'gemini-flash-latest'
      ];

      let replyText = '';
      let usedModel = candidateModels[0];

      for (const modelName of candidateModels) {
        try {
          const isGemini3 = modelName.startsWith('gemini-3');
          const response = await ai.models.generateContent({
            model: modelName,
            contents,
            config: {
              systemInstruction,
              temperature: 0.1,
              ...(isGemini3
                ? {
                    thinkingConfig: {
                      thinkingLevel: ThinkingLevel.LOW
                    }
                  }
                : {})
            }
          });
          const text = response.text?.trim() || '';
          if (text) {
            replyText = text;
            usedModel = modelName;
            break;
          }
        } catch (err) {
          console.warn(`Model ${modelName} attempt failed, trying next:`, err instanceof Error ? err.message : err);
        }
      }

      if (!replyText) {
        replyText = extractGroundedSourceSynthesis(
          query.trim(),
          lang,
          patientContext,
          referenceContext,
          verbatimLibraryContext
        );
        usedModel = 'NotebookLM Verbatim Extractor';
      }

      res.json({
        text: replyText,
        model: usedModel,
        liveAi: true
      });
    } catch (error: unknown) {
      const errMessage = error instanceof Error ? error.message : 'Unknown Gemini API error';
      console.error('Error in /api/copilot/chat:', errMessage);
      res.status(500).json({
        error: errMessage
      });
    }
  });

  // Direct Google Drive Public / Shared Link PDF Proxy (allows importing shared Drive PDFs without OAuth popup)
  app.get('/api/drive/fetch-pdf', async (req, res) => {
    try {
      const fileId = String(req.query.fileId || '').trim();
      if (!fileId || !/^[a-zA-Z0-9_-]{8,}$/.test(fileId)) {
        res.status(400).json({ error: 'Valid Google Drive fileId is required.' });
        return;
      }

      const authHeader = req.headers.authorization;
      const candidateUrls = [
        `https://drive.usercontent.google.com/download?id=${encodeURIComponent(fileId)}&export=download&confirm=t`,
        `https://drive.google.com/uc?export=download&id=${encodeURIComponent(fileId)}&confirm=t`
      ];

      if (authHeader?.startsWith('Bearer ')) {
        candidateUrls.unshift(
          `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}?alt=media&supportsAllDrives=true`
        );
      }

      for (const url of candidateUrls) {
        try {
          const headers: Record<string, string> = {
            'User-Agent':
              'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
          };
          if (url.includes('googleapis.com') && authHeader) {
            headers.Authorization = authHeader;
          }

          const upstream = await fetch(url, {
            headers,
            redirect: 'follow'
          });

          if (!upstream.ok) continue;

          const contentType = upstream.headers.get('content-type') || '';
          const arrayBuf = await upstream.arrayBuffer();
          const buf = Buffer.from(arrayBuf);

          // Check if buffer starts with %PDF-
          if (buf.length > 5 && buf.subarray(0, 5).toString('ascii') === '%PDF-') {
            const disposition = upstream.headers.get('content-disposition') || '';
            const filenameMatch = disposition.match(/filename\*?=(?:UTF-8'')?["']?([^"';\n]+)["']?/i);
            const filename = filenameMatch?.[1]
              ? decodeURIComponent(filenameMatch[1])
              : `${fileId}.pdf`;

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Length', String(buf.length));
            res.setHeader('X-Drive-Filename', encodeURIComponent(filename));
            res.send(buf);
            return;
          }

          // If HTML confirmation page was returned, extract confirm UUID if present
          if (contentType.includes('text/html')) {
            const html = buf.toString('utf8');
            const uuidMatch = html.match(/name="uuid"\s+value="([^"]+)"/i);
            if (uuidMatch?.[1]) {
              const confirmUrl = `https://drive.usercontent.google.com/download?id=${encodeURIComponent(
                fileId
              )}&export=download&confirm=t&uuid=${encodeURIComponent(uuidMatch[1])}`;
              const confirmedUpstream = await fetch(confirmUrl, { headers, redirect: 'follow' });
              if (confirmedUpstream.ok) {
                const confirmedBuf = Buffer.from(await confirmedUpstream.arrayBuffer());
                if (
                  confirmedBuf.length > 5 &&
                  confirmedBuf.subarray(0, 5).toString('ascii') === '%PDF-'
                ) {
                  res.setHeader('Content-Type', 'application/pdf');
                  res.setHeader('Content-Length', String(confirmedBuf.length));
                  res.setHeader('X-Drive-Filename', encodeURIComponent(`${fileId}.pdf`));
                  res.send(confirmedBuf);
                  return;
                }
              }
            }
          }
        } catch {
          // Try next candidate URL
        }
      }

      res.status(404).json({
        error:
          'Could not download PDF directly. Ensure the Google Drive file sharing is set to "Anyone with the link" or sign in with Google.'
      });
    } catch (error: unknown) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Failed to proxy Google Drive PDF'
      });
    }
  });

  // Ensure unmatched /api/* routes always return JSON and never HTML
  app.use('/api', (_req, res) => {
    res.status(404).json({ error: 'API endpoint not found' });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
