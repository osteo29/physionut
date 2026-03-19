import {memo} from 'react';
import {motion} from 'motion/react';
import {
  Activity,
  Calculator,
  GraduationCap,
  MessageSquareText,
  ShieldCheck,
} from 'lucide-react';
import type {Language} from '../../services/translations';
import PwaActions from '../pwa/PwaActions';

const Hero = memo(({lang}: {lang: Language}) => {
  const isAr = lang === 'ar';

  const journey = [
    {
      icon: Calculator,
      title: isAr ? 'ابدأ من هدفك الغذائي' : 'Start from your nutrition goal',
      desc: isAr
        ? 'اختر السعرات أو البروتين أو التخسيس أو تقييم الجسم بدل التنقل بين أدوات عامة ومشتتة.'
        : 'Choose calories, protein, weight loss, or body assessment instead of jumping between scattered tools.',
    },
    {
      icon: Activity,
      title: isAr ? 'افهم النتيجة بسرعة' : 'Understand the result quickly',
      desc: isAr
        ? 'لن ترى أرقامًا فقط، بل تفسيرًا أوضح يساعدك تعرف ما إذا كنت على المسار الصحيح وما الذي يحتاج تعديلًا.'
        : 'Get more than a raw number with context that shows whether you are on track and what needs adjusting.',
    },
    {
      icon: MessageSquareText,
      title: isAr ? 'حوّل الحساب لخطوة عملية' : 'Turn calculations into action',
      desc: isAr
        ? 'حوّل النتيجة إلى هدف يومي أو متابعة أو سؤال ذكي للمساعد، مع مزايا إضافية للتعافي والإصابات داخل المنصة.'
        : 'Turn the result into a daily target, follow-up step, or a smart assistant question, with recovery tools available inside the platform.',
    },
  ];

  const trustPoints = isAr
    ? ['للتغذية والحاسبات اليومية', 'مفيد للتخسيس والمتابعة', 'التعافي والإصابات كميزة إضافية']
    : ['Built for nutrition tracking', 'Useful for fat loss and follow-up', 'Recovery tools included'];

  return (
    <section className="relative overflow-hidden bg-soft-blue pb-16 pt-16 sm:pb-20 sm:pt-18 lg:pb-24 lg:pt-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(49,95,74,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(109,122,114,0.12),transparent_28%)]" />
      <div className="identity-watermark whitespace-pre-line">
        {isAr ? 'تغذية\nتوازن\nمتابعة' : 'Nourish\nBalance\nTrack'}
      </div>
      <div className="pointer-events-none absolute right-0 top-0 h-[380px] w-[380px] -translate-y-1/3 translate-x-1/4 rounded-full bg-health-green/6 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[380px] w-[380px] translate-y-1/3 -translate-x-1/4 rounded-full bg-medical-blue/8 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-health-green/20 bg-white/85 px-4 py-2 text-xs font-bold text-health-green shadow-sm sm:text-sm"
        >
          <GraduationCap className="h-4 w-4" />
          <span>
            {isAr
              ? 'حاسبات تغذية وصحة مع أدوات متابعة ذكية'
              : 'Nutrition and health calculators with smart follow-up tools'}
          </span>
        </motion.div>

        <motion.h1
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.08}}
          className="mx-auto mb-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
        >
          {isAr ? 'احسب سعراتك واحتياجاتك الغذائية' : 'Calculate your calories and nutrition needs'}{' '}
          <span className="relative text-health-green">
            {isAr ? 'في ثوانٍ' : 'in seconds'}
          </span>
        </motion.h1>

        <motion.p
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.16}}
          className="mx-auto mb-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg"
        >
          {isAr
            ? 'منصة للحاسبات الغذائية، التخسيس، تحليل النتائج، والمتابعة اليومية بشكل أوضح وأسهل. وإذا كنت مهتمًا بالتعافي أو الإصابات، ستجد لهما أدوات متخصصة داخل الموقع أيضًا.'
            : 'A platform for nutrition calculators, fat loss planning, clearer result analysis, and easier daily follow-up, with specialized recovery tools available when you need them.'}
        </motion.p>

        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.19}}
          className="mx-auto mb-7 max-w-3xl rounded-[1.5rem] border border-white/70 bg-white/80 px-4 py-4 text-sm leading-7 text-slate-700 shadow-sm backdrop-blur-sm sm:px-5"
        >
          {isAr
            ? 'ابدأ بالحاسبات الأساسية مثل السعرات والبروتين والماء وتقييم الجسم، ثم انتقل إلى المتابعة أو الأدوات المتقدمة عند الحاجة.'
            : 'Start with core tools like calories, protein, hydration, and body assessment, then move into tracking or advanced tools when needed.'}
        </motion.div>

        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.22}}
          className="mb-8 flex snap-x gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center sm:overflow-visible"
        >
          {trustPoints.map((point) => (
            <div
              key={point}
              className="inline-flex min-w-max snap-start items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-sm font-semibold text-slate-700"
            >
              <ShieldCheck className="h-4 w-4 text-health-green" />
              <span>{point}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.3}}
          className="mx-auto mb-7 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3"
        >
          <a
            href="#calculators"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-health-green px-6 py-4 text-sm font-bold text-white shadow-lg shadow-health-green/20 transition-all hover:bg-health-green-dark"
          >
            <Calculator className="h-5 w-5" />
            {isAr ? 'ابدأ الحاسبات' : 'Start calculators'}
          </a>
          <a
            href="/assistant"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-900 transition-all hover:border-health-green"
          >
            <MessageSquareText className="h-5 w-5 text-health-green" />
            {isAr ? 'حلل نتيجتك' : 'Analyze your result'}
          </a>
          <a
            href="#architect"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-slate-900/15 transition-all hover:bg-slate-800"
          >
            <Activity className="h-5 w-5" />
            {isAr ? 'لوحة المتابعة' : 'Tracking planner'}
          </a>
        </motion.div>

        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.34}}
          className="mx-auto mb-10 flex max-w-3xl justify-center"
        >
          <PwaActions lang={lang} />
        </motion.div>

        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.38}}
          className="grid grid-cols-1 gap-4 text-left md:grid-cols-3"
        >
          {journey.map((item) => (
            <div
              key={item.title}
              className="rounded-[1.75rem] border border-white/70 bg-white/85 p-5 shadow-sm backdrop-blur-sm"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-soft-blue text-health-green">
                <item.icon className="h-5 w-5" />
              </div>
              <div className="mb-2 font-bold text-slate-900">{item.title}</div>
              <p className="text-sm leading-6 text-slate-600">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
