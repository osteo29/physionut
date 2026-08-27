import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {describe, expect, it} from 'vitest';

const PUBLIC_DIR = resolve(process.cwd(), 'public');
const SITE_ORIGIN = 'https://activerehab.vercel.app';

const sitemapFiles = [
  'sitemap-static.xml',
  'sitemap-articles.xml',
  'sitemap-injuries.xml',
  'sitemap-diets.xml',
];

const privatePathPrefixes = [
  '/admin',
  '/auth',
  '/dashboard',
  '/studio',
  '/assistant',
  '/en/admin',
  '/en/auth',
  '/en/dashboard',
  '/en/studio',
  '/en/assistant',
  '/ar/admin',
  '/ar/auth',
  '/ar/dashboard',
  '/ar/studio',
  '/ar/assistant',
];

const redirectOnlyPaths = [
  '/injury-protocols',
  '/en/injury-protocols',
  '/ar/injury-protocols',
  '/en/exercises/lower_back',
  '/ar/exercises/lower_back',
];

function readPublicFile(filename: string) {
  return readFileSync(resolve(PUBLIC_DIR, filename), 'utf8');
}

function extractLocUrls(xml: string) {
  return Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g), (match) => match[1]);
}

function getPathname(url: string) {
  return new URL(url).pathname.replace(/\/$/, '') || '/';
}

function isPrivatePath(pathname: string) {
  return privatePathPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

describe('public sitemap indexing rules', () => {
  it('points the sitemap index to the generated sitemap files', () => {
    const indexLocs = extractLocUrls(readPublicFile('sitemap.xml'));

    expect(indexLocs).toEqual(sitemapFiles.map((filename) => `${SITE_ORIGIN}/${filename}`));
  });

  it('keeps noindex and redirect-only routes out of public sitemaps', () => {
    const publicUrls = sitemapFiles.flatMap((filename) => extractLocUrls(readPublicFile(filename)));
    const paths = publicUrls.map(getPathname);

    expect(publicUrls.length).toBeGreaterThan(0);
    expect(paths.filter(isPrivatePath)).toEqual([]);
    expect(paths.filter((path) => redirectOnlyPaths.includes(path))).toEqual([]);
  });

  it('does not expose robots-blocked routes through public sitemaps', () => {
    const robots = readPublicFile('robots.txt');
    const disallowedPaths = Array.from(robots.matchAll(/^Disallow:\s+(.+)$/gm), (match) =>
      match[1].trim().replace(/\*.*$/, '').replace(/\/$/, ''),
    ).filter((path) => path.startsWith('/'));

    const sitemapPaths = sitemapFiles.flatMap((filename) => extractLocUrls(readPublicFile(filename)).map(getPathname));
    const blockedSitemapPaths = sitemapPaths.filter((path) =>
      disallowedPaths.some((blockedPath) => blockedPath && (path === blockedPath || path.startsWith(`${blockedPath}/`))),
    );

    expect(blockedSitemapPaths).toEqual([]);
  });
});
