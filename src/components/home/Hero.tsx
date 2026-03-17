import {memo} from 'react';
import {motion} from 'motion/react';
import {Activity, Calculator, GraduationCap} from 'lucide-react';

const Hero = memo(({t}: {t: any}) => (
  <section className="relative pt-20 pb-32 overflow-hidden bg-soft-blue">
    {/* Decorative Background Elements */}
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-health-green/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-medical-blue/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-health-green/10 text-health-green text-sm font-bold mb-8 border border-health-green/20"
      >
        <GraduationCap className="w-4 h-4" />
        <span>{t.hero.badge}</span>
      </motion.div>
      <motion.h1
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.1}}
        className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight mb-8 tracking-tight"
      >
        {t.hero.title} <br />
        <span className="text-health-green relative">
          {t.hero.titleAccent}
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
        className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed"
      >
        {t.hero.subtitle}
      </motion.p>

      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.3}}
        className="flex flex-wrap justify-center gap-4"
      >
        <a
          href="#calculators"
          className="px-8 py-4 bg-health-green text-white font-bold rounded-2xl hover:bg-health-green-dark transition-all shadow-xl shadow-health-green/20 flex items-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          {t.nav.calculators}
        </a>
        <a
          href="#architect"
          className="px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl border border-slate-200 hover:border-health-green transition-all shadow-sm flex items-center gap-2"
        >
          <Activity className="w-5 h-5 text-health-green" />
          {t.nav.insights}
        </a>
      </motion.div>
    </div>
  </section>
));

Hero.displayName = 'Hero';

export default Hero;

