import {describe, expect, it} from 'vitest';
import {
  decodeMojibake,
  normalizeMedicalText,
  prepareMedicalText,
  prepareMedicalTextDeep,
  sanitizeMedicalText,
  sanitizeMedicalTextDeep,
  toValidMedicalText,
} from './textEncoding';

describe('decodeMojibake', () => {
  it('returns an empty string for missing values and leaves clean text untouched', () => {
    expect(decodeMojibake()).toBe('');
    expect(decodeMojibake('hello')).toBe('hello');
  });

  it('attempts to decode mojibake text instead of returning the original bytes', () => {
    const mojibake = 'Ãâ¦ÃÂ±ÃÂ­ÃÂ¨ÃÂ§';
    const decoded = decodeMojibake(mojibake);

    expect(decoded).not.toBe(mojibake);
    expect(decoded.length).toBeGreaterThan(0);
  });
});

describe('sanitizeMedicalText', () => {
  it('validates input before processing', () => {
    expect(toValidMedicalText(null)).toBe('');
    expect(toValidMedicalText({label: 'pain'})).toBe('');
  });

  it('normalizes unicode and strips rtl/ltr marks before sanitizing', () => {
    expect(normalizeMedicalText('ا\u200Fلم\u00A0مزمن')).toBe('الم مزمن');
  });

  it('removes replacement glyphs and trims noisy whitespace', () => {
    expect(sanitizeMedicalText('  ألم� مزمن\uFFFD  ')).toBe('ألم مزمن');
  });

  it('runs the full preparation pipeline in one step', () => {
    expect(prepareMedicalText('  ا\u200Fلتهاب\uFFFD  ')).toBe('التهاب');
  });

  it('sanitizes nested translation payloads without changing shape', () => {
    expect(
      sanitizeMedicalTextDeep({
        title: '  Trigger Point� ',
        bullets: [' شد\uFFFD عضلي ', ' ألم موضعي '],
      }),
    ).toEqual({
      title: 'Trigger Point',
      bullets: ['شد عضلي', 'ألم موضعي'],
    });
  });

  it('prepares nested payloads through validate, normalize, and sanitize', () => {
    expect(
      prepareMedicalTextDeep({
        title: '  Trigger\u200F Point� ',
        bullets: [' شد\uFFFD عضلي ', null],
      }),
    ).toEqual({
      title: 'Trigger Point',
      bullets: ['شد عضلي', null],
    });
  });
});
