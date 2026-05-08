import {type ReactNode} from 'react';
import {Moon, Sun} from 'lucide-react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useStoredTheme} from '../hooks/useStoredTheme';
import {setPreferredLanguage} from '../services/languagePreference';
import {decodeMojibake} from '../services/textEncoding';
import usePreferredLang from './usePreferredLang';

export type PageLayoutRelatedLink = {
  label: string;
  href: string;
  description?: string;
};

export default function PageLayout({
  title,
  children,
  relatedLinks = [],
  relatedTitle,
}: {
  title: string;
  children: ReactNode;
  relatedLinks?: PageLayoutRelatedLink[];
  relatedTitle?: string;
}) {
  const lang = usePreferredLang();
  const location = useLocation();
  const navigate = useNavigate();
  const isAr = lang === 'ar';
  const {theme, toggleTheme} = useStoredTheme();
  const ar = (text: string) => decodeMojibake(text);

  const handleBrandClick = () => {
    const rootPath = `/${lang}/`;
    if (location.pathname === rootPath && typeof window !== 'undefined') {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  };

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
    <div className="min-h-screen bg-soft-blue dark:bg-slate-950" dir={isAr ? 'rtl' : 'ltr'}>
      <header className="border-b border-slate-200/70 bg-white/70 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <Link to={`/${lang}/`} onClick={handleBrandClick} className="font-black tracking-tight text-slate-900 dark:text-white">
            PhysioNutrition
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <nav className="flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-700 dark:text-slate-200">
              <Link className="hover:text-health-green" to={`/${lang}/injuries`}>
                {isAr ? ar('Ø¨Ø±ÙˆØªÙˆÙƒÙˆÙ„Ø§Øª Ø§Ù„Ø¥ØµØ§Ø¨Ø§Øª') : 'Injury Protocols'}
              </Link>
              <Link className="hover:text-health-green" to={`/${lang}/exercises`}>
                {isAr ? ar('Ø§Ù„ØªÙ…Ø§Ø±ÙŠÙ†') : 'Exercises'}
              </Link>
              <Link className="hover:text-health-green" to={`/${lang}/diets`}>
                {isAr ? ar('Ø®Ø·Ø· Ø§Ù„ØªØºØ°ÙŠØ©') : 'Diet Plans'}
              </Link>
              <Link className="hover:text-health-green" to={`/${lang}/insights`}>
                {isAr ? ar('Ø§Ù„Ù…Ù‚Ø§Ù„Ø§Øª') : 'Insights'}
              </Link>
              <Link className="hover:text-health-green" to={`/${lang}/about`}>
                {isAr ? ar('Ù…Ù† Ù†Ø­Ù†') : 'About'}
              </Link>
              <Link className="hover:text-health-green" to={`/${lang}/contact`}>
                {isAr ? ar('Ø§ØªØµÙ„ Ø¨Ù†Ø§') : 'Contact'}
              </Link>
            </nav>

            <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-100 p-1 dark:border-slate-700 dark:bg-slate-900">
              <button
                type="button"
                onClick={() => handleLanguageSwitch('en')}
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  lang === 'en' ? 'bg-white text-health-green shadow-sm dark:bg-slate-800' : 'text-slate-700 dark:text-slate-200'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => handleLanguageSwitch('ar')}
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  lang === 'ar' ? 'bg-white text-health-green shadow-sm dark:bg-slate-800' : 'text-slate-700 dark:text-slate-200'
                }`}
              >
                AR
              </button>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-health-green/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span>
                {theme === 'dark'
                  ? isAr
                    ? ar('Ø§Ù„ÙˆØ¶Ø¹ Ø§Ù„ÙØ§ØªØ­')
                    : 'Light mode'
                  : isAr
                    ? ar('Ø§Ù„ÙˆØ¶Ø¹ Ø§Ù„Ø¯Ø§ÙƒÙ†')
                    : 'Dark mode'}
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-3xl font-black text-slate-900 dark:text-white sm:text-4xl">{title}</h1>
        <div className="space-y-6">
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
              {children}
            </div>
          </div>

          {relatedLinks.length > 0 ? (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-lg font-black text-slate-900 dark:text-white">
                  {relatedTitle ?? (isAr ? ar('ØµÙØ­Ø§Øª Ø°Ø§Øª ØµÙ„Ø©') : 'Related pages')}
                </h2>
                <Link to={`/${lang}/`} className="text-sm font-semibold text-health-green transition hover:text-health-green-dark">
                  {isAr ? ar('Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©') : 'Home'}
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {relatedLinks.map((item) => (
                  <Link
                    key={`${item.href}-${item.label}`}
                    to={item.href}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-health-green/40 hover:bg-health-green/5 dark:border-slate-700 dark:bg-slate-950"
                  >
                    <div className="text-sm font-bold text-slate-900 dark:text-white">{item.label}</div>
                    {item.description ? <div className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.description}</div> : null}
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </main>
    </div>
  );
}
