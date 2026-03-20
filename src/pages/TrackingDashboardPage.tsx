import {useEffect, useMemo, useRef, useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {
  ArrowLeft,
  BarChart3,
  Calendar,
  ClipboardList,
  Download,
  LineChart,
  LoaderCircle,
  LogOut,
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
import PdfReportSheet from '../components/pdf/PdfReportSheet';
import {buildDashboardPdfData, generatePdfReport} from '../services/pdfReports';
import {
  deleteAssessment,
  getCurrentUser,
  getSupabaseActionErrorMessage,
  getSupabaseConfigurationMessage,
  isSupabaseConfigured,
  listAssessmentsForCurrentUser,
  onSupabaseAuthChange,
  signOutCurrentUser,
  type AssessmentRecord,
  type User,
} from '../lib/supabase';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function TrackingDashboardPage() {
  const lang = usePreferredLang();
  const isAr = lang === 'ar';
  const [user, setUser] = useState<User | null>(null);
  const [records, setRecords] = useState<AssessmentRecord[]>([]);
  const [status, setStatus] = useState<'checking' | 'loading' | 'ready' | 'error'>('checking');
  const [message, setMessage] = useState('');
  const [pdfReport, setPdfReport] = useState<Awaited<ReturnType<typeof buildDashboardPdfData>> | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const chartRef = useRef<any>(null);
  const pdfRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mounted = true;

    const bootstrap = async () => {
      if (!isSupabaseConfigured) {
        if (!mounted) return;
        setStatus('error');
        setMessage(getSupabaseConfigurationMessage(lang));
        return;
      }

      try {
        const currentUser = await getCurrentUser();
        if (!mounted) return;
        setUser(currentUser);

        if (currentUser) {
          setStatus('loading');
          const data = await listAssessmentsForCurrentUser();
          if (!mounted) return;
          setRecords(data);
          setStatus('ready');
          if (data.length === 0) {
            setMessage(
              isAr
                ? 'لا توجد نتائج محفوظة في حسابك حتى الآن.'
                : 'No saved assessments were found in your account yet.',
            );
          }
        } else {
          setStatus('ready');
        }
      } catch (error) {
        if (!mounted) return;
        setStatus('error');
        setMessage(getSupabaseActionErrorMessage(error, lang, 'load'));
      }
    };

    void bootstrap();

    const subscription = isSupabaseConfigured
      ? onSupabaseAuthChange(async (_, session) => {
          if (!mounted) return;
          setUser(session?.user || null);

          if (session?.user) {
            setStatus('loading');
            try {
              const data = await listAssessmentsForCurrentUser();
              if (!mounted) return;
              setRecords(data);
              setStatus('ready');
            } catch (error) {
              if (!mounted) return;
              setStatus('error');
              setMessage(getSupabaseActionErrorMessage(error, lang, 'load'));
            }
          } else {
            setRecords([]);
            setStatus('ready');
          }
        }).data.subscription
      : null;

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, [isAr, lang]);

  const handleDelete = async (id: string) => {
    try {
      await deleteAssessment(id);
      setRecords((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      setMessage(getSupabaseActionErrorMessage(error, lang, 'delete'));
    }
  };

  const handleLogout = async () => {
    try {
      await signOutCurrentUser();
    } catch (error) {
      setMessage(getSupabaseActionErrorMessage(error, lang, 'auth'));
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

  const handleDownloadPdf = async () => {
    if (!user || isGeneratingPdf) return;

    setIsGeneratingPdf(true);
    setMessage('');

    try {
      const chartImageDataUrl =
        numericRecords.length > 0 && chartRef.current?.toBase64Image
          ? chartRef.current.toBase64Image()
          : undefined;

      const report = await buildDashboardPdfData({
        lang,
        user,
        records,
        chartImageDataUrl,
      });

      setPdfReport(report);

      await new Promise((resolve) => window.setTimeout(resolve, 80));

      if (!pdfRef.current) {
        throw new Error('PDF report view is not ready.');
      }

      const safeName = (user.email?.split('@')[0] || 'dashboard').replace(/[^a-z0-9-_]/gi, '-');
      await generatePdfReport({
        element: pdfRef.current,
        fileName: `${safeName}-physionutrition-dashboard-report.pdf`,
      });
    } catch (error) {
      setMessage(
        isAr
          ? 'تعذر إنشاء التقرير الآن. حاول مرة أخرى بعد ثوانٍ.'
          : 'Could not generate the PDF report right now. Please try again in a moment.',
      );
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-20 text-center text-slate-600">
        {message || getSupabaseConfigurationMessage(lang)}
      </div>
    );
  }

  if (status === 'checking') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-600 shadow-sm">
          <LoaderCircle className="h-4 w-4 animate-spin" />
          <span>{isAr ? 'جارٍ التحقق من الجلسة' : 'Checking session'}</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace state={{from: '/dashboard'}} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Seo
        title={isAr ? 'لوحة المتابعة' : 'Tracking Dashboard'}
        description={
          isAr
            ? 'راجع سجل القياسات والنتائج المحفوظة داخل حسابك في PhysioNutrition.'
            : 'Review saved assessments and result history inside your PhysioNutrition account.'
        }
        canonicalPath="/dashboard"
      />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-health-green">
              {isAr ? 'لوحة المتابعة الآمنة' : 'Secure tracking dashboard'}
            </div>
            <h1 className="text-3xl font-bold text-slate-900">
              {isAr ? 'سجل القياسات المرتبط بحسابك' : 'Assessment history linked to your account'}
            </h1>
            <p className="mt-2 text-sm text-slate-500">{user.email}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="inline-flex items-center gap-2 rounded-2xl bg-health-green px-4 py-3 font-bold text-white transition-all hover:bg-health-green-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isGeneratingPdf ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              <span>{isAr ? 'تحميل تقرير PDF' : 'Download PDF report'}</span>
            </button>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold text-slate-700"
            >
              <ArrowLeft className={`h-4 w-4 ${isAr ? 'rotate-180' : ''}`} />
              <span>{isAr ? 'العودة للرئيسية' : 'Back home'}</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 font-bold text-rose-600 transition-all hover:bg-rose-100"
            >
              <LogOut className="h-4 w-4" />
              <span>{isAr ? 'تسجيل الخروج' : 'Log out'}</span>
            </button>
          </div>
        </div>

        {message ? (
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
            {message}
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-health-green">
              <LineChart className="h-3.5 w-3.5" />
              <span>{isAr ? 'الرسم البياني' : 'Trend chart'}</span>
            </div>
            {status === 'loading' ? (
              <div className="flex h-[320px] items-center justify-center">
                <LoaderCircle className="h-5 w-5 animate-spin text-health-green" />
              </div>
            ) : numericRecords.length > 0 ? (
              <div className="h-[320px]">
                <Line
                  ref={chartRef}
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
              <div className="flex h-[320px] items-center justify-center rounded-[1.5rem] border border-dashed border-slate-200 bg-slate-50 px-8 text-center text-slate-500">
                {isAr
                  ? 'احفظ قياسات تحتوي على قيمة رقمية لتظهر هنا في الرسم البياني.'
                  : 'Save assessments with numeric values to see them plotted here.'}
              </div>
            )}
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-health-green">
              <BarChart3 className="h-3.5 w-3.5" />
              <span>{isAr ? 'ملخص سريع' : 'Quick summary'}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-2 text-xs text-slate-500">
                  {isAr ? 'إجمالي السجلات' : 'Total records'}
                </div>
                <div className="text-2xl font-bold text-slate-900">{records.length}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-2 text-xs text-slate-500">
                  {isAr ? 'أنواع الحاسبات' : 'Calculator types'}
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  {new Set(records.map((item) => item.calculator_type)).size}
                </div>
              </div>
            </div>
            <Link
              to="/injury-protocols"
              className="mt-4 flex items-center justify-between gap-4 rounded-[1.5rem] border border-health-green/20 bg-health-green/5 px-4 py-4 transition-all hover:border-health-green/40 hover:bg-health-green/10"
            >
              <div>
                <div className="flex items-center gap-2 text-sm font-bold text-health-green-dark">
                  <ClipboardList className="h-4 w-4" />
                  <span>{isAr ? 'بروتوكولات الإصابات' : 'Injury protocols'}</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  {isAr
                    ? 'افتح مكتبة التعافي وخطط التغذية العلاجية مباشرة من لوحة المتابعة.'
                    : 'Open the rehab library and recovery nutrition plans directly from your dashboard.'}
                </p>
              </div>
              <ArrowLeft className={`h-4 w-4 shrink-0 text-health-green ${isAr ? '' : 'rotate-180'}`} />
            </Link>
          </div>
        </div>

        <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-health-green">
            <Calendar className="h-3.5 w-3.5" />
            <span>{isAr ? 'السجل الزمني' : 'Timeline log'}</span>
          </div>

          <div className="space-y-3">
            {records.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
                {isAr ? 'لا توجد سجلات محفوظة حتى الآن.' : 'No saved assessment records yet.'}
              </div>
            ) : (
              records.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <div className="font-bold text-slate-900">{item.calculator_type}</div>
                    <div className="mt-1 text-sm text-slate-600">
                      {item.value_label}
                      {item.value_unit ? ` ${item.value_unit}` : ''}
                    </div>
                    <div className="mt-2 text-xs text-slate-400">
                      {new Date(item.created_at).toLocaleString(isAr ? 'ar-EG' : 'en-US')}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="inline-flex items-center gap-2 rounded-xl border border-rose-200 px-4 py-2 font-semibold text-rose-600 transition-all hover:bg-rose-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>{isAr ? 'حذف' : 'Delete'}</span>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="fixed -left-[200vw] top-0 opacity-0 pointer-events-none">
        {pdfReport ? (
          <div ref={pdfRef}>
            <PdfReportSheet report={pdfReport} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
