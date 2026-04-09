import {useEffect, useState} from 'react';
import {BarChart3, ClipboardList, FileText, HeartPulse, Users} from 'lucide-react';
import Seo from '../components/seo/Seo';
import AdminAccessBoundary from '../components/admin/AdminAccessBoundary';
import AdminShell from '../components/admin/AdminShell';
import usePreferredLang from './usePreferredLang';
import useAdminAccess from '../hooks/useAdminAccess';
import {fetchAdminDashboardMetrics, type AdminDashboardMetrics} from '../services/adminDashboard';

const initialMetrics: AdminDashboardMetrics = {
  injuries: 0,
  phases: 0,
  articles: 0,
  assessments: 0,
  leads: 0,
};

export default function AdminDashboardPage() {
  const uiLang = usePreferredLang();
  const isAr = uiLang === 'ar';
  const access = useAdminAccess(uiLang);
  const [metrics, setMetrics] = useState<AdminDashboardMetrics>(initialMetrics);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!access.canAccessAdminArea) {
      setLoading(false);
      return;
    }

    let active = true;

    const load = async () => {
      try {
        setLoading(true);
        const nextMetrics = await fetchAdminDashboardMetrics();
        if (!active) return;
        setMetrics(nextMetrics);
        setErrorMessage('');
      } catch (error) {
        if (!active) return;
        setErrorMessage(
          error instanceof Error
            ? error.message
            : isAr
              ? 'تعذر تحميل مؤشرات الإدارة الآن.'
              : 'Could not load admin metrics right now.',
        );
      } finally {
        if (active) setLoading(false);
      }
    };

    void load();

    return () => {
      active = false;
    };
  }, [access.canAccessAdminArea, isAr]);

  const cards = [
    {
      key: 'injuries',
      label: isAr ? 'الإصابات' : 'Injuries',
      value: metrics.injuries,
      icon: HeartPulse,
    },
    {
      key: 'phases',
      label: isAr ? 'المراحل' : 'Phases',
      value: metrics.phases,
      icon: BarChart3,
    },
    {
      key: 'articles',
      label: isAr ? 'المقالات' : 'Articles',
      value: metrics.articles,
      icon: FileText,
    },
    {
      key: 'assessments',
      label: isAr ? 'نتائج المتابعة' : 'Assessments',
      value: metrics.assessments,
      icon: ClipboardList,
    },
    {
      key: 'leads',
      label: isAr ? 'الطلبات الجديدة' : 'Leads',
      value: metrics.leads,
      icon: Users,
    },
  ];

  return (
    <>
      <Seo
        title={isAr ? 'لوحة إدارة النظام' : 'Admin Dashboard'}
        description={
          isAr
            ? 'لوحة إدارة موحدة لمراجعة المحتوى والبيانات داخل Supabase.'
            : 'Unified admin workspace for content and data connected to Supabase.'
        }
        canonicalPath="/admin"
        noIndex
      />
      <AdminAccessBoundary
        access={access}
        lang={uiLang}
        title={isAr ? 'لوحة إدارة النظام' : 'Admin Dashboard'}
        canonicalPath="/admin"
      >
        <AdminShell
          title={isAr ? 'نظرة عامة على الإدارة' : 'Operational overview'}
          description={
            isAr
              ? 'هذه الصفحة تجمع أهم مؤشرات المحتوى والبيانات في مكان واحد، مع روابط مباشرة لتحرير الإصابات والمقالات.'
              : 'This page brings the main content and data indicators into one organized workspace with direct paths to injuries and articles.'
          }
          currentTab="dashboard"
          user={access.user}
          canManageInjuries={access.canManageInjuries}
          canManageArticles={access.canManageArticles}
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.key} className="rounded-3xl border border-slate-200 bg-white p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-bold text-slate-500">{card.label}</div>
                      <div className="mt-2 text-3xl font-black text-slate-900">
                        {loading ? '...' : card.value}
                      </div>
                    </div>
                    <div className="rounded-2xl bg-emerald-50 p-3 text-health-green">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <h3 className="text-xl font-black text-slate-900">
              {isAr ? 'حالة الربط' : 'Connection status'}
            </h3>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
              <p>
                {isAr
                  ? 'تم توحيد مساحة الإدارة على Supabase session وصلاحيات admin_users مع تمييز منفصل لصلاحيات المقالات.'
                  : 'The admin workspace is now unified around the Supabase session, admin_users permissions, and a separate article-admin capability.'}
              </p>
              <p>
                {isAr
                  ? 'إذا ظهرت الأرقام هنا فهذا يعني أن الاتصال وقابلية القراءة من الجداول الأساسية تعمل داخل الواجهة.'
                  : 'If the counts are visible here, the app can read the main Supabase tables from the admin interface.'}
              </p>
              {errorMessage ? <p className="font-bold text-rose-600">{errorMessage}</p> : null}
            </div>
          </div>
        </AdminShell>
      </AdminAccessBoundary>
    </>
  );
}
