function decodeLatin1Utf8(value: string) {
  if (typeof Buffer !== 'undefined') {
    return new TextDecoder('utf-8').decode(Buffer.from(value, 'latin1'));
  }

  const bytes = Uint8Array.from(value, (char) => char.charCodeAt(0) & 0xff);
  return new TextDecoder('utf-8').decode(bytes);
}

export function toValidMedicalText(value: unknown) {
  return typeof value === 'string' ? value : '';
}

export function normalizeMedicalText(value: unknown) {
  const text = toValidMedicalText(value);
  if (!text) return '';

  return text
    .normalize('NFC')
    .replace(/[\u200E\u200F]/g, '')
    .replace(/\u00A0/g, ' ');
}

export function decodeMojibake(value?: string) {
  if (!value) return '';
  if (!/[\u00D8\u00D9\u00C2\u00C3]/.test(value)) return value;

  try {
    let decoded = value;

    // UTF-8 Arabic misread as Windows-1252/Latin-1 (sometimes double-encoded).
    for (let attempt = 0; attempt < 3; attempt += 1) {
      if (!/[\u00D8\u00D9\u00C2\u00C3]/.test(decoded)) break;
      const next = decodeLatin1Utf8(decoded);
      if (!next || next === decoded) break;
      decoded = next;
    }

    return decoded;
  } catch {
    return value;
  }
}

export function sanitizeMedicalText(value?: string) {
  const normalized = normalizeMedicalText(value);
  const decoded = decodeMojibake(normalized);
  if (!decoded) return '';

  return decoded
    .replace(/\uFFFD/g, '')
    .replace(/�/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

export function prepareMedicalText(value: unknown) {
  return sanitizeMedicalText(toValidMedicalText(value));
}

export function safeMedicalText(value: unknown) {
  return prepareMedicalText(value);
}

export function enforceMedicalSafety<T>(value: T): T {
  return safeMedicalTextDeep(value);
}

export function decodeMojibakeDeep<T>(value: T): T {
  if (typeof value === 'string') {
    return decodeMojibake(value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => decodeMojibakeDeep(item)) as T;
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [key, decodeMojibakeDeep(item)]),
    ) as T;
  }

  return value;
}

export function sanitizeMedicalTextDeep<T>(value: T): T {
  if (typeof value === 'string') {
    return sanitizeMedicalText(value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeMedicalTextDeep(item)) as T;
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [key, sanitizeMedicalTextDeep(item)]),
    ) as T;
  }

  return value;
}

export function prepareMedicalTextDeep<T>(value: T): T {
  if (typeof value === 'string') {
    return prepareMedicalText(value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => prepareMedicalTextDeep(item)) as T;
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [key, prepareMedicalTextDeep(item)]),
    ) as T;
  }

  return value;
}

export function safeMedicalTextDeep<T>(value: T): T {
  return prepareMedicalTextDeep(value);
}

export const MedicalTextCore = {
  parse: safeMedicalText,
  parseDeep: safeMedicalTextDeep,
  enforce: enforceMedicalSafety,
} as const;
