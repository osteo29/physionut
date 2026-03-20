export function decodeMojibake(value?: string) {
  if (!value) return '';
  if (!/[ØÙÂ]/.test(value)) return value;

  try {
    const bytes = Uint8Array.from(value.split('').map((char) => char.charCodeAt(0)));
    return new TextDecoder('utf-8').decode(bytes);
  } catch {
    return value;
  }
}
