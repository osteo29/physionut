import type {ReactNode} from 'react';
import type {User} from '@supabase/supabase-js';
import {Activity, FileText, Search, ShieldCheck, Stethoscope} from 'lucide-react';
import {Link, useLocation} from 'react-router-dom';
import PageLayout from '../../pages/PageLayout';
import usePreferredLang from '../../pages/usePreferredLang';
import {navigationPaths} from '../../utils/langUrlHelper';

type AdminTab = 'dashboard' | 'injuries' | 'articles' | 'seo';

function shellCopy(lang: 'en' | 'ar') {
  return {
    workspace: lang === 'ar' ? 'مساحة الإدارة' : 'Admin Workspace',
    dashboard: lang === 'ar' ? 'لوحة التحكم' : 'Overview',
    injuries: lang === 'ar' ? 'الإصابات' : 'Injuries',
    articles: lang === 'ar' ? 'المقالات' : 'Articles',
    seo: lang === 'ar' ? 'إدارة SEO' : 'SEO',
    account: lang === 'ar' ? 'الحساب الحالي' : 'Current account',
    capabilities: lang === 'ar' ? 'الصلاحيات' : 'Permissions',
    articleAdmin: lang === 'ar' ? 'مسؤول المقالات' : 'Article admin',
    injuryAdmin: lang === 'ar' ? 'إدارة الإصابات' : 'Injury manager',
    connected: lang === 'ar' ? 'متصل بسوبابيز' : 'Connected to Supabase',
    quickLinks: lang === 'ar' ? 'روابط سريعة' : 'Quick links',
    publicSite: lang === 'ar' ? 'الموقع العام' : 'Public site',
    protocols: lang === 'ar' ? 'بروتوكولات الإصابات' : 'Injury protocols',
    insights: lang === 'ar' ? 'صفحة المقالات' : 'Insights page',
  };
}

export default function AdminShell({
  title,
  description,
  currentTab,
  user,
  canManageInjuries,
  canManageArticles,
  children,
}: {
  title: string;
  description: string;
  currentTab: AdminTab;
  user: User | null;
  canManageInjuries: boolean;
  canManageArticles: boolean;
  children: ReactNode;
}) {
  const lang = usePreferredLang();
  const copy = shellCopy(lang);
  const location = useLocation();

  const items = [
    {
      key: 'dashboard',
      label: copy.dashboard,
      icon: Activity,
      to: navigationPaths.adminHome(lang),
      enabled: true,
    },
    {
      key: 'injuries',
      label: copy.injuries,
      icon: Stethoscope,
      to: navigationPaths.adminInjuries(lang),
      enabled: canManageInjuries,
    },
    {
      key: 'articles',
      label: copy.articles,
      icon: FileText,
      to: navigationPaths.adminArticles(lang),
      enabled: canManageArticles,
    },
    {
      key: 'seo',
      label: copy.seo,
      icon: Search,
      to: navigationPaths.adminSeo(lang),
      enabled: canManageInjuries || canManageArticles,
    },
  ] as const;

  return (
    <PageLayout title={copy.workspace}>
      <div className="space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="text-xs font-black uppercase tracking-[0.24em] text-health-green">
                {copy.workspace}
              </div>
              <h2 className="text-2xl font-black text-slate-900">{title}</h2>
              <p className="max-w-3xl text-sm leading-7 text-slate-600">{description}</p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-sm text-slate-700">
              <div className="font-bold text-slate-900">{copy.account}</div>
              <div>{user?.email || 'unknown'}</div>
            </div>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[260px,minmax(0,1fr)]">
          <aside className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                {copy.workspace}
              </div>
              <nav className="mt-4 space-y-2">
                {items.map((item) => {
                  const Icon = item.icon;
                  const active = currentTab === item.key || location.pathname === item.to;
                  const classes = active
                    ? 'border-health-green bg-emerald-50 text-health-green'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300';

                  if (!item.enabled) {
                    return (
                      <div
                        key={item.key}
                        className="rounded-2xl border border-dashed border-slate-200 px-4 py-3 text-sm text-slate-400"
                      >
                        <Icon className="mr-2 inline h-4 w-4" />
                        {item.label}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.key}
                      to={item.to}
                      className={`block rounded-2xl border px-4 py-3 text-sm font-bold transition ${classes}`}
                    >
                      <Icon className="mr-2 inline h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <div className="mb-3 flex items-center gap-2 font-bold text-slate-900">
                <ShieldCheck className="h-4 w-4 text-health-green" />
                {copy.capabilities}
              </div>
              <div>{copy.connected}</div>
              <div>
                {copy.injuryAdmin}: {canManageInjuries ? 'Yes' : 'No'}
              </div>
              <div>
                {copy.articleAdmin}: {canManageArticles ? 'Yes' : 'No'}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <div className="mb-3 font-bold text-slate-900">{copy.quickLinks}</div>
              <div className="space-y-2">
                <Link to={navigationPaths.home(lang)} className="block hover:text-health-green">
                  {copy.publicSite}
                </Link>
                <Link to={navigationPaths.injuries(lang)} className="block hover:text-health-green">
                  {copy.protocols}
                </Link>
                <Link to={navigationPaths.insights(lang)} className="block hover:text-health-green">
                  {copy.insights}
                </Link>
              </div>
            </div>
          </aside>

          <section className="space-y-6">{children}</section>
        </div>
      </div>
    </PageLayout>
  );
}
