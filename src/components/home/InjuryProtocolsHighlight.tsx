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

  const stats = [
    {
      icon: Timer,
      value: injuries.length,
      label: isAr ? 'بروتوكولات تغطي إصابات متعددة' : 'Protocols across multiple injury types',
    },
    {
      icon: ClipboardList,
      value: categories.length,
      label: isAr ? 'مناطق تشريحية رئيسية' : 'Major anatomical regions',
    },
  ];

  return (
    <section className="home-band relative overflow-hidden bg-white py-18 sm:py-20">
      <div className="absolute left-0 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-health-green/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
          <div className="panel-soft rounded-[2.25rem] p-7 sm:p-9">
            <div className="inline-flex items-center gap-2 rounded-full bg-health-green/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-health-green">
              <ClipboardList className="h-4 w-4" />
              <span>{isAr ? 'بروتوكولات الإصابات' : 'Injury protocols'}</span>
            </div>

            <h2 className="mt-5 max-w-3xl text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
              {isAr ? 'استكشف بروتوكولات علاجية مرتبة بشكل أسهل' : 'Explore rehab protocols in a cleaner format'}
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
              {isAr
                ? 'كل بروتوكول مقسم إلى مراحل أوضح تشمل التمارين، معايير التقدم، والتنبيهات المهمة، بحيث الوصول للمعلومة يبقى أسرع وأهدأ بصريًا.'
                : 'Each protocol is organized into clearer phases with exercises, progression criteria, and practical cautions so the content feels easier to scan.'}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to={navigationPaths.injuries(lang)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-health-green px-6 py-4 text-sm font-bold text-white shadow-lg transition-colors hover:bg-health-green-dark"
              >
                <span>{isAr ? 'استكشف البروتوكولات' : 'Explore protocols'}</span>
                <ArrowRight className={`h-5 w-5 ${isAr ? 'rotate-180' : ''}`} />
              </Link>
              <Link
                to={navigationPaths.assistant(lang)}
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-700 transition-colors hover:border-health-green/40 hover:text-slate-900"
              >
                {isAr ? 'اسأل عن بروتوكولك' : 'Ask about your protocol'}
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            {stats.map((item) => (
              <div key={item.label} className="panel-soft rounded-[2rem] p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-health-green/10 text-health-green">
                  <item.icon className="h-6 w-6" />
                </div>
                <div className="text-4xl font-black text-slate-900">{item.value}</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.label}</p>
              </div>
            ))}

            <div className="rounded-[2rem] border border-amber-200/70 bg-amber-50/80 p-6 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-amber-600 shadow-sm">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <div className="text-lg font-black text-slate-900">
                {isAr ? 'سلامة + دعم غذائي' : 'Safety + nutrition support'}
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {isAr
                  ? 'المحتوى يربط بين التمرين والتنبيهات والتغذية الداعمة بدون تشتيت أو مبالغة في عرض التفاصيل من أول نظرة.'
                  : 'The experience keeps exercise guidance, cautions, and nutrition support close together without making the section feel noisy.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
