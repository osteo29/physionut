import {ArrowRight, ClipboardList, ShieldAlert, Timer} from 'lucide-react';
import {Link} from 'react-router-dom';
import {injuryDatabase} from '../../services/injuryDatabase';
import type {Language} from '../../services/translations';

export default function InjuryProtocolsHighlight({lang}: {lang: Language}) {
  const isAr = lang === 'ar';
  const injuries = Object.values(injuryDatabase);
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
              {isAr ? 'قاعدة إصابات عملية تربط التأهيل بالتغذية' : 'A practical injury library that links rehab with nutrition'}
            </h2>
            <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              {isAr
                ? 'بدل ما تكون المعلومة مخفية داخل الواجهة، جمعنا الإصابات الشائعة في صفحة واحدة واضحة: مراحل التعافي، المغذيات المفيدة، الأطعمة المقترحة، وما يحتاج حذرًا مع الأدوية أو المكملات.'
                : 'Instead of burying this value at the bottom of the homepage, common injuries now live in one clearer place with recovery stages, useful nutrients, suggested foods, and medication or supplement cautions.'}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/injuries"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-health-green px-5 py-3 text-sm font-bold text-white"
              >
                <span>{isAr ? 'استكشف البروتوكولات' : 'Explore protocols'}</span>
                <ArrowRight className={`h-4 w-4 ${isAr ? 'rotate-180' : ''}`} />
              </Link>
              <Link
                to="/assistant"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700"
              >
                {isAr ? 'اسأل عن إصابتك' : 'Ask about your injury'}
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
                {isAr ? 'إصابات ومنعطفات تعافٍ متاحة الآن' : 'Injuries and recovery pathways available'}
              </div>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-health-green/10 text-health-green">
                <ClipboardList className="h-5 w-5" />
              </div>
              <div className="text-3xl font-black text-slate-900">{categories.length}</div>
              <div className="mt-2 text-sm text-slate-600">
                {isAr ? 'فئات رئيسية مثل الركبة والعمود الفقري والكتف' : 'Main categories like knee, spine, and shoulder'}
              </div>
            </div>
            <div className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 shadow-sm">
              <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-amber-600">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div className="text-lg font-black text-slate-900">
                {isAr ? 'تنبيهات مهمة' : 'Safety cues included'}
              </div>
              <div className="mt-2 text-sm text-slate-700">
                {isAr ? 'تنبيهات دوائية ومكملات ومحاذير مرتبطة ببعض الإصابات.' : 'Medication, supplement, and caution notes where relevant.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
