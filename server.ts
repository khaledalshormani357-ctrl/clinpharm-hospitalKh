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
  app.use(express.json({ limit: '4mb' }));

  app.get('/api/copilot/health', (_req, res) => {
    const hasKey = Boolean(process.env.GEMINI_API_KEY);
    res.json({
      ok: true,
      liveAiReady: hasKey,
      model: 'gemini-3.8-flash',
      libraryBooksCount: 6,
      libraryChaptersCount: 43
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

      const apiKey = process.env.GEMINI_API_KEY;
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
${verbatimLibraryContext || 'All 6 reference books (43 chapters) indexed.'}

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

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.25
        }
      });

      const replyText = response.text?.trim();
      if (!replyText) {
        res.status(502).json({
          error: 'Empty response from Gemini model.'
        });
        return;
      }

      res.json({
        text: replyText,
        model: 'gemini-3.8-flash',
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
