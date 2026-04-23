import {useEffect, useMemo, useState} from 'react';
import {ArrowRight, ClipboardList, Search, SlidersHorizontal, Timer, X} from 'lucide-react';
import {Link} from 'react-router-dom';
import Seo from '../components/seo/Seo';
import {getAllInjuries, type InjuryProtocol} from '../services/injuryDatabase';
import {
  getLocalizedBodyRegion,
  getLocalizedCategory,
  getLocalizedCommonInjuryContext,
  getLocalizedInjuryName,
  getLocalizedInjuryOverview,
} from '../services/injuryLocalization';
import {fetchInjuriesFromSupabase, type InjuryRow} from '../services/injurySupabaseService';
import {buildHreflangs, navigationPaths} from '../utils/langUrlHelper';
import PageLayout from './PageLayout';
import usePreferredLang from './usePreferredLang';

type CatalogInjury = {
  id: string;
  slug: string;
  name: string;
  category: string;
  bodyRegion: string;
  overview: string;
  commonIn: string[];
  source: 'supabase' | 'local';
  localRef?: InjuryProtocol;
};

function mapSupabaseInjury(row: InjuryRow, lang: 'en' | 'ar'): CatalogInjury {
  const localizedName =
    lang === 'ar'
      ? (row.name_ar && row.name_ar.trim() ? row.name_ar : null) ||
        getLocalizedInjuryName(row.injury_id_slug, row.name_en, lang) ||
        row.name_en
      : getLocalizedInjuryName(row.injury_id_slug, row.name_en, lang) || row.name_en;

  const overviewText =
    lang === 'ar'
      ? (row.overview_ar && row.overview_ar.trim() ? row.overview_ar : null) ||
        getLocalizedInjuryOverview(localizedName, row.category, row.body_region_en, row.overview_en, lang)
      : row.overview_en;

  const bodyRegionText =
    lang === 'ar'
      ? (row.body_region_ar && row.body_region_ar.trim() ? row.body_region_ar : null) ||
        getLocalizedBodyRegion(row.body_region_en, lang)
      : row.body_region_en;

  return {
    id: row.injury_id_slug,
    slug: row.injury_id_slug.replace(/_/g, '-'),
    name: localizedName,
    category: getLocalizedCategory(row.category, lang),
    bodyRegion: bodyRegionText,
    overview: overviewText,
    commonIn: (row.common_in || []).map((item) => getLocalizedCommonInjuryContext(item, lang)),
    source: 'supabase',
  };
}

function mapLocalInjury(injury: InjuryProtocol, lang: 'en' | 'ar'): CatalogInjury {
  const localizedName = getLocalizedInjuryName(injury.id, injury.name, lang);

  return {
    id: injury.id,
    slug: injury.id.replace(/_/g, '-'),
    name: localizedName,
    category: getLocalizedCategory(injury.category, lang),
    bodyRegion: getLocalizedBodyRegion(injury.bodyRegion, lang),
    overview: getLocalizedInjuryOverview(localizedName, injury.category, injury.bodyRegion, injury.overview, lang),
    commonIn: injury.commonIn.map((item) => getLocalizedCommonInjuryContext(item, lang)),
    source: 'local',
    localRef: injury,
  };
}

export default function InjuryProtocolsPage() {
  const lang = usePreferredLang();
  const isAr = lang === 'ar';
  const [remoteInjuries, setRemoteInjuries] = useState<CatalogInjury[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [bodyRegion, setBodyRegion] = useState('');
  const [query, setQuery] = useState('');

  const fallbackInjuries = useMemo(() => getAllInjuries().map((injury) => mapLocalInjury(injury, lang)), [lang]);

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      const rows = await fetchInjuriesFromSupabase();
      if (!active) return;
      setRemoteInjuries(rows.map((row) => mapSupabaseInjury(row, lang)));
      setLoading(false);
    };

    void load();

    return () => {
      active = false;
    };
  }, [lang]);

  const injuries = remoteInjuries.length ? remoteInjuries : fallbackInjuries;
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
    ? 'دليل عملي لبروتوكولات التأهيل والتغذية العلاجية مع صفحة مخصصة لكل إصابة.'
    : 'A practical rehab and recovery nutrition directory with dedicated pages for each injury protocol.';

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
              <span>{isAr ? 'مكتبة تأهيل عملية' : 'Practical rehab library'}</span>
            </div>
            <h2 className="mb-3 text-2xl font-black text-slate-900 sm:text-3xl">
              {isAr ? 'صفحات مخصصة لكل بروتوكول إصابة' : 'Dedicated pages for each injury protocol'}
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
                {isAr ? 'اسأل المساعد عن إصابة' : 'Ask the assistant about an injury'}
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
                {isAr ? 'فئات الإصابات' : 'Injury categories'}
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
                <span>{isAr ? 'ابحث وصفِّ الإصابات' : 'Search and filter injuries'}</span>
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
                placeholder={isAr ? 'ابحث باسم الإصابة أو المصطلح الطبي' : 'Search by injury or medical term'}
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
              <span>{isAr ? 'الفئات الرئيسية' : 'Main categories'}</span>
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
                <div className="text-sm font-bold text-slate-900">{isAr ? 'صفحات الإصابات' : 'Injury pages'}</div>
                <p className="mt-1 text-sm text-slate-500">
                  {isAr ? `عدد النتائج المطابقة: ${filtered.length}` : `Current matching results: ${filtered.length}`}
                </p>
              </div>
              {loading ? <div className="text-sm text-slate-400">{isAr ? 'جارٍ التحميل...' : 'Loading...'}</div> : null}
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
                {isAr ? 'لا توجد صفحات إصابات مطابقة الآن.' : 'No matching injury pages right now.'}
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
                    <div className="mt-4 flex flex-wrap gap-2">
                      {injury.commonIn.slice(0, 3).map((item) => (
                        <span key={item} className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-600">
                          {item}
                        </span>
                      ))}
                    </div>
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

