import {supabase} from '../lib/supabase';
import type {TableInsert, TableRow} from '../lib/supabaseDatabase';

export type SeoLanguage = 'en' | 'ar';

export type SeoPageKey =
  | 'home'
  | 'calculators'
  | 'calculator_detail'
  | 'privacy'
  | 'terms'
  | 'cookies'
  | 'disclaimer'
  | 'about'
  | 'contact'
  | 'insights'
  | 'article_detail'
  | 'injuries'
  | 'injury_detail'
  | 'diets'
  | 'diet_detail'
  | 'exercises'
  | 'exercise_region'
  | 'exercise_systems'
  | 'exercise_system_detail'
  | 'assistant'
  | 'auth'
  | 'dashboard'
  | 'not_found';

export type SeoOverrideRow = TableRow<'seo_pages'>;
type SeoOverrideInsert = TableInsert<'seo_pages'>;

export type SeoTemplateValues = Record<string, string | number | null | undefined>;

export type SeoPageDefinition = {
  key: SeoPageKey;
  pathPattern: string;
  labelEn: string;
  labelAr: string;
  variables: string[];
  defaults: {
    en: {title: string; description: string};
    ar: {title: string; description: string};
  };
};

const SEO_PAGE_DEFINITIONS: SeoPageDefinition[] = [
  {
    key: 'home',
    pathPattern: '/:lang/',
    labelEn: 'Home',
    labelAr: 'الرئيسية',
    variables: [],
    defaults: {
      en: {
        title: 'PhysioNutrition | Clinical Calculators for Therapy & Nutrition',
        description:
          'Evidence-based clinical calculators for physical therapists, nutritionists, and fitness enthusiasts. BMI, BMR, TDEE, and more.',
      },
      ar: {
        title: 'PhysioNutrition | حاسبات العلاج الطبيعي والتغذية العلاجية',
        description:
          'حاسبات ومحتوى عملي مبني على الأدلة لدعم العلاج الطبيعي والتغذية العلاجية والتعافي والمتابعة الصحية.',
      },
    },
  },
  {
    key: 'calculators',
    pathPattern: '/:lang/calculators',
    labelEn: 'Calculators Hub',
    labelAr: 'صفحة الحاسبات',
    variables: [],
    defaults: {
      en: {
        title: 'Clinical Calculators',
        description:
          'Open PhysioNutrition calculators for BMI, BMR, TDEE, protein, macros, hydration, and more in one place.',
      },
      ar: {
        title: 'الحاسبات الصحية',
        description:
          'افتح حاسبات PhysioNutrition للصحة والتغذية في مكان واحد، من مؤشر كتلة الجسم إلى البروتين والسعرات والماء.',
      },
    },
  },
  {
    key: 'calculator_detail',
    pathPattern: '/:lang/calculators/:calculator',
    labelEn: 'Calculator Detail',
    labelAr: 'صفحة حاسبة',
    variables: ['calculatorTitle', 'calculatorDescription'],
    defaults: {
      en: {
        title: '{calculatorTitle}',
        description: '{calculatorDescription}',
      },
      ar: {
        title: '{calculatorTitle}',
        description: '{calculatorDescription}',
      },
    },
  },
  {
    key: 'privacy',
    pathPattern: '/:lang/privacy',
    labelEn: 'Privacy Policy',
    labelAr: 'سياسة الخصوصية',
    variables: [],
    defaults: {
      en: {
        title: 'Privacy Policy',
        description: 'Learn how PhysioNutrition handles data, privacy requests, and consent choices.',
      },
      ar: {
        title: 'سياسة الخصوصية',
        description: 'تعرّف على طريقة تعامل PhysioNutrition مع البيانات والخصوصية وطلبات المستخدمين.',
      },
    },
  },
  {
    key: 'terms',
    pathPattern: '/:lang/terms',
    labelEn: 'Terms of Service',
    labelAr: 'شروط الاستخدام',
    variables: [],
    defaults: {
      en: {
        title: 'Terms of Service',
        description: 'Review the usage terms that apply across PhysioNutrition.',
      },
      ar: {
        title: 'شروط الاستخدام',
        description: 'راجع شروط استخدام منصة PhysioNutrition وما ينطبق على المحتوى والخدمات داخلها.',
      },
    },
  },
  {
    key: 'cookies',
    pathPattern: '/:lang/cookies',
    labelEn: 'Cookie Policy',
    labelAr: 'سياسة الكوكيز',
    variables: [],
    defaults: {
      en: {
        title: 'Cookie Policy',
        description: 'Understand how cookies and browser storage are used across PhysioNutrition.',
      },
      ar: {
        title: 'سياسة الكوكيز',
        description: 'اعرف كيف يستخدم PhysioNutrition ملفات الكوكيز وخيارات الحفظ والموافقة داخل المتصفح.',
      },
    },
  },
  {
    key: 'disclaimer',
    pathPattern: '/:lang/disclaimer',
    labelEn: 'Medical Disclaimer',
    labelAr: 'الإخلاء الطبي',
    variables: [],
    defaults: {
      en: {
        title: 'Medical Disclaimer',
        description: 'Read the medical disclaimer that frames the educational content on PhysioNutrition.',
      },
      ar: {
        title: 'إخلاء طبي',
        description: 'راجع الإخلاء الطبي الذي يوضح حدود المحتوى التعليمي داخل PhysioNutrition.',
      },
    },
  },
  {
    key: 'about',
    pathPattern: '/:lang/about',
    labelEn: 'About',
    labelAr: 'من نحن',
    variables: [],
    defaults: {
      en: {
        title: 'About PhysioNutrition',
        description: 'See the mission, publishing approach, and direction behind PhysioNutrition.',
      },
      ar: {
        title: 'عن PhysioNutrition',
        description: 'تعرّف على رؤية PhysioNutrition ورسالة المنصة وطريقة إعداد المحتوى.',
      },
    },
  },
  {
    key: 'contact',
    pathPattern: '/:lang/contact',
    labelEn: 'Contact',
    labelAr: 'اتصل بنا',
    variables: [],
    defaults: {
      en: {
        title: 'Contact PhysioNutrition',
        description: 'Reach out to PhysioNutrition for feedback, questions, or partnership requests.',
      },
      ar: {
        title: 'تواصل مع PhysioNutrition',
        description: 'أرسل ملاحظاتك أو استفساراتك أو طلبات التعاون إلى فريق PhysioNutrition.',
      },
    },
  },
  {
    key: 'insights',
    pathPattern: '/:lang/insights',
    labelEn: 'Insights',
    labelAr: 'المقالات',
    variables: [],
    defaults: {
      en: {
        title: 'Insights',
        description:
          'Browse all PhysioNutrition articles about nutrition, recovery, rehabilitation, and fat loss.',
      },
      ar: {
        title: 'المقالات',
        description: 'تصفح كل مقالات PhysioNutrition عن التغذية والتعافي والتأهيل وخسارة الدهون.',
      },
    },
  },
  {
    key: 'article_detail',
    pathPattern: '/:lang/insights/:slug',
    labelEn: 'Article Detail',
    labelAr: 'صفحة مقال',
    variables: ['articleTitle', 'articleExcerpt'],
    defaults: {
      en: {
        title: '{articleTitle}',
        description: '{articleExcerpt}',
      },
      ar: {
        title: '{articleTitle}',
        description: '{articleExcerpt}',
      },
    },
  },
  {
    key: 'injuries',
    pathPattern: '/:lang/injuries',
    labelEn: 'Injury Library',
    labelAr: 'مكتبة الإصابات',
    variables: [],
    defaults: {
      en: {
        title: 'Injury Protocol Library',
        description:
          'A practical rehab and recovery nutrition directory with dedicated pages for each injury protocol.',
      },
      ar: {
        title: 'مكتبة بروتوكولات الإصابات',
        description: 'دليل عملي للتأهيل والتغذية العلاجية مع صفحات مخصصة لكل إصابة وبروتوكول تعافٍ.',
      },
    },
  },
  {
    key: 'injury_detail',
    pathPattern: '/:lang/injuries/:slug',
    labelEn: 'Injury Detail',
    labelAr: 'صفحة إصابة',
    variables: ['injuryName'],
    defaults: {
      en: {
        title: '{injuryName} Recovery Protocol',
        description:
          'A practical rehab nutrition guide for {injuryName} with common symptoms, rehab phases, exercises, and a weight-based daily plan.',
      },
      ar: {
        title: 'بروتوكول {injuryName}',
        description:
          'دليل عملي للتغذية العلاجية والتأهيل في {injuryName} مع الأعراض الشائعة والمراحل والتمارين وخطة يومية حسب الوزن.',
      },
    },
  },
  {
    key: 'diets',
    pathPattern: '/:lang/diets',
    labelEn: 'Diet Library',
    labelAr: 'مكتبة الأنظمة الغذائية',
    variables: [],
    defaults: {
      en: {
        title: 'Diet & Regimen Types',
        description:
          'Detailed explanations of common diet & regimen types, how to choose for your goals, and safety notes.',
      },
      ar: {
        title: 'أنواع الريجيم والدايت',
        description:
          'شرح تفصيلي لأنواع الدايت والريجيم الأكثر استخدامًا، وكيف تختار الأسلوب المناسب لهدفك مع ملاحظات الأمان.',
      },
    },
  },
  {
    key: 'diet_detail',
    pathPattern: '/:lang/diets/:slug',
    labelEn: 'Diet Detail',
    labelAr: 'صفحة نظام غذائي',
    variables: ['dietName', 'dietSummary'],
    defaults: {
      en: {
        title: '{dietName}',
        description: '{dietSummary}',
      },
      ar: {
        title: '{dietName}',
        description: '{dietSummary}',
      },
    },
  },
  {
    key: 'exercises',
    pathPattern: '/:lang/exercises',
    labelEn: 'Exercises Hub',
    labelAr: 'دليل التمارين',
    variables: [],
    defaults: {
      en: {
        title: 'Exercise Finder',
        description:
          'Browse the exercise library, muscle-region pages, rehab pages, and training-system guides in one hub.',
      },
      ar: {
        title: 'دليل التمارين',
        description:
          'بوابة موحدة لمكتبة التمارين وصفحات المناطق العضلية وصفحات التأهيل وأنظمة التدريب داخل PhysioNutrition.',
      },
    },
  },
  {
    key: 'exercise_region',
    pathPattern: '/:lang/exercises/:muscle',
    labelEn: 'Exercise Region',
    labelAr: 'صفحة منطقة عضلية',
    variables: ['regionName', 'regionIntro'],
    defaults: {
      en: {
        title: '{regionName} Exercises | Anatomy, exercise library, and workout systems',
        description:
          '{regionIntro} Explore full {regionName} exercises, simple anatomy notes, linked workout systems, and weekly plan guidance.',
      },
      ar: {
        title: 'تمارين {regionName} | تشريح مبسط وخطة تمارين كاملة',
        description:
          '{regionIntro} ستجد أيضًا صفحات الأنظمة المناسبة وروابط الخطة الأسبوعية وتمارين {regionName} الكاملة.',
      },
    },
  },
  {
    key: 'exercise_systems',
    pathPattern: '/:lang/exercises/systems',
    labelEn: 'Training Systems',
    labelAr: 'أنظمة التمرين',
    variables: [],
    defaults: {
      en: {
        title: 'Training systems | Compare workout splits and weekly plans',
        description:
          'Compare training systems, then open each system page for the full explanation, weekly structure, and linked exercise pages.',
      },
      ar: {
        title: 'أنظمة التمرين | مقارنة التقسيمات والخطط الأسبوعية',
        description:
          'قارن بين أنظمة التمرين المختلفة، وافتح صفحة كل نظام لمعرفة الشرح الكامل والخطة الأسبوعية والتمارين المرتبطة.',
      },
    },
  },
  {
    key: 'exercise_system_detail',
    pathPattern: '/:lang/exercises/systems/:systemId',
    labelEn: 'Training System Detail',
    labelAr: 'صفحة نظام تمرين',
    variables: ['systemName', 'systemSummary'],
    defaults: {
      en: {
        title: '{systemName} | Training system guide and weekly plan',
        description: '{systemSummary}',
      },
      ar: {
        title: '{systemName} | شرح النظام والخطة الأسبوعية',
        description: '{systemSummary}',
      },
    },
  },
  {
    key: 'assistant',
    pathPattern: '/:lang/assistant',
    labelEn: 'Assistant',
    labelAr: 'المساعد الذكي',
    variables: [],
    defaults: {
      en: {
        title: 'PhysioNutrition AI Assistant',
        description:
          'Ask a Senior Physical Therapist and Clinical Nutritionist about recovery, rehab, nutrition, and calculator results.',
      },
      ar: {
        title: 'مساعد PhysioNutrition الذكي',
        description:
          'اسأل مساعدًا متخصصًا في العلاج الطبيعي والتغذية العلاجية عن التعافي والتدريب ونتائج الحاسبات.',
      },
    },
  },
  {
    key: 'auth',
    pathPattern: '/:lang/auth',
    labelEn: 'Account',
    labelAr: 'الحساب',
    variables: [],
    defaults: {
      en: {
        title: 'Account Access',
        description: 'Sign in to save results, access your dashboard, and continue your progress.',
      },
      ar: {
        title: 'الدخول إلى الحساب',
        description: 'سجّل الدخول لحفظ النتائج وفتح لوحة المتابعة ومواصلة تقدمك داخل PhysioNutrition.',
      },
    },
  },
  {
    key: 'dashboard',
    pathPattern: '/:lang/dashboard',
    labelEn: 'Tracking Dashboard',
    labelAr: 'لوحة المتابعة',
    variables: [],
    defaults: {
      en: {
        title: 'Tracking Dashboard',
        description: 'Review saved assessments and result history inside your PhysioNutrition account.',
      },
      ar: {
        title: 'لوحة المتابعة',
        description: 'راجع سجل القياسات والنتائج المحفوظة داخل حسابك في PhysioNutrition.',
      },
    },
  },
  {
    key: 'not_found',
    pathPattern: '/:lang/404',
    labelEn: '404 Page',
    labelAr: 'صفحة 404',
    variables: [],
    defaults: {
      en: {
        title: 'Page Not Found',
        description: 'The page you requested could not be found on PhysioNutrition.',
      },
      ar: {
        title: 'الصفحة غير موجودة',
        description: 'تعذر العثور على الصفحة المطلوبة داخل PhysioNutrition.',
      },
    },
  },
];

const SEO_PAGE_DEFINITION_MAP = Object.fromEntries(
  SEO_PAGE_DEFINITIONS.map((definition) => [definition.key, definition]),
) as Record<SeoPageKey, SeoPageDefinition>;

let seoOverridesCache: Partial<Record<SeoPageKey, SeoOverrideRow>> | null = null;
let seoOverridesPromise: Promise<Partial<Record<SeoPageKey, SeoOverrideRow>>> | null = null;

function sanitizeTokenValue(value: string | number | null | undefined) {
  if (value === null || value === undefined) {
    return '';
  }

  return String(value).trim();
}

export function renderSeoTemplate(template: string, values: SeoTemplateValues = {}) {
  return template.replace(/\{([a-zA-Z0-9_]+)\}/g, (_, token: string) => sanitizeTokenValue(values[token]));
}

export function getSeoPageDefinition(pageKey: SeoPageKey) {
  return SEO_PAGE_DEFINITION_MAP[pageKey];
}

export function listSeoPageDefinitions() {
  return SEO_PAGE_DEFINITIONS;
}

export function getCachedSeoOverrides() {
  return seoOverridesCache;
}

export async function loadSeoOverrides(force = false) {
  if (seoOverridesCache && !force) {
    return seoOverridesCache;
  }

  if (seoOverridesPromise && !force) {
    return seoOverridesPromise;
  }

  seoOverridesPromise = (async () => {
    if (!supabase) {
      seoOverridesCache = {};
      return seoOverridesCache;
    }

    const {data, error} = await supabase.from('seo_pages').select('*').order('page_key');
    if (error) {
      throw error;
    }

    seoOverridesCache = (data || []).reduce<Partial<Record<SeoPageKey, SeoOverrideRow>>>((acc, row) => {
      acc[row.page_key as SeoPageKey] = row;
      return acc;
    }, {});

    return seoOverridesCache;
  })();

  try {
    return await seoOverridesPromise;
  } finally {
    seoOverridesPromise = null;
  }
}

export function resetSeoOverridesCache() {
  seoOverridesCache = null;
  seoOverridesPromise = null;
}

export async function saveSeoPageOverride(input: {
  pageKey: SeoPageKey;
  titleEn: string;
  descriptionEn: string;
  titleAr: string;
  descriptionAr: string;
}) {
  if (!supabase) {
    throw new Error('Supabase is not configured yet.');
  }

  const payload: SeoOverrideInsert = {
    page_key: input.pageKey,
    title_en: input.titleEn.trim(),
    description_en: input.descriptionEn.trim(),
    title_ar: input.titleAr.trim(),
    description_ar: input.descriptionAr.trim(),
  };

  const {data, error} = await supabase
    .from('seo_pages')
    .upsert(payload as any, {onConflict: 'page_key'})
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  resetSeoOverridesCache();
  seoOverridesCache = {
    ...(seoOverridesCache || {}),
    [input.pageKey]: data,
  };

  return data;
}

export function resolveSeoCopy({
  pageKey,
  lang,
  templateValues,
  overrides,
}: {
  pageKey: SeoPageKey;
  lang: SeoLanguage;
  templateValues?: SeoTemplateValues;
  overrides?: Partial<Record<SeoPageKey, SeoOverrideRow>> | null;
}) {
  const definition = getSeoPageDefinition(pageKey);
  const override = overrides?.[pageKey];
  const titleTemplate =
    lang === 'ar' ? override?.title_ar || definition.defaults.ar.title : override?.title_en || definition.defaults.en.title;
  const descriptionTemplate =
    lang === 'ar'
      ? override?.description_ar || definition.defaults.ar.description
      : override?.description_en || definition.defaults.en.description;

  return {
    title: renderSeoTemplate(titleTemplate, templateValues),
    description: renderSeoTemplate(descriptionTemplate, templateValues),
    definition,
  };
}

export function getSeoPageKeyForCanonicalPath(canonicalPath: string): SeoPageKey | null {
  const normalizedPath = canonicalPath.replace(/^\/(en|ar)(?=\/|$)/, '') || '/';

  if (normalizedPath === '/') return 'home';
  if (normalizedPath === '/calculators') return 'calculators';
  if (/^\/calculators\/[^/]+$/.test(normalizedPath)) return 'calculator_detail';
  if (normalizedPath === '/privacy') return 'privacy';
  if (normalizedPath === '/terms') return 'terms';
  if (normalizedPath === '/cookies') return 'cookies';
  if (normalizedPath === '/disclaimer') return 'disclaimer';
  if (normalizedPath === '/about') return 'about';
  if (normalizedPath === '/contact') return 'contact';
  if (normalizedPath === '/insights') return 'insights';
  if (/^\/insights\/[^/]+$/.test(normalizedPath)) return 'article_detail';
  if (normalizedPath === '/injuries') return 'injuries';
  if (/^\/injuries\/[^/]+$/.test(normalizedPath)) return 'injury_detail';
  if (normalizedPath === '/diets') return 'diets';
  if (/^\/diets\/[^/]+$/.test(normalizedPath)) return 'diet_detail';
  if (normalizedPath === '/exercises') return 'exercises';
  if (normalizedPath === '/exercises/systems') return 'exercise_systems';
  if (/^\/exercises\/systems\/[^/]+$/.test(normalizedPath)) return 'exercise_system_detail';
  if (/^\/exercises\/[^/]+$/.test(normalizedPath)) return 'exercise_region';
  if (normalizedPath === '/assistant') return 'assistant';
  if (normalizedPath === '/auth') return 'auth';
  if (normalizedPath === '/dashboard') return 'dashboard';
  if (normalizedPath === '/404') return 'not_found';

  return null;
}

function stripSiteSuffix(title: string) {
  return title.replace(/\s*\|\s*PhysioNutrition$/i, '').trim();
}

function extractPrefixValue(title: string, prefix: string) {
  return title.startsWith(prefix) ? title.slice(prefix.length).trim() : title.trim();
}

function extractBeforePipe(title: string) {
  return stripSiteSuffix(title).split('|')[0]?.trim() || stripSiteSuffix(title);
}

export function inferTemplateValuesFromSeoInput({
  pageKey,
  title,
  description,
  lang,
}: {
  pageKey: SeoPageKey;
  title: string;
  description: string;
  lang: SeoLanguage;
}): SeoTemplateValues | undefined {
  switch (pageKey) {
    case 'calculator_detail':
      return {
        calculatorTitle: stripSiteSuffix(title),
        calculatorDescription: description,
      };
    case 'article_detail':
      return {
        articleTitle: title,
        articleExcerpt: description,
      };
    case 'injury_detail':
      return {
        injuryName:
          lang === 'ar'
            ? extractPrefixValue(stripSiteSuffix(title), 'بروتوكول')
            : stripSiteSuffix(title).replace(/\s+Recovery Protocol$/i, '').trim(),
      };
    case 'diet_detail':
      return {
        dietName: title,
        dietSummary: description,
      };
    case 'exercise_region':
      return {
        regionName:
          lang === 'ar'
            ? extractPrefixValue(extractBeforePipe(title), 'دليل تمارين')
            : extractBeforePipe(title).replace(/\s+Exercise Guide$/i, '').replace(/\s+Exercises$/i, '').trim(),
        regionIntro: description,
      };
    case 'exercise_system_detail':
      return {
        systemName: extractBeforePipe(title),
        systemSummary: description,
      };
    default:
      return undefined;
  }
}
