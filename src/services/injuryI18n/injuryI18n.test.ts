import {describe, expect, it} from 'vitest';
import {PROTOCOL_TRANSLATION_COUNT, PROTOCOL_TRANSLATIONS, translateInjury} from './index';

describe('injuryI18n', () => {
  it('covers all bundled rehab protocol slugs', () => {
    expect(PROTOCOL_TRANSLATION_COUNT).toBe(100);
    expect(Object.keys(PROTOCOL_TRANSLATIONS)).toHaveLength(100);
  });

  it('returns proper Arabic for ACL reconstruction slug', () => {
    const result = translateInjury(
      {
        slugOrId: 'acl-reconstruction-hamstring-graft',
        nameEn: 'ACL Reconstruction (Hamstring Graft)',
        regionEn: 'Knee',
      },
      'ar',
    );

    expect(result.name).toBe('إعادة بناء الرباط الصليبي الأمامي (ترقيع وتر الفخذ الخلفي)');
    expect(result.bodyRegion).toBe('الركبة');
    expect(/[\u0600-\u06FF]/.test(result.name)).toBe(true);
    expect(result.name).not.toMatch(/Ø|Ù|Ã/);
  });

  it('returns English professional naming when requested', () => {
    const result = translateInjury(
      {
        slugOrId: 'hamstring-strain-grade-ii',
        nameEn: 'Hamstring strain',
        regionEn: 'Hip',
      },
      'en',
    );

    expect(result.name).toContain('Hamstring');
    expect(result.bodyRegion).toBe('Hip');
  });

  it('resolves legacy underscore injury ids', () => {
    const result = translateInjury(
      {slugOrId: 'acl_injury', nameEn: 'ACL injury', regionEn: 'Knee'},
      'ar',
    );

    expect(result.name).toBe('إصابة الرباط الصليبي الأمامي');
  });
});
