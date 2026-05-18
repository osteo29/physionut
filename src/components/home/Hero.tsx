import {memo} from 'react';
import {Link} from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  BarChart3,
  BookOpen,
  Calculator,
  GraduationCap,
  ShieldCheck,
  Stethoscope,
  Utensils,
} from 'lucide-react';
import type {Language} from '../../services/translations';
import {navigationPaths} from '../../utils/langUrlHelper';

const Hero = memo(({lang}: {lang: Language}) => {
  const isAr = lang === 'ar';

  const highlights = isAr
    ? [
        {
          label: 'ابدأ من الخطوة الأقرب لك',
          desc: 'افتح الحاسبات أو البروتوكولات مباشرة بدون التنقل بين أقسام كثيرة.',
        },
        {
          label: 'اربط التغذية بالتأهيل',
          desc: 'مسار أوضح يجمع الحركة والمتابعة والتغذية في نقطة بداية واحدة.',
        },
      ]
    : [
        {
          label: 'Start from the nearest next step',
          desc: 'Jump into calculators or protocols without bouncing through crowded sections.',
        },
        {
          label: 'Connect nutrition to rehab',
          desc: 'A calmer flow that brings movement, follow-up, and nutrition together.',
        },
      ];

  const valuePoints = isAr
    ? ['تغذية + تأهيل', 'مبني على مراجع ومعادلات معروفة']
    : ['Nutrition + rehab', 'Built on established formulas'];

  const quickAccessItems = [
    {
      to: navigationPaths.dashboard(lang),
      icon: <BarChart3 className="h-4 w-4 text-health-green" />,
      title: isAr ? 'المتابعة' : 'Tracking',
      description: isAr ? 'لوحة تقدمك ونتائجك' : 'Progress and results',
    },
    {
      to: navigationPaths.diets(lang),
      icon: <Utensils className="h-4 w-4 text-health-green" />,
      title: isAr ? 'الدايت' : 'Diets',
      description: isAr ? 'أنظمة غذائية مرتبة' : 'Structured diet plans',
    },
    {
      to: '/#blog',
      icon: <BookOpen className="h-4 w-4 text-health-green" />,
      title: isAr ? 'المقالات' : 'Insights',
      description: isAr ? 'محتوى مختصر ومفيد' : 'Short practical reads',
    },
  ];

  return (
    <section className="hero-surface home-band relative overflow-hidden pb-12 pt-10 sm:pb-16 lg:pb-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(49,95,74,0.12),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.34),transparent_34%)]" />
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 translate-x-1/4 -translate-y-1/4 rounded-full bg-health-green/8 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 -translate-x-1/4 translate-y-1/4 rounded-full bg-medical-blue/10 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.04fr)_minmax(320px,0.84fr)] lg:items-center">
          <div className={`max-w-3xl ${isAr ? 'lg:text-right' : 'lg:text-left'}`}>
            <div className="glass-panel mb-5 inline-flex items-center gap-2 rounded-full border border-health-green/15 px-4 py-2 text-[11px] font-bold text-health-green sm:text-xs">
              <GraduationCap className="h-4 w-4" />
              <span>
                {isAr
                  ? 'منصة عملية للتغذية والتأهيل والمتابعة'
                  : 'A practical platform for nutrition, rehab, and follow-up'}
              </span>
            </div>

            <h1 className="max-w-3xl text-3xl font-black leading-[1.02] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.35rem]">
              {isAr ? 'رتّب رحلة تعافيك' : 'Organize your recovery'}{' '}
              <span className="bg-gradient-to-r from-health-green to-health-green-dark bg-clip-text text-transparent">
                {isAr ? 'بصورة أهدأ وأوضح' : 'with less noise and more clarity'}
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              {isAr
                ? 'Active Rehab يجمع الحاسبات الغذائية وبروتوكولات الإصابات وأدوات المتابعة في بداية أبسط، حتى تعرف ما الذي تفتحه أولًا وما الخطوة التالية بعدها.'
                : 'Active Rehab brings calculators, injury protocols, and tracking into a simpler starting point so the next step feels obvious.'}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {valuePoints.map((point) => (
                <div
                  key={point}
                  className="metric-chip inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold text-slate-700 sm:text-sm"
                >
                  <ShieldCheck className="h-4 w-4 text-health-green" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
              <Link
                to={navigationPaths.injuries(lang)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-slate-800"
              >
                <Activity className="h-5 w-5" />
                <span>{isAr ? 'استكشف بروتوكولات الإصابات' : 'Browse injury protocols'}</span>
              </Link>
              <a
                href="#calculators"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/85 px-5 py-3.5 text-sm font-bold text-slate-900 shadow-sm transition-colors hover:border-health-green/40 hover:bg-white"
              >
                <Calculator className="h-5 w-5 text-health-green" />
                <span>{isAr ? 'افتح الحاسبات' : 'Open calculators'}</span>
              </a>
            </div>

            <div className="mt-4">
              <Link
                to={navigationPaths.assistant(lang)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900"
              >
                <Stethoscope className="h-4 w-4 text-health-green" />
                <span>{isAr ? 'أو اسأل المساعد السريري مباشرة' : 'Or ask the clinical assistant directly'}</span>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="panel-soft rounded-[2rem] p-4 sm:p-5">
              <div className="mb-4 flex items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-health-green">
                    {isAr ? 'مسار مبسّط' : 'Simplified flow'}
                  </div>
                  <div className="mt-1.5 text-xl font-black text-slate-900">
                    {isAr ? 'خطوتان واضحتان' : '2 focused steps'}
                  </div>
                </div>
                <div className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-bold tracking-[0.18em] text-white">
                  01-02
                </div>
              </div>

              <div className="space-y-3">
                {highlights.map((item, index) => (
                  <div
                    key={item.label}
                    className="rounded-[1.5rem] border border-slate-200 bg-white/88 p-4 shadow-sm transition-[box-shadow,border-color] hover:border-health-green/25 hover:shadow-md"
                  >
                    <div className="mb-2.5 flex items-center justify-between gap-3">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-health-green/10 text-health-green">
                        <span className="text-sm font-black">{String(index + 1).padStart(2, '0')}</span>
                      </div>
                      <ArrowRight className={`h-4 w-4 text-slate-300 ${isAr ? 'rotate-180' : ''}`} />
                    </div>
                    <div className="text-sm font-bold text-slate-900 sm:text-base">{item.label}</div>
                    <p className="mt-1.5 text-sm leading-6 text-slate-600">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-[1.5rem] bg-slate-900 px-4 py-3.5 text-white">
                <div className="text-sm font-bold">
                  {isAr ? 'النتيجة' : 'The outcome'}
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {isAr
                    ? 'واجهة أخف في البداية، ثم انتقال طبيعي إلى البروتوكولات أو الحاسبات أو المتابعة حسب ما تحتاجه الآن.'
                    : 'A lighter first screen, then a natural handoff into protocols, calculators, or tracking depending on what you need now.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-10">
          <div className="rounded-[1.75rem] border border-slate-200/80 bg-white/70 p-3 shadow-sm backdrop-blur sm:p-4">
            <div className="mb-3 flex items-center justify-between gap-3 px-1">
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                {isAr ? 'وصول سريع' : 'Quick access'}
              </div>
              <a
                href="#blog"
                className="text-xs font-semibold text-slate-500 transition-colors hover:text-slate-900"
              >
                {isAr ? 'استكشف المزيد' : 'Explore more'}
              </a>
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
              {quickAccessItems.map((item) =>
                item.to.startsWith('/#') ? (
                  <a
                    key={item.title}
                    href={item.to.slice(1)}
                    className="group rounded-[1.35rem] border border-slate-200 bg-white/90 p-4 transition-all hover:-translate-y-0.5 hover:border-health-green/30 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-health-green/10">
                        {item.icon}
                      </div>
                      <ArrowRight className={`h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-0.5 ${isAr ? 'rotate-180 group-hover:-translate-x-0.5 group-hover:translate-x-0' : ''}`} />
                    </div>
                    <div className="mt-3 text-sm font-bold text-slate-900">{item.title}</div>
                    <p className="mt-1 text-sm text-slate-500">{item.description}</p>
                  </a>
                ) : (
                  <Link
                    key={item.title}
                    to={item.to}
                    className="group rounded-[1.35rem] border border-slate-200 bg-white/90 p-4 transition-all hover:-translate-y-0.5 hover:border-health-green/30 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-health-green/10">
                        {item.icon}
                      </div>
                      <ArrowRight className={`h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-0.5 ${isAr ? 'rotate-180 group-hover:-translate-x-0.5 group-hover:translate-x-0' : ''}`} />
                    </div>
                    <div className="mt-3 text-sm font-bold text-slate-900">{item.title}</div>
                    <p className="mt-1 text-sm text-slate-500">{item.description}</p>
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
