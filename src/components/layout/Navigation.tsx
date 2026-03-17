import {ReactNode, memo} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {
  BookOpen,
  Brain,
  HeartPulse,
  Menu,
  X,
  Stethoscope,
  ChevronRight,
} from 'lucide-react';
import {Link, useLocation} from 'react-router-dom';
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
    const location = useLocation();

    // دالة التعامل مع اللوجو: سكرول فوق أو رجوع للهوم
    const handleLogoClick = (e: React.MouseEvent) => {
      if (location.pathname === '/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      setIsSidebarOpen(false);
    };

    const BrandLogo = ({ className = "" }: { className?: string }) => (
      <Link 
        to="/" 
        onClick={handleLogoClick} 
        className={`flex items-center gap-2 group cursor-pointer ${className}`}
      >
        <div className="bg-health-green p-1.5 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-sm">
          <HeartPulse className="w-5 h-5 text-white" />
        </div>
        <div className="flex flex-col justify-center text-left leading-tight">
          <span className="text-base font-black tracking-tight text-slate-900 italic uppercase">
            Physio
          </span>
          <div className="flex items-center gap-1 -mt-0.5">
            <span className="text-[9px] font-bold tracking-[0.12em] text-health-green uppercase">
              Nutrition
            </span>
            <div className="h-[1px] w-2 bg-health-green/30" />
          </div>
        </div>
      </Link>
    );

    return (
      <>
        {/* Sidebar Navigation - المحسن والملموم */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                onClick={() => setIsSidebarOpen(false)}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
              />
              <motion.div
                initial={{x: lang === 'ar' ? '100%' : '-100%'}}
                animate={{x: 0}}
                exit={{x: lang === 'ar' ? '100%' : '-100%'}}
                transition={{type: 'spring', damping: 25, stiffness: 220}}
                className={`fixed top-0 ${lang === 'ar' ? 'right-0' : 'left-0'} bottom-0 w-72 bg-white z-[70] shadow-2xl flex flex-col`}
              >
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                  <BrandLogo className="scale-90 origin-left" />
                  <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-6">
                  {/* قسم المساعد - شكل الكارد بقى أنحف */}
                  <div>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-3 px-1">Clinic AI</h3>
                    <Link 
                      to="/assistant" 
                      onClick={() => setIsSidebarOpen(false)}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 hover:border-health-green/40 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white shadow-sm group-hover:bg-health-green group-hover:text-white transition-colors">
                          <Stethoscope className="w-4 h-4 text-health-green group-hover:text-white" />
                        </div>
                        <span className="font-bold text-xs text-slate-700">{lang === 'en' ? 'Clinical Assistant' : 'المساعد السريري'}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-health-green transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>

                  {/* قسم الأدوات */}
                  <div>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-3 px-1">{t.nav.calculators}</h3>
                    <div className="grid grid-cols-1 gap-1">
                      {calculators.map((calc) => (
                        <button
                          key={calc.id}
                          onClick={() => {
                            setActiveCalculator(calc.id);
                            setIsSidebarOpen(false);
                            scrollToId('calculators');
                          }}
                          className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-health-green/5 text-slate-600 hover:text-health-green transition-all group"
                        >
                          <span className="p-1.5 rounded-md bg-slate-50 group-hover:bg-white transition-colors">{calc.icon}</span>
                          <span className="font-bold text-xs">{calc.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Sidebar */}
                <div className="p-5 border-t border-slate-100 bg-slate-50/50">
                   <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 mb-4">
                      <button onClick={() => setLang('en')} className={`flex-1 py-1.5 rounded-md text-[10px] font-black transition-all ${lang === 'en' ? 'bg-health-green text-white shadow-sm' : 'text-slate-400'}`}>EN</button>
                      <button onClick={() => setLang('ar')} className={`flex-1 py-1.5 rounded-md text-[10px] font-black transition-all ${lang === 'ar' ? 'bg-health-green text-white shadow-sm' : 'text-slate-400'}`}>AR</button>
                   </div>
                   <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-xs shadow-lg shadow-slate-900/10">
                     {t.nav.getStarted}
                   </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Navigation Bar - الـ Slim UI الجديد */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 h-14 flex items-center shadow-sm">
          <div className="max-w-6xl mx-auto w-full px-4 flex justify-between items-center">
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-500 md:hidden"
              >
                <Menu className="w-5 h-5" />
              </button>
              <BrandLogo className="scale-90 origin-left" />
            </div>

            {/* روابط الكمبيوتر - ملمومة وشيك */}
            <div className="hidden md:flex items-center bg-slate-100/60 p-1 rounded-full border border-slate-200/50">
              <a href="#calculators" onClick={(e) => { e.preventDefault(); scrollToId('calculators'); }} className="px-5 py-1.5 text-[11px] font-black text-slate-500 hover:text-health-green transition-all uppercase tracking-wide">Tools</a>
              <a href="#architect" className="px-5 py-1.5 text-[11px] font-black text-slate-500 hover:text-health-green transition-all uppercase tracking-wide">Roadmaps</a>
              <a href="#blog" className="px-5 py-1.5 text-[11px] font-black text-slate-500 hover:text-health-green transition-all uppercase tracking-wide">Insights</a>
            </div>

            <div className="flex items-center gap-3">
              <Link 
                to="/assistant" 
                className="flex items-center gap-2 px-3 py-1.5 bg-health-green/10 text-health-green rounded-lg border border-health-green/20 hover:bg-health-green hover:text-white transition-all group"
              >
                <Stethoscope className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-black hidden sm:inline uppercase">AI Clinic</span>
              </Link>

              <div className="h-4 w-px bg-slate-200 hidden md:block" />

              <div className="hidden md:flex items-center gap-1 bg-slate-50 p-1 rounded-lg border border-slate-200">
                <button onClick={() => setLang('en')} className={`px-2 py-0.5 rounded-md text-[9px] font-black ${lang === 'en' ? 'bg-white text-health-green shadow-sm' : 'text-slate-400'}`}>EN</button>
                <button onClick={() => setLang('ar')} className={`px-2 py-0.5 rounded-md text-[9px] font-black ${lang === 'ar' ? 'bg-white text-health-green shadow-sm' : 'text-slate-400'}`}>AR</button>
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