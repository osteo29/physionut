import {ReactNode, memo} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {
  BookOpen,
  Brain,
  Pill,
  Search,
  HeartPulse,
  Menu,
  Stethoscope,
  X,
} from 'lucide-react';
import {Link} from 'react-router-dom';
import type {Language} from '../../services/translations';

type CalculatorNavItem = {
  id: string;
  title: string;
  icon: ReactNode;
};

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({behavior: 'smooth'});
}

const Navigation = memo(
  ({
    t,
    lang,
    setLang,
    calculators,
    setActiveCalculator,
    isSidebarOpen,
    setIsSidebarOpen,
  }: {
    t: any;
    lang: Language;
    setLang: (lang: Language) => void;
    calculators: CalculatorNavItem[];
    setActiveCalculator: (id: string) => void;
    isSidebarOpen: boolean;
    setIsSidebarOpen: (open: boolean) => void;
  }) => {
    const BrandLogo = () => (
      <Link
        to="/"
        onClick={() => setIsSidebarOpen(false)}
        className="flex items-center gap-2 group cursor-pointer"
      >
        <div className="bg-health-green p-1.5 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-sm">
          <HeartPulse className="w-5 h-5 text-white" />
        </div>
        <div className="flex flex-col justify-center text-left">
          <span className="text-lg font-black leading-[0.8] tracking-tight text-slate-900 italic">
            PHYSIO
          </span>
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-bold tracking-[0.15em] text-health-green uppercase">
              Nutrition
            </span>
            <div className="h-[1px] w-3 bg-health-green/30" />
          </div>
        </div>
      </Link>
    );

    return (
      <>
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                onClick={() => setIsSidebarOpen(false)}
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60]"
              />
              <motion.div
                initial={{x: lang === 'ar' ? '100%' : '-100%'}}
                animate={{x: 0}}
                exit={{x: lang === 'ar' ? '100%' : '-100%'}}
                transition={{type: 'spring', damping: 25, stiffness: 200}}
                className={`fixed top-0 ${
                  lang === 'ar' ? 'right-0' : 'left-0'
                } bottom-0 w-80 bg-white z-[70] shadow-2xl flex flex-col`}
              >
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <BrandLogo />
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-500" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">
                      {lang === 'en' ? 'Clinical Support' : 'الدعم السريري'}
                    </h3>
                    <Link
                      to="/assistant"
                      onClick={() => setIsSidebarOpen(false)}
                      className="flex items-center justify-between p-4 bg-slate-50 text-slate-700 rounded-2xl border border-slate-200 hover:border-health-green/30 hover:bg-white transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white shadow-sm group-hover:bg-health-green group-hover:text-white transition-colors">
                          <Stethoscope className="w-5 h-5 text-health-green group-hover:text-white" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-sm">
                            {lang === 'en' ? 'Clinical Assistant' : 'المساعد السريري'}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium italic">
                            Evidence-based AI
                          </span>
                        </div>
                      </div>
                      <span className="px-1.5 py-0.5 rounded-full text-[8px] font-black bg-slate-200 text-slate-600 uppercase">
                        Beta
                      </span>
                    </Link>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">
                      {t.nav.calculators}
                    </h3>
                    <div className="grid grid-cols-1 gap-1">
                      {calculators.map((calc) => (
                        <button
                          key={calc.id}
                          onClick={() => {
                            setActiveCalculator(calc.id);
                            setIsSidebarOpen(false);
                            scrollToId('calculators');
                          }}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-soft-blue text-slate-600 hover:text-health-green transition-all group"
                        >
                          <div className="p-2 rounded-lg bg-slate-50 group-hover:bg-white transition-colors">
                            {calc.icon}
                          </div>
                          <span className="font-medium text-sm">{calc.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">
                      {lang === 'en' ? 'Main Sections' : 'الأقسام الرئيسية'}
                    </h3>
                    <div className="space-y-1">
                      <a
                        href="#architect"
                        onClick={() => setIsSidebarOpen(false)}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-medical-blue/5 text-slate-600 hover:text-medical-blue transition-all group"
                      >
                        <div className="p-2 rounded-lg bg-slate-50 group-hover:bg-white transition-colors">
                          <Brain className="w-5 h-5" />
                        </div>
                        <span className="font-medium text-sm">{t.architect.title}</span>
                      </a>
                      <a
                        href="#food-db"
                        onClick={() => setIsSidebarOpen(false)}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-amber-50 text-slate-600 hover:text-amber-600 transition-all group"
                      >
                        <div className="p-2 rounded-lg bg-slate-50 group-hover:bg-white transition-colors">
                          <Search className="w-5 h-5" />
                        </div>
                        <span className="font-medium text-sm">
                          {lang === 'en' ? 'Food Data' : 'قاعدة بيانات الطعام'}
                        </span>
                      </a>
                      <a
                        href="#drug-nutrient-checker"
                        onClick={() => setIsSidebarOpen(false)}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-all group"
                      >
                        <div className="p-2 rounded-lg bg-slate-50 group-hover:bg-white transition-colors">
                          <Pill className="w-5 h-5" />
                        </div>
                        <span className="font-medium text-sm">
                          {lang === 'en' ? 'Drug-Nutrient Checker' : 'فحص تداخلات الدواء والغذاء'}
                        </span>
                      </a>
                      <a
                        href="#blog"
                        onClick={() => setIsSidebarOpen(false)}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-health-green/5 text-slate-600 hover:text-health-green transition-all group"
                      >
                        <div className="p-2 rounded-lg bg-slate-50 group-hover:bg-white transition-colors">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <span className="font-medium text-sm">{t.nav.insights}</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-slate-500">
                      {lang === 'en' ? 'Language' : 'اللغة'}
                    </span>
                    <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-slate-200">
                      <button
                        onClick={() => setLang('en')}
                        className={`px-3 py-1 rounded-full text-[10px] font-black ${
                          lang === 'en'
                            ? 'bg-health-green text-white shadow-md'
                            : 'text-slate-400'
                        }`}
                      >
                        EN
                      </button>
                      <button
                        onClick={() => setLang('ar')}
                        className={`px-3 py-1 rounded-full text-[10px] font-black ${
                          lang === 'ar'
                            ? 'bg-health-green text-white shadow-md'
                            : 'text-slate-400'
                        }`}
                      >
                        AR
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setIsSidebarOpen(false);
                      scrollToId('calculators');
                    }}
                    className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
                  >
                    {lang === 'en' ? 'Open calculators' : 'افتح الحاسبات'}
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-600"
            >
              <Menu className="w-6 h-6" />
            </button>
            <BrandLogo />
          </div>

          <div className="flex items-center gap-3 lg:gap-8">
            <div className="hidden lg:flex items-center gap-8">
              <a href="#calculators" className="nav-link">
                {t.nav.calculators}
              </a>
              <a href="#blog" className="nav-link">
                {t.nav.insights}
              </a>
              <a href="#about" className="nav-link">
                {t.nav.about}
              </a>
            </div>

            <Link
              to="/assistant"
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 text-slate-700 rounded-xl border border-slate-200 hover:border-health-green/30 hover:bg-white transition-all shadow-sm group"
            >
              <Stethoscope className="w-4 h-4 text-health-green group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold hidden sm:inline">
                {lang === 'en' ? 'Clinical Assistant' : 'المساعد السريري'}
              </span>
            </Link>

            <div className="h-6 w-px bg-slate-200 hidden sm:block" />

            <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  lang === 'en' ? 'bg-white text-health-green shadow-sm' : 'text-slate-500'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('ar')}
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  lang === 'ar' ? 'bg-white text-health-green shadow-sm' : 'text-slate-500'
                }`}
              >
                AR
              </button>
            </div>

            <button
              onClick={() => scrollToId('calculators')}
              className="hidden md:block bg-health-green text-white px-5 py-2 rounded-full font-semibold hover:bg-health-green-dark transition-all shadow-md shadow-health-green/10"
            >
              {lang === 'en' ? 'Start assessment' : 'ابدأ التقييم'}
            </button>
          </div>
        </nav>
      </>
    );
  },
);

Navigation.displayName = 'Navigation';
export default Navigation;
