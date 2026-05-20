const ARABIC_INDIC_DIGITS = '٠١٢٣٤٥٦٧٨٩';
const EASTERN_ARABIC_INDIC_DIGITS = '۰۱۲۳۴۵۶۷۸۹';

export function normalizeLocalizedDigits(value: string) {
  return value.replace(/[\u0660-\u0669\u06F0-\u06F9]/g, (char) => {
    const arabicIndicIndex = ARABIC_INDIC_DIGITS.indexOf(char);
    if (arabicIndicIndex >= 0) return String(arabicIndicIndex);

    const easternArabicIndex = EASTERN_ARABIC_INDIC_DIGITS.indexOf(char);
    return easternArabicIndex >= 0 ? String(easternArabicIndex) : char;
  });
}

export function normalizeNumericInput(value: string, options?: {allowDecimal?: boolean}) {
  const allowDecimal = options?.allowDecimal ?? true;
  const normalizedDigits = normalizeLocalizedDigits(value)
    .replace(/[\u066B,،]/g, '.')
    .replace(/\s+/g, '');

  if (!allowDecimal) {
    return normalizedDigits.replace(/[^\d]/g, '');
  }

  const stripped = normalizedDigits.replace(/[^\d.]/g, '');
  const firstDecimalIndex = stripped.indexOf('.');

  if (firstDecimalIndex === -1) {
    return stripped;
  }

  return `${stripped.slice(0, firstDecimalIndex + 1)}${stripped.slice(firstDecimalIndex + 1).replace(/\./g, '')}`;
}

export function parseLocalizedNumber(value: string) {
  const normalized = normalizeNumericInput(value);
  if (!normalized) return 0;

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}
