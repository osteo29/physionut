import {Link} from 'react-router-dom';
import PageLayout from './PageLayout';
import usePreferredLang from './usePreferredLang';
import Seo from '../components/seo/Seo';
import {usePublishedArticles} from '../services/articleStudio';

export default function InsightsPage() {
  const lang = usePreferredLang();
  const {articles} = usePublishedArticles(lang);

  return (
    <>
      <Seo
        title={lang === 'en' ? 'Insights' : 'المقالات'}
        description={
          lang === 'en'
            ? 'Browse all PhysioNutrition articles about nutrition, recovery, rehabilitation, and fat loss.'
            : 'تصفح كل مقالات PhysioNutrition عن التغذية والتعافي والتأهيل وخسارة الدهون.'
        }
        canonicalPath="/insights"
      />
      <PageLayout title={lang === 'en' ? 'Insights' : 'المقالات'}>
        <p className="mb-8 text-slate-600">
          {lang === 'en'
            ? `${articles.length} articles currently available.`
            : `يوجد حاليًا ${articles.length} مقالات منشورة.`}
        </p>

        <div className="grid grid-cols-1 gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              to={`/${lang}/insights/${article.slug}`}
              className="rounded-3xl border border-slate-200 bg-white p-6 transition-all hover:border-health-green/30 hover:shadow-md"
            >
              <div className="mb-2 text-sm text-slate-400">
                {article.category} • {article.date}
              </div>
              <h2 className="mb-3 text-2xl font-bold text-slate-900">{article.title}</h2>
              <p className="text-slate-600">{article.excerpt}</p>
            </Link>
          ))}
        </div>
      </PageLayout>
    </>
  );
}
