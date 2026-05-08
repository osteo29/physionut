export function decodeMojibake(value?: string) {
  if (!value) return '';
  if (!/[\u00D8\u00D9\u00C2\u00C3]/.test(value)) return value;

  try {
    let decoded = value;

    // Some Arabic strings were double-encoded before being committed.
    for (let attempt = 0; attempt < 3; attempt += 1) {
      if (!/[\u00D8\u00D9\u00C2\u00C3]/.test(decoded)) break;
      const bytes = Uint8Array.from(decoded.split('').map((char) => char.charCodeAt(0)));
      const next = new TextDecoder('utf-8').decode(bytes);
      if (!next || next === decoded) break;
      decoded = next;
    }

    return decoded;
  } catch {
    return value;
  }
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
