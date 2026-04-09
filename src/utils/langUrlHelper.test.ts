import {describe, expect, it} from 'vitest';
import {
  buildHreflangs,
  convertToLangUrl,
  extractLangFromPath,
  generateLangUrl,
  getNavigationPath,
  migrateOldLink,
  navigationPaths,
  removeLangPrefix,
} from './langUrlHelper';

describe('langUrlHelper', () => {
  it('normalizes and prefixes paths by language', () => {
    expect(removeLangPrefix('/ar/injuries/acl')).toBe('/injuries/acl');
    expect(generateLangUrl('/injuries/acl', 'en')).toBe('/en/injuries/acl');
    expect(generateLangUrl('/', 'ar')).toBe('/ar/');
    expect(convertToLangUrl('/en/privacy', 'ar')).toBe('/ar/privacy');
    expect(migrateOldLink('/injuries/acl', 'en')).toBe('/en/injuries/acl');
  });

  it('extracts language and builds hreflang links without duplicate slashes', () => {
    expect(extractLangFromPath('/en/contact/')).toBe('en');
    expect(extractLangFromPath('/contact')).toBeNull();
    expect(buildHreflangs('/ar/injuries/acl', 'https://physionutrition.vercel.app/')).toEqual([
      {lang: 'en', href: 'https://physionutrition.vercel.app/en/injuries/acl'},
      {lang: 'ar', href: 'https://physionutrition.vercel.app/ar/injuries/acl'},
    ]);
  });

  it('exposes stable navigation helpers for critical routes', () => {
    expect(navigationPaths.calculators('en')).toBe('/en/calculators');
    expect(navigationPaths.exercisesMuscle('en', 'lower_back')).toBe('/en/exercises/lower-back');
    expect(getNavigationPath('dashboard', 'ar')).toBe('/ar/dashboard');
  });
});
