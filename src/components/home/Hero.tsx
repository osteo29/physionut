import {memo} from 'react';
import {Link} from 'react-router-dom';
import {
  Activity,
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

  const journey = [
    {
      icon: Calculator,
      title: isAr ? 'ابدأ من أرقامك الحقيقية' : 'Start from real numbers',
      desc: isAr
        ? 'احسب السعرات، الماكروز، البروتين، والماء بدل التخمين أو الاعتماد على نصائح عامة.'
        : 'Estimate calories, macros, protein, and hydration instead of guessing.',
    },
    {
      icon: Activity,
      title: isAr ? 'اربط التغذية بالحركة' : 'Connect nutrition with movement',
      desc: isAr
        ? 'افهم كيف تؤثر الحركة والتأهيل على النتيجة بدل النظر للأكل أو التمرين كل واحد لوحده.'
        : 'See how movement and rehab affect progress instead of separating food from performance.',
    },
    {
      icon: ShieldCheck,
      title: isAr ? 'تحرك بخطة أوضح' : 'Move with a clearer plan',
      desc: isAr
        ? 'استخدم النتائج كخطوة عملية للمتابعة والتعديل بدل الوقوف عند مجرد رقم.'
        : 'Use your results as a practical next step instead of stopping at a single number.',
    },
  ];

  const trustPoints = isAr
    ? ['تغذية + تأهيل', 'مبني على معادلات معروفة', 'تعليمي وآمن وغير تشخيصي']
    : ['Nutrition + rehab', 'Built on established formulas', 'Educational, not diagnostic'];

  return (
    <section className="hero-surface relative overflow-hidden pb-16 pt-16 sm:pb-20 sm:pt-18 lg:pb-24 lg:pt-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(49,95,74,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(109,122,114,0.12),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(255,255,255,0.6),transparent)]" />
      <div className="identity-watermark whitespace-pre-line">
        {isAr ? 'تغذية\nتأهيل\nمتابعة' : 'Nourish\nRecover\nTrack'}
      </div>
      <div className="pointer-events-none absolute right-0 top-0 h-[380px] w-[380px] -translate-y-1/3 translate-x-1/4 rounded-full bg-health-green/6 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[380px] w-[380px] translate-y-1/3 -translate-x-1/4 rounded-full bg-medical-blue/8 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-20 h-40 w-40 -translate-x-1/2 rounded-full border border-white/50 bg-white/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="glass-panel mb-6 inline-flex items-center gap-2 rounded-full border border-health-green/20 px-4 py-2 text-xs font-bold text-health-green sm:text-sm">
          <GraduationCap className="h-4 w-4" />
          <span>
            {isAr
              ? 'منصة تغذية وعلاج طبيعي مبنية على أدوات عملية'
              : 'A practical platform for nutrition and physical therapy'}
          </span>
        </div>

        <h1 className="mx-auto mb-5 max-w-4xl text-4xl font-black leading-[1.15] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          {isAr ? 'صمم خطة تعافيك' : 'Build your recovery plan'}{' '}
          <span className="relative bg-gradient-to-r from-health-green to-health-green-dark bg-clip-text text-transparent">
            {isAr ? 'بدقة طبية' : 'with clinical precision'}
          </span>
          <br />
          <span className="text-slate-800 font-extrabold mt-2 block text-3xl sm:text-4xl lg:text-5xl">
            {isAr ? 'تغذية وتأهيل رياضي متكامل' : 'Integrated nutrition & rehab'}
          </span>
        </h1>

        <p className="mx-auto mb-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
          {isAr
            ? 'احسب سعراتك، ماكروز جسمك، واحتياجاتك من البروتين والماء بناءً على معادلات طبية معروفة. منصة PhysioNutrition تساعدك تربط بين التغذية، الحركة، والمتابعة بخطوات أوضح وأسهل.'
            : 'Estimate calories, macros, protein, and hydration using established medical formulas. PhysioNutrition helps connect nutrition, movement, and follow-up in a clearer way.'}
        </p>

        <div className="glass-panel mx-auto mb-7 max-w-3xl rounded-[1.75rem] border border-health-green/10 bg-white/60 backdrop-blur-md px-5 py-4 text-sm font-medium leading-7 text-slate-700 shadow-sm sm:px-6">
          {isAr
            ? 'هنا تجد حاسبات تغذية، بروتوكولات إصابات تفصيلية، ومتابعة عملية تدلك على خطوتك التالية في رحلة التعافي.'
            : 'Find nutrition calculators, detailed injury protocols, and practical follow-up tools that guide your next step in recovery.'}
        </div>

        <div className="mb-8 flex snap-x gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center sm:overflow-visible">
          {trustPoints.map((point) => (
            <div
              key={point}
              className="glass-panel inline-flex min-w-max snap-start items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
            >
              <ShieldCheck className="h-4 w-4 text-health-green" />
              <span>{point}</span>
            </div>
          ))}
        </div>

        <div className="mx-auto mb-6 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            to={navigationPaths.auth(lang)}
            className="group relative overflow-hidden flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-4 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-health-green/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-health-green/20 to-medical-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <UserRoundPlus className="relative z-10 h-5 w-5 transition-transform group-hover:scale-110" />
            <span className="relative z-10">{isAr ? 'ابدأ رحلتك مجانًا' : 'Start your journey free'}</span>
          </Link>
          <a
            href={navigationPaths.injuries(lang)}
            className="group relative overflow-hidden flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm px-6 py-4 text-sm font-bold text-slate-900 shadow-sm transition-all hover:-translate-y-1 hover:border-health-green/50 hover:shadow-md hover:bg-white"
          >
            <Activity className="h-5 w-5 text-health-green transition-transform group-hover:scale-110" />
            <span>{isAr ? 'تصفح بروتوكولات الإصابات' : 'Browse injury protocols'}</span>
          </a>
        </div>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href={navigationPaths.assistant(lang)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/50 backdrop-blur-sm px-5 py-3 text-sm font-bold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-health-green hover:bg-white"
          >
            <MessageSquareText className="h-4 w-4 text-health-green" />
            {isAr ? 'اسأل الذكاء الاصطناعي' : 'Ask AI Assistant'}
          </a>
          <a
            href="#architect"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/50 backdrop-blur-sm px-5 py-3 text-sm font-bold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-health-green hover:bg-white"
          >
            <Calculator className="h-4 w-4 text-health-green" />
            {isAr ? 'حاسبات التغذية' : 'Nutrition calculators'}
          </a>
        </div>

        <div className="mx-auto mb-10 flex max-w-3xl justify-center">
          <PwaActions lang={lang} />
        </div>

        <div className="grid grid-cols-1 gap-4 text-left md:grid-cols-3">
          {journey.map((item) => (
            <div
              key={item.title}
              className="glass-panel rounded-[1.9rem] border border-white/70 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-soft-blue text-health-green">
                <item.icon className="h-5 w-5" />
              </div>
              <div className="mb-2 font-bold text-slate-900">{item.title}</div>
              <p className="text-sm leading-6 text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
