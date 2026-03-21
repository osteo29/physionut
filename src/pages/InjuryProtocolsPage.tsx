import {useMemo, useState} from 'react';
import {ArrowRight, ClipboardList, Search, Timer} from 'lucide-react';
import {Link} from 'react-router-dom';
import Seo from '../components/seo/Seo';
import {
  getAllBodyRegions,
  getAllCategories,
  getAllInjuries,
  getInjuryPath,
} from '../services/injuryDatabase';
import {
  getLocalizedBodyRegion,
  getLocalizedCategory,
  getLocalizedInjuryName,
} from '../services/injuryLocalization';
import PageLayout from './PageLayout';
import usePreferredLang from './usePreferredLang';

export default function InjuryProtocolsPage() {
  const lang = usePreferredLang();
  const isAr = lang === 'ar';
  const injuries = useMemo(() => getAllInjuries(), []);
  const categories = useMemo(() => getAllCategories(), []);
  const bodyRegions = useMemo(() => getAllBodyRegions(), []);
  const [category, setCategory] = useState('all');
  const [bodyRegion, setBodyRegion] = useState('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return injuries.filter((injury) => {
      const byCategory = category === 'all' || injury.category === category;
      const byRegion = bodyRegion === 'all' || injury.bodyRegion === bodyRegion;
      const localizedName = getLocalizedInjuryName(injury.id, injury.name, lang).toLowerCase();
      const localizedCategory = getLocalizedCategory(injury.category, lang).toLowerCase();
      const localizedRegion = getLocalizedBodyRegion(injury.bodyRegion, lang).toLowerCase();
      const byQuery =
        !q ||
        injury.name.toLowerCase().includes(q) ||
        localizedName.includes(q) ||
        localizedCategory.includes(q) ||
        localizedRegion.includes(q) ||
        injury.overview.toLowerCase().includes(q) ||
        injury.commonIn.some((item) => item.toLowerCase().includes(q));

      return byCategory && byRegion && byQuery;
    });
  }, [bodyRegion, category, injuries, lang, query]);

  const featured = filtered.slice(0, 12);
  const groupedCategories = categories.map((item) => ({
    name: item,
    count: injuries.filter((injury) => injury.category === item).length,
  }));

  const title = isAr ? 'مكتبة بروتوكولات الإصابات' : 'Injury Protocol Library';
  const description = isAr
    ? 'دليل عملي يضم بروتوكولات الإصابات والتأهيل والتغذية العلاجية، مع صفحات مستقلة لكل إصابة لسهولة التصفح والفهرسة.'
    : 'A practical rehab and recovery nutrition directory with dedicated pages for each injury protocol.';

  return (
    <>
      <Seo title={title} description={description} canonicalPath="/injuries" />
      <PageLayout title={title}>
        <div className="space-y-8 not-prose">
          <section className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-health-green/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-health-green">
              <ClipboardList className="h-3.5 w-3.5" />
              <span>{isAr ? 'مكتبة علاجية عملية' : 'Practical rehab library'}</span>
            </div>
            <h2 className="mb-3 text-2xl font-black text-slate-900 sm:text-3xl">
              {isAr ? 'صفحات مستقلة لكل إصابة لسهولة البحث والتصفح' : 'Dedicated pages for each injury protocol'}
            </h2>
            <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">{description}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to={featured[0] ? getInjuryPath(featured[0]) : '/injuries'}
                className="inline-flex items-center gap-2 rounded-2xl bg-health-green px-4 py-3 text-sm font-bold text-white"
              >
                {isAr ? 'افتح أول بروتوكول الآن' : 'Open a protocol now'}
                <ArrowRight className={`h-4 w-4 ${isAr ? 'rotate-180' : ''}`} />
              </Link>
              <Link
                to="/assistant"
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700"
              >
                {isAr ? 'اسأل المساعد عن إصابة معينة' : 'Ask the assistant about an injury'}
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
                {isAr ? 'تصنيفات الإصابات' : 'Injury categories'}
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
            <div className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-900">
              <Search className="h-4 w-4 text-health-green" />
              <span>{isAr ? 'ابحث وفلتر الإصابات' : 'Search and filter injuries'}</span>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={isAr ? 'ابحث باسم الإصابة أو المصطلح الطبي' : 'Search by injury or medical term'}
                className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-health-green focus:ring-2 focus:ring-health-green/20"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-health-green focus:ring-2 focus:ring-health-green/20"
              >
                <option value="all">{isAr ? 'كل الفئات' : 'All categories'}</option>
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {getLocalizedCategory(item, lang)}
                  </option>
                ))}
              </select>
              <select
                value={bodyRegion}
                onChange={(e) => setBodyRegion(e.target.value)}
                className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-health-green focus:ring-2 focus:ring-health-green/20"
              >
                <option value="all">{isAr ? 'كل المناطق' : 'All body regions'}</option>
                {bodyRegions.map((item) => (
                  <option key={item} value={item}>
                    {getLocalizedBodyRegion(item, lang)}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-900">
              <Timer className="h-4 w-4 text-health-green" />
              <span>{isAr ? 'التصنيفات الرئيسية' : 'Main categories'}</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {groupedCategories.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setCategory(item.name)}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-left transition hover:border-health-green/30 hover:bg-health-green/5"
                >
                  <div className="font-bold text-slate-900">{getLocalizedCategory(item.name, lang)}</div>
                  <div className="mt-2 text-sm text-slate-500">
                    {item.count} {isAr ? 'بروتوكول' : 'protocols'}
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-bold text-slate-900">
                  {isAr ? 'صفحات الإصابات' : 'Injury pages'}
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  {isAr ? `عدد النتائج الحالية: ${filtered.length}` : `Current matching results: ${filtered.length}`}
                </p>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
                {isAr ? 'لا توجد نتائج مطابقة الآن.' : 'No matching injury pages right now.'}
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filtered.map((injury) => (
                  <Link
                    key={injury.id}
                    to={getInjuryPath(injury)}
                    className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 transition hover:border-health-green/30 hover:bg-health-green/5"
                  >
                    <div className="text-xs font-bold uppercase tracking-[0.16em] text-health-green">
                      {getLocalizedCategory(injury.category, lang)} • {getLocalizedBodyRegion(injury.bodyRegion, lang)}
                    </div>
                    <div className="mt-2 text-lg font-black text-slate-900">
                      {getLocalizedInjuryName(injury.id, injury.name, lang)}
                    </div>
                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">{injury.overview}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {injury.commonIn.slice(0, 3).map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-600"
                        >
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
