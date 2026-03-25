import {type ReactNode} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {setPreferredLanguage} from '../services/languagePreference';
import usePreferredLang from './usePreferredLang';

export default function PageLayout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const lang = usePreferredLang();
  const location = useLocation();
  const navigate = useNavigate();

  const handleBrandClick = () => {
    const rootPath = `/${lang}/`;
    if (location.pathname === rootPath && typeof window !== 'undefined') {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  };

  /**
   * Generate URL for language switch
   */
  const generateLanguageSwitchUrl = (targetLang: 'en' | 'ar'): string => {
    const pathname = location.pathname;
    const match = pathname.match(/^\/(en|ar)\//);
    
    if (match) {
      return pathname.replace(/^\/(en|ar)\//, `/${targetLang}/`);
    }
    
    return `/${targetLang}${pathname}`;
  };

  const handleLanguageSwitch = (targetLang: 'en' | 'ar') => {
    if (targetLang === lang) return;
    setPreferredLanguage(targetLang);
    navigate(generateLanguageSwitchUrl(targetLang));
  };

  return (
    <div className="min-h-screen bg-soft-blue" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <header className="border-b border-slate-200/70 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <Link to={`/${lang}/`} onClick={handleBrandClick} className="font-black tracking-tight text-slate-900">
            PhysioNutrition
          </Link>

          <div className="flex flex-wrap items-center gap-4">
            <nav className="flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-700">
              <Link className="hover:text-health-green" to={`/${lang}/privacy`}>
                {lang === 'en' ? 'Privacy' : 'الخصوصية'}
              </Link>
              <Link className="hover:text-health-green" to={`/${lang}/about`}>
                {lang === 'en' ? 'About' : 'من نحن'}
              </Link>
              <Link className="hover:text-health-green" to={`/${lang}/contact`}>
                {lang === 'en' ? 'Contact' : 'اتصل بنا'}
              </Link>
              <Link className="hover:text-health-green" to={`/${lang}/injuries`}>
                {lang === 'en' ? 'Injury Protocols' : 'بروتوكولات الإصابات'}
              </Link>
              <Link className="hover:text-health-green" to={`/${lang}/diets`}>
                {lang === 'en' ? 'Diet & Regimens' : 'الدايت والريجيم'}
              </Link>
              <Link className="hover:text-health-green" to={`/${lang}/terms`}>
                {lang === 'en' ? 'Terms' : 'الشروط'}
              </Link>
            </nav>

            <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => handleLanguageSwitch('en')}
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  lang === 'en' ? 'bg-white text-health-green shadow-sm' : 'text-slate-500'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => handleLanguageSwitch('ar')}
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  lang === 'ar' ? 'bg-white text-health-green shadow-sm' : 'text-slate-500'
                }`}
              >
                AR
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-3xl font-black text-slate-900 sm:text-4xl">{title}</h1>
        <div className="prose prose-slate max-w-none">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
