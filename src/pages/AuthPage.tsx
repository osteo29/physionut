import {type FormEvent, useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {HeartPulse, LoaderCircle, LockKeyhole, Moon, Sun} from 'lucide-react';
import Seo from '../components/seo/Seo';
import usePreferredLang from './usePreferredLang';
import {
  getCurrentUser,
  getSupabaseActionErrorMessage,
  onSupabaseAuthChange,
  signInWithEmail,
  signUpWithEmail,
  type User,
} from '../lib/supabase';

export default function AuthPage({
  theme,
  onToggleTheme,
}: {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}) {
  const lang = usePreferredLang();
  const isAr = lang === 'ar';
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = (location.state as {from?: string} | null)?.from || '/dashboard';

  const [user, setUser] = useState<User | null>(null);
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (!mounted) return;
        setUser(currentUser);
        if (currentUser) {
          navigate(redirectTo, {replace: true});
        }
      } catch {
        if (mounted) setUser(null);
      }
    };

    void loadUser();

    const {data} = onSupabaseAuthChange((_, session) => {
      if (!mounted) return;
      setUser(session?.user || null);
      if (session?.user) {
        navigate(redirectTo, {replace: true});
      }
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, [navigate, redirectTo]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (loading) return;

    setLoading(true);
    setStatus('idle');
    setMessage('');

    try {
      if (mode === 'signup') {
        const result = await signUpWithEmail(email.trim(), password, {
          fullName: fullName.trim(),
        });

        if (result.user && !result.session) {
          setStatus('success');
          setMessage(
            isAr
              ? 'تم إنشاء الحساب. تحقق من بريدك الإلكتروني لتأكيد الحساب ثم سجّل الدخول.'
              : 'Account created. Check your email to confirm the account, then sign in.',
          );
        } else {
          setStatus('success');
          setMessage(
            isAr
              ? 'تم إنشاء الحساب وتسجيل الدخول بنجاح.'
              : 'Account created and signed in successfully.',
          );
        }
      } else {
        await signInWithEmail(email.trim(), password);
        setStatus('success');
        setMessage(
          isAr ? 'تم تسجيل الدخول بنجاح.' : 'Signed in successfully.',
        );
      }
    } catch (error) {
      setStatus('error');
      setMessage(getSupabaseActionErrorMessage(error, lang, 'auth'));
    } finally {
      setLoading(false);
    }
  };

  if (user) return null;

  return (
    <div className="min-h-screen bg-soft-blue">
      <Seo
        title={isAr ? 'تسجيل الدخول | PhysioHub' : 'Login | PhysioHub'}
        description={
          isAr
            ? 'أنشئ حسابًا أو سجّل الدخول لحفظ النتائج وربطها بسجل متابعة آمن.'
            : 'Create an account or sign in to save results and review them in a secure tracking dashboard.'
        }
        canonicalPath="/auth"
      />

      <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/85 px-4 backdrop-blur-md sm:px-6 lg:px-8">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3">
          <Link to="/" className="group flex items-center gap-2">
            <div className="rounded-lg bg-health-green p-1.5 transition-transform group-hover:scale-110">
              <HeartPulse className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Physio<span className="text-health-green">Hub</span>
            </span>
          </Link>

          <button
            onClick={onToggleTheme}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700 transition-all hover:border-health-green/30"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-sm sm:p-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-health-green/20 bg-health-green/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-health-green">
              <LockKeyhole className="h-4 w-4" />
              <span>{isAr ? 'مساحة آمنة' : 'Secure access'}</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">
              {isAr ? 'احفظ نتائجك داخل حسابك' : 'Save your results inside your account'}
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              {isAr
                ? 'أنشئ حسابًا أو سجّل الدخول لحفظ القياسات، مراجعة السجل الزمني، وحماية البيانات بسياسات Supabase Auth + RLS.'
                : 'Create an account or sign in to save assessments, review history, and protect data with Supabase Auth + RLS.'}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                {
                  title: isAr ? 'حفظ آمن' : 'Secure saves',
                  desc: isAr
                    ? 'كل نتيجة ترتبط بحسابك فقط.'
                    : 'Each result is linked to your account only.',
                },
                {
                  title: isAr ? 'متابعة واضحة' : 'Clear follow-up',
                  desc: isAr
                    ? 'راجع السجل والرسوم البيانية من لوحة واحدة.'
                    : 'Review history and charts from one dashboard.',
                },
                {
                  title: isAr ? 'أمان أفضل' : 'Stronger security',
                  desc: isAr
                    ? 'لا حاجة لسياسات anon المفتوحة.'
                    : 'No need for fully open anon policies.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                  <div className="font-bold text-slate-900">{item.title}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
            <div className="mb-6 flex gap-2 rounded-full border border-slate-200 bg-slate-100 p-1">
              <button
                onClick={() => setMode('signin')}
                className={`flex-1 rounded-full px-4 py-2 text-sm font-bold transition-all ${
                  mode === 'signin' ? 'bg-white text-health-green shadow-sm' : 'text-slate-500'
                }`}
              >
                {isAr ? 'تسجيل الدخول' : 'Sign in'}
              </button>
              <button
                onClick={() => setMode('signup')}
                className={`flex-1 rounded-full px-4 py-2 text-sm font-bold transition-all ${
                  mode === 'signup' ? 'bg-white text-health-green shadow-sm' : 'text-slate-500'
                }`}
              >
                {isAr ? 'إنشاء حساب' : 'Create account'}
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {mode === 'signup' ? (
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={isAr ? 'الاسم الكامل' : 'Full name'}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-health-green/30"
                />
              ) : null}

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isAr ? 'البريد الإلكتروني' : 'Email address'}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-health-green/30"
                required
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isAr ? 'كلمة المرور' : 'Password'}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-health-green/30"
                required
                minLength={6}
              />

              <button
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-health-green px-5 py-3 font-bold text-white transition-all hover:bg-health-green-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
                <span>
                  {loading
                    ? isAr
                      ? 'جارٍ التنفيذ'
                      : 'Please wait'
                    : mode === 'signup'
                      ? isAr
                        ? 'إنشاء حساب'
                        : 'Create account'
                      : isAr
                        ? 'تسجيل الدخول'
                        : 'Sign in'}
                </span>
              </button>
            </form>

            {message ? (
              <div
                className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${
                  status === 'success'
                    ? 'border-health-green/20 bg-health-green/10 text-health-green-dark'
                    : 'border-rose-200 bg-rose-50 text-rose-600'
                }`}
              >
                {message}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
