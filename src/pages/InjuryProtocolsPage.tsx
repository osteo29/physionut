import {useEffect, useMemo, useState} from 'react';
import {ArrowRight, ClipboardList, Search, SlidersHorizontal, Timer, X} from 'lucide-react';
import {Link} from 'react-router-dom';
import Seo from '../components/seo/Seo';
import {getCatalogInjuries, type InjuryCatalogEntry} from '../services/injuryService';
import {buildHreflangs, navigationPaths} from '../utils/langUrlHelper';
import PageLayout from './PageLayout';
import usePreferredLang from './usePreferredLang';

export default function InjuryProtocolsPage() {
  const lang = usePreferredLang();
  const isAr = lang === 'ar';
  const [injuries, setInjuries] = useState<InjuryCatalogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [bodyRegion, setBodyRegion] = useState('');
  const [query, setQuery] = useState('');

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
  const hasActiveFilters = Boolean(category || bodyRegion || query.trim());

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
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
  }, [bodyRegion, category, injuries, query]);

  const featured = filtered.slice(0, 12);
  const groupedCategories = categories.map((item) => ({
    name: item,
    count: injuries.filter((injury) => injury.category === item).length,
  }));

  const title = isAr ? 'مكتبة بروتوكولات الإصابات' : 'Injury Protocol Library';
  const description = isAr
    ? 'المكتبة الآن تعتمد على البروتوكولات الجديدة المستوردة إلى Supabase، مع إبقاء طبقة التغذية الداعمة لكل مرحلة.'
    : 'The library now relies on the newly imported Supabase rehab protocols, with nutrition support layered into each phase.';

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
          <section className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-health-green/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-health-green">
              <ClipboardList className="h-3.5 w-3.5" />
              <span>{isAr ? 'المصدر الجديد للبروتوكولات' : 'New source-of-truth protocols'}</span>
            </div>
            <h2 className="mb-3 text-2xl font-black text-slate-900 sm:text-3xl">
              {isAr ? 'كل صفحات الإصابات الآن مبنية على قاعدة البروتوكولات الجديدة' : 'Every injury page now starts from the new rehab protocol database'}
            </h2>
            <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">{description}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to={featured[0] ? `/${lang}/injuries/${featured[0].slug}` : `/${lang}/injuries`}
                className="inline-flex items-center gap-2 rounded-2xl bg-health-green px-4 py-3 text-sm font-bold text-white"
              >
                {isAr ? 'افتح بروتوكول الآن' : 'Open a protocol now'}
                <ArrowRight className={`h-4 w-4 ${isAr ? 'rotate-180' : ''}`} />
              </Link>
              <Link
                to={`/${lang}/assistant`}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700"
              >
                {isAr ? 'اسأل عن مرحلة التأهيل' : 'Ask about a rehab phase'}
              </Link>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                {isAr ? 'إجمالي البروتوكولات' : 'Total protocols'}
              </div>
              <div className="mt-2 text-3xl font-black text-slate-900">{injuries.length}</div>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                {isAr ? 'الفئات الرئيسية' : 'Main categories'}
              </div>
              <div className="mt-2 text-3xl font-black text-slate-900">{categories.length}</div>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                {isAr ? 'مناطق الجسم' : 'Body regions'}
              </div>
              <div className="mt-2 text-3xl font-black text-slate-900">{bodyRegions.length}</div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Search className="h-4 w-4 text-health-green" />
                <span>{isAr ? 'ابحث وصفِّ البروتوكولات' : 'Search and filter protocols'}</span>
              </div>
              {hasActiveFilters ? (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setCategory('');
                    setBodyRegion('');
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-600 transition hover:border-health-green/30 hover:bg-health-green/5"
                >
                  <X className="h-3.5 w-3.5" />
                  {isAr ? 'مسح الفلاتر' : 'Clear filters'}
                </button>
              ) : null}
            </div>

            <div className="space-y-4">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={isAr ? 'ابحث باسم الإصابة أو اسم البروتوكول' : 'Search by injury or protocol name'}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-health-green focus:ring-2 focus:ring-health-green/20"
              />

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  <span>{isAr ? 'الفلاتر الحالية' : 'Current filters'}</span>
                </div>
                <div className="text-sm text-slate-600">
                  {isAr
                    ? `النتائج الحالية: ${filtered.length}${hasActiveFilters ? ' بعد تطبيق الفلاتر' : ''}`
                    : `Current results: ${filtered.length}${hasActiveFilters ? ' after filters' : ''}`}
                </div>
              </div>

              <div>
                <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                  {isAr ? 'الفئات' : 'Categories'}
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  <button
                    type="button"
                    onClick={() => setCategory('')}
                    className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      !category
                        ? 'border-health-green bg-health-green text-white'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-health-green/30 hover:bg-health-green/5'
                    }`}
                  >
                    {isAr ? 'كل الفئات' : 'All categories'}
                  </button>
                  {categories.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setCategory((prev) => (prev === item ? '' : item))}
                      className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ${
                        category === item
                          ? 'border-health-green bg-health-green text-white'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-health-green/30 hover:bg-health-green/5'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                  {isAr ? 'مناطق الجسم' : 'Body regions'}
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  <button
                    type="button"
                    onClick={() => setBodyRegion('')}
                    className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      !bodyRegion
                        ? 'border-health-green bg-health-green text-white'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-health-green/30 hover:bg-health-green/5'
                    }`}
                  >
                    {isAr ? 'كل المناطق' : 'All body regions'}
                  </button>
                  {bodyRegions.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setBodyRegion((prev) => (prev === item ? '' : item))}
                      className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ${
                        bodyRegion === item
                          ? 'border-health-green bg-health-green text-white'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-health-green/30 hover:bg-health-green/5'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-900">
              <Timer className="h-4 w-4 text-health-green" />
              <span>{isAr ? 'التقسيمات الرئيسية' : 'Main groupings'}</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {groupedCategories.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setCategory(item.name)}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-left transition hover:border-health-green/30 hover:bg-health-green/5"
                >
                  <div className="font-bold text-slate-900">{item.name}</div>
                  <div className="mt-2 text-sm text-slate-500">
                    {item.count} {isAr ? 'بروتوكولات' : 'protocols'}
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-bold text-slate-900">{isAr ? 'صفحات الإصابات' : 'Protocol pages'}</div>
                <p className="mt-1 text-sm text-slate-500">
                  {isAr ? `عدد النتائج المطابقة: ${filtered.length}` : `Current matching results: ${filtered.length}`}
                </p>
              </div>
              {loading ? <div className="text-sm text-slate-400">{isAr ? 'جارٍ التحميل...' : 'Loading...'}</div> : null}
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
                {loading
                  ? (isAr ? 'جارٍ تحميل البروتوكولات...' : 'Loading protocols...')
                  : isAr
                    ? 'لا توجد بروتوكولات مطابقة الآن. لو رفعت البيانات الجديدة إلى Supabase ستظهر هنا مباشرة.'
                    : 'No matching protocols right now. Once the new Supabase data is imported, it will appear here.'}
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filtered.map((injury) => (
                  <Link
                    key={injury.id}
                    to={`/${lang}/injuries/${injury.slug}`}
                    className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 transition hover:border-health-green/30 hover:bg-health-green/5"
                  >
                    <div className="text-xs font-bold uppercase tracking-[0.16em] text-health-green">
                      {injury.category} • {injury.bodyRegion}
                    </div>
                    <div className="mt-2 text-lg font-black text-slate-900">{injury.name}</div>
                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">{injury.overview}</p>
                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-health-green">
                      {isAr ? 'افتح البروتوكول' : 'Open protocol'}
                      <ArrowRight className={`h-4 w-4 ${isAr ? 'rotate-180' : ''}`} />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </PageLayout>
    </>
  );
}
