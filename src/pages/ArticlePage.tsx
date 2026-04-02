import {Fragment, type ReactNode} from 'react';
import {Link, useParams} from 'react-router-dom';
import PageLayout from './PageLayout';
import usePreferredLang from './usePreferredLang';
import Seo from '../components/seo/Seo';
import {usePublishedArticles} from '../services/articleStudio';
import type {Article} from '../services/articles';
import type {Language} from '../services/translations';

type ArticleBlock =
  | {type: 'paragraph'; text: string}
  | {type: 'list'; items: string[]}
  | {type: 'heading'; level: 2; text: string; anchor: string};

type ArticleFaqItem = {
  question: string;
  answer: string;
};

function slugifyHeading(text: string, fallbackIndex: number) {
  const normalized = text
    .toLowerCase()
    .trim()
    .replace(/[؟?]/g, '')
    .replace(/[^a-z0-9\u0600-\u06ff]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return normalized || `section-${fallbackIndex + 1}`;
}

function localizeInternalHref(href: string, lang: Language) {
  if (!href.startsWith('/')) return href;
  if (/^\/(en|ar)(\/|$)/.test(href)) return href;
  return `/${lang}${href}`;
}

function renderInline(text: string, lang: Language): ReactNode[] {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g).filter(Boolean);

  return parts.map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) return <Fragment key={`${part}-${index}`}>{part}</Fragment>;

    const [, label, href] = match;
    const isInternal = href.startsWith('/');
    const resolvedHref = isInternal ? localizeInternalHref(href, lang) : href;

    return isInternal ? (
      <Link key={`${resolvedHref}-${index}`} to={resolvedHref} className="font-semibold text-health-green hover:underline">
        {label}
      </Link>
    ) : (
      <a
        key={`${resolvedHref}-${index}`}
        href={resolvedHref}
        target="_blank"
        rel="noreferrer"
        className="font-semibold text-health-green hover:underline"
      >
        {label}
      </a>
    );
  });
}

function parseArticleContent(content: string) {
  const lines = content.split('\n');
  const blocks: ArticleBlock[] = [];
  const headings: Array<{text: string; anchor: string}> = [];
  let paragraphBuffer: string[] = [];
  let listBuffer: string[] = [];
  let headingIndex = 0;

  const flushParagraph = () => {
    if (!paragraphBuffer.length) return;
    const text = paragraphBuffer.join(' ').trim();
    if (text) blocks.push({type: 'paragraph', text});
    paragraphBuffer = [];
  };

  const flushList = () => {
    if (!listBuffer.length) return;
    blocks.push({type: 'list', items: listBuffer});
    listBuffer = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    if (line.startsWith('## ')) {
      flushParagraph();
      flushList();
      const text = line.slice(3).trim();
      const anchor = slugifyHeading(text, headingIndex);
      headingIndex += 1;
      headings.push({text, anchor});
      blocks.push({type: 'heading', level: 2, text, anchor});
      continue;
    }

    if (line.startsWith('* ')) {
      flushParagraph();
      listBuffer.push(line.slice(2));
      continue;
    }

    flushList();
    paragraphBuffer.push(line);
  }

  flushParagraph();
  flushList();

  const faqItems: ArticleFaqItem[] = [];

  blocks.forEach((block, index) => {
    if (block.type !== 'heading') return;
    if (!/[؟?]$/.test(block.text)) return;

    const answerParts: string[] = [];

    for (let i = index + 1; i < blocks.length; i += 1) {
      const nextBlock = blocks[i];
      if (nextBlock.type === 'heading') break;
      if (nextBlock.type === 'paragraph') answerParts.push(nextBlock.text);
      if (nextBlock.type === 'list') answerParts.push(nextBlock.items.join(' '));
    }

    const answer = answerParts.join(' ').trim();
    if (answer) {
      faqItems.push({question: block.text, answer});
    }
  });

  return {blocks, headings, faqItems};
}

function renderBlocks(blocks: ArticleBlock[], lang: Language): ReactNode[] {
  return blocks.map((block, index) => {
    if (block.type === 'paragraph') {
      return <p key={`p-${index}`}>{renderInline(block.text, lang)}</p>;
    }

    if (block.type === 'list') {
      return (
        <ul key={`ul-${index}`} className="list-disc space-y-2 pl-6">
          {block.items.map((item, itemIndex) => (
            <li key={`li-${index}-${itemIndex}`}>{renderInline(item, lang)}</li>
          ))}
        </ul>
      );
    }

    return (
      <h2 id={block.anchor} key={`h2-${index}`} className="scroll-mt-24 pt-2 text-2xl font-bold text-slate-900">
        <a href={`#${block.anchor}`} className="transition hover:text-health-green-dark">
          {block.text}
        </a>
      </h2>
    );
  });
}

function getRelatedArticles(
  articles: Article[],
  currentArticle: Pick<Article, 'slug' | 'category'>,
) {
  const others = articles.filter((entry) => entry.slug !== currentArticle.slug);

  const sameCategory = others.filter((entry) => entry.category === currentArticle.category);

  const recentOthers = others
    .filter((entry) => entry.category !== currentArticle.category)
    .sort((a, b) => b.date.localeCompare(a.date));

  const result = [...sameCategory, ...recentOthers].slice(0, 3);
  return result;
}

export default function ArticlePage() {
  const lang = usePreferredLang();
  const {slug = ''} = useParams();
  const {articles, loading} = usePublishedArticles(lang);
  const article = articles.find((entry) => entry.slug === slug);

  if (loading) {
    return (
      <>
        <Seo
          title={lang === 'en' ? 'Loading article' : 'جار تحميل المقال'}
          description={lang === 'en' ? 'Loading article content.' : 'جار تحميل محتوى المقال.'}
          canonicalPath={`/insights/${slug}`}
          noIndex
        />
        <PageLayout title={lang === 'en' ? 'Loading article' : 'جار تحميل المقال'}>
          <p>{lang === 'en' ? 'Please wait a moment.' : 'انتظر لحظة من فضلك.'}</p>
        </PageLayout>
      </>
    );
  }

  if (!article) {
    return (
      <>
        <Seo
          title={lang === 'en' ? 'Article Not Found' : 'المقال غير موجود'}
          description={
            lang === 'en'
              ? 'The requested PhysioNutrition article could not be found.'
              : 'تعذر العثور على المقال المطلوب.'
          }
          canonicalPath={`/insights/${slug}`}
          noIndex
        />
        <PageLayout title={lang === 'en' ? 'Article not found' : 'المقال غير موجود'}>
          <p>{lang === 'en' ? 'This article is not available.' : 'هذا المقال غير متاح.'}</p>
          <p>
            <Link to={`/${lang}/insights`} className="font-semibold text-health-green hover:underline">
              {lang === 'en' ? 'Back to insights' : 'العودة إلى المقالات'}
            </Link>
          </p>
        </PageLayout>
      </>
    );
  }

  const {blocks, headings, faqItems} = parseArticleContent(article.content);
  const relatedArticles = getRelatedArticles(articles, article);
  const canonicalPath = `/${lang}/insights/${article.slug}`;
  const canonicalUrl = `https://physionutrition.vercel.app${canonicalPath}`;
  const hreflangs = [
    {lang: 'en', href: `https://physionutrition.vercel.app/en/insights/${article.slug}`},
    {lang: 'ar', href: `https://physionutrition.vercel.app/ar/insights/${article.slug}`},
  ];

  const structuredData: Array<{id: string; json: unknown}> = [
    {
      id: `article-${article.slug}`,
      json: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.excerpt,
        articleSection: article.category,
        datePublished: article.date,
        dateModified: article.date,
        inLanguage: lang,
        mainEntityOfPage: canonicalUrl,
        url: canonicalUrl,
        author: {
          '@type': 'Organization',
          name: 'PhysioNutrition',
        },
        publisher: {
          '@type': 'Organization',
          name: 'PhysioNutrition',
        },
        hasPart: headings.map((heading) => ({
          '@type': 'WebPageElement',
          '@id': `${canonicalUrl}#${heading.anchor}`,
          name: heading.text,
        })),
      },
    },
  ];

  if (faqItems.length) {
    structuredData.push({
      id: `article-faq-${article.slug}`,
      json: {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    });
  }

  return (
    <>
      <Seo
        title={article.title}
        description={article.excerpt}
        canonicalPath={canonicalPath}
        structuredData={structuredData}
        hreflangs={hreflangs}
      />
      <PageLayout title={article.title}>
        <article className="not-prose">
          <header className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <div className="mb-4 flex flex-wrap gap-3 text-sm text-slate-500">
              <span>{article.category}</span>
              <span>•</span>
              <span>{article.date}</span>
            </div>

            <h1 className="text-3xl font-black leading-tight text-slate-900 sm:text-4xl">{article.title}</h1>
            <p className="mt-4 text-lg leading-8 text-slate-700">{article.excerpt}</p>
          </header>

          {headings.length >= 3 ? (
            <nav
              aria-label={lang === 'en' ? 'Article sections' : 'أقسام المقال'}
              className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-slate-400">
                {lang === 'en' ? 'Jump To Section' : 'انتقل إلى القسم'}
              </div>
              <div className="flex flex-wrap gap-2">
                {headings.map((heading) => (
                  <a
                    key={heading.anchor}
                    href={`#${heading.anchor}`}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-semibold text-slate-600 transition hover:border-health-green/40 hover:bg-health-green/5 hover:text-health-green-dark"
                  >
                    {heading.text}
                  </a>
                ))}
              </div>
            </nav>
          ) : null}

          <div className="mt-8 space-y-5 leading-8 text-slate-700">{renderBlocks(blocks, lang)}</div>

          {relatedArticles.length > 0 ? (
            <section className="mt-10 rounded-[2rem] border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <div className="mb-5">
                <h2 className="text-2xl font-black text-slate-900">
                  {lang === 'en' ? 'Keep reading' : 'استمر في القراءة'}
                </h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {lang === 'en'
                    ? 'Continue with nearby topics to connect the article with practical tools and performance context.'
                    : 'كمّل القراءة في موضوعات قريبة حتى تربط الفكرة بالأدوات العملية والسياق التدريبي.'}
                </p>
              </div>

              <div className="grid gap-4">
                {relatedArticles.map((entry) => (
                  <Link
                    key={entry.slug}
                    to={`/${lang}/insights/${entry.slug}`}
                    className="rounded-3xl border border-slate-200 bg-white p-5 transition-all hover:border-health-green/30 hover:shadow-sm"
                  >
                    <div className="mb-2 text-sm text-slate-400">
                      {entry.category} • {entry.date}
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-slate-900">{entry.title}</h3>
                    <p className="text-slate-600">{entry.excerpt}</p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </article>
      </PageLayout>
    </>
  );
}
