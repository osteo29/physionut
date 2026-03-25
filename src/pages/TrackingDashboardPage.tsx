import {lazy, Suspense, useEffect, useMemo, useRef, useState} from 'react';
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
} from 'lucide-react';
import Seo from '../components/seo/Seo';
import type {DashboardPdfData} from '../services/pdfReports';
import usePreferredLang from './usePreferredLang';
import {navigationPaths} from '../utils/langUrlHelper';
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

const TrendChart = lazy(() => import('../components/dashboard/TrendChart'));
const TimelineLog = lazy(() => import('../components/dashboard/TimelineLog'));
const LazyPdfReportSheet = lazy(() => import('../components/dashboard/LazyPdfReportSheet'));

type NormalizedNumericRecord = AssessmentRecord & {
  metricKey: string;
  metricLabel: string;
  numericValue: number;
};

function waitForCondition(check: () => boolean, timeoutMs = 4000) {
  return new Promise<void>((resolve, reject) => {
    const startedAt = Date.now();

    const tick = () => {
      if (check()) {
        resolve();
        return;
      }

      if (Date.now() - startedAt >= timeoutMs) {
        reject(new Error('Timed out while waiting for deferred dashboard content.'));
        return;
      }

      window.setTimeout(tick, 40);
    };

    tick();
  });
}

function normalizeNumericValue(value: AssessmentRecord['value_numeric']) {
  const parsed =
    typeof value === 'number'
      ? value
      : typeof value === 'string'
        ? Number.parseFloat(value)
        : Number.NaN;

  return Number.isFinite(parsed) ? parsed : null;
}

export default function TrackingDashboardPage() {
  const lang = usePreferredLang();
  const isAr = lang === 'ar';
  const [user, setUser] = useState<User | null>(null);
  const [records, setRecords] = useState<AssessmentRecord[]>([]);
  const [status, setStatus] = useState<'checking' | 'loading' | 'ready' | 'error'>('checking');
  const [message, setMessage] = useState('');
  const [pdfReport, setPdfReport] = useState<DashboardPdfData | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [shouldRenderPdfSheet, setShouldRenderPdfSheet] = useState(false);
  const [selectedMetricKey, setSelectedMetricKey] = useState('');
  const chartRef = useRef<any>(null);
  const pdfRef = useRef<HTMLDivElement | null>(null);
  const isPdfSheetReadyRef = useRef(false);

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
      .map((item) => {
        const numericValue = normalizeNumericValue(item.value_numeric);
        if (numericValue === null) return null;

        const unit = item.value_unit?.trim() || '';
        return {
          ...item,
          numericValue,
          metricKey: `${item.calculator_type}::${unit || 'no-unit'}`,
          metricLabel: unit ? `${item.calculator_type} (${unit})` : item.calculator_type,
        } satisfies NormalizedNumericRecord;
      })
      .filter((item): item is NormalizedNumericRecord => Boolean(item))
      .reverse();
  }, [records]);

  const metricGroups = useMemo(() => {
    const groups = new Map<
      string,
      {
        key: string;
        label: string;
        records: NormalizedNumericRecord[];
      }
    >();

    for (const item of numericRecords) {
      const existing = groups.get(item.metricKey);
      if (existing) {
        existing.records.push(item);
      } else {
        groups.set(item.metricKey, {
          key: item.metricKey,
          label: item.metricLabel,
          records: [item],
        });
      }
    }

    return Array.from(groups.values()).sort((a, b) => {
      const byCount = b.records.length - a.records.length;
      if (byCount !== 0) return byCount;
      return (
        new Date(b.records[b.records.length - 1].created_at).getTime() -
        new Date(a.records[a.records.length - 1].created_at).getTime()
      );
    });
  }, [numericRecords]);

  useEffect(() => {
    if (!metricGroups.length) {
      if (selectedMetricKey) setSelectedMetricKey('');
      return;
    }

    if (!selectedMetricKey || !metricGroups.some((item) => item.key === selectedMetricKey)) {
      setSelectedMetricKey(metricGroups[0].key);
    }
  }, [metricGroups, selectedMetricKey]);

  const selectedMetric = useMemo(
    () => metricGroups.find((item) => item.key === selectedMetricKey) || metricGroups[0] || null,
    [metricGroups, selectedMetricKey],
  );

  const selectedMetricSummary = useMemo(() => {
    if (!selectedMetric) return null;

    const values = selectedMetric.records.map((item) => item.numericValue);
    const latest = values[values.length - 1];
    const previous = values.length > 1 ? values[values.length - 2] : null;
    const delta = previous === null ? null : latest - previous;

    return {
      latest,
      delta,
      min: Math.min(...values),
      max: Math.max(...values),
    };
  }, [selectedMetric]);

  const lineData = useMemo(() => {
    const activeRecords = selectedMetric?.records || [];

    return {
      labels: activeRecords.map((item) =>
        new Date(item.created_at).toLocaleDateString(isAr ? 'ar-EG' : 'en-US'),
      ),
      datasets: [
        {
          label: selectedMetric?.label || (isAr ? 'تطور القياسات' : 'Measurement trend'),
          data: activeRecords.map((item) => item.numericValue),
          borderColor: '#315f4a',
          backgroundColor: 'rgba(49,95,74,0.18)',
          tension: 0.28,
          fill: true,
        },
      ],
    };
  }, [isAr, selectedMetric]);

  const handleDownloadPdf = async () => {
    if (!user || isGeneratingPdf) return;

    setIsGeneratingPdf(true);
    setMessage('');
    isPdfSheetReadyRef.current = false;

    try {
      const {buildDashboardPdfData, generatePdfReport} = await import('../services/pdfReports');
      const chartImageDataUrl =
        selectedMetric && chartRef.current?.toBase64Image ? chartRef.current.toBase64Image() : undefined;

      const report = await buildDashboardPdfData({
        lang,
        user,
        records,
        chartImageDataUrl,
      });

      setPdfReport(report);
      setShouldRenderPdfSheet(true);

      await waitForCondition(
        () =>
          isPdfSheetReadyRef.current &&
          Boolean(pdfRef.current?.querySelector('[data-pdf-report-sheet="true"]')),
      );

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
    return <Navigate to={navigationPaths.auth(lang)} replace state={{from: navigationPaths.dashboard(lang)}} />;
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
              {isGeneratingPdf ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              <span>{isAr ? 'تحميل تقرير PDF' : 'Download PDF report'}</span>
            </button>
            <Link
              to={navigationPaths.home(lang)}
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

            {metricGroups.length > 1 ? (
              <div className="mb-4">
                <label className="mb-2 block text-xs font-semibold text-slate-500">
                  {isAr ? 'اختر المؤشر الذي تريد متابعته' : 'Choose the metric to analyze'}
                </label>
                <select
                  value={selectedMetricKey}
                  onChange={(event) => setSelectedMetricKey(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-health-green focus:ring-2 focus:ring-health-green/20"
                >
                  {metricGroups.map((item) => (
                    <option key={item.key} value={item.key}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}

            {selectedMetricSummary ? (
              <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-xs text-slate-500">{isAr ? 'أحدث قيمة' : 'Latest value'}</div>
                  <div className="mt-2 text-2xl font-black text-slate-900">{selectedMetricSummary.latest}</div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-xs text-slate-500">{isAr ? 'التغيّر الأخير' : 'Latest change'}</div>
                  <div className="mt-2 text-2xl font-black text-slate-900">
                    {selectedMetricSummary.delta === null
                      ? '...'
                      : `${selectedMetricSummary.delta > 0 ? '+' : ''}${selectedMetricSummary.delta.toFixed(2)}`}
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-xs text-slate-500">{isAr ? 'المدى المسجل' : 'Recorded range'}</div>
                  <div className="mt-2 text-lg font-black text-slate-900">
                    {selectedMetricSummary.min} - {selectedMetricSummary.max}
                  </div>
                </div>
              </div>
            ) : null}

            {status === 'loading' ? (
              <div className="flex h-[320px] items-center justify-center">
                <LoaderCircle className="h-5 w-5 animate-spin text-health-green" />
              </div>
            ) : selectedMetric ? (
              <Suspense
                fallback={
                  <div className="flex h-[320px] items-center justify-center rounded-[1.5rem] border border-slate-200 bg-slate-50">
                    <LoaderCircle className="h-5 w-5 animate-spin text-health-green" />
                  </div>
                }
              >
                <TrendChart
                  chartRef={chartRef}
                  lineData={lineData}
                  isAr={isAr}
                  metricLabel={selectedMetric.label}
                />
              </Suspense>
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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-2 text-xs text-slate-500">{isAr ? 'إجمالي السجلات' : 'Total records'}</div>
                <div className="text-2xl font-bold text-slate-900">{records.length}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-2 text-xs text-slate-500">
                  {isAr ? 'أنواع المؤشرات الرقمية' : 'Tracked numeric metrics'}
                </div>
                <div className="text-2xl font-bold text-slate-900">{metricGroups.length}</div>
              </div>
            </div>

            {selectedMetric ? (
              <div className="mt-4 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                  {isAr ? 'المؤشر النشط' : 'Active metric'}
                </div>
                <div className="mt-2 text-lg font-black text-slate-900">{selectedMetric.label}</div>
                <p className="mt-2 text-sm text-slate-600">
                  {isAr
                    ? `يظهر الرسم لهذا المؤشر فقط من بين ${selectedMetric.records.length} قراءة محفوظة، حتى لا تختلط المقاييس المختلفة في منحنى واحد.`
                    : `The chart now focuses on this metric only across ${selectedMetric.records.length} saved readings, instead of mixing different measurements together.`}
                </p>
              </div>
            ) : null}

            <Link
              to={navigationPaths.injuries(lang)}
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

          <Suspense
            fallback={
              <div className="flex min-h-[180px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
                <LoaderCircle className="h-5 w-5 animate-spin text-health-green" />
              </div>
            }
          >
            <TimelineLog isAr={isAr} records={records} onDelete={handleDelete} />
          </Suspense>
        </div>
      </div>

      <div className="pointer-events-none fixed -left-[200vw] top-0 opacity-0">
        {shouldRenderPdfSheet && pdfReport ? (
          <div ref={pdfRef}>
            <Suspense fallback={null}>
              <LazyPdfReportSheet
                report={pdfReport}
                onReady={() => {
                  isPdfSheetReadyRef.current = true;
                }}
              />
            </Suspense>
          </div>
        ) : null}
      </div>
    </div>
  );
}
