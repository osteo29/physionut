import {GoogleGenAI} from '@google/genai';

export type GeminiAskParams = {
  system: string;
  user: string;
  hiddenContext?: string;
};

function getApiKey(): string | null {
  const key = (process.env as any)?.GEMINI_API_KEY;
  return typeof key === 'string' && key.trim().length > 0 ? key.trim() : null;
}

export async function askGeminiText(params: GeminiAskParams): Promise<string> {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('Missing GEMINI_API_KEY');
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

