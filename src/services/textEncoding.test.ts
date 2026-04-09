import {describe, expect, it} from 'vitest';
import {decodeMojibake} from './textEncoding';

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
