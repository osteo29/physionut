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
