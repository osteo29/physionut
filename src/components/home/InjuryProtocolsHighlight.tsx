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
    <section className="relative py-24 overflow-hidden bg-white">
      {/* Background styling for premium look */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] -translate-y-1/2 -translate-x-1/2 rounded-full bg-health-green/5 blur-[100px]" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2.5rem] border border-slate-100 bg-white/60 backdrop-blur-xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-12 transition-transform hover:-translate-y-1 duration-500">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-health-green/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-health-green">
              <ClipboardList className="h-4 w-4" />
              <span>{isAr ? 'بروتوكولات الإصابات' : 'Injury protocols'}</span>
            </div>
            <h2 className="mb-5 text-4xl font-black text-slate-900 leading-tight sm:text-5xl">
              {isAr ? 'مكتبة شاملة لبروتوكولات التأهيل المتكامل' : 'Comprehensive Integrated Rehab Protocols'}
            </h2>
            <p className="max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
              {isAr
                ? 'تصفح بروتوكولات تفصيلية مبنية على المعايير الطبية. كل بروتوكول مقسم لمراحل واضحة تشمل التمارين العلاجية، معايير التقدم، المحاذير، مع خطة تغذية لدعم وتسريع الشفاء.'
                : 'Browse detailed protocols based on medical standards. Each protocol is structured into clear phases including exercises, progression criteria, precautions, and nutrition support.'}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to={navigationPaths.injuries(lang)}
                className="group relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-2xl bg-health-green px-6 py-4 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-health-green/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-health-green-dark to-transparent opacity-0 group-hover:opacity-30 transition-opacity" />
                <span className="relative z-10">{isAr ? 'استكشف البروتوكولات' : 'Explore protocols'}</span>
                <ArrowRight className={`relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1 ${isAr ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </Link>
              <Link
                to={navigationPaths.assistant(lang)}
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm px-6 py-4 text-sm font-bold text-slate-700 hover:border-health-green/50 hover:text-slate-900 transition-all hover:-translate-y-1"
              >
                {isAr ? 'اسأل عن بروتوكولك' : 'Ask about your protocol'}
              </Link>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
            <div className="group rounded-[2rem] border border-slate-100 bg-white/80 backdrop-blur-sm p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-lg hover:border-soft-blue transition-all duration-300">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-soft-blue text-medical-blue group-hover:scale-110 transition-transform">
                <Timer className="h-6 w-6" />
              </div>
              <div className="text-4xl font-black text-slate-900">{injuries.length}</div>
              <div className="mt-2 text-sm leading-6 text-slate-600">
                {isAr ? 'بروتوكول تأهيلي متكامل يغطي مختلف الإصابات' : 'Complete rehab protocols covering various injuries'}
              </div>
            </div>
            
            <div className="group rounded-[2rem] border border-slate-100 bg-white/80 backdrop-blur-sm p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-lg hover:border-health-green/30 transition-all duration-300">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-health-green/10 text-health-green group-hover:scale-110 transition-transform">
                <ClipboardList className="h-6 w-6" />
              </div>
              <div className="text-4xl font-black text-slate-900">{categories.length}</div>
              <div className="mt-2 text-sm leading-6 text-slate-600">
                {isAr ? 'مناطق تشريحية تشمل الطرف العلوي، السفلي، والعمود الفقري' : 'Anatomical regions including upper/lower limbs and spine'}
              </div>
            </div>
            
            <div className="group rounded-[2rem] border border-amber-200/60 bg-amber-50/80 backdrop-blur-sm p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-lg hover:bg-amber-100/50 transition-all duration-300">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm text-amber-600 group-hover:scale-110 transition-transform">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <div className="text-xl font-black text-slate-900">
                {isAr ? 'دعم التغذية والسلامة' : 'Nutrition & safety support'}
              </div>
              <div className="mt-2 text-sm leading-6 text-slate-700">
                {isAr ? 'كل مرحلة تأهيلية مدعومة بملاحظات تغذية ومكملات لتسريع الاستشفاء.' : 'Every rehab phase is supported by clinical nutrition and supplement guidelines.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
