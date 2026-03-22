import {Fragment, type ReactNode} from 'react';
import {Link, useParams} from 'react-router-dom';
import PageLayout from './PageLayout';
import usePreferredLang from './usePreferredLang';
import Seo from '../components/seo/Seo';
import {usePublishedArticles} from '../services/articleStudio';

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g).filter(Boolean);

  return parts.map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) return <Fragment key={`${part}-${index}`}>{part}</Fragment>;

    const [, label, href] = match;
    const isInternal = href.startsWith('/');

    return isInternal ? (
      <Link key={`${href}-${index}`} to={href} className="font-semibold text-health-green hover:underline">
        {label}
      </Link>
    ) : (
      <a
        key={`${href}-${index}`}
        href={href}
        target="_blank"
        rel="noreferrer"
        className="font-semibold text-health-green hover:underline"
      >
        {label}
      </a>
    );
  });
}

function renderContent(content: string): ReactNode[] {
  const lines = content.split('\n');
  const nodes: ReactNode[] = [];
  let paragraphBuffer: string[] = [];
  let listBuffer: string[] = [];

  const flushParagraph = () => {
    if (!paragraphBuffer.length) return;
    const text = paragraphBuffer.join(' ').trim();
    if (text) nodes.push(<p key={`p-${nodes.length}`}>{renderInline(text)}</p>);
    paragraphBuffer = [];
  };

  const flushList = () => {
    if (!listBuffer.length) return;
    nodes.push(
      <ul key={`ul-${nodes.length}`} className="list-disc space-y-2 pl-6">
        {listBuffer.map((item, index) => (
          <li key={`li-${nodes.length}-${index}`}>{renderInline(item)}</li>
        ))}
      </ul>,
    );
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
      nodes.push(
        <h2 key={`h2-${nodes.length}`} className="pt-2 text-2xl font-bold text-slate-900">
          {line.slice(3)}
        </h2>,
      );
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
  return nodes;
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

  return (
    <>
      <Seo title={article.title} description={article.excerpt} canonicalPath={`/insights/${article.slug}`} />
      <PageLayout title={article.title}>
        <div className="mb-6 flex flex-wrap gap-3 text-sm text-slate-500">
          <span>{article.category}</span>
          <span>•</span>
          <span>{article.date}</span>
        </div>

        <p className="text-lg leading-8 text-slate-700">{article.excerpt}</p>

        <div className="mt-8 space-y-5 leading-8 text-slate-700">{renderContent(article.content)}</div>
      </PageLayout>
    </>
  );
}
