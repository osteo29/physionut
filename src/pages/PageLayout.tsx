import {type ReactNode} from 'react';
import {Link, useLocation} from 'react-router-dom';
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

  const handleBrandClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  };

  return (
    <div className="min-h-screen bg-soft-blue" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <header className="border-b border-slate-200/70 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-6 px-4 py-5 sm:px-6 lg:px-8">
          <Link to="/" onClick={handleBrandClick} className="font-black tracking-tight text-slate-900">
            PhysioNutrition
          </Link>
          <nav className="flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-700">
            <Link className="hover:text-health-green" to="/privacy">
              {lang === 'en' ? 'Privacy' : 'الخصوصية'}
            </Link>
            <Link className="hover:text-health-green" to="/about">
              {lang === 'en' ? 'About' : 'من نحن'}
            </Link>
            <Link className="hover:text-health-green" to="/contact">
              {lang === 'en' ? 'Contact' : 'اتصل بنا'}
            </Link>
            <Link className="hover:text-health-green" to="/terms">
              {lang === 'en' ? 'Terms' : 'الشروط'}
            </Link>
            <Link className="hover:text-health-green" to="/cookies">
              {lang === 'en' ? 'Cookies' : 'الكوكيز'}
            </Link>
            <Link className="hover:text-health-green" to="/disclaimer">
              {lang === 'en' ? 'Disclaimer' : 'إخلاء المسؤولية'}
            </Link>
          </nav>
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
