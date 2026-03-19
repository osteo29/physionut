import {memo, type ComponentType} from 'react';
import {Link} from 'react-router-dom';
import {Calendar, ChevronRight, Tag} from 'lucide-react';
import type {Language} from '../../services/translations';
import type {Article} from '../../services/articles';

type IconComponentType = ComponentType<{name: string; className?: string}>;

const BlogSection = memo(
  ({
    t,
    lang,
    articles,
    IconComponent,
  }: {
    t: any;
    lang: Language;
    articles: Article[];
    IconComponent: IconComponentType;
  }) => {
    return (
      <section id="blog" className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900">{t.blog.sectionTitle}</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <article
                key={article.slug}
                className="group flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all hover:shadow-xl"
              >
                <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-soft-blue">
                  <div className="rounded-2xl bg-white p-6 shadow-sm transition-transform duration-500 group-hover:scale-110">
                    <IconComponent name={article.icon} className="h-12 w-12 text-health-green" />
                  </div>
                  <div className="absolute left-4 top-4 rtl:left-auto rtl:right-4">
                    <span className="flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-health-green shadow-sm backdrop-blur-sm">
                      <Tag className="h-3 w-3" /> {article.category}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-8">
                  <div className="mb-3 flex items-center gap-2 text-xs text-slate-400">
                    <Calendar className="h-3 w-3" /> {article.date}
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-health-green">
                    {article.title}
                  </h3>
                  <p className="mb-6 flex-1 text-sm text-slate-600 line-clamp-3">{article.excerpt}</p>
                  <Link
                    to={`/insights/${article.slug}`}
                    className="inline-flex items-center gap-2 font-bold text-health-green hover:underline"
                  >
                    {t.blog.readMore}
                    <ChevronRight className={`h-4 w-4 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  },
);

BlogSection.displayName = 'BlogSection';

export default BlogSection;
