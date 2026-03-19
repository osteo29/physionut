import {type ReactNode, memo, useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {
  BarChart3,
  BookOpen,
  Brain,
  HeartPulse,
  LogOut,
  Menu,
  Moon,
  Pill,
  Search,
  Stethoscope,
  Sun,
  UserRound,
  X,
} from 'lucide-react';
import {Link, useLocation} from 'react-router-dom';
import {
  getCurrentUser,
  isSupabaseConfigured,
  onSupabaseAuthChange,
  signOutCurrentUser,
  type User,
} from '../../lib/supabase';
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
    theme,
    onToggleTheme,
    setActiveCalculator,
    isSidebarOpen,
    setIsSidebarOpen,
  }: {
    t: any;
    lang: Language;
    setLang: (lang: Language) => void;
    calculators: CalculatorNavItem[];
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
    setActiveCalculator: (id: string) => void;
    isSidebarOpen: boolean;
    setIsSidebarOpen: (open: boolean) => void;
  }) => {
    const isAr = lang === 'ar';
    const location = useLocation();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
      let mounted = true;

      const loadUser = async () => {
        if (!isSupabaseConfigured) return;
        try {
          const currentUser = await getCurrentUser();
          if (mounted) setUser(currentUser);
        } catch {
          if (mounted) setUser(null);
        }
      };

      void loadUser();

      const subscription = isSupabaseConfigured
        ? onSupabaseAuthChange((_, session) => {
            if (!mounted) return;
            setUser(session?.user || null);
          }).data.subscription
        : null;

      return () => {
        mounted = false;
        subscription?.unsubscribe();
      };
    }, []);

    const handleLogout = async () => {
      try {
        await signOutCurrentUser();
      } catch {
        // Ignore here; dashboard/auth pages handle detailed auth feedback.
      } finally {
        setIsSidebarOpen(false);
      }
    };

    const authLabel = user?.email?.split('@')[0] || (isAr ? 'الحساب' : 'Account');

    const handleBrandClick = () => {
      setIsSidebarOpen(false);
      if (location.pathname === '/') {
        window.scrollTo({top: 0, behavior: 'smooth'});
      }
    };

    const brand = (
      <Link
        to="/"
        onClick={handleBrandClick}
        className="group flex items-center gap-2"
      >
        <div className="rounded-xl bg-health-green p-1.5 shadow-sm transition-transform duration-300 group-hover:rotate-6">
          <HeartPulse className="h-5 w-5 text-white" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-base font-black leading-[0.85] tracking-tight text-slate-900 sm:text-lg">
            PHYSIO
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-health-green">
            Nutrition
          </span>
        </div>
      </Link>
    );

    return (
      <>
        <AnimatePresence>
          {isSidebarOpen ? (
            <>
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                onClick={() => setIsSidebarOpen(false)}
                className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.aside
                initial={{x: isAr ? '100%' : '-100%'}}
                animate={{x: 0}}
                exit={{x: isAr ? '100%' : '-100%'}}
                transition={{type: 'spring', damping: 24, stiffness: 220}}
                className={`fixed top-0 z-[70] flex h-full w-[88vw] max-w-sm flex-col bg-white shadow-2xl ${
                  isAr ? 'right-0' : 'left-0'
                }`}
              >
                <div className="flex items-center justify-between border-b border-slate-100 p-5">
                  {brand}
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex-1 space-y-7 overflow-y-auto p-5">
                  <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                      {isAr ? 'ابدأ بسرعة' : 'Quick start'}
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <button
                        onClick={() => {
                          setIsSidebarOpen(false);
                          scrollToId('calculators');
                        }}
                        className="rounded-2xl bg-health-green px-4 py-3 text-sm font-bold text-white transition-all hover:bg-health-green-dark"
                      >
                        {isAr ? 'افتح الحاسبات' : 'Open calculators'}
                      </button>
                      <Link
                        to="/assistant"
                        onClick={() => setIsSidebarOpen(false)}
                        className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition-all hover:border-health-green/30"
                      >
                        <Stethoscope className="h-4 w-4 text-health-green" />
                        <span>{isAr ? 'المساعد السريري' : 'Clinical assistant'}</span>
                      </Link>
                    </div>
                  </div>

                  <div className="rounded-[1.75rem] border border-slate-200 bg-white p-4">
                    <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                      {isAr ? 'الحساب' : 'Account'}
                    </div>
                    {user ? (
                      <div className="space-y-3">
                        <div className="rounded-2xl bg-slate-50 p-3">
                          <div className="text-sm font-bold text-slate-900">{authLabel}</div>
                          <div className="mt-1 text-xs text-slate-500">{user.email}</div>
                        </div>
                        <Link
                          to="/dashboard"
                          onClick={() => setIsSidebarOpen(false)}
                          className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 transition-all hover:bg-soft-blue"
                        >
                          <BarChart3 className="h-4 w-4 text-health-green" />
                          <span>{isAr ? 'لوحة المتابعة' : 'Open dashboard'}</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-600 transition-all hover:bg-rose-100"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>{isAr ? 'تسجيل الخروج' : 'Log out'}</span>
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-2">
                        <Link
                          to="/auth"
                          onClick={() => setIsSidebarOpen(false)}
                          className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition-all hover:border-health-green/30"
                        >
                          {isAr ? 'إنشاء حساب' : 'Create account'}
                        </Link>
                        <Link
                          to="/auth"
                          onClick={() => setIsSidebarOpen(false)}
                          className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-slate-800"
                        >
                          <UserRound className="h-4 w-4" />
                          <span>{isAr ? 'تسجيل الدخول' : 'Sign in'}</span>
                        </Link>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="mb-3 px-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                      {t.nav.calculators}
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {calculators.map((calc) => (
                        <button
                          key={calc.id}
                          onClick={() => {
                            setActiveCalculator(calc.id);
                            setIsSidebarOpen(false);
                            scrollToId('calculators');
                          }}
                          className="flex items-center gap-3 rounded-2xl border border-transparent bg-slate-50 p-3 text-left text-slate-700 transition-all hover:border-health-green/20 hover:bg-soft-blue"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-health-green shadow-sm">
                            {calc.icon}
                          </div>
                          <span className="text-sm font-semibold">{calc.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 px-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                      {isAr ? 'الأقسام الرئيسية' : 'Main sections'}
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        {
                          href: '#architect',
                          icon: <Brain className="h-5 w-5" />,
                          label: t.architect.title,
                        },
                        {
                          href: '#food-db',
                          icon: <Search className="h-5 w-5" />,
                          label: isAr ? 'قاعدة الطعام' : 'Food data',
                        },
                        {
                          href: '#drug-nutrient-checker',
                          icon: <Pill className="h-5 w-5" />,
                          label: isAr ? 'فحص الدواء والغذاء' : 'Drug-nutrient checker',
                        },
                        {
                          href: '/dashboard',
                          icon: <BarChart3 className="h-5 w-5" />,
                          label: isAr ? 'لوحة المتابعة' : 'Tracking dashboard',
                        },
                        {
                          href: '#blog',
                          icon: <BookOpen className="h-5 w-5" />,
                          label: t.nav.insights,
                        },
                      ].map((item) =>
                        item.href.startsWith('/') ? (
                          <Link
                            key={item.href}
                            to={item.href}
                            onClick={() => setIsSidebarOpen(false)}
                            className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 text-slate-700 transition-all hover:bg-soft-blue"
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-health-green shadow-sm">
                              {item.icon}
                            </div>
                            <span className="text-sm font-semibold">{item.label}</span>
                          </Link>
                        ) : (
                          <a
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsSidebarOpen(false)}
                            className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 text-slate-700 transition-all hover:bg-soft-blue"
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-health-green shadow-sm">
                              {item.icon}
                            </div>
                            <span className="text-sm font-semibold">{item.label}</span>
                          </a>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 bg-slate-50/60 p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-500">
                      {isAr ? 'اللغة' : 'Language'}
                    </span>
                    <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1">
                      <button
                        onClick={() => setLang('en')}
                        className={`rounded-full px-3 py-1 text-[10px] font-black ${
                          lang === 'en' ? 'bg-health-green text-white' : 'text-slate-400'
                        }`}
                      >
                        EN
                      </button>
                      <button
                        onClick={() => setLang('ar')}
                        className={`rounded-full px-3 py-1 text-[10px] font-black ${
                          lang === 'ar' ? 'bg-health-green text-white' : 'text-slate-400'
                        }`}
                      >
                        AR
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={onToggleTheme}
                    className="mb-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition-all hover:border-health-green/30"
                  >
                    {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    <span>
                      {theme === 'dark'
                        ? isAr
                          ? 'الوضع الفاتح'
                          : 'Switch to light mode'
                        : isAr
                          ? 'الوضع الداكن'
                          : 'Switch to dark mode'}
                    </span>
                  </button>
                </div>
              </motion.aside>
            </>
          ) : null}
        </AnimatePresence>

        <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/85 px-4 backdrop-blur-md sm:px-6 lg:px-8">
          <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 py-2">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="rounded-xl p-2 text-slate-600 transition-colors hover:bg-slate-100"
              >
                <Menu className="h-6 w-6" />
              </button>
              {brand}
            </div>

            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
              <div className="hidden items-center gap-6 lg:flex">
                <a href="#calculators" className="nav-link">
                  {t.nav.calculators}
                </a>
                <a href="#blog" className="nav-link">
                  {t.nav.insights}
                </a>
                <a href="/dashboard" className="nav-link">
                  {isAr ? 'المتابعة' : 'Tracking'}
                </a>
              </div>

              <Link
                to="/assistant"
                className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700 transition-all hover:border-health-green/30 sm:flex"
              >
                <Stethoscope className="h-4 w-4 text-health-green" />
                <span className="hidden text-xs font-bold lg:inline">
                  {isAr ? 'المساعد' : 'Assistant'}
                </span>
              </Link>

              {user ? (
                <Link
                  to="/dashboard"
                  className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-700 transition-all hover:border-health-green/30 sm:flex"
                >
                  <UserRound className="h-4 w-4 text-health-green" />
                  <span className="hidden text-xs font-bold lg:inline">{authLabel}</span>
                </Link>
              ) : (
                <div className="hidden items-center gap-2 sm:flex">
                  <Link
                    to="/auth"
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-700 transition-all hover:border-health-green/30"
                  >
                    <span className="text-xs font-bold">{isAr ? 'إنشاء حساب' : 'Create account'}</span>
                  </Link>
                  <Link
                    to="/auth"
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-white transition-all hover:bg-slate-800"
                  >
                    <UserRound className="h-4 w-4" />
                    <span className="text-xs font-bold">{isAr ? 'تسجيل الدخول' : 'Sign in'}</span>
                  </Link>
                </div>
              )}

              <div className="hidden items-center gap-1 rounded-full border border-slate-200 bg-slate-100 p-1 sm:flex">
                <button
                  onClick={() => setLang('en')}
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    lang === 'en' ? 'bg-white text-health-green shadow-sm' : 'text-slate-500'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang('ar')}
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    lang === 'ar' ? 'bg-white text-health-green shadow-sm' : 'text-slate-500'
                  }`}
                >
                  AR
                </button>
              </div>

              <button
                onClick={onToggleTheme}
                className="hidden rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700 transition-all hover:border-health-green/30 sm:flex"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>

              <button
                onClick={() => scrollToId('calculators')}
                className="rounded-full bg-health-green px-4 py-2 text-sm font-semibold text-white shadow-md shadow-health-green/10 transition-all hover:bg-health-green-dark sm:px-5"
              >
                {isAr ? 'ابدأ' : 'Start'}
              </button>
            </div>
          </div>
        </nav>
      </>
    );
  },
);

Navigation.displayName = 'Navigation';
export default Navigation;
