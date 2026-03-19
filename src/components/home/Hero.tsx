import {memo} from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'motion/react';
import {
  Activity,
  Calculator,
  GraduationCap,
  MessageSquareText,
  ShieldCheck,
  UserRoundPlus,
} from 'lucide-react';
import type {Language} from '../../services/translations';
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
    <section className="relative overflow-hidden bg-soft-blue pb-16 pt-16 sm:pb-20 sm:pt-18 lg:pb-24 lg:pt-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(49,95,74,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(109,122,114,0.12),transparent_28%)]" />
      <div className="identity-watermark whitespace-pre-line">
        {isAr ? 'تغذية\nتأهيل\nمتابعة' : 'Nourish\nRecover\nTrack'}
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
              ? 'منصة تغذية وعلاج طبيعي مبنية على أدوات عملية'
              : 'A practical platform for nutrition and physical therapy'}
          </span>
        </motion.div>

        <motion.h1
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.08}}
          className="mx-auto mb-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
        >
          {isAr ? 'صمم خطتك الصحية' : 'Build your health plan'}{' '}
          <span className="relative text-health-green">
            {isAr ? 'بدقة علمية' : 'with clinical precision'}
          </span>
          <br />
          <span className="text-slate-900">
            {isAr ? 'تغذية وتأهيل في مكان واحد' : 'nutrition and rehab in one place'}
          </span>
        </motion.h1>

        <motion.p
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.16}}
          className="mx-auto mb-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg"
        >
          {isAr
            ? 'احسب سعراتك، ماكروز جسمك، واحتياجاتك من البروتين والماء بناءً على معادلات طبية معروفة. منصة PhysioNutrition تساعدك تربط بين التغذية، الحركة، والمتابعة بخطوات أوضح وأسهل.'
            : 'Estimate calories, macros, protein, and hydration using established medical formulas. PhysioNutrition helps connect nutrition, movement, and follow-up in a clearer way.'}
        </motion.p>

        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.19}}
          className="mx-auto mb-7 max-w-3xl rounded-[1.5rem] border border-white/70 bg-white/80 px-4 py-4 text-sm leading-7 text-slate-700 shadow-sm backdrop-blur-sm sm:px-5"
        >
          {isAr
            ? 'هنا تجد حاسبات تغذية، محتوى تأهيلي، ومتابعة عملية بدل أدوات منفصلة لا تربط بين النتيجة والخطوة التالية.'
            : 'Here you get calculators, rehab-focused content, and follow-up tools that work together instead of isolated pages.'}
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
          className="mx-auto mb-4 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2"
        >
          <Link
            to="/auth"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-health-green px-6 py-4 text-sm font-bold text-white shadow-lg shadow-health-green/20 transition-all hover:bg-health-green-dark"
          >
            <UserRoundPlus className="h-5 w-5" />
            {isAr ? 'ابدأ الآن مجانًا' : 'Start free now'}
          </Link>
          <a
            href="#calculators"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-900 transition-all hover:border-health-green"
          >
            <Calculator className="h-5 w-5 text-health-green" />
            {isAr ? 'استكشف الحاسبات' : 'Explore calculators'}
          </a>
        </motion.div>

        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.32}}
          className="mb-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="/assistant"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition-all hover:border-health-green"
          >
            <MessageSquareText className="h-4 w-4 text-health-green" />
            {isAr ? 'اسأل المساعد' : 'Ask the assistant'}
          </a>
          <a
            href="#architect"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-slate-800"
          >
            <Activity className="h-4 w-4" />
            {isAr ? 'خطة التعافي' : 'Recovery planner'}
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
