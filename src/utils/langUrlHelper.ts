/**
 * Language-Aware URL Helper
 * Generates correct URLs for language-prefixed routing
 * Use this throughout the app to ensure consistent URL generation
 */

import type { Language } from '../services/translations';

/**
 * Get the base path without language prefix
 * /en/injuries/acl -> /injuries/acl
 * /ar/injuries/acl -> /injuries/acl  
 * /injuries/acl -> /injuries/acl (already without prefix)
 */
export function removeLangPrefix(pathname: string): string {
  return pathname.replace(/^\/(en|ar)\//, '/');
}

/**
 * Generate language-prefixed URL
 * Returns URL with proper language prefix
 */
export function generateLangUrl(path: string, lang: Language): string {
  const cleanPath = removeLangPrefix(path);
  if (cleanPath === '/') {
    return `/${lang}/`;
  }
  return `/${lang}${cleanPath}`;
}

/**
 * Convert old URL to new language-prefixed URL
 * Handles migration from non-prefixed to prefixed URLs
 */
export function convertToLangUrl(oldUrl: string, lang: Language): string {
  // If already has language prefix, replace it
  if (/^\/(en|ar)\//.test(oldUrl)) {
    return generateLangUrl(oldUrl, lang);
  }
  
  // Add language prefix if missing
  return generateLangUrl(oldUrl, lang);
}

/**
 * Extract language from URL pathname
 * Returns 'en' | 'ar' or null if not found
 */
export function extractLangFromPath(pathname: string): Language | null {
  const match = pathname.match(/^\/(en|ar)\//);
  return (match?.[1] as Language) || null;
}

/**
 * Common navigation path generator
 * Use these instead of hardcoding paths in links
 */
export const navigationPaths = {
  home: (lang: Language) => `/${lang}/`,
  calculators: (lang: Language) => `/${lang}/calculators`,
  
  // Public pages
  privacy: (lang: Language) => `/${lang}/privacy`,
  terms: (lang: Language) => `/${lang}/terms`,
  cookies: (lang: Language) => `/${lang}/cookies`,
  disclaimer: (lang: Language) => `/${lang}/disclaimer`,
  about: (lang: Language) => `/${lang}/about`,
  contact: (lang: Language) => `/${lang}/contact`,
  diets: (lang: Language) => `/${lang}/diets`,
  
  // Content pages
  insights: (lang: Language) => `/${lang}/insights`,
  insightsDetail: (lang: Language, slug: string) => `/${lang}/insights/${slug}`,
  exercises: (lang: Language) => `/${lang}/exercises`,
  exercisesMuscle: (lang: Language, slug: string) => `/${lang}/exercises/${slug}`,
  
  // Injury pages
  injuries: (lang: Language) => `/${lang}/injuries`,
  injuryDetail: (lang: Language, slug: string) => `/${lang}/injuries/${slug}`,
  
  // Features
  studio: (lang: Language) => `/${lang}/studio/articles`,
  assistant: (lang: Language) => `/${lang}/assistant`,
  auth: (lang: Language) => `/${lang}/auth`,
  dashboard: (lang: Language) => `/${lang}/dashboard`,
};

/**
 * Type-safe navigation link helper
 * Ensures all links are generated with correct language prefix
 */
export type NavigationPage = keyof typeof navigationPaths;

export function getNavigationPath(page: NavigationPage, lang: Language, ...args: string[]): string {
  const pathFn = navigationPaths[page] as (lang: Language, ...args: string[]) => string;
  if (!pathFn) {
    console.warn(`Unknown navigation page: ${page}`);
    return `/${lang}/`;
  }
  return pathFn(lang, ...args);
}

/**
 * Build hreflang links for a page
 * Use in SEO components to generate hreflang tags
 */
export function buildHreflangs(
  cleanPath: string,
  siteUrl: string = 'https://physionutrition.vercel.app',
): Array<{lang: string; href: string}> {
  const cleanedPath = removeLangPrefix(cleanPath);
  const basePath = cleanedPath === '/' ? '/' : cleanedPath;
  
  return [
    {
      lang: 'en',
      href: `${siteUrl.replace(/\/$/, '')}/en${basePath}`,
    },
    {
      lang: 'ar',
      href: `${siteUrl.replace(/\/$/, '')}/ar${basePath}`,
    },
  ];
}

/**
 * Migrate internal link from old to new format
 * Input: "/injuries/acl" -> Output: "/en/injuries/acl" (with lang param)
 */
export function migrateOldLink(oldLink: string, lang: Language): string {
  // Remove any old language prefix if present
  const cleanLink = removeLangPrefix(oldLink);
  return generateLangUrl(cleanLink, lang);
}
