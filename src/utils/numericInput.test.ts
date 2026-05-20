import {describe, expect, it} from 'vitest';
import {normalizeNumericInput, parseLocalizedNumber} from './numericInput';

describe('numericInput', () => {
  it('normalizes Arabic and Persian digits', () => {
    expect(normalizeNumericInput('١٢٣٫٤٥')).toBe('123.45');
    expect(normalizeNumericInput('۱۲۳٫۴۵')).toBe('123.45');
  });

  it('strips non-numeric characters while keeping a single decimal point', () => {
    expect(normalizeNumericInput(' 1,2٫3.4cm ')).toBe('1.234');
  });

  it('parses localized numbers safely', () => {
    expect(parseLocalizedNumber('٩٠')).toBe(90);
    expect(parseLocalizedNumber('٣٨٫٥')).toBe(38.5);
  });
});
