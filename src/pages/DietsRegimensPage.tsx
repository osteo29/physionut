import {useMemo} from 'react';
import {Link} from 'react-router-dom';
import Seo from '../components/seo/Seo';
import PageLayout from './PageLayout';
import usePreferredLang from './usePreferredLang';
import {dietRegimensCatalog, type DietRegimen} from '../services/dietRegimensCatalog';
import {buildHreflangs} from '../utils/langUrlHelper';

function buildAnchor(id: string) {
  return id.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function TableOfContents({items}: {items: DietRegimen[]}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6">
      <div className="mb-3 text-sm font-bold text-slate-900">Contents</div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${buildAnchor(item.id)}`}
            className="rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-health-green/40 hover:bg-health-green/5 hover:text-health-green-dark"
          >
            {item.title.en}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function DietsRegimensPage() {
  const lang = usePreferredLang();
  const isAr = lang === 'ar';

  const items = useMemo(() => dietRegimensCatalog, []);

  const title = isAr ? 'أنواع الريجيم والدايت' : 'Diet & Regimen Types';
  const description = isAr
    ? 'شرح تفصيلي لأنواع الدايت والريجيم الأكثر استخدامًا، وكيف تختار الأسلوب المناسب لهدفك مع ملاحظات الأمان.'
    : 'Detailed explanations of common diet & regimen types, how to choose for your goals, and safety notes.';

  return (
    <>
      <Seo title={title} description={description} canonicalPath="/diets" noIndex={false} hreflangs={buildHreflangs('/diets')} />
      <PageLayout title={title}>
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm leading-7 text-slate-700">
              {isAr
                ? 'هذه الصفحة تعليمية لمساعدتك في فهم الأنماط الغذائية الشائعة. لا تعتبر وصفة طبية. إذا لديك مرض مزمن، أدوية ثابتة، حمل، أو إصابة متهيجة جدًا، راجع مختص.'
                : 'This page is educational. It is not a medical prescription. If you have chronic conditions, take daily medications, are pregnant, or your injury is highly irritable, consult a professional.'}
            </p>
          </div>

          <TableOfContents items={items} />

          <div className="space-y-8">
            {items.map((item) => (
              <article key={item.id} id={buildAnchor(item.id)} className="rounded-[2rem] border border-slate-200 bg-white p-6">
                <h2 className="mb-3 text-xl font-black text-slate-900">
                  <Link to={`/${lang}/diets/${item.id}`} className="hover:text-health-green hover:underline">
                    {isAr ? item.title.ar : item.title.en}
                  </Link>
                </h2>
                <p className="mb-4 text-sm leading-7 text-slate-700">{isAr ? item.summary.ar : item.summary.en}</p>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <h3 className="mb-2 text-sm font-bold text-slate-900">{isAr ? 'الأهداف' : 'Goals'}</h3>
                    <ul className="space-y-2 text-sm text-slate-700">
                      {(isAr ? item.goals.ar : item.goals.en).map((g) => (
                        <li key={g} className="rounded-xl bg-white px-3 py-2">
                          {g}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <h3 className="mb-2 text-sm font-bold text-slate-900">{isAr ? 'المبادئ الأساسية' : 'Key principles'}</h3>
                    <ul className="space-y-2 text-sm text-slate-700">
                      {(isAr ? item.keyPrinciples.ar : item.keyPrinciples.en).map((p) => (
                        <li key={p} className="rounded-xl bg-white px-3 py-2">
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <h3 className="mb-2 text-sm font-bold text-slate-900">{isAr ? 'طريقة تطبيق عملية' : 'Practical guide'}</h3>
                    <ul className="space-y-2 text-sm text-slate-700">
                      {(isAr ? item.practicalGuide.ar : item.practicalGuide.en).map((p) => (
                        <li key={p} className="rounded-xl bg-white px-3 py-2">
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <h3 className="mb-2 text-sm font-bold text-slate-900">{isAr ? 'مثال يومي' : 'Example day'}</h3>
                    <ul className="space-y-2 text-sm text-slate-700">
                      <li className="rounded-xl bg-white px-3 py-2">
                        <span className="font-bold">{isAr ? 'الفطور' : 'Breakfast'}:</span> {isAr ? item.exampleDay.breakfast.ar : item.exampleDay.breakfast.en}
                      </li>
                      <li className="rounded-xl bg-white px-3 py-2">
                        <span className="font-bold">{isAr ? 'الغداء' : 'Lunch'}:</span> {isAr ? item.exampleDay.lunch.ar : item.exampleDay.lunch.en}
                      </li>
                      <li className="rounded-xl bg-white px-3 py-2">
                        <span className="font-bold">{isAr ? 'العشاء' : 'Dinner'}:</span> {isAr ? item.exampleDay.dinner.ar : item.exampleDay.dinner.en}
                      </li>
                      {item.exampleDay.snack ? (
                        <li className="rounded-xl bg-white px-3 py-2">
                          <span className="font-bold">{isAr ? 'سناك' : 'Snack'}:</span> {isAr ? item.exampleDay.snack.ar : item.exampleDay.snack.en}
                        </li>
                      ) : null}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-4">
                  <h3 className="mb-2 text-sm font-bold text-rose-800">{isAr ? 'ملاحظات وتحذيرات' : 'Cautions'}</h3>
                  <ul className="space-y-2 text-sm text-rose-900/80">
                    {(isAr ? item.cautions.ar : item.cautions.en).map((c) => (
                      <li key={c} className="rounded-xl bg-white px-3 py-2">
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </PageLayout>
    </>
  );
}

