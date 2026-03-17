import {GoogleGenAI} from '@google/genai';

export type GeminiAskParams = {
  system: string;
  user: string;
  hiddenContext?: string;
};

function getApiKey(): string | null {
  // Vite client-side env vars must be prefixed with VITE_
  const viteKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (typeof viteKey === 'string' && viteKey.trim().length > 0) return viteKey.trim();

  // Fallbacks for environments that inject process.env at runtime
  const envKey =
    (globalThis as any)?.process?.env?.GEMINI_API_KEY ??
    (globalThis as any)?.process?.env?.VITE_GEMINI_API_KEY;
  if (typeof envKey === 'string' && envKey.trim().length > 0) return envKey.trim();

  return null;
}

export async function askGeminiText(params: GeminiAskParams): Promise<string> {
  const apiKey = getApiKey();
  if (!apiKey) {
    // Debug (safe): do NOT print the key, only presence.
    try {
      console.log('[Gemini] Missing key debug', {
        hasViteKey: Boolean(import.meta.env.VITE_GEMINI_API_KEY),
        mode: import.meta.env.MODE,
        baseUrl: import.meta.env.BASE_URL,
        isLocalhost: typeof location !== 'undefined' ? location.hostname : undefined,
      });
    } catch {
      // ignore
    }
    throw new Error('Missing GEMINI API key (set VITE_GEMINI_API_KEY)');
  }

  const ai = new GoogleGenAI({apiKey});

  const contents = [
    {
      role: 'user' as const,
      parts: [
        {
          text: [
            params.system ? `SYSTEM ROLE:\n${params.system}` : '',
            params.hiddenContext ? `\n\nHIDDEN CLINICAL CONTEXT:\n${params.hiddenContext}` : '',
            `\n\nUSER QUESTION:\n${params.user}`,
            `\n\nRESPONSE RULES:\n- Be concise, clinically grounded, and practical.\n- Do not diagnose.\n- If unclear or unsafe, recommend consulting a licensed clinician.\n- Use bullet points when helpful.`,
          ]
            .filter(Boolean)
            .join(''),
        },
      ],
    },
  ];

  const res = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents,
  });

  // @google/genai returns different shapes; handle safely
  const text =
    (res as any)?.text ??
    (res as any)?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text).filter(Boolean).join('\n') ??
    '';

  return String(text || '').trim();
}

export function trackAiQuestion(question: string, meta?: Record<string, unknown>) {
  console.log('[AI Question]', {question, ...(meta || {})});
  const w = window as any;
  if (typeof w.gtag === 'function') {
    w.gtag('event', 'user_ai_question', {
      question,
      ...(meta || {}),
    });
  }
}

