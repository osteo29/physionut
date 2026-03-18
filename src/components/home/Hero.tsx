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

const Hero = memo(({lang}: {lang: Language}) => {
  const isAr = lang === 'ar';

  const journey = [
    {
      icon: Calculator,
      title: isAr ? 'اختر الحاسبة المناسبة' : 'Pick the right calculator',
      desc: isAr
        ? 'ابدأ من هدفك: سعرات، بروتين، تعافٍ، أو تقييم جسم.'
        : 'Start from your goal: calories, protein, recovery, or body assessment.',
    },
    {
      icon: Activity,
      title: isAr ? 'افهم النتيجة بسرعة' : 'Understand the result fast',
      desc: isAr
        ? 'لا نعرض الرقم فقط، بل نشرح معناه وما الذي يجب الانتباه له.'
        : 'Get more than a number with context and what it actually means.',
    },
    {
      icon: MessageSquareText,
      title: isAr ? 'خذ خطوة عملية' : 'Take a practical next step',
      desc: isAr
        ? 'حوّل النتيجة إلى وجبات، أهداف، وتوصيات للتعافي.'
        : 'Turn the result into meals, targets, and recovery guidance.',
    },
  ];

  const trustPoints = isAr
    ? ['للإصابات والتعافي', 'مناسب للـ rehab', 'إرشادي وغير تشخيصي']
    : ['Built for injury recovery', 'Useful for rehab planning', 'Educational, not diagnostic'];

  return (
    <section className="relative pt-20 pb-24 overflow-hidden bg-soft-blue">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.16),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.14),transparent_28%)] pointer-events-none" />
      <div className="identity-watermark whitespace-pre-line">
        {isAr ? 'حركة\nتعافٍ\nتغذية' : 'Move\nRecover\nNourish'}
      </div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-health-green/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-medical-blue/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 text-health-green text-sm font-bold mb-8 border border-health-green/20 shadow-sm"
        >
          <GraduationCap className="w-4 h-4" />
          <span>
            {isAr
              ? 'حاسبات علاج طبيعي + تغذية للتعافي'
              : 'Physio + nutrition calculators for recovery'}
          </span>
        </motion.div>

        <motion.h1
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.1}}
          className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight mb-6 tracking-tight"
        >
          {isAr ? 'احسب احتياجات التعافي' : 'Calculate recovery needs'} <br />
          <span className="text-health-green relative">
            {isAr ? 'في أقل من 30 ثانية' : 'in under 30 seconds'}
            <svg
              className="absolute -bottom-2 left-0 w-full h-3 text-health-green/20"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <path
                d="M0 5 Q 25 0, 50 5 T 100 5"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </motion.h1>

        <motion.p
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.2}}
          className="text-lg sm:text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          {isAr
            ? 'موقع مخصص للمصابين، التعافي، وأخصائيي العلاج الطبيعي: احسب السعرات، البروتين، الماء، والماكروز ثم خذ توصيات أوضح بدل أرقام فقط.'
            : 'A focused tool for injury recovery, rehab, and clinicians: calculate calories, protein, hydration, and macros, then get clearer guidance instead of numbers alone.'}
        </motion.p>

        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.25}}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {trustPoints.map((point) => (
            <div
              key={point}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white/80 text-slate-700 text-sm font-semibold"
            >
              <ShieldCheck className="w-4 h-4 text-health-green" />
              <span>{point}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.3}}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          <a
            href="#calculators"
            className="px-8 py-4 bg-health-green text-white font-bold rounded-2xl hover:bg-health-green-dark transition-all shadow-xl shadow-health-green/20 flex items-center gap-2"
          >
            <Calculator className="w-5 h-5" />
            {isAr ? 'احسب الآن' : 'Calculate now'}
          </a>
          <a
            href="/assistant"
            className="px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl border border-slate-200 hover:border-health-green transition-all shadow-sm flex items-center gap-2"
          >
            <MessageSquareText className="w-5 h-5 text-health-green" />
            {isAr ? 'اسأل المساعد' : 'Ask the assistant'}
          </a>
          <a
            href="#architect"
            className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/15 flex items-center gap-2"
          >
            <Activity className="w-5 h-5" />
            {isAr ? 'افتح لوحة التعافي' : 'Open recovery dashboard'}
          </a>
        </motion.div>

        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.4}}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto text-left"
        >
          {journey.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/70 bg-white/80 backdrop-blur-sm p-5 shadow-sm"
            >
              <div className="w-11 h-11 rounded-2xl bg-soft-blue text-health-green flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5" />
              </div>
              <div className="font-bold text-slate-900 mb-2">{item.title}</div>
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
