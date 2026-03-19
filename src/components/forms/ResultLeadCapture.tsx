import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {LoaderCircle, LockKeyhole, Save, ShieldCheck} from 'lucide-react';
import {
  getCurrentUser,
  getSupabaseActionErrorMessage,
  getSupabaseConfigurationMessage,
  isSupabaseConfigured,
  onSupabaseAuthChange,
  saveAssessment,
  type User,
} from '../../lib/supabase';

export default function ResultLeadCapture({
  lang,
  calculatorName,
  valueLabel,
  valueNumeric,
  valueUnit,
}: {
  lang: 'en' | 'ar';
  calculatorName: string;
  valueLabel: string;
  valueNumeric: number | null;
  valueUnit: string | null;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (mounted) setUser(currentUser);
      } catch {
        if (mounted) setUser(null);
      }
    };

    if (isSupabaseConfigured) {
      void loadUser();
    }

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

  const handleSave = async () => {
    if (status === 'saving') return;

    if (!isSupabaseConfigured) {
      setStatus('error');
      setMessage(getSupabaseConfigurationMessage(lang));
      return;
    }

    if (!user) {
      setStatus('error');
      setMessage(
        lang === 'en'
          ? 'Sign in first to save this result to your secure tracking log.'
          : 'سجل الدخول أولًا لحفظ هذه النتيجة داخل سجل المتابعة الآمن.',
      );
      return;
    }

    setStatus('saving');
    setMessage('');

    try {
      await saveAssessment({
        calculator_type: calculatorName,
        value_label: valueLabel,
        value_numeric: valueNumeric,
        value_unit: valueUnit,
        lang,
        note: null,
      });

      setStatus('saved');
      setMessage(
        lang === 'en'
          ? 'Saved to your follow-up log. Open the dashboard to review progress.'
          : 'تم الحفظ في سجل المتابعة. افتح لوحة المتابعة لمراجعة التقدم.',
      );
    } catch (error) {
      setStatus('error');
      setMessage(getSupabaseActionErrorMessage(error, lang, 'save'));
    }
  };

  return (
    <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-health-green">
        <Save className="h-3.5 w-3.5" />
        <span>{lang === 'en' ? 'Secure tracking log' : 'سجل متابعة آمن'}</span>
      </div>

      {user ? (
        <div className="mb-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          <div className="font-semibold text-slate-900">
            {lang === 'en' ? 'Signed in as' : 'تم تسجيل الدخول باسم'}
          </div>
          <div className="mt-1">{user.email}</div>
        </div>
      ) : (
        <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <div className="mb-2 flex items-center gap-2 font-semibold text-amber-800">
            <LockKeyhole className="h-4 w-4" />
            <span>{lang === 'en' ? 'Login required' : 'تسجيل الدخول مطلوب'}</span>
          </div>
          <p className="text-sm leading-6 text-amber-700">
            {lang === 'en'
              ? 'Create an account or sign in to save results securely and review them later from your dashboard.'
              : 'أنشئ حسابًا أو سجّل الدخول لحفظ النتائج بشكل آمن والرجوع إليها لاحقًا من لوحة المتابعة.'}
          </p>
          <Link
            to="/auth"
            className="mt-3 inline-flex items-center justify-center rounded-2xl bg-slate-900 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-slate-800"
          >
            {lang === 'en' ? 'Open login' : 'افتح تسجيل الدخول'}
          </Link>
        </div>
      )}

      <button
        onClick={handleSave}
        disabled={!user || status === 'saving'}
        className={`flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 font-bold transition-all ${
          user && status !== 'saving'
            ? 'bg-health-green text-white hover:bg-health-green-dark'
            : 'bg-slate-100 text-slate-400'
        }`}
      >
        {status === 'saving' ? (
          <>
            <LoaderCircle className="h-4 w-4 animate-spin" />
            <span>{lang === 'en' ? 'Saving' : 'جارٍ الحفظ'}</span>
          </>
        ) : (
          <span>{lang === 'en' ? 'Save result' : 'حفظ النتيجة'}</span>
        )}
      </button>

      <div className="mt-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="inline-flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="h-4 w-4 text-health-green" />
          <span>
            {lang === 'en'
              ? 'Saved results are linked to your account and protected by Supabase Auth + RLS.'
              : 'النتائج المحفوظة مرتبطة بحسابك ومحمية بواسطة Supabase Auth وRLS.'}
          </span>
        </div>
        {message ? (
          <div
            className={`text-xs font-semibold ${
              status === 'saved' ? 'text-health-green' : 'text-rose-600'
            }`}
          >
            {message}
          </div>
        ) : null}
      </div>
    </div>
  );
}
