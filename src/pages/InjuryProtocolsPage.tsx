import {startTransition, useDeferredValue, useEffect, useMemo, useState} from 'react';
import {
  ArrowRight,
  ClipboardList,
  Layers3,
  Search,
  SlidersHorizontal,
  Sparkles,
  Timer,
  X,
} from 'lucide-react';
import {Link} from 'react-router-dom';
import Seo from '../components/seo/Seo';
import {getCatalogInjuries, type InjuryCatalogEntry} from '../services/injuryService';
import {buildHreflangs, navigationPaths} from '../utils/langUrlHelper';
import PageLayout from './PageLayout';
import usePreferredLang from './usePreferredLang';

type InsightCard = {
  label: string;
  value: string | number;
  note: string;
};

export default function InjuryProtocolsPage() {
  const lang = usePreferredLang();
  const isAr = lang === 'ar';
  const [injuries, setInjuries] = useState<InjuryCatalogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [bodyRegion, setBodyRegion] = useState('');
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      const {injuries: nextInjuries} = await getCatalogInjuries(lang);
      if (!active) return;
      setInjuries(nextInjuries);
      setLoading(false);
    };

    void load();

    return () => {
      active = false;
    };
  }, [lang]);

  const categories = useMemo(() => [...new Set(injuries.map((injury) => injury.category))], [injuries]);
  const bodyRegions = useMemo(() => [...new Set(injuries.map((injury) => injury.bodyRegion))], [injuries]);
  const hasActiveFilters = Boolean(category || bodyRegion || deferredQuery.trim());

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return injuries.filter((injury) => {
      const byCategory = !category || injury.category === category;
      const byRegion = !bodyRegion || injury.bodyRegion === bodyRegion;
      const byQuery =
        !q ||
        injury.name.toLowerCase().includes(q) ||
        injury.category.toLowerCase().includes(q) ||
        injury.bodyRegion.toLowerCase().includes(q) ||
        injury.overview.toLowerCase().includes(q) ||
        injury.commonIn.some((item) => item.toLowerCase().includes(q));

      return byCategory && byRegion && byQuery;
    });
  }, [bodyRegion, category, deferredQuery, injuries]);

  const featured = filtered.slice(0, 6);
  const spotlight = filtered.slice(0, 3);
  const groupedCategories = categories
    .map((item) => ({
      name: item,
      count: injuries.filter((injury) => injury.category === item).length,
    }))
    .sort((left, right) => right.count - left.count);

  const insights: InsightCard[] = [
    {
      label: isAr ? 'إجمالي البروتوكولات' : 'Protocol count',
      value: injuries.length,
      note: isAr ? 'المكتبة المعتمدة فقط' : 'Curated source-of-truth set',
    },
    {
      label: isAr ? 'الفئات الرئيسية' : 'Top categories',
      value: categories.length,
      note: isAr ? 'تقسيم أسرع للتصفح' : 'Fast entry points for browsing',
    },
    {
      label: isAr ? 'مناطق الجسم' : 'Body regions',
      value: bodyRegions.length,
      note: isAr ? 'تنقل حسب المنطقة' : 'Body-region based navigation',
    },
  ];

  const title = isAr ? 'مكتبة بروتوكولات الإصابات' : 'Injury Protocol Library';
  const description = isAr
    ? 'واجهة مرتبة للمئة بروتوكول الأساسية فقط، مع تصفح أسرع حسب المنطقة والفئة والمرحلة العلاجية.'
    : 'A sharper interface for the curated 100 injury protocols only, with faster browsing by region, category, and rehab focus.';

  const structuredData = [
    {
      id: 'injury-library-page',
      json: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: title,
        description,
        url: `https://physionutrition.vercel.app${navigationPaths.injuries(lang)}`,
      },
    },
    {
      id: 'injury-library-item-list',
      json: {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: filtered.slice(0, 18).map((injury, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: injury.name,
          url: `https://physionutrition.vercel.app/${lang}/injuries/${injury.slug}`,
        })),
      },
    },
  ];

  return (
    <>
      <Seo
        title={title}
        description={description}
        canonicalPath="/injuries"
        hreflangs={buildHreflangs('/injuries')}
        structuredData={structuredData}
      />
      <PageLayout title={title}>
        <div className="space-y-8 not-prose">
          <section className="overflow-hidden rounded-[2.25rem] border border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.2),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.08),transparent_38%),linear-gradient(145deg,#ffffff,#f5f7fb)] p-6 shadow-sm sm:p-8">
            <div className="grid gap-8 xl:grid-cols-[1.12fr_0.88fr]">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-health-green/20 bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-health-green shadow-sm">
                  <ClipboardList className="h-3.5 w-3.5" />
                  <span>{isAr ? 'المكتبة الأساسية المعتمدة' : 'Curated protocol source'}</span>
                </div>

                <div className="max-w-3xl">
                  <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
                    {isAr ? 'المئة بروتوكول المرتبين في واجهة أوضح وأسرع' : 'The ordered 100 protocols in a cleaner, faster clinical library'}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">{description}</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    to={featured[0] ? `/${lang}/injuries/${featured[0].slug}` : `/${lang}/injuries`}
                    className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                  >
                    {isAr ? 'افتح أول بروتوكول' : 'Open first protocol'}
                    <ArrowRight className={`h-4 w-4 ${isAr ? 'rotate-180' : ''}`} />
                  </Link>
                  <Link
                    to={`/${lang}/assistant`}
                    className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-health-green/30 hover:bg-health-green/5"
                  >
                    <Sparkles className="h-4 w-4 text-health-green" />
                    {isAr ? 'اسأل عن خطة التعافي' : 'Ask about recovery'}
                  </Link>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {insights.map((item) => (
                    <div key={item.label} className="rounded-[1.6rem] border border-white/70 bg-white/85 p-4 shadow-sm backdrop-blur">
                      <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{item.label}</div>
                      <div className="mt-2 text-3xl font-black text-slate-950">{item.value}</div>
                      <div className="mt-2 text-sm leading-6 text-slate-500">{item.note}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
                {spotlight.map((injury, index) => (
                  <Link
                    key={injury.id}
                    to={`/${lang}/injuries/${injury.slug}`}
                    className={`group rounded-[1.75rem] border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg ${
                      index === 0
                        ? 'border-slate-900 bg-slate-950 text-white'
                        : 'border-slate-200 bg-white/90 text-slate-900'
                    }`}
                  >
                    <div className={`text-xs font-bold uppercase tracking-[0.18em] ${index === 0 ? 'text-white/60' : 'text-health-green'}`}>
                      {injury.category}
                    </div>
                    <div className="mt-2 text-xl font-black">{injury.name}</div>
                    <p className={`mt-3 line-clamp-3 text-sm leading-7 ${index === 0 ? 'text-white/75' : 'text-slate-600'}`}>
                      {injury.overview}
                    </p>
                    <div className={`mt-5 inline-flex items-center gap-2 text-sm font-bold ${index === 0 ? 'text-white' : 'text-health-green'}`}>
                      {isAr ? 'افتح التفاصيل' : 'Open details'}
                      <ArrowRight className={`h-4 w-4 transition group-hover:translate-x-0.5 ${isAr ? 'rotate-180 group-hover:-translate-x-0.5 group-hover:translate-y-0' : ''}`} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[0.38fr_0.62fr]">
            <div className="space-y-6">
              <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-2 text-sm font-black text-slate-900">
                  <Search className="h-4 w-4 text-health-green" />
                  <span>{isAr ? 'بحث وتصفية' : 'Search and filter'}</span>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      value={query}
                      onChange={(e) =>
                        startTransition(() => {
                          setQuery(e.target.value);
                        })
                      }
                      placeholder={isAr ? 'ابحث باسم الإصابة أو البروتوكول' : 'Search by injury or protocol name'}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-health-green focus:bg-white focus:ring-2 focus:ring-health-green/20"
                    />
                  </div>

                  <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                      <SlidersHorizontal className="h-3.5 w-3.5" />
                      <span>{isAr ? 'ملخص النتائج الحالية' : 'Current result snapshot'}</span>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                      <div>
                        <div className="text-2xl font-black text-slate-950">{filtered.length}</div>
                        <div className="text-sm text-slate-500">{isAr ? 'نتائج مطابقة' : 'Matching protocols'}</div>
                      </div>
                      <div>
                        <div className="text-2xl font-black text-slate-950">{categories.length}</div>
                        <div className="text-sm text-slate-500">{isAr ? 'فئات متاحة' : 'Visible categories'}</div>
                      </div>
                      <div>
                        <div className="text-2xl font-black text-slate-950">{bodyRegions.length}</div>
                        <div className="text-sm text-slate-500">{isAr ? 'مناطق جسم' : 'Body regions'}</div>
                      </div>
                    </div>
                  </div>

                  {hasActiveFilters ? (
                    <button
                      type="button"
                      onClick={() => {
                        setQuery('');
                        setCategory('');
                        setBodyRegion('');
                      }}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 transition hover:border-health-green/30 hover:bg-health-green/5"
                    >
                      <X className="h-3.5 w-3.5" />
                      {isAr ? 'مسح الفلاتر' : 'Clear filters'}
                    </button>
                  ) : null}
                </div>
              </section>

              <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-2 text-sm font-black text-slate-900">
                  <Layers3 className="h-4 w-4 text-health-green" />
                  <span>{isAr ? 'الفئات الرئيسية' : 'Primary categories'}</span>
                </div>
                <div className="grid gap-3">
                  <button
                    type="button"
                    onClick={() => setCategory('')}
                    className={`rounded-[1.4rem] border px-4 py-4 text-left transition ${
                      !category
                        ? 'border-slate-950 bg-slate-950 text-white'
                        : 'border-slate-200 bg-slate-50 text-slate-800 hover:border-health-green/30 hover:bg-health-green/5'
                    }`}
                  >
                    <div className="font-bold">{isAr ? 'كل الفئات' : 'All categories'}</div>
                    <div className={`mt-2 text-sm ${!category ? 'text-white/70' : 'text-slate-500'}`}>
                      {injuries.length} {isAr ? 'بروتوكول' : 'protocols'}
                    </div>
                  </button>

                  {groupedCategories.map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setCategory((prev) => (prev === item.name ? '' : item.name))}
                      className={`rounded-[1.4rem] border px-4 py-4 text-left transition ${
                        category === item.name
                          ? 'border-health-green bg-health-green text-white shadow-lg shadow-health-green/20'
                          : 'border-slate-200 bg-slate-50 text-slate-800 hover:border-health-green/30 hover:bg-health-green/5'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="font-bold">{item.name}</div>
                        <div className={`rounded-full px-2.5 py-1 text-xs font-bold ${category === item.name ? 'bg-white/15 text-white' : 'bg-white text-slate-500 ring-1 ring-slate-200'}`}>
                          {item.count}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-2 text-sm font-black text-slate-900">
                  <Timer className="h-4 w-4 text-health-green" />
                  <span>{isAr ? 'مناطق الجسم' : 'Body regions'}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setBodyRegion('')}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      !bodyRegion
                        ? 'border-slate-950 bg-slate-950 text-white'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-health-green/30 hover:bg-health-green/5'
                    }`}
                  >
                    {isAr ? 'كل المناطق' : 'All regions'}
                  </button>
                  {bodyRegions.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setBodyRegion((prev) => (prev === item ? '' : item))}
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                        bodyRegion === item
                          ? 'border-health-green bg-health-green text-white'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-health-green/30 hover:bg-health-green/5'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </section>
            </div>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-black text-slate-900">{isAr ? 'نتائج المكتبة' : 'Library results'}</div>
                  <p className="mt-1 text-sm text-slate-500">
                    {isAr
                      ? `مصدر العرض الحالي: ${loading ? 'جاري التحميل' : 'المكتبة المرتبة'}`
                      : `Current display source: ${loading ? 'loading' : 'ordered protocol set'}`}
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
                  <ClipboardList className="h-4 w-4 text-health-green" />
                  <span>{filtered.length} {isAr ? 'نتيجة' : 'results'}</span>
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="rounded-[1.75rem] border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
                  <div className="text-lg font-black text-slate-900">{isAr ? 'لا توجد نتائج مطابقة' : 'No matching protocols'}</div>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
                    {loading
                      ? isAr
                        ? 'جاري تحميل البروتوكولات...'
                        : 'Loading protocols...'
                      : isAr
                        ? 'جرّب إزالة بعض الفلاتر أو استخدام اسم أقصر للإصابة.'
                        : 'Try clearing one of the filters or using a shorter search phrase.'}
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {filtered.map((injury, index) => (
                    <Link
                      key={injury.id}
                      to={`/${lang}/injuries/${injury.slug}`}
                      className={`group rounded-[1.7rem] border p-5 transition hover:-translate-y-0.5 hover:shadow-lg ${
                        index === 0
                          ? 'border-slate-900 bg-slate-950 text-white shadow-xl shadow-slate-900/10'
                          : 'border-slate-200 bg-[linear-gradient(145deg,#ffffff,#f8fafc)] text-slate-900'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className={`text-xs font-bold uppercase tracking-[0.18em] ${index === 0 ? 'text-white/60' : 'text-health-green'}`}>
                          {injury.category}
                        </div>
                        <div className={`rounded-full px-3 py-1 text-xs font-bold ${index === 0 ? 'bg-white/10 text-white/85' : 'bg-slate-100 text-slate-600'}`}>
                          {injury.bodyRegion}
                        </div>
                      </div>

                      <div className="mt-3 text-xl font-black">{injury.name}</div>
                      <p className={`mt-3 line-clamp-4 text-sm leading-7 ${index === 0 ? 'text-white/75' : 'text-slate-600'}`}>
                        {injury.overview}
                      </p>

                      <div className="mt-5 flex items-center justify-between gap-3">
                        <div className={`text-xs font-bold uppercase tracking-[0.16em] ${index === 0 ? 'text-white/50' : 'text-slate-400'}`}>
                          {isAr ? 'بروتوكول تعافٍ مرتب' : 'Structured rehab protocol'}
                        </div>
                        <div className={`inline-flex items-center gap-2 text-sm font-bold ${index === 0 ? 'text-white' : 'text-health-green'}`}>
                          {isAr ? 'افتح' : 'Open'}
                          <ArrowRight className={`h-4 w-4 transition group-hover:translate-x-0.5 ${isAr ? 'rotate-180 group-hover:-translate-x-0.5 group-hover:translate-y-0' : ''}`} />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          </section>
        </div>
      </PageLayout>
    </>
  );
}
