import {type ReactNode} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {setPreferredLanguage} from '../services/languagePreference';
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
    <div className="min-h-screen bg-soft-blue" dir={isAr ? 'rtl' : 'ltr'}>
      <header className="border-b border-slate-200/70 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <Link to={`/${lang}/`} onClick={handleBrandClick} className="font-black tracking-tight text-slate-900">
            PhysioNutrition
          </Link>

          <div className="flex flex-wrap items-center gap-4">
            <nav className="flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-700">
              <Link className="hover:text-health-green" to={`/${lang}/injuries`}>
                {isAr ? '?????????? ????????' : 'Injury Protocols'}
              </Link>
              <Link className="hover:text-health-green" to={`/${lang}/exercises`}>
                {isAr ? '????????' : 'Exercises'}
              </Link>
              <Link className="hover:text-health-green" to={`/${lang}/diets`}>
                {isAr ? '??????? ????????' : 'Diet Plans'}
              </Link>
              <Link className="hover:text-health-green" to={`/${lang}/insights`}>
                {isAr ? '????????' : 'Insights'}
              </Link>
              <Link className="hover:text-health-green" to={`/${lang}/about`}>
                {isAr ? '?? ???' : 'About'}
              </Link>
              <Link className="hover:text-health-green" to={`/${lang}/contact`}>
                {isAr ? '???? ???' : 'Contact'}
              </Link>
            </nav>

            <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => handleLanguageSwitch('en')}
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  lang === 'en' ? 'bg-white text-health-green shadow-sm' : 'text-slate-700'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => handleLanguageSwitch('ar')}
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  lang === 'ar' ? 'bg-white text-health-green shadow-sm' : 'text-slate-700'
                }`}
              >
                AR
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-3xl font-black text-slate-900 sm:text-4xl">{title}</h1>
        <div className="space-y-6">
          <div className="prose prose-slate max-w-none">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              {children}
            </div>
          </div>

          {relatedLinks.length > 0 ? (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-lg font-black text-slate-900">
                  {relatedTitle ?? (isAr ? '????? ??????' : 'Related pages')}
                </h2>
                <Link to={`/${lang}/`} className="text-sm font-semibold text-health-green transition hover:text-health-green-dark">
                  {isAr ? '????????' : 'Home'}
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {relatedLinks.map((item) => (
                  <Link
                    key={`${item.href}-${item.label}`}
                    to={item.href}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-health-green/40 hover:bg-health-green/5"
                  >
                    <div className="text-sm font-bold text-slate-900">{item.label}</div>
                    {item.description ? <div className="mt-1 text-sm leading-6 text-slate-600">{item.description}</div> : null}
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
