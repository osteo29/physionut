import {ReactNode} from 'react';
import {Link} from 'react-router-dom';
import usePreferredLang from './usePreferredLang';

export default function PageLayout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const lang = usePreferredLang();
  return (
    <div className="min-h-screen bg-soft-blue" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <header className="border-b border-slate-200/70 bg-white/70 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <Link to="/" className="font-black tracking-tight text-slate-900">
            PhysioHub
          </Link>
          <nav className="flex items-center gap-5 text-sm font-semibold text-slate-700">
            <Link className="hover:text-health-green" to="/privacy">
              {lang === 'en' ? 'Privacy' : 'الخصوصية'}
            </Link>
            <Link className="hover:text-health-green" to="/terms">
              {lang === 'en' ? 'Terms' : 'الشروط'}
            </Link>
            <Link className="hover:text-health-green" to="/cookies">
              {lang === 'en' ? 'Cookies' : 'ملفات الارتباط'}
            </Link>
            <Link className="hover:text-health-green" to="/disclaimer">
              {lang === 'en' ? 'Disclaimer' : 'إخلاء مسؤولية'}
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6">
          {title}
        </h1>
        <div className="prose prose-slate max-w-none">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

