import {ReactNode, memo} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {
  BookOpen,
  Brain,
  HeartPulse,
  Info,
  Menu,
  X,
} from 'lucide-react';
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
    return (
      <>
        {/* Sidebar Navigation */}
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
                  <div className="flex items-center gap-2">
                    <div className="bg-health-green p-1.5 rounded-lg">
                      <HeartPulse className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900">
                      Physio<span className="text-health-green">Hub</span>
                    </span>
                  </div>
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
                          <span className="font-medium text-sm">
                            {calc.title}
                          </span>
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
                        <span className="font-medium text-sm">
                          {t.architect.title}
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
                        <span className="font-medium text-sm">
                          {t.nav.insights}
                        </span>
                      </a>
                      <a
                        href="#about"
                        onClick={() => setIsSidebarOpen(false)}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-all group"
                      >
                        <div className="p-2 rounded-lg bg-slate-50 group-hover:bg-white transition-colors">
                          <Info className="w-5 h-5" />
                        </div>
                        <span className="font-medium text-sm">
                          {t.nav.about}
                        </span>
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
                        className={`px-3 py-1 rounded-full text-[10px] font-black transition-all ${
                          lang === 'en'
                            ? 'bg-health-green text-white shadow-md'
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        EN
                      </button>
                      <button
                        onClick={() => setLang('ar')}
                        className={`px-3 py-1 rounded-full text-[10px] font-black transition-all ${
                          lang === 'ar'
                            ? 'bg-health-green text-white shadow-md'
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        AR
                      </button>
                    </div>
                  </div>
                  <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10">
                    {t.nav.getStarted}
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Navigation Bar */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-600"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-2">
                  <div className="bg-health-green p-1.5 rounded-lg">
                    <HeartPulse className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-bold tracking-tight text-slate-900">
                    Physio<span className="text-health-green">Hub</span>
                  </span>
                </div>
              </div>

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

                <div className="h-6 w-px bg-slate-200" />

                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-full border border-slate-200">
                  <button
                    onClick={() => setLang('en')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      lang === 'en'
                        ? 'bg-white text-health-green shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLang('ar')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      lang === 'ar'
                        ? 'bg-white text-health-green shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    AR
                  </button>
                </div>

                <button className="bg-health-green text-white px-5 py-2 rounded-full font-semibold hover:bg-health-green-dark transition-colors shadow-lg shadow-health-green/20">
                  {t.nav.getStarted}
                </button>
              </div>

              <div className="lg:hidden flex items-center gap-2">
                <button
                  onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                  className="p-2 text-xs font-bold text-health-green hover:bg-soft-blue rounded-lg transition-colors"
                >
                  {lang === 'en' ? 'AR' : 'EN'}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </>
    );
  },
);

Navigation.displayName = 'Navigation';

export default Navigation;

