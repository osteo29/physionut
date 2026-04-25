import {useEffect, useState} from 'react';
import {ArrowRight, ClipboardList, ShieldAlert, Timer} from 'lucide-react';
import {Link} from 'react-router-dom';
import {getCatalogInjuries, type InjuryCatalogEntry} from '../../services/injuryService';
import type {Language} from '../../services/translations';
import {navigationPaths} from '../../utils/langUrlHelper';

export default function InjuryProtocolsHighlight({lang}: {lang: Language}) {
  const isAr = lang === 'ar';
  const [injuries, setInjuries] = useState<InjuryCatalogEntry[]>([]);

  useEffect(() => {
    let active = true;

    const load = async () => {
      const {injuries: nextInjuries} = await getCatalogInjuries(lang);
      if (!active) return;
      setInjuries(nextInjuries);
    };

    void load();

    return () => {
      active = false;
    };
  }, [lang]);

  const categories = [...new Set(injuries.map((item) => item.category))];

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-health-green/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-health-green">
              <ClipboardList className="h-3.5 w-3.5" />
              <span>{isAr ? 'بروتوكولات الإصابات' : 'Injury protocols'}</span>
            </div>
            <h2 className="mb-4 text-3xl font-black text-slate-900 sm:text-4xl">
              {isAr ? 'بروتوكولات التأهيل الجديدة اتربطت بطبقة التغذية' : 'The new rehab protocol dataset is now paired with the nutrition layer'}
            </h2>
            <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              {isAr
                ? 'المكتبة تعرض البروتوكولات المستوردة الجديدة نفسها: مراحل واضحة، احتياطات، معايير انتقال، وتمارين مفصلة، مع إبقاء التغذية الداعمة داخل كل مرحلة.'
                : 'The library now surfaces the imported rehab protocols themselves: clear phases, precautions, progression criteria, and detailed exercises, while keeping nutrition support inside each phase.'}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to={navigationPaths.injuries(lang)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-health-green px-5 py-3 text-sm font-bold text-white"
              >
                <span>{isAr ? 'استكشف البروتوكولات' : 'Explore protocols'}</span>
                <ArrowRight className={`h-4 w-4 ${isAr ? 'rotate-180' : ''}`} />
              </Link>
              <Link
                to={navigationPaths.assistant(lang)}
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700"
              >
                {isAr ? 'اسأل عن بروتوكولك' : 'Ask about your protocol'}
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-soft-blue text-medical-blue">
                <Timer className="h-5 w-5" />
              </div>
              <div className="text-3xl font-black text-slate-900">{injuries.length}</div>
              <div className="mt-2 text-sm text-slate-600">
                {isAr ? 'بروتوكولات متاحة الآن من قاعدة البيانات الجديدة' : 'Protocols currently available from the new database'}
              </div>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-health-green/10 text-health-green">
                <ClipboardList className="h-5 w-5" />
              </div>
              <div className="text-3xl font-black text-slate-900">{categories.length}</div>
              <div className="mt-2 text-sm text-slate-600">
                {isAr ? 'تقسيمات رئيسية مثل الركبة والكتف والعمود الفقري' : 'Main groupings such as knee, shoulder, and spine'}
              </div>
            </div>
            <div className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 shadow-sm">
              <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-amber-600">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div className="text-lg font-black text-slate-900">
                {isAr ? 'دعم التغذية والسلامة' : 'Nutrition and safety support'}
              </div>
              <div className="mt-2 text-sm text-slate-700">
                {isAr ? 'تم الإبقاء على طبقة التغذية والمكملات والتنبيهات الداعمة داخل كل مرحلة.' : 'The nutrition layer, supplement notes, and safety reminders still support every phase.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
