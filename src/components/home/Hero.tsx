import {memo} from 'react';
import {Link} from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Calculator,
  GraduationCap,
  MessageSquareText,
  ShieldCheck,
  UserRoundPlus,
} from 'lucide-react';
import type {Language} from '../../services/translations';
import {navigationPaths} from '../../utils/langUrlHelper';
import PwaActions from '../pwa/PwaActions';

const Hero = memo(({lang}: {lang: Language}) => {
  const isAr = lang === 'ar';

  const highlights = isAr
    ? [
        {
          label: 'ابدأ من أرقامك',
          desc: 'حاسبات عملية للسعرات والماء والبروتين بدون تعقيد.',
        },
        {
          label: 'اربط التغذية بالتعافي',
          desc: 'خطوات أوضح تربط الإصابة بالحركة والمتابعة اليومية.',
        },
        {
          label: 'خطّة أسهل للتنفيذ',
          desc: 'نتائج مبنية على معادلات معروفة وموجهة للاستخدام التعليمي.',
        },
      ]
    : [
        {
          label: 'Start from your numbers',
          desc: 'Use practical calculators for calories, hydration, and protein.',
        },
        {
          label: 'Connect food to recovery',
          desc: 'Bring injury rehab, movement, and nutrition into one flow.',
        },
        {
          label: 'Leave with a clearer plan',
          desc: 'Follow conservative, educational outputs you can act on.',
        },
      ];

  const valuePoints = isAr
    ? ['تغذية + تأهيل', 'مبني على معادلات معروفة', 'تعليمي وليس تشخيصيًا']
    : ['Nutrition + rehab', 'Built on established formulas', 'Educational, not diagnostic'];

  return (
    <section className="hero-surface home-band relative overflow-hidden pb-16 pt-14 sm:pb-20 lg:pb-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(49,95,74,0.12),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.3),transparent_32%)]" />
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 translate-x-1/4 -translate-y-1/4 rounded-full bg-health-green/8 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 -translate-x-1/4 translate-y-1/4 rounded-full bg-medical-blue/10 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-center">
          <div className={`max-w-3xl ${isAr ? 'lg:text-right' : 'lg:text-left'}`}>
            <div className="glass-panel mb-6 inline-flex items-center gap-2 rounded-full border border-health-green/15 px-4 py-2 text-xs font-bold text-health-green sm:text-sm">
              <GraduationCap className="h-4 w-4" />
              <span>
                {isAr
                  ? 'منصة عملية للتغذية والتأهيل والمتابعة'
                  : 'A practical platform for nutrition, rehab, and follow-up'}
              </span>
            </div>

            <h1 className="max-w-4xl text-4xl font-black leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              {isAr ? 'رتّب رحلة تعافيك' : 'Organize your recovery'}{' '}
              <span className="bg-gradient-to-r from-health-green to-health-green-dark bg-clip-text text-transparent">
                {isAr ? 'بشكل أوضح' : 'with more clarity'}
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              {isAr
                ? 'PhysioNutrition يجمع الحاسبات الغذائية، أدوات المتابعة، وبروتوكولات الإصابات في مسار أبسط يساعدك تفهم الخطوة التالية بدل التنقل بين أجزاء كثيرة.'
                : 'PhysioNutrition brings calculators, tracking tools, and injury protocols into a calmer flow so the next step feels obvious.'}
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {valuePoints.map((point) => (
                <div
                  key={point}
                  className="metric-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-slate-700"
                >
                  <ShieldCheck className="h-4 w-4 text-health-green" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to={navigationPaths.auth(lang)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-4 text-sm font-bold text-white shadow-lg transition-colors hover:bg-slate-800"
              >
                <UserRoundPlus className="h-5 w-5" />
                <span>{isAr ? 'ابدأ رحلتك مجانًا' : 'Start your journey free'}</span>
              </Link>
              <Link
                to={navigationPaths.injuries(lang)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/85 px-6 py-4 text-sm font-bold text-slate-900 shadow-sm transition-colors hover:border-health-green/40 hover:bg-white"
              >
                <Activity className="h-5 w-5 text-health-green" />
                <span>{isAr ? 'استكشف بروتوكولات الإصابات' : 'Browse injury protocols'}</span>
              </Link>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                to={navigationPaths.assistant(lang)}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/55 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-health-green/35 hover:text-slate-900"
              >
                <MessageSquareText className="h-4 w-4 text-health-green" />
                {isAr ? 'اسأل المساعد' : 'Ask the assistant'}
              </Link>
              <a
                href="#calculators"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/55 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-health-green/35 hover:text-slate-900"
              >
                <Calculator className="h-4 w-4 text-health-green" />
                {isAr ? 'افتح الحاسبات' : 'Open calculators'}
              </a>
            </div>

            <div className={`mt-8 flex ${isAr ? 'lg:justify-end' : 'lg:justify-start'}`}>
              <PwaActions lang={lang} />
            </div>
          </div>

          <div className="relative">
            <div className="panel-soft rounded-[2.25rem] p-5 sm:p-6">
              <div className="mb-5 flex items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-health-green">
                    {isAr ? 'مسار مبسّط' : 'Simplified flow'}
                  </div>
                  <div className="mt-2 text-2xl font-black text-slate-900">
                    {isAr ? '3 محطات رئيسية' : '3 focused steps'}
                  </div>
                </div>
                <div className="rounded-full bg-slate-900 px-3 py-1 text-xs font-bold tracking-[0.18em] text-white">
                  01-03
                </div>
              </div>

              <div className="space-y-3">
                {highlights.map((item, index) => (
                  <div
                    key={item.label}
                    className="rounded-[1.75rem] border border-slate-200 bg-white/88 p-4 shadow-sm transition-[box-shadow,border-color] hover:border-health-green/25 hover:shadow-md"
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-health-green/10 text-health-green">
                        <span className="text-sm font-black">{String(index + 1).padStart(2, '0')}</span>
                      </div>
                      <ArrowRight className={`h-4 w-4 text-slate-300 ${isAr ? 'rotate-180' : ''}`} />
                    </div>
                    <div className="text-base font-bold text-slate-900">{item.label}</div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-[1.75rem] bg-slate-900 px-5 py-4 text-white">
                <div className="text-sm font-bold">
                  {isAr ? 'النتيجة' : 'The outcome'}
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {isAr
                    ? 'بدل أقسام متفرقة، عندك الآن نقطة بداية أوضح ثم انتقال طبيعي للحاسبات والبروتوكولات والمتابعة.'
                    : 'Instead of disconnected sections, you now get a clearer starting point that leads naturally into calculators, protocols, and tracking.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
