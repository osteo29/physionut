import {useEffect, useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import {
  ArrowLeft,
  BarChart3,
  Calendar,
  LineChart,
  LoaderCircle,
  Trash2,
} from 'lucide-react';
import Seo from '../components/seo/Seo';
import usePreferredLang from './usePreferredLang';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {
  deleteAssessment,
  isSupabaseConfigured,
  listAssessmentsByEmail,
  type AssessmentRecord,
} from '../lib/supabase';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const STORAGE_KEY = 'physiohub_tracking_profile';

export default function TrackingDashboardPage() {
  const lang = usePreferredLang();
  const isAr = lang === 'ar';
  const [email, setEmail] = useState('');
  const [records, setRecords] = useState<AssessmentRecord[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const parsed = JSON.parse(saved) as {email?: string};
      if (parsed.email) setEmail(parsed.email);
    } catch {
      // ignore
    }
  }, []);

  const load = async () => {
    if (!/\S+@\S+\.\S+/.test(email.trim())) return;
    if (!isSupabaseConfigured) {
      setStatus('error');
      setMessage(
        isAr
          ? 'لم يتم إعداد Supabase بعد، لذلك لا يمكن تحميل السجل الآن.'
          : 'Supabase is not configured yet, so tracking cannot load right now.',
      );
      return;
    }

    setStatus('loading');
    setMessage('');
    try {
      const data = await listAssessmentsByEmail(email.trim());
      setRecords(data);
      setStatus('ready');
      if (data.length === 0) {
        setMessage(
          isAr
            ? 'لا توجد نتائج محفوظة لهذا البريد حتى الآن.'
            : 'No saved assessments were found for this email yet.',
        );
      }
    } catch (error: any) {
      setStatus('error');
      setMessage(error?.message || (isAr ? 'تعذر تحميل السجل.' : 'Could not load tracking log.'));
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAssessment(id);
      setRecords((prev) => prev.filter((item) => item.id !== id));
    } catch {
      setMessage(isAr ? 'تعذر حذف السجل.' : 'Could not delete this record.');
    }
  };

  const numericRecords = useMemo(() => {
    return [...records]
      .filter((item) => typeof item.value_numeric === 'number')
      .reverse();
  }, [records]);

  const lineData = useMemo(() => {
    return {
      labels: numericRecords.map((item) =>
        new Date(item.created_at).toLocaleDateString(isAr ? 'ar-EG' : 'en-US'),
      ),
      datasets: [
        {
          label: isAr ? 'تطور القياسات' : 'Measurement trend',
          data: numericRecords.map((item) => item.value_numeric),
          borderColor: '#315f4a',
          backgroundColor: 'rgba(49,95,74,0.18)',
          tension: 0.35,
          fill: true,
        },
      ],
    };
  }, [isAr, numericRecords]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Seo
        title={isAr ? 'لوحة المتابعة' : 'Tracking Dashboard'}
        description={
          isAr
            ? 'راجع سجل القياسات والنتائج المحفوظة في PhysioHub.'
            : 'Review saved assessments and result history in PhysioHub.'
        }
        canonicalPath="/dashboard"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-health-green mb-2">
              {isAr ? 'لوحة المتابعة' : 'Tracking dashboard'}
            </div>
            <h1 className="text-3xl font-bold text-slate-900">
              {isAr ? 'سجل القياسات والمتابعة' : 'Assessment history and follow-up'}
            </h1>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl border border-slate-200 bg-white text-slate-700 font-bold"
          >
            <ArrowLeft className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
            <span>{isAr ? 'العودة للرئيسية' : 'Back home'}</span>
          </Link>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={isAr ? 'أدخل البريد الإلكتروني' : 'Enter the tracking email'}
              className="px-4 py-3 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-health-green/30"
            />
            <button
              onClick={load}
              disabled={status === 'loading'}
              className="px-5 py-3 rounded-2xl bg-health-green text-white font-bold hover:bg-health-green-dark transition-all"
            >
              {status === 'loading' ? (
                <span className="inline-flex items-center gap-2">
                  <LoaderCircle className="w-4 h-4 animate-spin" />
                  {isAr ? 'جارٍ التحميل' : 'Loading'}
                </span>
              ) : isAr ? (
                'تحميل السجل'
              ) : (
                'Load tracking log'
              )}
            </button>
          </div>
          {message ? <div className="mt-3 text-sm text-slate-500">{message}</div> : null}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-health-green mb-4">
              <LineChart className="w-3.5 h-3.5" />
              <span>{isAr ? 'الرسم البياني' : 'Trend chart'}</span>
            </div>
            {numericRecords.length > 0 ? (
              <div className="h-[320px]">
                <Line
                  data={lineData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {display: false},
                    },
                    scales: {
                      y: {beginAtZero: false},
                    },
                  }}
                />
              </div>
            ) : (
              <div className="h-[320px] rounded-[1.5rem] border border-dashed border-slate-200 bg-slate-50 flex items-center justify-center text-center px-8 text-slate-500">
                {isAr
                  ? 'احفظ قياسات تحتوي على قيمة رقمية لتظهر هنا في الرسم البياني.'
                  : 'Save assessments with numeric values to see them plotted here.'}
              </div>
            )}
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-health-green mb-4">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>{isAr ? 'ملخص سريع' : 'Quick summary'}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                <div className="text-xs text-slate-500 mb-2">{isAr ? 'إجمالي السجلات' : 'Total records'}</div>
                <div className="text-2xl font-bold text-slate-900">{records.length}</div>
              </div>
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                <div className="text-xs text-slate-500 mb-2">{isAr ? 'أنواع الحاسبات' : 'Calculator types'}</div>
                <div className="text-2xl font-bold text-slate-900">
                  {new Set(records.map((item) => item.calculator_type)).size}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm mt-8">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-health-green mb-4">
            <Calendar className="w-3.5 h-3.5" />
            <span>{isAr ? 'السجل الزمني' : 'Timeline log'}</span>
          </div>

          <div className="space-y-3">
            {records.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
                {isAr
                  ? 'لا توجد سجلات محفوظة حتى الآن.'
                  : 'No saved assessment records yet.'}
              </div>
            ) : (
              records.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-200 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div>
                    <div className="font-bold text-slate-900">{item.calculator_type}</div>
                    <div className="text-sm text-slate-600 mt-1">
                      {item.value_label}
                      {item.value_unit ? ` ${item.value_unit}` : ''}
                    </div>
                    <div className="text-xs text-slate-400 mt-2">
                      {new Date(item.created_at).toLocaleString(isAr ? 'ar-EG' : 'en-US')}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 transition-all font-semibold"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>{isAr ? 'حذف' : 'Delete'}</span>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
