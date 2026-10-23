import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

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
      liveAiReady: hasKey,
      model: 'gemini-3.8-flash',
      libraryBooksCount: 6,
      libraryChaptersCount: 44
    });
  });

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
        res.status(503).json({
          error: 'GEMINI_API_KEY is not configured in the server environment.'
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

      const systemInstruction = `You are "ClinPharm AI Copilot", a Senior Board-Certified Clinical Pharmacy & Critical Care Specialist (PharmD, BCPS, BCCCP, BCCP) integrated inside a hospital clinical workstation.
You have full access to:
1. ACTIVE INPATIENT CHART & LABS:
${patientContext || 'No specific inpatient selected.'}

2. MATCHED CLINICAL REFERENCE DATABASE & CASEBOOK PROTOCOLS:
${referenceContext || 'Standard hospital references loaded.'}

3. VERBATIM UNABRIDGED TEXTBOOK EXCERPTS (DiPiro 13th Ed, ACCP Cardiology 2026, ACCP Updates 2026 Vol 1 & Vol 2, Pharmacotherapy Casebook PPCP Guide, Hospital Dosing Compendium):
${verbatimLibraryContext || 'All 6 reference books (44 chapters) indexed.'}

CRITICAL CLINICAL & FORMATTING DIRECTIVES:
- Provide real, deep, patient-specific clinical reasoning grounded in the active patient's exact CrCl, serum potassium, sodium, liver function, allergies, hemodynamic status, and medication list, as well as the verbatim textbook excerpts above.
- Always state exact numerical drug doses, routes, infusion rates, renal/hepatic cutoff rules, and therapeutic drug monitoring (TDM) targets (e.g., Vancomycin AUC24/MIC 400-600 mg*h/L, Apixaban 2-of-3 ABC criteria, 36-hour washout for ACEi to Entresto, KCl peripheral max 10 mEq/h).
- Cite the exact book and chapter from the in-app library (e.g., [DiPiro's 13th Ed, Ch. 15/32], [ACCP Cardiology 2026, BCCP Ch. 3], [ACCP 2026 Vol 1, Ch. 6], [ACCP 2026 Vol 2, Ch. 16], [Casebook PPCP Guide, Sec. II], [Hospital Compendium, Sec. B]).
- Language Rule: ${
        lang === 'ar'
          ? 'Respond in "Medical Mix" (Professional Arabic clinical syntax while keeping drug names, clinical trials, equations, and medical abbreviations in English, e.g., Vancomycin, CrCl, AUC24/MIC, HFrEF, SOAP Note).'
          : 'Respond in clear, authoritative clinical English.'
      }`;

      const contents = [
        ...history.slice(-8).map(turn => ({
          role: turn.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: turn.text }]
        })),
        {
          role: 'user',
          parts: [{ text: query.trim() }]
        }
      ];

      let replyText = '';
      let usedModel = 'gemini-3.8-flash';

      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction,
            temperature: 0.25
          }
        });
        replyText = response.text?.trim() || '';
      } catch {
        usedModel = 'gemini-flash-latest';
        const fallbackResponse = await ai.models.generateContent({
          model: 'gemini-flash-latest',
          contents,
          config: {
            systemInstruction,
            temperature: 0.25
          }
        });
        replyText = fallbackResponse.text?.trim() || '';
      }

      if (!replyText) {
        res.status(502).json({
          error: 'Empty response from Gemini model.'
        });
        return;
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
