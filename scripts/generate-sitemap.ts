import {writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {EXERCISE_FINDER_STATIC_SLUGS} from '../src/components/common/exercise-finder/constants';
import {getArticles} from '../src/services/articles';
import {dietRegimensCatalog} from '../src/services/dietRegimensCatalog';
import {getAllInjuries, getInjuryPath} from '../src/services/injuryDatabase';

const SITE_URL = 'https://physionutrition.vercel.app';
const LANGUAGES = ['en', 'ar'] as const;
type Language = (typeof LANGUAGES)[number];
const GENERATED_LASTMOD = new Date().toISOString().slice(0, 10);

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

const staticRoutes: RouteEntry[] = [
  {path: '/', changefreq: 'weekly', priority: '1.0', lastmod: GENERATED_LASTMOD},
  {path: '/calculators', changefreq: 'weekly', priority: '0.9', lastmod: GENERATED_LASTMOD},
  {path: '/exercises', changefreq: 'weekly', priority: '0.9', lastmod: GENERATED_LASTMOD},
  ...EXERCISE_FINDER_STATIC_SLUGS.map((slug) => ({
    path: `/exercises/${slug}`,
    changefreq: 'weekly',
    priority: slug === 'chest' || slug === 'back' || slug === 'shoulders' || slug === 'legs' ? '0.85' : '0.8',
    lastmod: GENERATED_LASTMOD,
  })),
  {path: '/injuries', changefreq: 'weekly', priority: '0.9', lastmod: GENERATED_LASTMOD},
  {path: '/insights', changefreq: 'weekly', priority: '0.8', lastmod: GENERATED_LASTMOD},
  {path: '/diets', changefreq: 'monthly', priority: '0.8', lastmod: GENERATED_LASTMOD},
  {path: '/assistant', changefreq: 'weekly', priority: '0.7', lastmod: GENERATED_LASTMOD},
  {path: '/privacy', changefreq: 'monthly', priority: '0.6', lastmod: GENERATED_LASTMOD},
  {path: '/about', changefreq: 'monthly', priority: '0.7', lastmod: GENERATED_LASTMOD},
  {path: '/contact', changefreq: 'monthly', priority: '0.7', lastmod: GENERATED_LASTMOD},
  {path: '/terms', changefreq: 'monthly', priority: '0.6', lastmod: GENERATED_LASTMOD},
  {path: '/cookies', changefreq: 'monthly', priority: '0.5', lastmod: GENERATED_LASTMOD},
  {path: '/disclaimer', changefreq: 'monthly', priority: '0.5', lastmod: GENERATED_LASTMOD},
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
  LANGUAGES.map((lang) => buildRouteGroup(route.path, lang, route.changefreq, route.priority, route.lastmod)),
);

const articleRoutes: RouteGroup[] = LANGUAGES.flatMap((lang) =>
  getArticles(lang).map((article) => ({
    path: `/${lang}/insights/${article.slug}`,
    lang,
    groupKey: `/insights/${article.slug}`,
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: article.date || GENERATED_LASTMOD,
  })),
);

const injuryRoutes: RouteGroup[] = getAllInjuries().flatMap((injury) =>
  LANGUAGES.map((lang) => ({
    path: getInjuryPath(injury, lang),
    lang,
    groupKey: getInjuryPath(injury, 'en').replace(/^\/en/, ''),
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: GENERATED_LASTMOD,
  })),
);

const dietRoutes: RouteGroup[] = dietRegimensCatalog.flatMap((diet) =>
  LANGUAGES.map((lang) => ({
    path: `/${lang}/diets/${diet.id}`,
    lang,
    groupKey: `/diets/${diet.id}`,
    changefreq: 'monthly',
    priority: '0.75',
    lastmod: GENERATED_LASTMOD,
  })),
);

const allRoutes: RouteGroup[] = [...langStaticRoutes, ...articleRoutes, ...injuryRoutes, ...dietRoutes];

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
    <lastmod>${route.lastmod || GENERATED_LASTMOD}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>
`;

writeFileSync(resolve(process.cwd(), 'public', 'sitemap.xml'), xml, 'utf8');
console.log(`Generated sitemap with ${allRoutes.length} URLs.`);
