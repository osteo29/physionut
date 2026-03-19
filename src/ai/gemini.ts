export type GeminiAskParams = {
  system: string;
  user: string;
  hiddenContext?: string;
  cacheKey?: string;
};

const AI_CACHE_PREFIX = 'physiohub_ai_cache_v1';

function getApiKey(): string | null {
  const viteKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (typeof viteKey === 'string' && viteKey.trim().length > 0) return viteKey.trim();

  const envKey =
    (globalThis as any)?.process?.env?.GEMINI_API_KEY ??
    (globalThis as any)?.process?.env?.VITE_GEMINI_API_KEY;
  if (typeof envKey === 'string' && envKey.trim().length > 0) return envKey.trim();

  return null;
}

function normalizeForCache(value: string) {
  return value.trim().replace(/\s+/g, ' ').toLowerCase();
}

function hashString(value: string) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return hash.toString(36);
}

export function getStoredAiIdentity() {
  if (typeof window === 'undefined') return 'guest';

  try {
    const trackingRaw = localStorage.getItem('physiohub_tracking_profile');
    const architectRaw = localStorage.getItem('physiohub_architect_profile');
    const tracking = trackingRaw ? JSON.parse(trackingRaw) : {};
    const architect = architectRaw ? JSON.parse(architectRaw) : {};

    const email =
      typeof tracking?.email === 'string' && tracking.email.trim()
        ? tracking.email.trim().toLowerCase()
        : '';
    if (email) return email;

    const name =
      typeof tracking?.name === 'string' && tracking.name.trim()
        ? tracking.name.trim().toLowerCase()
        : '';

    const fallbackProfile = [
      name,
      architect?.age,
      architect?.weight,
      architect?.height,
      architect?.gender,
      architect?.injuryType,
    ]
      .filter(Boolean)
      .join('|');

    return fallbackProfile ? `anon_${hashString(fallbackProfile)}` : 'guest';
  } catch {
    return 'guest';
  }
}

export function getStoredAiContext(lang: 'en' | 'ar' = 'en') {
  if (typeof window === 'undefined') return '';

  try {
    const trackingRaw = localStorage.getItem('physiohub_tracking_profile');
    const architectRaw = localStorage.getItem('physiohub_architect_profile');
    const tracking = trackingRaw ? JSON.parse(trackingRaw) : {};
    const architect = architectRaw ? JSON.parse(architectRaw) : {};

    const lines: string[] = [];

    if (tracking?.name) {
      lines.push(
        lang === 'ar'
          ? `اسم المستخدم: ${tracking.name}`
          : `User name: ${tracking.name}`,
      );
    }

    if (tracking?.email) {
      lines.push(
        lang === 'ar'
          ? `معرف المتابعة: ${tracking.email}`
          : `Tracking identity: ${tracking.email}`,
      );
    }

    if (architect?.age) {
      lines.push(lang === 'ar' ? `العمر: ${architect.age}` : `Age: ${architect.age}`);
    }

    if (architect?.weight) {
      lines.push(
        lang === 'ar' ? `الوزن: ${architect.weight} كجم` : `Weight: ${architect.weight} kg`,
      );
    }

    if (architect?.height) {
      lines.push(
        lang === 'ar' ? `الطول: ${architect.height} سم` : `Height: ${architect.height} cm`,
      );
    }

    if (architect?.gender) {
      lines.push(
        lang === 'ar' ? `النوع: ${architect.gender}` : `Gender: ${architect.gender}`,
      );
    }

    if (architect?.goal) {
      lines.push(lang === 'ar' ? `الهدف: ${architect.goal}` : `Goal: ${architect.goal}`);
    }

    if (architect?.injuryType) {
      lines.push(
        lang === 'ar'
          ? `الإصابة الحالية: ${architect.injuryType}`
          : `Current injury: ${architect.injuryType}`,
      );
    }

    if (architect?.recoveryWeek) {
      lines.push(
        lang === 'ar'
          ? `أسبوع التعافي: ${architect.recoveryWeek}`
          : `Recovery week: ${architect.recoveryWeek}`,
      );
    }

    return lines.join('\n');
  } catch {
    return '';
  }
}

export function buildPersonalizedAiCacheKey({
  scope,
  question,
  hiddenContext,
  identity,
}: {
  scope: string;
  question: string;
  hiddenContext?: string;
  identity?: string;
}) {
  const userKey = identity || getStoredAiIdentity();
  const contextHash = hashString(normalizeForCache(hiddenContext || ''));
  const questionHash = hashString(normalizeForCache(question));
  return `${AI_CACHE_PREFIX}:${scope}:${userKey}:${questionHash}:${contextHash}`;
}

function getCachedAiResponse(cacheKey?: string) {
  if (!cacheKey || typeof window === 'undefined') return null;

  try {
    return localStorage.getItem(cacheKey);
  } catch {
    return null;
  }
}

function setCachedAiResponse(cacheKey: string | undefined, value: string) {
  if (!cacheKey || typeof window === 'undefined') return;

  try {
    localStorage.setItem(cacheKey, value);
  } catch {
    // Ignore quota/storage failures.
  }
}

export async function askGeminiText(params: GeminiAskParams): Promise<string> {
  const cached = getCachedAiResponse(params.cacheKey);
  if (cached) return cached;

  const apiKey = getApiKey();
  if (!apiKey) {
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

  const {GoogleGenAI} = await import('@google/genai');
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
            `\n\nRESPONSE RULES:\n- Be concise, clinically grounded, and practical.\n- Do not diagnose.\n- Tie the answer to the user's weight, age, goal, and injury context when available.\n- If unclear or unsafe, recommend consulting a licensed clinician.\n- End with a short educational disclaimer.\n- Use bullet points when helpful.`,
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

  const text =
    (res as any)?.text ??
    (res as any)?.candidates?.[0]?.content?.parts
      ?.map((part: any) => part?.text)
      .filter(Boolean)
      .join('\n') ??
    '';

  const answer = String(text || '').trim();
  setCachedAiResponse(params.cacheKey, answer);
  return answer;
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
