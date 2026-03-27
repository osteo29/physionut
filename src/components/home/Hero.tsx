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
      title: isAr ? 'Ø§Ø¨Ø¯Ø£ Ù…Ù† Ø£Ø±Ù‚Ø§Ù…Ùƒ Ø§Ù„Ø­Ù‚ÙŠÙ‚ÙŠØ©' : 'Start from real numbers',
      desc: isAr
        ? 'Ø§Ø­Ø³Ø¨ Ø§Ù„Ø³Ø¹Ø±Ø§ØªØŒ Ø§Ù„Ù…Ø§ÙƒØ±ÙˆØ²ØŒ Ø§Ù„Ø¨Ø±ÙˆØªÙŠÙ†ØŒ ÙˆØ§Ù„Ù…Ø§Ø¡ Ø¨Ø¯Ù„ Ø§Ù„ØªØ®Ù…ÙŠÙ† Ø£Ùˆ Ø§Ù„Ø§Ø¹ØªÙ…Ø§Ø¯ Ø¹Ù„Ù‰ Ù†ØµØ§Ø¦Ø­ Ø¹Ø§Ù…Ø©.'
        : 'Estimate calories, macros, protein, and hydration instead of guessing.',
    },
    {
      icon: Activity,
      title: isAr ? 'Ø§Ø±Ø¨Ø· Ø§Ù„ØªØºØ°ÙŠØ© Ø¨Ø§Ù„Ø­Ø±ÙƒØ©' : 'Connect nutrition with movement',
      desc: isAr
        ? 'Ø§ÙÙ‡Ù… ÙƒÙŠÙ ØªØ¤Ø«Ø± Ø§Ù„Ø­Ø±ÙƒØ© ÙˆØ§Ù„ØªØ£Ù‡ÙŠÙ„ Ø¹Ù„Ù‰ Ø§Ù„Ù†ØªÙŠØ¬Ø© Ø¨Ø¯Ù„ Ø§Ù„Ù†Ø¸Ø± Ù„Ù„Ø£ÙƒÙ„ Ø£Ùˆ Ø§Ù„ØªÙ…Ø±ÙŠÙ† ÙƒÙ„ ÙˆØ§Ø­Ø¯ Ù„ÙˆØ­Ø¯Ù‡.'
        : 'See how movement and rehab affect progress instead of separating food from performance.',
    },
    {
      icon: ShieldCheck,
      title: isAr ? 'ØªØ­Ø±Ùƒ Ø¨Ø®Ø·Ø© Ø£ÙˆØ¶Ø­' : 'Move with a clearer plan',
      desc: isAr
        ? 'Ø§Ø³ØªØ®Ø¯Ù… Ø§Ù„Ù†ØªØ§Ø¦Ø¬ ÙƒØ®Ø·ÙˆØ© Ø¹Ù…Ù„ÙŠØ© Ù„Ù„Ù…ØªØ§Ø¨Ø¹Ø© ÙˆØ§Ù„ØªØ¹Ø¯ÙŠÙ„ Ø¨Ø¯Ù„ Ø§Ù„ÙˆÙ‚ÙˆÙ Ø¹Ù†Ø¯ Ù…Ø¬Ø±Ø¯ Ø±Ù‚Ù….'
        : 'Use your results as a practical next step instead of stopping at a single number.',
    },
  ];

  const trustPoints = isAr
    ? ['ØªØºØ°ÙŠØ© + ØªØ£Ù‡ÙŠÙ„', 'Ù…Ø¨Ù†ÙŠ Ø¹Ù„Ù‰ Ù…Ø¹Ø§Ø¯Ù„Ø§Øª Ù…Ø¹Ø±ÙˆÙØ©', 'ØªØ¹Ù„ÙŠÙ…ÙŠ ÙˆØ¢Ù…Ù† ÙˆØºÙŠØ± ØªØ´Ø®ÙŠØµÙŠ']
    : ['Nutrition + rehab', 'Built on established formulas', 'Educational, not diagnostic'];

  return (
    <section className="hero-surface relative overflow-hidden pb-16 pt-16 sm:pb-20 sm:pt-18 lg:pb-24 lg:pt-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(49,95,74,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(109,122,114,0.12),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(255,255,255,0.6),transparent)]" />
      <div className="identity-watermark whitespace-pre-line">
        {isAr ? 'ØªØºØ°ÙŠØ©\nØªØ£Ù‡ÙŠÙ„\nÙ…ØªØ§Ø¨Ø¹Ø©' : 'Nourish\nRecover\nTrack'}
      </div>
      <div className="pointer-events-none absolute right-0 top-0 h-[380px] w-[380px] -translate-y-1/3 translate-x-1/4 rounded-full bg-health-green/6 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[380px] w-[380px] translate-y-1/3 -translate-x-1/4 rounded-full bg-medical-blue/8 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-20 h-40 w-40 -translate-x-1/2 rounded-full border border-white/50 bg-white/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="glass-panel mb-6 inline-flex items-center gap-2 rounded-full border border-health-green/20 px-4 py-2 text-xs font-bold text-health-green sm:text-sm">
          <GraduationCap className="h-4 w-4" />
          <span>
            {isAr
              ? 'Ù…Ù†ØµØ© ØªØºØ°ÙŠØ© ÙˆØ¹Ù„Ø§Ø¬ Ø·Ø¨ÙŠØ¹ÙŠ Ù…Ø¨Ù†ÙŠØ© Ø¹Ù„Ù‰ Ø£Ø¯ÙˆØ§Øª Ø¹Ù…Ù„ÙŠØ©'
              : 'A practical platform for nutrition and physical therapy'}
          </span>
        </div>

        <h1 className="mx-auto mb-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          {isAr ? 'ØµÙ…Ù… Ø®Ø·ØªÙƒ Ø§Ù„ØµØ­ÙŠØ©' : 'Build your health plan'}{' '}
          <span className="relative text-health-green">
            {isAr ? 'Ø¨Ø¯Ù‚Ø© Ø¹Ù„Ù…ÙŠØ©' : 'with clinical precision'}
          </span>
          <br />
          <span className="text-slate-900">
            {isAr ? 'ØªØºØ°ÙŠØ© ÙˆØªØ£Ù‡ÙŠÙ„ ÙÙŠ Ù…ÙƒØ§Ù† ÙˆØ§Ø­Ø¯' : 'nutrition and rehab in one place'}
          </span>
        </h1>

        <p className="mx-auto mb-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
          {isAr
            ? 'Ø§Ø­Ø³Ø¨ Ø³Ø¹Ø±Ø§ØªÙƒØŒ Ù…Ø§ÙƒØ±ÙˆØ² Ø¬Ø³Ù…ÙƒØŒ ÙˆØ§Ø­ØªÙŠØ§Ø¬Ø§ØªÙƒ Ù…Ù† Ø§Ù„Ø¨Ø±ÙˆØªÙŠÙ† ÙˆØ§Ù„Ù…Ø§Ø¡ Ø¨Ù†Ø§Ø¡Ù‹ Ø¹Ù„Ù‰ Ù…Ø¹Ø§Ø¯Ù„Ø§Øª Ø·Ø¨ÙŠØ© Ù…Ø¹Ø±ÙˆÙØ©. Ù…Ù†ØµØ© PhysioNutrition ØªØ³Ø§Ø¹Ø¯Ùƒ ØªØ±Ø¨Ø· Ø¨ÙŠÙ† Ø§Ù„ØªØºØ°ÙŠØ©ØŒ Ø§Ù„Ø­Ø±ÙƒØ©ØŒ ÙˆØ§Ù„Ù…ØªØ§Ø¨Ø¹Ø© Ø¨Ø®Ø·ÙˆØ§Øª Ø£ÙˆØ¶Ø­ ÙˆØ£Ø³Ù‡Ù„.'
            : 'Estimate calories, macros, protein, and hydration using established medical formulas. PhysioNutrition helps connect nutrition, movement, and follow-up in a clearer way.'}
        </p>

        <div className="glass-panel mx-auto mb-7 max-w-3xl rounded-[1.75rem] border border-white/70 px-4 py-4 text-sm leading-7 text-slate-700 sm:px-5">
          {isAr
            ? 'Ù‡Ù†Ø§ ØªØ¬Ø¯ Ø­Ø§Ø³Ø¨Ø§Øª ØªØºØ°ÙŠØ©ØŒ Ù…Ø­ØªÙˆÙ‰ ØªØ£Ù‡ÙŠÙ„ÙŠØŒ ÙˆÙ…ØªØ§Ø¨Ø¹Ø© Ø¹Ù…Ù„ÙŠØ© Ø¨Ø¯Ù„ Ø£Ø¯ÙˆØ§Øª Ù…Ù†ÙØµÙ„Ø© Ù„Ø§ ØªØ±Ø¨Ø· Ø¨ÙŠÙ† Ø§Ù„Ù†ØªÙŠØ¬Ø© ÙˆØ§Ù„Ø®Ø·ÙˆØ© Ø§Ù„ØªØ§Ù„ÙŠØ©.'
            : 'Here you get calculators, rehab-focused content, and follow-up tools that work together instead of isolated pages.'}
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

        <div className="mx-auto mb-4 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
          <Link
            to={navigationPaths.auth(lang)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-health-green px-6 py-4 text-sm font-bold text-white shadow-lg shadow-health-green/20 transition-all hover:-translate-y-0.5 hover:bg-health-green-dark"
          >
            <UserRoundPlus className="h-5 w-5" />
            {isAr ? 'Ø§Ø¨Ø¯Ø£ Ø§Ù„Ø¢Ù† Ù…Ø¬Ø§Ù†Ù‹Ø§' : 'Start free now'}
          </Link>
          <a
            href="#calculators"
            className="glass-panel inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-6 py-4 text-sm font-bold text-slate-900 transition-all hover:-translate-y-0.5 hover:border-health-green"
          >
            <Calculator className="h-5 w-5 text-health-green" />
            {isAr ? 'Ø§Ø³ØªÙƒØ´Ù Ø§Ù„Ø­Ø§Ø³Ø¨Ø§Øª' : 'Explore calculators'}
          </a>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={navigationPaths.assistant(lang)}
            className="glass-panel inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-health-green"
          >
            <MessageSquareText className="h-4 w-4 text-health-green" />
            {isAr ? 'Ø§Ø³Ø£Ù„ Ø§Ù„Ù…Ø³Ø§Ø¹Ø¯' : 'Ask the assistant'}
          </a>
          <a
            href="#architect"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-slate-800"
          >
            <Activity className="h-4 w-4" />
            {isAr ? 'Ø®Ø·Ø© Ø§Ù„ØªØ¹Ø§ÙÙŠ' : 'Recovery planner'}
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
