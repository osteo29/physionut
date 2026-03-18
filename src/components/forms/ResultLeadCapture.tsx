import {useEffect, useMemo, useState} from 'react';
import {LoaderCircle, Save, ShieldCheck} from 'lucide-react';
import {isSupabaseConfigured, saveAssessment} from '../../lib/supabase';

const STORAGE_KEY = 'physiohub_tracking_profile';

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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const parsed = JSON.parse(saved) as {name?: string; email?: string};
      if (parsed.name) setName(parsed.name);
      if (parsed.email) setEmail(parsed.email);
    } catch {
      // ignore malformed local profile
    }
  }, []);

  const isValid = useMemo(() => {
    return name.trim().length >= 2 && /\S+@\S+\.\S+/.test(email.trim());
  }, [email, name]);

  const handleSave = async () => {
    if (!isValid || status === 'saving') return;

    if (!isSupabaseConfigured) {
      setStatus('error');
      setMessage(
        lang === 'en'
          ? 'Supabase is not configured yet. Add your project URL and anon key first.'
          : 'لم يتم إعداد Supabase بعد. أضف رابط المشروع و anon key أولاً.',
      );
      return;
    }

    setStatus('saving');
    setMessage('');

    try {
      await saveAssessment({
        name: name.trim(),
        email: email.trim(),
        calculator_type: calculatorName,
        value_label: valueLabel,
        value_numeric: valueNumeric,
        value_unit: valueUnit,
        lang,
        note: null,
      });

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({name: name.trim(), email: email.trim()}),
      );

      setStatus('saved');
      setMessage(
        lang === 'en'
          ? 'Saved to your follow-up log. Open the dashboard to review progress.'
          : 'تم الحفظ في سجل المتابعة. افتح لوحة المتابعة لمراجعة التقدم.',
      );
    } catch (error: any) {
      setStatus('error');
      setMessage(
        error?.message ||
          (lang === 'en'
            ? 'Could not save this assessment right now.'
            : 'تعذر حفظ هذا القياس الآن.'),
      );
    }
  };

  return (
    <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-health-green mb-3">
        <Save className="w-3.5 h-3.5" />
        <span>{lang === 'en' ? 'Save to tracking log' : 'احفظ في سجل المتابعة'}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={lang === 'en' ? 'Name' : 'الاسم'}
          className="px-4 py-3 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-health-green/30"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={lang === 'en' ? 'Email address' : 'البريد الإلكتروني'}
          className="px-4 py-3 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-health-green/30"
        />
        <button
          onClick={handleSave}
          disabled={!isValid || status === 'saving'}
          className={`px-5 py-3 rounded-2xl font-bold transition-all ${
            isValid && status !== 'saving'
              ? 'bg-health-green text-white hover:bg-health-green-dark'
              : 'bg-slate-100 text-slate-400'
          }`}
        >
          {status === 'saving' ? (
            <span className="inline-flex items-center gap-2">
              <LoaderCircle className="w-4 h-4 animate-spin" />
              {lang === 'en' ? 'Saving' : 'جارٍ الحفظ'}
            </span>
          ) : lang === 'en' ? (
            'Save result'
          ) : (
            'حفظ النتيجة'
          )}
        </button>
      </div>

      <div className="mt-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div className="inline-flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-health-green" />
          <span>
            {lang === 'en'
              ? 'Every save includes date, calculator type, and measured value for follow-up.'
              : 'كل حفظ يتضمن التاريخ ونوع الحاسبة والقيمة المسجلة للمتابعة.'}
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
