import {writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {getArticles} from '../src/services/articles';
import {getAllInjuries, getInjuryPath} from '../src/services/injuryDatabase';

const SITE_URL = 'https://physionutrition.vercel.app';
const LANGUAGES = ['en', 'ar'] as const;
type Language = (typeof LANGUAGES)[number];

type RouteEntry = {
  path: string;
  changefreq: string;
  priority: string;
  lastmod?: string;
};

type RouteGroup = RouteEntry & {
  lang: Language;
  groupKey: string;
};

const staticRoutes: Array<{path: string; changefreq: string; priority: string}> = [
  {path: '/', changefreq: 'weekly', priority: '1.0'},
  {path: '/calculators', changefreq: 'weekly', priority: '0.9'},
  {path: '/injuries', changefreq: 'weekly', priority: '0.9'},
  {path: '/insights', changefreq: 'weekly', priority: '0.8'},
  {path: '/diets', changefreq: 'monthly', priority: '0.8'},
  {path: '/privacy', changefreq: 'monthly', priority: '0.6'},
  {path: '/about', changefreq: 'monthly', priority: '0.7'},
  {path: '/contact', changefreq: 'monthly', priority: '0.7'},
  {path: '/terms', changefreq: 'monthly', priority: '0.6'},
  {path: '/cookies', changefreq: 'monthly', priority: '0.5'},
  {path: '/disclaimer', changefreq: 'monthly', priority: '0.5'},
];

function absoluteUrl(path: string) {
  return `${SITE_URL}${path}`;
}

function buildRouteGroup(path: string, lang: Language, changefreq: string, priority: string, lastmod?: string): RouteGroup {
  return {
    path: `/${lang}${path}`,
    lang,
    groupKey: path,
    changefreq,
    priority,
    ...(lastmod ? {lastmod} : {}),
  };
}

const langStaticRoutes: RouteGroup[] = staticRoutes.flatMap((route) =>
  LANGUAGES.map((lang) => buildRouteGroup(route.path, lang, route.changefreq, route.priority)),
);

const articleRoutes: RouteGroup[] = LANGUAGES.flatMap((lang) =>
  getArticles(lang).map((article) => ({
    path: `/${lang}/insights/${article.slug}`,
    lang,
    groupKey: `/insights/${article.slug}`,
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: article.date,
  })),
);

const injuryRoutes: RouteGroup[] = getAllInjuries().flatMap((injury) =>
  LANGUAGES.map((lang) => ({
    path: getInjuryPath(injury, lang),
    lang,
    groupKey: getInjuryPath(injury, 'en').replace(/^\/en/, ''),
    changefreq: 'weekly',
    priority: '0.8',
  })),
);

const allRoutes: RouteGroup[] = [...langStaticRoutes, ...articleRoutes, ...injuryRoutes];

const alternatesByGroup = new Map<string, RouteGroup[]>();
allRoutes.forEach((route) => {
  const group = alternatesByGroup.get(route.groupKey);
  if (group) {
    group.push(route);
  } else {
    alternatesByGroup.set(route.groupKey, [route]);
  }
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allRoutes
  .map((route) => {
    const alternates = (alternatesByGroup.get(route.groupKey) || [route]).sort((a, b) => a.lang.localeCompare(b.lang));
    const xDefault = alternates.find((item) => item.lang === 'en')?.path || route.path;

    return `  <url>
    <loc>${absoluteUrl(route.path)}</loc>
${alternates
  .map(
    (alternate) =>
      `    <xhtml:link rel="alternate" hreflang="${alternate.lang}" href="${absoluteUrl(alternate.path)}" />`,
  )
  .join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl(xDefault)}" />
${route.lastmod ? `    <lastmod>${route.lastmod}</lastmod>\n` : ''}    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>
`;

writeFileSync(resolve(process.cwd(), 'public', 'sitemap.xml'), xml, 'utf8');
console.log(`Generated sitemap with ${allRoutes.length} URLs.`);
