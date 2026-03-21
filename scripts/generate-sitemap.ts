import {writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {getArticles} from '../src/services/articles';
import {getAllInjuries, getInjuryPath} from '../src/services/injuryDatabase';

const SITE_URL = 'https://physionutrition.vercel.app';
const LANGUAGES = ['en', 'ar'];

const staticRoutes: Array<{path: string; changefreq: string; priority: string}> = [
  {path: '/', changefreq: 'weekly', priority: '1.0'},
  {path: '/calculators', changefreq: 'weekly', priority: '0.9'},
  {path: '/injuries', changefreq: 'weekly', priority: '0.9'},
  {path: '/insights', changefreq: 'weekly', priority: '0.8'},
  {path: '/assistant', changefreq: 'weekly', priority: '0.8'},
  {path: '/privacy', changefreq: 'monthly', priority: '0.6'},
  {path: '/about', changefreq: 'monthly', priority: '0.7'},
  {path: '/contact', changefreq: 'monthly', priority: '0.7'},
  {path: '/terms', changefreq: 'monthly', priority: '0.6'},
  {path: '/cookies', changefreq: 'monthly', priority: '0.5'},
  {path: '/disclaimer', changefreq: 'monthly', priority: '0.5'},
];

// Expand static routes with language prefixes
const langStaticRoutes = staticRoutes.flatMap((route) =>
  LANGUAGES.map((lang) => ({
    path: `/${lang}${route.path}`,
    changefreq: route.changefreq,
    priority: route.priority,
  })),
);

const articleRoutes = getArticles('en').flatMap((article) =>
  LANGUAGES.map((lang) => ({
    path: `/${lang}/insights/${article.slug}`,
    changefreq: 'monthly',
    priority: '0.8',
  })),
);

const injuryRoutes = getAllInjuries().flatMap((injury) =>
  LANGUAGES.map((lang) => ({
    path: getInjuryPath(injury, lang),
    changefreq: 'weekly',
    priority: '0.8',
  })),
);

const allRoutes = [...langStaticRoutes, ...articleRoutes, ...injuryRoutes];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

writeFileSync(resolve(process.cwd(), 'public', 'sitemap.xml'), xml, 'utf8');
console.log(`Generated sitemap with ${allRoutes.length} URLs.`);
