import {Download, FileLock2} from 'lucide-react';
import {useMemo, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';

export default function AuthLockedPdfAction({
  isAuthenticated,
  lang,
  onAuthorized,
  buttonLabel,
  teaserTitle,
}: {
  isAuthenticated: boolean;
  lang: 'en' | 'ar';
  onAuthorized: () => void;
  buttonLabel: string;
  teaserTitle?: string;
}) {
  const isAr = lang === 'ar';
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const redirectState = useMemo(
    () => ({from: `${location.pathname}${location.search}${location.hash}`}),
    [location.hash, location.pathname, location.search],
  );

  if (isAuthenticated) {
    return (
      <button
        type="button"
        onClick={onAuthorized}
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-health-green px-5 py-3 text-sm font-bold text-white transition-all hover:bg-health-green-dark"
      >
        <Download className="h-4 w-4" />
        <span>{buttonLabel}</span>
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition-all hover:border-health-green/40"
      >
        <FileLock2 className="h-4 w-4 text-health-green" />
        <span>{buttonLabel}</span>
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/55 px-4">
          <div className="w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-2xl">
            <div className="mb-4 inline-flex rounded-full bg-health-green/10 p-3 text-health-green">
              <FileLock2 className="h-5 w-5" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              {teaserTitle || (isAr ? 'التقرير الذكي متاح بعد التسجيل' : 'Smart PDF unlocks after sign in')}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {isAr
                ? 'أنشئ حسابًا في PhysioNutrition لتقرأ تقريرك الاحترافي وتحمله كملف PDF بتصميم أنيق، مع ملخص النتائج، الروابط، وملف يمكنك الرجوع له لاحقًا من أي جهاز.'
                : 'Create an account in PhysioNutrition to open and download your polished PDF report with your results, links, and a reusable copy you can revisit later.'}
            </p>
            <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">
              {isAr
                ? 'بعد التسجيل ستتمكن من إنشاء التقرير، قراءته، وتنزيله في أي وقت من داخل الموقع.'
                : 'After signing in, you will be able to generate, read, and download the report any time inside the site.'}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/auth"
                state={redirectState}
                className="inline-flex flex-1 items-center justify-center rounded-2xl bg-health-green px-5 py-3 text-sm font-bold text-white transition-all hover:bg-health-green-dark"
              >
                {isAr ? 'سجّل الآن لفتح الـ PDF' : 'Sign in to unlock PDF'}
              </Link>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex flex-1 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700"
              >
                {isAr ? 'لاحقًا' : 'Maybe later'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
