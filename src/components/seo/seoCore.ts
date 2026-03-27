export type SeoConfig = {
  title: string;
  description: string;
  canonicalPath: string; // "/:lang/privacy" or "/privacy"
  ogImage?: string; // absolute URL
  noIndex?: boolean;
  structuredData?: Array<{id: string; json: unknown}>;
  hreflangs?: Array<{lang: string; href: string}>; // [{ lang: 'en', href: '/en/...' }, { lang: 'ar', href: '/ar/...' }]
};

const DEFAULT_SITE_NAME = 'PhysioNutrition';

function upsertMeta(nameOrProp: {name?: string; property?: string}, content: string) {
  const selector = nameOrProp.name
    ? `meta[name="${nameOrProp.name}"]`
    : `meta[property="${nameOrProp.property}"]`;
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    if (nameOrProp.name) el.setAttribute('name', nameOrProp.name);
    if (nameOrProp.property) el.setAttribute('property', nameOrProp.property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string, hreflangs?: Array<{lang: string; href: string}>) {
  if (rel === 'alternate' && hreflangs?.length) {
    // For hreflang links, remove all existing ones and add new ones
    document.head.querySelectorAll(`link[rel="alternate"][hreflang]`).forEach((el) => el.remove());
    hreflangs.forEach((item) => {
      const el = document.createElement('link');
      el.setAttribute('rel', 'alternate');
      el.setAttribute('hreflang', item.lang);
      el.setAttribute('href', item.href);
      document.head.appendChild(el);
    });
    // Also add x-default
    const xDefault = document.createElement('link');
    xDefault.setAttribute('rel', 'alternate');
    xDefault.setAttribute('hreflang', 'x-default');
    xDefault.setAttribute('href', href); // href param should be the default English URL
    document.head.appendChild(xDefault);
    return;
  }

  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertJsonLd(id: string, json: unknown) {
  let el = document.head.querySelector(
    `script[type="application/ld+json"][data-seo-id="${id}"]`,
  ) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.setAttribute('data-seo-id', id);
    document.head.appendChild(el);
  }
  el.text = JSON.stringify(json);
}

export function applySeo(config: SeoConfig) {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://physionutrition.vercel.app';

  const currentLangMatch =
    typeof window !== 'undefined' ? window.location.pathname.match(/^\/(en|ar)(?:\/|$)/) : null;
  const currentLang = currentLangMatch?.[1];
  const rawPath = config.canonicalPath.startsWith('/') ? config.canonicalPath : `/${config.canonicalPath}`;
  const normalizedPath =
    rawPath.startsWith('/en/') ||
    rawPath.startsWith('/ar/') ||
    rawPath === '/en' ||
    rawPath === '/ar'
      ? rawPath
      : currentLang
        ? rawPath === '/'
          ? `/${currentLang}/`
          : `/${currentLang}${rawPath}`
        : rawPath;
  
  const canonicalUrl = `${siteUrl.replace(/\/$/, '')}${normalizedPath}`;
  const ogImage = config.ogImage || `${siteUrl.replace(/\/$/, '')}/og-image.png`;

  document.title = config.title.includes(DEFAULT_SITE_NAME)
    ? config.title
    : `${config.title} | ${DEFAULT_SITE_NAME}`;

  upsertMeta({name: 'description'}, config.description);
  upsertMeta(
    {name: 'keywords'},
    'Physical Therapy Calculators, Clinical Nutrition Tools, BMI, BMR, TDEE, Macro Calculator, Injury Recovery, Medical SEO, PhysioNutrition',
  );

  upsertLink('canonical', canonicalUrl);

  upsertMeta({name: 'robots'}, config.noIndex ? 'noindex, nofollow' : 'index, follow');

  upsertMeta({property: 'og:type'}, 'website');
  upsertMeta({property: 'og:site_name'}, DEFAULT_SITE_NAME);
  upsertMeta({property: 'og:url'}, canonicalUrl);
  upsertMeta({property: 'og:title'}, config.title);
  upsertMeta({property: 'og:description'}, config.description);
  upsertMeta({property: 'og:image'}, ogImage);

  upsertMeta({name: 'twitter:card'}, 'summary_large_image');
  upsertMeta({name: 'twitter:title'}, config.title);
  upsertMeta({name: 'twitter:description'}, config.description);
  upsertMeta({name: 'twitter:image'}, ogImage);

  // Add hreflang tags
  if (config.hreflangs?.length) {
    upsertLink('alternate', canonicalUrl, config.hreflangs);
  }

  upsertJsonLd('webapp', {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: DEFAULT_SITE_NAME,
    url: siteUrl,
    description: config.description,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'All',
  });

  upsertJsonLd('organization', {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: DEFAULT_SITE_NAME,
    url: siteUrl,
    email: 'physionutritionofficial@gmail.com',
    sameAs: [
      'https://www.facebook.com/Physionutrition.official/',
      'https://www.instagram.com/physionutrition.official/',
    ],
  });

  config.structuredData?.forEach((item) => {
    upsertJsonLd(item.id, item.json);
  });
}
