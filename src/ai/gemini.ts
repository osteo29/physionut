import {decodeMojibake} from '../services/textEncoding';

export type GeminiAskParams = {
  system: string;
  user: string;
  hiddenContext?: string;
  cacheKey?: string;
};

type GeminiResponse = {
  text?: string;
  error?: string;
};

const AI_CACHE_PREFIX = 'physiohub_ai_cache_v1';

function ar(text: string) {
  return decodeMojibake(text);
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
          ? `${ar('Ã˜Â§Ã˜Â³Ã™â€¦ Ã˜Â§Ã™â€žÃ™â€¦Ã˜Â³Ã˜ÂªÃ˜Â®Ã˜Â¯Ã™â€¦')}: ${tracking.name}`
          : `User name: ${tracking.name}`,
      );
    }

    if (tracking?.email) {
      lines.push(
        lang === 'ar'
          ? `${ar('Ã™â€¦Ã˜Â¹Ã˜Â±Ã™Â Ã˜Â§Ã™â€žÃ™â€¦Ã˜ÂªÃ˜Â§Ã˜Â¨Ã˜Â¹Ã˜Â©')}: ${tracking.email}`
          : `Tracking identity: ${tracking.email}`,
      );
    }

    if (architect?.age) {
      lines.push(lang === 'ar' ? `${ar('Ã˜Â§Ã™â€žÃ˜Â¹Ã™â€¦Ã˜Â±')}: ${architect.age}` : `Age: ${architect.age}`);
    }

    if (architect?.weight) {
      lines.push(
        lang === 'ar'
          ? `${ar('Ã˜Â§Ã™â€žÃ™Ë†Ã˜Â²Ã™â€ ')}: ${architect.weight} ${ar('Ã™Æ’Ã˜Â¬Ã™â€¦')}`
          : `Weight: ${architect.weight} kg`,
      );
    }

    if (architect?.height) {
      lines.push(
        lang === 'ar'
          ? `${ar('Ã˜Â§Ã™â€žÃ˜Â·Ã™Ë†Ã™â€ž')}: ${architect.height} ${ar('Ã˜Â³Ã™â€¦')}`
          : `Height: ${architect.height} cm`,
      );
    }

    if (architect?.gender) {
      lines.push(
        lang === 'ar' ? `${ar('Ã˜Â§Ã™â€žÃ™â€ Ã™Ë†Ã˜Â¹')}: ${architect.gender}` : `Gender: ${architect.gender}`,
      );
    }

    if (architect?.goal) {
      lines.push(lang === 'ar' ? `${ar('Ã˜Â§Ã™â€žÃ™â€¡Ã˜Â¯Ã™Â')}: ${architect.goal}` : `Goal: ${architect.goal}`);
    }

    if (architect?.injuryType) {
      lines.push(
        lang === 'ar'
          ? `${ar('Ã˜Â§Ã™â€žÃ˜Â¥Ã˜ÂµÃ˜Â§Ã˜Â¨Ã˜Â© Ã˜Â§Ã™â€žÃ˜Â­Ã˜Â§Ã™â€žÃ™Å Ã˜Â©')}: ${architect.injuryType}`
          : `Current injury: ${architect.injuryType}`,
      );
    }

    if (architect?.recoveryWeek) {
      lines.push(
        lang === 'ar'
          ? `${ar('Ã˜Â£Ã˜Â³Ã˜Â¨Ã™Ë†Ã˜Â¹ Ã˜Â§Ã™â€žÃ˜ÂªÃ˜Â¹Ã˜Â§Ã™ÂÃ™Å ')}: ${architect.recoveryWeek}`
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

  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      system: params.system,
      user: params.user,
      hiddenContext: params.hiddenContext,
    }),
  });

  const payload = (await response.json().catch(() => ({}))) as GeminiResponse;
  if (!response.ok) {
    throw new Error(payload.error || 'AI request failed');
  }

  const answer = String(payload.text || '').trim();
  setCachedAiResponse(params.cacheKey, answer);
  return answer;
}

export function trackAiQuestion(_question: string, meta?: Record<string, unknown>) {
  const analyticsWindow = window as Window & {
    gtag?: (eventName: string, action: string, params?: Record<string, unknown>) => void;
  };

  if (typeof analyticsWindow.gtag === 'function') {
    analyticsWindow.gtag('event', 'user_ai_question', {
      ...(meta || {}),
    });
  }
}
