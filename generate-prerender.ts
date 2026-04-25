import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {getArticles as getLocalArticles} from './src/services/articles';
import {dietRegimensCatalog} from './src/services/dietRegimensCatalog';
import {getInjuryPath, type InjuryProtocol} from './src/services/injuryDatabase';
import {
  getLocalizedBodyRegion,
  getLocalizedCategory,
  getLocalizedCommonInjuryContext,
  getLocalizedInjuryName,
  getLocalizedInjuryOverview,
} from './src/services/injuryLocalization';
import {decodeMojibake} from './src/services/textEncoding';
import {EXERCISE_FINDER_STATIC_ARABIC_LABELS, EXERCISE_FINDER_STATIC_LABELS, EXERCISE_FINDER_STATIC_SLUGS} from './src/components/common/exercise-finder/constants';
import {CALCULATOR_PAGE_CONFIGS} from './src/services/calculatorPages';
import {normalizeExerciseUrlSlug} from './src/services/seoAliases';
import {TRAINING_SYSTEMS} from './src/components/common/exercise-finder/data/training-systems';
import {getBuildArticles, getBuildInjuries} from './scripts/buildContentSource';

type Lang = 'en' | 'ar';

type RouteDefinition = {
  path: string;
  lang: Lang;
  title: string;
  description: string;
  body: string;
  structuredData?: unknown[];
  noIndex?: boolean;
};

const SITE_URL = 'https://physionutrition.vercel.app';
const DIST_DIR = resolve(process.cwd(), 'dist');
const TEMPLATE_PATH = resolve(DIST_DIR, 'index.html');
const template = readFileSync(TEMPLATE_PATH, 'utf8');
const buildArticlesByLang = Object.fromEntries(
  await Promise.all((['en', 'ar'] as Lang[]).map(async (lang) => [lang, await getBuildArticles(lang)])),
) as Record<Lang, Awaited<ReturnType<typeof getBuildArticles>>>;
const buildInjuries = await getBuildInjuries();
const getArticles = (lang: Lang) => buildArticlesByLang[lang] || getLocalArticles(lang);
const getAllInjuries = () => buildInjuries;

const SEO_SHELL_CSS = `
<style data-prerender-seo="true">
  .seo-shell{max-width:960px;margin:0 auto;padding:48px 20px 64px;color:#16382c;font-family:Segoe UI,Tahoma,Geneva,Verdana,sans-serif;line-height:1.7}
  .seo-shell a{color:#1f6f53;text-decoration:none}
  .seo-shell a:hover{text-decoration:underline}
  .seo-shell .eyebrow{display:inline-block;margin-bottom:14px;padding:6px 12px;border-radius:999px;background:#e6f4ec;color:#1f6f53;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
  .seo-shell .card{margin-top:22px;padding:22px;border:1px solid #dbe7e1;border-radius:24px;background:#fff;box-shadow:0 14px 30px rgba(31,77,59,.06)}
  .seo-shell .grid{display:grid;gap:18px}
  .seo-shell .grid.two{grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}
  .seo-shell .meta{color:#628474;font-size:14px}
  .seo-shell h1{margin:0 0 16px;font-size:42px;line-height:1.15}
  .seo-shell h2{margin:0 0 12px;font-size:26px;line-height:1.25}
  .seo-shell h3{margin:0 0 10px;font-size:18px}
  .seo-shell p,.seo-shell li{font-size:16px}
  .seo-shell ul{margin:0;padding-left:22px}
  .seo-shell .link-list{list-style:none;padding:0}
  .seo-shell .link-list li{margin:8px 0}
  .seo-shell .muted{color:#4f6f62}
</style>`;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function text(value: string) {
  return escapeHtml(decodeMojibake(value));
}

function formatList(items: string[] | undefined, separator: string) {
  return (items ?? []).map(text).join(separator);
}

function getLocalizedOverview(injury: InjuryProtocol, lang: Lang) {
  const withLocalizedFields = injury as InjuryProtocol & {overview_ar?: string; overview_en?: string};

  if (lang === 'ar') {
    return (
      withLocalizedFields.overview_ar ||
      getLocalizedInjuryOverview(
        getLocalizedInjuryName(injury.id, injury.name, 'ar'),
        injury.category,
        injury.bodyRegion,
        withLocalizedFields.overview_en || injury.overview,
        'ar',
      )
    );
  }

  return withLocalizedFields.overview_en || injury.overview;
}

function getLocalizedCommonIn(lang: Lang, commonIn: string[]) {
  return commonIn.map((item) => getLocalizedCommonInjuryContext(item, lang));
}

function getPhaseLabel(phase: InjuryProtocol['phases'][number], lang: Lang) {
  const withLocalizedFields = phase as typeof phase & {label_ar?: string; label_en?: string};
  return lang === 'ar'
    ? withLocalizedFields.label_ar || withLocalizedFields.label_en || phase.label
    : withLocalizedFields.label_en || phase.label;
}

function getPhaseGoals(phase: InjuryProtocol['phases'][number], lang: Lang) {
  const withLocalizedFields = phase as typeof phase & {goals_ar?: string[]; goals_en?: string[]};
  return lang === 'ar'
    ? withLocalizedFields.goals_ar?.length
      ? withLocalizedFields.goals_ar
      : withLocalizedFields.goals_en || phase.goals
    : withLocalizedFields.goals_en || phase.goals;
}

function getPhaseNutritionFocus(phase: InjuryProtocol['phases'][number], lang: Lang) {
  const withLocalizedFields = phase as typeof phase & {
    nutrition_focus_ar?: string[];
    nutrition_focus_en?: string[];
  };
  return lang === 'ar'
    ? withLocalizedFields.nutrition_focus_ar?.length
      ? withLocalizedFields.nutrition_focus_ar
      : withLocalizedFields.nutrition_focus_en || phase.nutritionFocus
    : withLocalizedFields.nutrition_focus_en || phase.nutritionFocus;
}

function getPhaseBreakfast(phase: InjuryProtocol['phases'][number], lang: Lang) {
  const meals = phase.meals as typeof phase.meals & {breakfast_ar?: string; breakfast_en?: string};
  return lang === 'ar'
    ? meals.breakfast_ar || meals.breakfast_en || phase.meals.breakfast
    : meals.breakfast_en || phase.meals.breakfast;
}

function absoluteUrl(path: string) {
  return `${SITE_URL}${path}`;
}

function buildHreflangs(path: string) {
  const suffix = path.replace(/^\/(en|ar)/, '');
  const normalizedSuffix = suffix || '/';
  return [
    {lang: 'en', href: absoluteUrl(`/en${normalizedSuffix === '/' ? '/' : normalizedSuffix}`)},
    {lang: 'ar', href: absoluteUrl(`/ar${normalizedSuffix === '/' ? '/' : normalizedSuffix}`)},
  ];
}

function section(title: string, content: string) {
  return `<section class="card"><h2>${escapeHtml(title)}</h2>${content}</section>`;
}

function layout(lang: Lang, eyebrow: string, title: string, intro: string, sections: string[]) {
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  return `
    <main class="seo-shell" dir="${dir}">
      <span class="eyebrow">${escapeHtml(eyebrow)}</span>
      <h1>${escapeHtml(title)}</h1>
      <p class="muted">${intro}</p>
      ${sections.join('\n')}
    </main>
  `;
}

function replaceMeta(html: string, title: string, description: string, canonical: string, lang: Lang, noIndex?: boolean) {
  const headTags = `
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="${noIndex ? 'noindex, nofollow' : 'index, follow'}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${canonical}" />
  `;

  return html
    .replace(/<html lang="[^"]+"/, `<html lang="${lang}"`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>/, '')
    .replace(/<meta name="robots" content="[^"]*"\s*\/?>/g, '')
    .replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, '')
    .replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, '')
    .replace(/<meta property="og:description" content="[^"]*"\s*\/?>/, '')
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/?>/, '')
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/?>/, '')
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, '')
    .replace('</head>', `${SEO_SHELL_CSS}${headTags}</head>`);
}

function injectRoot(html: string, body: string, structuredData: unknown[] = [], hreflangs: Array<{lang: string; href: string}> = []) {
  const hreflangTags = hreflangs
    .map((item) => `<link rel="alternate" hreflang="${item.lang}" href="${item.href}" />`)
    .join('');
  const xDefault = hreflangs[0] ? `<link rel="alternate" hreflang="x-default" href="${hreflangs[0].href}" />` : '';
  const schemaTags = structuredData
    .map((item, index) => `<script type="application/ld+json" data-prerender-schema="${index}">${JSON.stringify(item)}</script>`)
    .join('');

  return html
    .replace('</head>', `${hreflangTags}${xDefault}${schemaTags}</head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}

function writeRoute(route: RouteDefinition) {
  const canonical = absoluteUrl(route.path);
  const html = injectRoot(
    replaceMeta(template, route.title, route.description, canonical, route.lang, route.noIndex),
    route.body,
    route.structuredData,
    buildHreflangs(route.path),
  );

  const outputPath = join(DIST_DIR, route.path.replace(/^\//, ''), 'index.html');
  mkdirSync(dirname(outputPath), {recursive: true});
  writeFileSync(outputPath, html, 'utf8');
}

function writeRootShell() {
  const canonical = absoluteUrl('/en/');
  const rootBody = `
    <main class="seo-shell" dir="ltr">
      <span class="eyebrow">PhysioNutrition</span>
      <h1>PhysioNutrition</h1>
      <p class="muted">Choose your preferred language to continue to the main site sections.</p>
      <section class="card">
        <h2>Choose a language</h2>
        <ul class="link-list">
          <li><a href="/en/">English</a></li>
          <li><a href="/ar/">العربية</a></li>
        </ul>
      </section>
    </main>
  `;

  const html = injectRoot(
    replaceMeta(
      template,
      'PhysioNutrition',
      'Language gateway for the PhysioNutrition website.',
      canonical,
      'en',
      true,
    ),
    rootBody,
    [],
    [
      {lang: 'en', href: absoluteUrl('/en/')},
      {lang: 'ar', href: absoluteUrl('/ar/')},
    ],
  );

  writeFileSync(join(DIST_DIR, 'index.html'), html, 'utf8');
}

function buildArticleSections(content: string) {
  const lines = decodeMojibake(content).split('\n');
  const blocks: string[] = [];
  let listBuffer: string[] = [];

  const flushList = () => {
    if (!listBuffer.length) return;
    blocks.push(`<ul>${listBuffer.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`);
    listBuffer = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushList();
      continue;
    }

    if (line.startsWith('## ')) {
      flushList();
      blocks.push(`<h2>${escapeHtml(line.slice(3))}</h2>`);
      continue;
    }

    if (line.startsWith('* ')) {
      listBuffer.push(line.slice(2));
      continue;
    }

    flushList();
    blocks.push(`<p>${escapeHtml(line)}</p>`);
  }

  flushList();
  return blocks.join('');
}

function homeRoute(lang: Lang): RouteDefinition {
  const isAr = lang === 'ar';
  const articles = getArticles(lang).slice(0, 4);
  const sections = [
    section(
      isAr ? 'أقسام أساسية قابلة للفهرسة' : 'Core indexable sections',
      `<ul class="link-list">
        <li><a href="/${lang}/calculators">${isAr ? 'حاسبات التغذية والعلاج الطبيعي' : 'Nutrition and rehab calculators'}</a></li>
        <li><a href="/${lang}/injuries">${isAr ? 'مكتبة الإصابات وخطط التعافي' : 'Injury recovery protocol library'}</a></li>
        <li><a href="/${lang}/insights">${isAr ? 'مقالات تعليمية مبنية على الأدلة' : 'Evidence-based educational articles'}</a></li>
        <li><a href="/${lang}/diets">${isAr ? 'أنواع الدايت والأنظمة الغذائية' : 'Diet and regimen guides'}</a></li>
      </ul>`,
    ),
    section(
      isAr ? 'أحدث المقالات' : 'Recent articles',
      `<div class="grid two">${articles
        .map(
          (article) => `<article class="card">
            <h3><a href="/${lang}/insights/${article.slug}">${text(article.title)}</a></h3>
            <p class="meta">${text(article.category)} · ${escapeHtml(article.date)}</p>
            <p>${text(article.excerpt)}</p>
          </article>`,
        )
        .join('')}</div>`,
    ),
  ];

  return {
    path: `/${lang}/`,
    lang,
    title: isAr ? 'PhysioNutrition | حاسبات ومكتبة علاج طبيعي وتغذية' : 'PhysioNutrition | Rehab, nutrition, and calculator hub',
    description: isAr
      ? 'منصة تعليمية تضم حاسبات صحية ومقالات علاج طبيعي وتغذية وصفحات إصابات قابلة للفهرسة.'
      : 'Educational rehab and nutrition platform with calculator tools, injury recovery pages, and evidence-based articles.',
    body: layout(
      lang,
      isAr ? 'منصة تعليمية' : 'Educational platform',
      isAr ? 'PhysioNutrition: أدوات ومحتوى واضح للتغذية العلاجية والعلاج الطبيعي' : 'PhysioNutrition: practical rehab and nutrition tools with readable content',
      isAr
        ? 'هذه الصفحة تجمع بين الحاسبات الصحية، مكتبة بروتوكولات الإصابات، ومقالات تعليمية تساعد الزائر على فهم التعافي، التغذية، وتتبع التقدم.'
        : 'This page connects practical calculators, injury recovery protocols, and educational articles so visitors can understand rehab, nutrition, and measurable progress in one place.',
      sections,
    ),
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'PhysioNutrition',
        url: absoluteUrl(`/${lang}/`),
        inLanguage: lang,
      },
    ],
  };
}

function calculatorsRoute(lang: Lang): RouteDefinition {
  const isAr = lang === 'ar';
  return {
    path: `/${lang}/calculators`,
    lang,
    title: isAr ? 'حاسبات التغذية والعلاج الطبيعي' : 'Clinical calculators for nutrition and rehab',
    description: isAr
      ? 'حاسبات BMI والسعرات والبروتين والماء والماكروز لدعم المتابعة اليومية والتعافي.'
      : 'BMI, calorie, protein, macro, and hydration calculators designed for rehab and nutrition follow-up.',
    body: layout(
      lang,
      isAr ? 'حاسبات' : 'Calculators',
      isAr ? 'حاسبات سريرية تساعدك على فهم الأرقام قبل اتخاذ قرار عملي' : 'Clinical calculators that help you understand the numbers before acting on them',
      isAr
        ? 'صفحة الحاسبات في PhysioNutrition تقدم أدوات لحساب BMI، احتياج البروتين، السعرات، الماكروز، واحتياج الماء، مع ربط النتائج بالمقالات ولوحة المتابعة.'
        : 'The calculators page includes BMI, protein, calorie, macro, and hydration tools, with links to related article guidance and follow-up pages.',
      [
        section(
          isAr ? 'أشهر الحاسبات' : 'Most-used calculators',
          `<ul>
            <li>${isAr ? 'مؤشر كتلة الجسم BMI' : 'BMI calculator'}</li>
            <li>${isAr ? 'السعرات اليومية وBMR وTDEE' : 'BMR and total daily calories'}</li>
            <li>${isAr ? 'احتياج البروتين والماء' : 'Protein and water intake'}</li>
            <li>${isAr ? 'الماكروز وعجز السعرات' : 'Macro split and calorie deficit'}</li>
          </ul>`,
        ),
        section(
          isAr ? 'روابط مفيدة' : 'Helpful next steps',
          `<ul class="link-list">
            <li><a href="/${lang}/insights">${isAr ? 'اقرأ المقالات المرتبطة' : 'Read the related articles'}</a></li>
            <li><a href="/${lang}/dashboard">${isAr ? 'افتح لوحة المتابعة' : 'Open the tracking dashboard'}</a></li>
            <li><a href="/${lang}/injuries">${isAr ? 'تصفح مكتبة الإصابات' : 'Browse the injury library'}</a></li>
          </ul>`,
        ),
      ],
    ),
  };
}

function calculatorDetailRoute(
  lang: Lang,
  calculator: (typeof CALCULATOR_PAGE_CONFIGS)[number],
): RouteDefinition {
  const isAr = lang === 'ar';
  const title = isAr ? calculator.titleAr : calculator.titleEn;
  const description = isAr ? calculator.descriptionAr : calculator.descriptionEn;

  return {
    path: `/${lang}/calculators/${calculator.slug}`,
    lang,
    title,
    description,
    body: layout(
      lang,
      'Focused calculator',
      title,
      description,
      [
        section(
          'What you will find here',
          `<ul>
            <li>Direct access to the matching calculator without browsing the full tool hub.</li>
            <li>A concise purpose statement so the page is indexable and easier to understand.</li>
            <li>Helpful next steps into diets, injuries, and the tracking dashboard.</li>
          </ul>`,
        ),
        section(
          'Helpful next steps',
          `<ul class="link-list">
            <li><a href="/${lang}/calculators">Back to the calculators hub</a></li>
            <li><a href="/${lang}/injuries">Open the injury library</a></li>
            <li><a href="/${lang}/diets">Review diet guides</a></li>
            <li><a href="/${lang}/dashboard">Track results in the dashboard</a></li>
          </ul>`,
        ),
      ],
    ),
  };
}

function insightsRoute(lang: Lang): RouteDefinition {
  const isAr = lang === 'ar';
  const articles = getArticles(lang);
  return {
    path: `/${lang}/insights`,
    lang,
    title: isAr ? 'مقالات PhysioNutrition' : 'PhysioNutrition insights and articles',
    description: isAr
      ? 'مقالات عن التغذية العلاجية، التعافي، الألم، الحاسبات، وإدارة الوزن.'
      : 'Evidence-based articles about rehab nutrition, injury recovery, pain, calculators, and weight management.',
    body: layout(
      lang,
      isAr ? 'مقالات' : 'Insights',
      isAr ? 'مقالات تعليمية تغطي التعافي، التغذية، الألم، وإدارة الحمل التدريبي' : 'Educational articles on recovery, nutrition, pain, and training load',
      isAr
        ? `يوجد حاليًا ${articles.length} مقالًا منشورًا مع صفحات مستقلة لكل موضوع لسهولة الفهرسة والوصول من محركات البحث.`
        : `There are currently ${articles.length} published articles, each with its own standalone page for better discovery and indexing.`,
      [
        section(
          isAr ? 'كل المقالات' : 'All articles',
          `<div class="grid two">${articles
            .map(
              (article) => `<article class="card">
                <h2><a href="/${lang}/insights/${article.slug}">${text(article.title)}</a></h2>
                <p class="meta">${text(article.category)} · ${escapeHtml(article.date)}</p>
                <p>${text(article.excerpt)}</p>
              </article>`,
            )
            .join('')}</div>`,
        ),
      ],
    ),
  };
}

function articleRoute(lang: Lang, article: ReturnType<typeof getArticles>[number]): RouteDefinition {
  const isAr = lang === 'ar';
  return {
    path: `/${lang}/insights/${article.slug}`,
    lang,
    title: decodeMojibake(article.title),
    description: decodeMojibake(article.excerpt),
    body: layout(
      lang,
      isAr ? 'مقالة تعليمية' : 'Educational article',
      decodeMojibake(article.title),
      `<span class="meta">${text(article.category)} · ${escapeHtml(article.date)}</span><br />${text(article.excerpt)}`,
      [
        section(isAr ? 'محتوى المقال' : 'Article content', buildArticleSections(article.content)),
        section(
          isAr ? 'روابط داخلية مرتبطة' : 'Related internal links',
          `<ul class="link-list">
            <li><a href="/${lang}/insights">${isAr ? 'كل المقالات' : 'All articles'}</a></li>
            <li><a href="/${lang}/injuries">${isAr ? 'مكتبة الإصابات' : 'Injury protocol library'}</a></li>
            <li><a href="/${lang}/diets">${isAr ? 'أنواع الدايت والأنظمة الغذائية' : 'Diet and regimen guides'}</a></li>
            <li><a href="/${lang}/calculators">${isAr ? 'حاسبات التغذية والعلاج الطبيعي' : 'Clinical calculators'}</a></li>
          </ul>`,
        ),
      ],
    ),
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: decodeMojibake(article.title),
        description: decodeMojibake(article.excerpt),
        datePublished: article.date,
        dateModified: article.date,
        inLanguage: lang,
        url: absoluteUrl(`/${lang}/insights/${article.slug}`),
        author: {'@type': 'Organization', name: 'PhysioNutrition'},
        publisher: {'@type': 'Organization', name: 'PhysioNutrition'},
      },
    ],
  };
}

function injuriesRoute(lang: Lang): RouteDefinition {
  const isAr = lang === 'ar';
  const injuries = getAllInjuries();
  return {
    path: `/${lang}/injuries`,
    lang,
    title: isAr ? 'مكتبة بروتوكولات الإصابات' : 'Injury protocol library',
    description: isAr
      ? 'صفحات مستقلة لبروتوكولات الإصابات الشائعة مع مراحل التعافي والتغذية والتمارين.'
      : 'Standalone injury pages with rehab stages, nutrition guidance, and exercise focus for common conditions.',
    body: layout(
      lang,
      isAr ? 'إصابات وتعافي' : 'Injury recovery',
      isAr ? 'مكتبة إصابات قابلة للفهرسة مع صفحات مستقلة لكل حالة' : 'An indexable injury library with dedicated pages for each condition',
      isAr
        ? `تضم المكتبة ${injuries.length} صفحة إصابة تغطي الأعراض الشائعة، مراحل التعافي، التركيز الغذائي، وروابط داخلية للحالات المرتبطة.`
        : `The library includes ${injuries.length} injury pages covering symptoms, staged recovery focus, nutrition, and related internal links.`,
      [
        section(
          isAr ? 'صفحات الإصابات' : 'Injury pages',
          `<div class="grid two">${injuries
            .slice(0, 36)
            .map(
              (injury) => `<article class="card">
                <h3><a href="${getInjuryPath(injury, lang)}">${text(injury.name)}</a></h3>
                <p class="meta">${text(injury.category)} · ${text(injury.bodyRegion)}</p>
                <p>${text(getLocalizedOverview(injury, lang))}</p>
              </article>`,
            )
            .join('')}</div>`,
        ),
      ],
    ),
  };
}

function injuryRoute(lang: Lang, injury: InjuryProtocol): RouteDefinition {
  const isAr = lang === 'ar';
  const localizedName = getLocalizedInjuryName(injury.id, injury.name, lang);
  const localizedBodyRegion = getLocalizedBodyRegion(injury.bodyRegion, lang);
  const localizedCategory = getLocalizedCategory(injury.category, lang);
  const relatedArticles = getArticles(lang).slice(0, 3);
  const localizedDescription = isAr
    ? `دليل عملي لإصابة ${localizedName} يشمل الأعراض الشائعة، مراحل التعافي، التمارين المناسبة، والتركيز الغذائي المرتبط بـ ${localizedBodyRegion}.`
    : `${injury.name} recovery guide covering common symptoms, staged rehab, exercise focus, and nutrition considerations for the ${injury.bodyRegion.toLowerCase()}.`;

  return {
    path: getInjuryPath(injury, lang),
    lang,
    title: isAr ? `${decodeMojibake(localizedName)} | بروتوكول التعافي` : `${injury.name} recovery protocol`,
    description: localizedDescription,
    body: layout(
      lang,
      isAr ? 'بروتوكول إصابة' : 'Injury protocol',
      decodeMojibake(localizedName),
      text(getLocalizedOverview(injury, lang)),
      [
        section(
          isAr ? 'ملخص الحالة' : 'Condition summary',
          `<p><strong>${isAr ? 'التصنيف:' : 'Category:'}</strong> ${text(localizedCategory)}</p>
           <p><strong>${isAr ? 'المنطقة:' : 'Body region:'}</strong> ${text(localizedBodyRegion)}</p>
           <p><strong>${isAr ? 'شائع في:' : 'Common in:'}</strong> ${formatList(getLocalizedCommonIn(lang, injury.commonIn), isAr ? '، ' : ', ')}</p>`,
        ),
        section(
          isAr ? 'مراحل التعافي' : 'Recovery phases',
          injury.phases
            .slice(0, 3)
            .map(
              (phase) => `<div class="card">
                <h3>${text(getPhaseLabel(phase, lang))} <span class="meta">(${text(phase.duration)})</span></h3>
                <p><strong>${isAr ? 'الأهداف:' : 'Goals:'}</strong> ${formatList(getPhaseGoals(phase, lang), isAr ? '، ' : ', ')}</p>
                <p><strong>${isAr ? 'التركيز الغذائي:' : 'Nutrition focus:'}</strong> ${formatList(getPhaseNutritionFocus(phase, lang), isAr ? '، ' : ', ')}</p>
                <p><strong>${isAr ? 'أمثلة الوجبات:' : 'Meal examples:'}</strong> ${text(getPhaseBreakfast(phase, lang))} / ${text(phase.meals.lunch)} / ${text(phase.meals.dinner)}</p>
              </div>`,
            )
            .join(''),
        ),
        section(
          isAr ? 'روابط مفيدة مرتبطة بالتعافي' : 'Helpful recovery links',
          `<ul class="link-list">
            <li><a href="/${lang}/calculators">${isAr ? 'حاسبات البروتين والسعرات والماء' : 'Protein, calorie, and hydration calculators'}</a></li>
            <li><a href="/${lang}/diets">${isAr ? 'أنواع الدايت المناسبة للتعافي' : 'Diet styles that support recovery'}</a></li>
            <li><a href="/${lang}/insights">${isAr ? 'مقالات تعليمية عن الألم والتعافي' : 'Articles about pain, nutrition, and recovery'}</a></li>
          </ul>
          <div class="grid two">${relatedArticles
            .map(
              (article) => `<article class="card">
                <h3><a href="/${lang}/insights/${article.slug}">${text(article.title)}</a></h3>
                <p>${text(article.excerpt)}</p>
              </article>`,
            )
            .join('')}</div>`,
        ),
      ],
    ),
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'MedicalWebPage',
        name: decodeMojibake(localizedName),
        description: localizedDescription,
        url: absoluteUrl(getInjuryPath(injury, lang)),
        about: {'@type': 'MedicalCondition', name: decodeMojibake(localizedName)},
      },
    ],
  };
}

function dietsRoute(lang: Lang): RouteDefinition {
  const isAr = lang === 'ar';
  return {
    path: `/${lang}/diets`,
    lang,
    title: isAr ? 'أنواع الدايت والأنظمة الغذائية' : 'Diet and regimen types',
    description: isAr
      ? 'شرح لأنواع الدايت الأكثر شيوعًا مع الأهداف والمبادئ والملاحظات العملية.'
      : 'Detailed explanations of common diet styles with goals, principles, practical notes, and example meals.',
    body: layout(
      lang,
      isAr ? 'أنظمة غذائية' : 'Diet guides',
      isAr ? 'أنواع الدايت والريجيم مع شرح واضح وملاحظات عملية' : 'Diet and regimen types explained with practical context',
      isAr
        ? 'تشرح هذه الصفحة الأنظمة الغذائية الشائعة مثل الدايت المضاد للالتهاب، البروتين العالي، العجز الحراري، المتوسط، النباتي، وغيرها مع ملاحظات تتعلق بالتعافي.'
        : 'This page explains common diet approaches such as anti-inflammatory eating, high-protein rehab nutrition, calorie deficit, Mediterranean, and plant-based plans.',
      [
        section(
          isAr ? 'أنواع موجودة في الصفحة' : 'Included diet types',
          `<div class="grid two">${dietRegimensCatalog
            .map(
              (item) => `<article class="card">
                <h3>${text(isAr ? item.title.ar : item.title.en)}</h3>
                <p>${text(isAr ? item.summary.ar : item.summary.en)}</p>
                <p><strong>${isAr ? 'الأهداف:' : 'Goals:'}</strong> ${(isAr ? item.goals.ar : item.goals.en).map(text).join(', ')}</p>
              </article>`,
            )
            .join('')}</div>`,
        ),
        section(
          isAr ? 'تنقل داخلي مفيد' : 'Helpful internal navigation',
          `<ul class="link-list">
            <li><a href="/${lang}/calculators">${isAr ? 'ارجع للحاسبات' : 'Go back to calculators'}</a></li>
            <li><a href="/${lang}/injuries">${isAr ? 'تصفح مكتبة الإصابات' : 'Browse injury pages'}</a></li>
            <li><a href="/${lang}/insights">${isAr ? 'اقرأ المقالات التعليمية' : 'Read educational articles'}</a></li>
          </ul>`,
        ),
      ],
    ),
  };
}

function exercisesRoute(lang: Lang, slug?: (typeof EXERCISE_FINDER_STATIC_SLUGS)[number]): RouteDefinition {
  const isAr = lang === 'ar';
  const pageTitle = slug
    ? isAr
      ? `تمارين ${EXERCISE_FINDER_STATIC_ARABIC_LABELS[slug]}`
      : `${EXERCISE_FINDER_STATIC_LABELS[slug]} exercises`
    : isAr
      ? 'دليل التمارين'
      : 'Exercise Finder';
  const pageDescription = slug
    ? isAr
      ? `صفحة قابلة للفهرسة تعرض تمارين ${EXERCISE_FINDER_STATIC_ARABIC_LABELS[slug]} مع تشريح مبسط وروابط داخلية للأنظمة والخطط الأسبوعية.`
      : `Indexable page for ${EXERCISE_FINDER_STATIC_LABELS[slug].toLowerCase()} exercises with simple anatomy notes, internal links, and weekly-plan context.`
    : isAr
      ? 'الصفحة الأساسية للتمارين وتربط بين مكتبة التمارين وصفحات المناطق العضلية وصفحات الأنظمة التدريبية.'
      : 'Main exercise hub that connects the exercise library, muscle-region pages, and training-system pages.';

  const links = [
    ...['chest', 'back', 'shoulders', 'arms', 'core', 'legs'].map((item) => ({
      href: `/${lang}/exercises/${item}`,
      label: isAr ? `تمارين ${EXERCISE_FINDER_STATIC_ARABIC_LABELS[item as keyof typeof EXERCISE_FINDER_STATIC_ARABIC_LABELS]}` : `${EXERCISE_FINDER_STATIC_LABELS[item as keyof typeof EXERCISE_FINDER_STATIC_LABELS]} exercises`,
    })),
    {href: `/${lang}/exercises/systems`, label: isAr ? 'صفحات الأنظمة' : 'Training systems'},
  ];

  return {
    path: slug ? `/${lang}/exercises/${normalizeExerciseUrlSlug(slug)}` : `/${lang}/exercises`,
    lang,
    title: pageTitle,
    description: pageDescription,
    body: layout(
      lang,
      isAr ? 'دليل التمارين' : 'Exercise finder',
      pageTitle,
      pageDescription,
      [
        section(
          isAr ? 'روابط التنقل الأساسية' : 'Primary navigation links',
          `<ul class="link-list">${links.map((item) => `<li><a href="${item.href}">${item.label}</a></li>`).join('')}</ul>`,
        ),
        section(
          isAr ? 'طريقة استخدام القسم' : 'How to use this section',
          `<ul>
            <li>${isAr ? 'ابدأ من الصفحة الأساسية ثم افتح المنطقة العضلية أو النظام الذي يناسب هدفك.' : 'Start from the hub, then open the region or system page that matches your goal.'}</li>
            <li>${isAr ? 'كل صفحة منطقة تربط بين التشريح المبسط والتمارين الكاملة والأنظمة المناسبة.' : 'Each region page connects simple anatomy, the full exercise library, and related systems.'}</li>
            <li>${isAr ? 'كل صفحة نظام تشرح الفرق بين النظام وغيره وتربطه بخطة أسبوعية وتمارين مرتبطة.' : 'Each system page explains the split, compares it to others, and links it to a weekly plan and related exercises.'}</li>
          </ul>`,
        ),
      ],
    ),
  };
}

function exerciseSystemsRoute(lang: Lang): RouteDefinition {
  const isAr = lang === 'ar';
  return {
    path: `/${lang}/exercises/systems`,
    lang,
    title: isAr ? 'أنظمة التمارين' : 'Training systems',
    description: isAr ? 'فهرس لأنظمة التمارين المختلفة مع مقارنات وروابط إلى الخطط الأسبوعية وصفحات التمارين.' : 'Index of training systems with comparisons, weekly plans, and links to related exercise pages.',
    body: layout(
      lang,
      isAr ? 'أنظمة التمارين' : 'Training systems',
      isAr ? 'صفحات أنظمة التمرين' : 'Workout system pages',
      isAr ? 'افتح كل نظام في صفحة مستقلة لفهم الفكرة العامة والفروق بين التقسيمات والخطة الأسبوعية المرتبطة.' : 'Open each system in its own page to understand the split, comparisons, and linked weekly plan.',
      [
        section(
          isAr ? 'الأنظمة المتاحة' : 'Available systems',
          `<ul class="link-list">${TRAINING_SYSTEMS.map((system) => `<li><a href="/${lang}/exercises/systems/${system.id}">${text(isAr ? system.titleAr : system.title)}</a></li>`).join('')}</ul>`,
        ),
      ],
    ),
  };
}

function exerciseSystemDetailRoute(lang: Lang, system: (typeof TRAINING_SYSTEMS)[number]): RouteDefinition {
  const isAr = lang === 'ar';
  return {
    path: `/${lang}/exercises/systems/${system.id}`,
    lang,
    title: text(isAr ? system.titleAr : system.title),
    description: text(isAr ? system.summaryAr : system.summary),
    body: layout(
      lang,
      isAr ? 'نظام تدريبي' : 'Training system',
      text(isAr ? system.titleAr : system.title),
      text(isAr ? system.summaryAr : system.summary),
      [
        section(
          isAr ? 'ملامح النظام' : 'System highlights',
          `<ul>
            <li>${text(isAr ? system.frequencyAr : system.frequency)}</li>
            <li>${text(isAr ? system.splitAr : system.split)}</li>
            <li>${text(isAr ? system.idealForAr : system.idealFor)}</li>
          </ul>`,
        ),
        section(
          isAr ? 'روابط المناطق العضلية' : 'Linked muscle regions',
          `<ul class="link-list">${system.muscleGroups.map((group) => `<li><a href="/${lang}/exercises/${group}">${isAr ? text(EXERCISE_FINDER_STATIC_ARABIC_LABELS[group]) : text(EXERCISE_FINDER_STATIC_LABELS[group])}</a></li>`).join('')}</ul>`,
        ),
      ],
    ),
  };
}
function infoPageRoute(lang: Lang, page: 'about' | 'contact' | 'privacy' | 'terms' | 'cookies' | 'disclaimer'): RouteDefinition {
  const isAr = lang === 'ar';

  const config = {
    about: {
      title: isAr ? 'من نحن' : 'About PhysioNutrition',
      description: isAr
        ? 'تعرّف على PhysioNutrition ورسالة الموقع التعليمية وكيف تم بناء أدواته في التغذية والعلاج الطبيعي.'
        : 'Learn about PhysioNutrition, its educational purpose, and how its clinical calculators and nutrition tools are built.',
      eyebrow: isAr ? 'About the platform' : 'About the platform',
      heading: isAr ? 'معلومات عن PhysioNutrition' : 'About PhysioNutrition',
      intro: isAr
        ? 'PhysioNutrition منصة تعليمية تجمع بين العلاج الطبيعي والتغذية العلاجية والحاسبات العملية.'
        : 'PhysioNutrition is an educational platform combining rehab, clinical nutrition, and practical health calculators.',
      sections: [
        section(
          isAr ? 'ماذا يقدم الموقع؟' : 'What the site offers',
          isAr
            ? '<p>يوفر الموقع حاسبات صحية، مكتبة إصابات، مقالات تعليمية، وأدلة تساعد الزائر على فهم التعافي والتغذية وتتبع التقدم.</p>'
            : '<p>The site offers health calculators, an injury library, educational articles, and practical guidance for recovery and nutrition.</p>',
        ),
      ],
    },
    contact: {
      title: isAr ? 'اتصل بنا' : 'Contact',
      description: isAr
        ? 'طرق التواصل مع PhysioNutrition للاستفسارات العامة والتعاون والملاحظات.'
        : 'Ways to contact PhysioNutrition for general questions, collaboration, or feedback.',
      eyebrow: isAr ? 'التواصل' : 'Contact',
      heading: isAr ? 'تواصل مع PhysioNutrition' : 'Contact PhysioNutrition',
      intro: isAr
        ? 'للاستفسارات العامة أو الملاحظات أو التعاون، يمكنك التواصل عبر البريد الإلكتروني.'
        : 'For general questions, feedback, or collaboration requests, you can reach out by email.',
      sections: [
        section(
          isAr ? 'البريد الإلكتروني' : 'Email',
          '<p><a href="mailto:physionutritionofficial@gmail.com">physionutritionofficial@gmail.com</a></p>',
        ),
      ],
    },
    privacy: {
      title: isAr ? 'سياسة الخصوصية' : 'Privacy Policy',
      description: isAr
        ? 'سياسة خصوصية PhysioNutrition الخاصة بالحاسبات والمحتوى التعليمي والكوكيز والموافقة الإعلانية.'
        : 'PhysioNutrition privacy policy for calculators, educational content, cookies, and advertising consent.',
      eyebrow: isAr ? 'الخصوصية' : 'Privacy',
      heading: isAr ? 'سياسة الخصوصية' : 'Privacy Policy',
      intro: isAr
        ? 'توضح هذه الصفحة كيف يتم التعامل مع البيانات المحدودة والتفضيلات وخيارات الموافقة.'
        : 'This page explains how limited site data, preferences, and consent choices are handled on the platform.',
      sections: [
        section(
          isAr ? 'أبرز النقاط' : 'Key points',
          isAr
            ? '<ul><li>معظم مدخلات الحاسبات تتم معالجتها محليًا.</li><li>يتم حفظ تفضيلات مثل اللغة والمظهر والموافقة.</li><li>التقنيات الاختيارية لا تفعل إلا بعد القبول.</li></ul>'
            : '<ul><li>Most calculator inputs are processed locally.</li><li>Preferences such as language, theme, and consent are stored in the browser.</li><li>Optional technologies are enabled only after consent.</li></ul>',
        ),
      ],
    },
    terms: {
      title: isAr ? 'الشروط والأحكام' : 'Terms of Service',
      description: isAr
        ? 'شروط استخدام PhysioNutrition لحاسبات العلاج الطبيعي وأدوات التغذية العلاجية.'
        : 'PhysioNutrition terms for using physical therapy calculators and clinical nutrition tools.',
      eyebrow: isAr ? 'الشروط' : 'Terms',
      heading: isAr ? 'الشروط والأحكام' : 'Terms of Service',
      intro: isAr
        ? 'باستخدامك للمنصة، فأنت تستخدم أدوات تعليمية وليست بديلاً عن الرعاية الطبية.'
        : 'By using the platform, you agree that the tools are educational and do not replace professional care.',
      sections: [
        section(
          isAr ? 'أهم الشروط' : 'Main terms',
          isAr
            ? '<ul><li>النتائج استرشادية وتقديرية.</li><li>المنصة لا تقدم تشخيصًا أو علاجًا.</li><li>يُمنع إساءة استخدام الخدمة.</li></ul>'
            : '<ul><li>Outputs are estimates for educational use.</li><li>The platform does not provide diagnosis or treatment.</li><li>Misuse or disruption of the service is not allowed.</li></ul>',
        ),
      ],
    },
    cookies: {
      title: isAr ? 'سياسة الكوكيز' : 'Cookie Policy',
      description: isAr
        ? 'سياسة الكوكيز في PhysioNutrition الخاصة بالتفضيلات والموافقة والتحليلات والإعلانات.'
        : 'PhysioNutrition cookie policy covering essential preferences, consent choices, analytics, and advertising cookies.',
      eyebrow: isAr ? 'الكوكيز' : 'Cookies',
      heading: isAr ? 'سياسة الكوكيز' : 'Cookie Policy',
      intro: isAr
        ? 'توضح هذه الصفحة كيف يستخدم الموقع الكوكيز والتخزين المحلي.'
        : 'This page describes how the site uses cookies and local storage for preferences, consent, and optional technologies.',
      sections: [
        section(
          isAr ? 'أهم الاستخدامات' : 'Main uses',
          isAr
            ? '<ul><li>حفظ تفضيلات اللغة والمظهر.</li><li>تذكر اختيارات الموافقة.</li><li>التقنيات الاختيارية تعمل فقط بعد القبول.</li></ul>'
            : '<ul><li>Remember language and theme preferences.</li><li>Store consent choices.</li><li>Enable optional analytics or ads only after consent.</li></ul>',
        ),
      ],
    },
    disclaimer: {
      title: isAr ? 'إخلاء المسؤولية الطبي' : 'Medical Disclaimer',
      description: isAr
        ? 'إخلاء المسؤولية الطبي لمنصة PhysioNutrition وحاسبات العلاج الطبيعي والتغذية العلاجية.'
        : 'Medical disclaimer for PhysioNutrition physical therapy calculators and clinical nutrition tools.',
      eyebrow: isAr ? 'إخلاء المسؤولية' : 'Disclaimer',
      heading: isAr ? 'إخلاء المسؤولية الطبي' : 'Medical Disclaimer',
      intro: isAr
        ? 'المحتوى والحاسبات لأغراض تعليمية فقط ولا تُعد بديلاً عن التقييم الطبي.'
        : 'All content and calculator outputs are educational only and do not replace medical assessment.',
      sections: [
        section(
          isAr ? 'تنبيه مهم' : 'Important notice',
          isAr
            ? '<ul><li>النتائج تقديرية وليست تشخيصًا.</li><li>يجب استشارة مختص في الحالات الطبية أو الإصابات.</li></ul>'
            : '<ul><li>Results are estimates and not a diagnosis.</li><li>Consult a licensed professional for injuries, symptoms, or special medical circumstances.</li></ul>',
        ),
      ],
    },
  }[page];

  return {
    path: `/${lang}/${page}`,
    lang,
    title: config.title,
    description: config.description,
    body: layout(lang, config.eyebrow, config.heading, config.intro, config.sections),
  };
}
const staticRoutes: RouteDefinition[] = [
  ...(['en', 'ar'] as Lang[]).flatMap((lang) => [
    homeRoute(lang),
    calculatorsRoute(lang),
    ...CALCULATOR_PAGE_CONFIGS.map((calculator) => calculatorDetailRoute(lang, calculator)),
    insightsRoute(lang),
    injuriesRoute(lang),
    dietsRoute(lang),
    ...(['about', 'contact', 'privacy', 'terms', 'cookies', 'disclaimer'] as const).map((page) => infoPageRoute(lang, page)),
    exercisesRoute(lang),
    ...EXERCISE_FINDER_STATIC_SLUGS.map((slug) => exercisesRoute(lang, slug)),
    exerciseSystemsRoute(lang),
    ...TRAINING_SYSTEMS.map((system) => exerciseSystemDetailRoute(lang, system)),
  ]),
  ...(['en', 'ar'] as Lang[]).flatMap((lang) => getArticles(lang).map((article) => articleRoute(lang, article))),
  ...(['en', 'ar'] as Lang[]).flatMap((lang) => getAllInjuries().map((injury) => injuryRoute(lang, injury))),
];

staticRoutes.forEach(writeRoute);
writeRootShell();
console.log(`Generated prerendered HTML for ${staticRoutes.length} routes.`);







