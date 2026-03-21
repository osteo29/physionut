import type {AssessmentRecord, User} from '../lib/supabase';
import type {Language} from './translations';
import {getPdfBranding, type PdfBranding} from './pdfBranding';

export type PdfReportVariant = 'dashboard' | 'recovery';

export type DashboardPdfData = {
  variant: 'dashboard';
  lang: Language;
  title: string;
  subtitle: string;
  generatedAt: string;
  userName: string;
  userEmail: string;
  summary: {
    totalRecords: number;
    calculatorTypes: number;
    latestValue: string;
  };
  chartImageDataUrl?: string;
  timelineEntries: Array<{
    id: string;
    calculatorType: string;
    valueLabel: string;
    createdAt: string;
  }>;
  emptyMessage?: string;
  branding: PdfBranding;
};

export type RecoveryPdfData = {
  variant: 'recovery';
  lang: Language;
  title: string;
  subtitle: string;
  generatedAt: string;
  userName: string;
  userEmail: string;
  injuryName: string;
  phaseLabel: string;
  phaseDuration: string;
  weightKg: number;
  profileLabel: string;
  goalLabel: string;
  dietLabel: string;
  planSummary: Array<{label: string; value: string}>;
  meals: Array<{label: string; value: string}>;
  shoppingList: string[];
  supplementSchedule: Array<{name: string; dose: string; timing?: string; reason: string; caution?: string}>;
  safetyNotes: string[];
  redFlags: string[];
  branding: PdfBranding;
};

export type PdfReportData = DashboardPdfData | RecoveryPdfData;

function getUserLabel(user: User | null) {
  if (!user) {
    return {
      userName: 'Guest',
      userEmail: '',
    };
  }

  const userName =
    typeof user.user_metadata?.full_name === 'string' && user.user_metadata.full_name.trim()
      ? user.user_metadata.full_name.trim()
      : user.email?.split('@')[0] || 'User';

  return {
    userName,
    userEmail: user.email || '',
  };
}

export async function buildDashboardPdfData({
  lang,
  user,
  records,
  chartImageDataUrl,
}: {
  lang: Language;
  user: User | null;
  records: AssessmentRecord[];
  chartImageDataUrl?: string;
}): Promise<DashboardPdfData> {
  const branding = await getPdfBranding();
  const {userName, userEmail} = getUserLabel(user);
  const latestValue = records[0]
    ? `${records[0].value_label}${records[0].value_unit ? ` ${records[0].value_unit}` : ''}`
    : lang === 'ar'
      ? 'لا توجد نتائج محفوظة بعد'
      : 'No saved results yet';

  return {
    variant: 'dashboard',
    lang,
    title: lang === 'ar' ? 'تقرير المتابعة الصحي' : 'Health Tracking Report',
    subtitle:
      lang === 'ar'
        ? 'ملخص احترافي لأحدث النتائج والمتابعة'
        : 'A professional summary of your recent results and tracking history',
    generatedAt: new Date().toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US'),
    userName,
    userEmail,
    summary: {
      totalRecords: records.length,
      calculatorTypes: new Set(records.map((item) => item.calculator_type)).size,
      latestValue,
    },
    chartImageDataUrl,
    timelineEntries: records.slice(0, 8).map((item) => ({
      id: item.id,
      calculatorType: item.calculator_type,
      valueLabel: `${item.value_label}${item.value_unit ? ` ${item.value_unit}` : ''}`,
      createdAt: new Date(item.created_at).toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US'),
    })),
    emptyMessage:
      records.length === 0
        ? lang === 'ar'
          ? 'ابدأ بحفظ نتائجك في لوحة المتابعة ليظهر هنا تقرير أكثر اكتمالًا.'
          : 'Start saving your results in the dashboard to generate a richer report here.'
        : undefined,
    branding,
  };
}

export async function buildRecoveryPdfData({
  lang,
  user,
  injuryName,
  phaseLabel,
  phaseDuration,
  weightKg,
  profileLabel,
  goalLabel,
  dietLabel,
  planSummary,
  meals,
  shoppingList,
  supplementSchedule,
  safetyNotes,
  redFlags,
}: Omit<RecoveryPdfData, 'variant' | 'title' | 'subtitle' | 'generatedAt' | 'userName' | 'userEmail' | 'branding'> & {
  lang: Language;
  user: User | null;
}): Promise<RecoveryPdfData> {
  const branding = await getPdfBranding();
  const {userName, userEmail} = getUserLabel(user);

  return {
    variant: 'recovery',
    lang,
    title: lang === 'ar' ? 'تقرير التعافي المخصص' : 'Personal Recovery Report',
    subtitle:
      lang === 'ar'
        ? 'خطة تغذية وتعافٍ قابلة للطباعة حسب المرحلة الحالية'
        : 'A printable recovery and nutrition plan for your current phase',
    generatedAt: new Date().toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US'),
    userName,
    userEmail,
    injuryName,
    phaseLabel,
    phaseDuration,
    weightKg,
    profileLabel,
    goalLabel,
    dietLabel,
    planSummary,
    meals,
    shoppingList,
    supplementSchedule,
    safetyNotes,
    redFlags,
    branding,
  };
}

export async function generatePdfReport({
  element,
  fileName,
}: {
  element: HTMLElement;
  fileName: string;
}) {
  const {generatePdfFromElement} = await import('./pdfGenerator');
  await generatePdfFromElement({element, fileName});
}
