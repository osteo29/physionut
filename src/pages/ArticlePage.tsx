import {Fragment, type ReactNode} from 'react';
import {Link, useParams} from 'react-router-dom';
import PageLayout from './PageLayout';
import usePreferredLang from './usePreferredLang';
import Seo from '../components/seo/Seo';
import {getArticleBySlug} from '../services/articles';

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

export default function ArticlePage() {
  const lang = usePreferredLang();
  const {slug = ''} = useParams();
  const article = getArticleBySlug(lang, slug);

  if (!article) {
    return (
      <>
        <Seo
          title={lang === 'en' ? 'Article Not Found' : 'المقال غير موجود'}
          description={
            lang === 'en'
              ? 'The requested PhysioHub article could not be found.'
              : 'تعذر العثور على المقال المطلوب.'
          }
          canonicalPath={`/insights/${slug}`}
          noIndex
        />
        <PageLayout title={lang === 'en' ? 'Article not found' : 'المقال غير موجود'}>
          <p>{lang === 'en' ? 'This article is not available.' : 'هذا المقال غير متاح.'}</p>
          <p>
            <Link to="/#blog" className="font-semibold text-health-green hover:underline">
              {lang === 'en' ? 'Back to insights' : 'العودة إلى المقالات'}
            </Link>
          </p>
        </PageLayout>
      </>
    );
  }

  const blocks = article.content.split('\n\n').filter(Boolean);

  return (
    <>
      <Seo
        title={article.title}
        description={article.excerpt}
        canonicalPath={`/insights/${article.slug}`}
      />
      <PageLayout title={article.title}>
        <div className="mb-6 flex flex-wrap gap-3 text-sm text-slate-500">
          <span>{article.category}</span>
          <span>•</span>
          <span>{article.date}</span>
        </div>

        <p className="text-lg leading-8 text-slate-700">{article.excerpt}</p>

        <div className="mt-8 space-y-5 text-slate-700 leading-8">
          {blocks.map((block) => {
            const lines = block.split('\n');
            const first = lines[0];
            const isHeading = first.startsWith('## ');
            const bulletLines = lines.filter((line) => line.startsWith('* '));

            if (isHeading) {
              return (
                <h2 key={block} className="pt-2 text-2xl font-bold text-slate-900">
                  {first.slice(3)}
                </h2>
              );
            }

            if (bulletLines.length === lines.length) {
              return (
                <ul key={block} className="list-disc space-y-2 pl-6">
                  {bulletLines.map((line) => (
                    <li key={line}>{renderInline(line.slice(2))}</li>
                  ))}
                </ul>
              );
            }

            return (
              <div key={block} className="space-y-3">
                {lines.map((line) => (
                  <p key={line}>{renderInline(line)}</p>
                ))}
              </div>
            );
          })}
        </div>
      </PageLayout>
    </>
  );
}
