import {createClient} from '@supabase/supabase-js';

const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const rawSupabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl =
  typeof rawSupabaseUrl === 'string' ? rawSupabaseUrl.trim() : '';
const supabaseAnonKey =
  typeof rawSupabaseAnonKey === 'string' ? rawSupabaseAnonKey.trim() : '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

export type AssessmentRecord = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  calculator_type: string;
  value_label: string;
  value_numeric: number | null;
  value_unit: string | null;
  lang: 'en' | 'ar';
  note: string | null;
};

export type AssessmentInsert = Omit<AssessmentRecord, 'id' | 'created_at'>;

export function getSupabaseConfigStatus() {
  return {
    hasUrl: Boolean(supabaseUrl),
    hasAnonKey: Boolean(supabaseAnonKey),
    configured: isSupabaseConfigured,
  };
}

export function getSupabaseConfigurationMessage(lang: 'en' | 'ar') {
  const status = getSupabaseConfigStatus();

  if (status.configured) return '';

  if (lang === 'ar') {
    return 'إعداد Supabase غير ظاهر داخل التطبيق الآن. تأكد من وجود VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY ثم أعد تشغيل npm run dev أو أعد بناء الموقع.';
  }

  return 'Supabase settings are not visible inside the app right now. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set, then restart npm run dev or rebuild the site.';
}

export function getSupabaseActionErrorMessage(
  error: unknown,
  lang: 'en' | 'ar',
  action: 'save' | 'load' | 'delete',
) {
  const message =
    typeof error === 'object' && error !== null && 'message' in error
      ? String((error as {message?: unknown}).message || '')
      : '';
  const code =
    typeof error === 'object' && error !== null && 'code' in error
      ? String((error as {code?: unknown}).code || '')
      : '';

  if (code === '42P01' || /relation .*assessments.* does not exist/i.test(message)) {
    return lang === 'ar'
      ? 'جدول assessments غير موجود في Supabase حتى الآن. نفذ ملف SQL الخاص بالجدول أولًا.'
      : 'The assessments table does not exist in Supabase yet. Run the SQL setup file first.';
  }

  if (code === '42501' || /row-level security/i.test(message)) {
    return lang === 'ar'
      ? 'تم رفض العملية من Supabase بسبب الصلاحيات. راجع سياسات RLS الخاصة بجدول assessments.'
      : 'Supabase blocked this action because of permissions. Review the RLS policies for the assessments table.';
  }

  if (/failed to fetch/i.test(message) || /network/i.test(message)) {
    return lang === 'ar'
      ? 'تعذر الاتصال بـ Supabase حاليًا. تحقق من الإنترنت أو من عنوان المشروع.'
      : 'Could not reach Supabase right now. Check your internet connection or project URL.';
  }

  if (action === 'save') {
    return lang === 'ar'
      ? 'تعذر حفظ النتيجة الآن. تحقق من إعداد Supabase والجدول ثم حاول مرة أخرى.'
      : 'Could not save this result right now. Check the Supabase setup and table, then try again.';
  }

  if (action === 'delete') {
    return lang === 'ar'
      ? 'تعذر حذف هذا السجل الآن.'
      : 'Could not delete this record right now.';
  }

  return lang === 'ar'
    ? 'تعذر تحميل السجل الآن. تحقق من إعداد Supabase والجدول.'
    : 'Could not load the tracking log right now. Check the Supabase setup and table.';
}

export async function saveAssessment(input: AssessmentInsert) {
  if (!supabase) {
    throw new Error('Supabase is not configured yet.');
  }

  const {data, error} = await supabase
    .from('assessments')
    .insert(input)
    .select('*')
    .single();

  if (error) throw error;
  return data as AssessmentRecord;
}

export async function listAssessmentsByEmail(email: string) {
  if (!supabase) {
    throw new Error('Supabase is not configured yet.');
  }

  const {data, error} = await supabase
    .from('assessments')
    .select('*')
    .eq('email', email)
    .order('created_at', {ascending: false});

  if (error) throw error;
  return (data || []) as AssessmentRecord[];
}

export async function updateAssessmentNote(id: string, note: string) {
  if (!supabase) {
    throw new Error('Supabase is not configured yet.');
  }

  const {data, error} = await supabase
    .from('assessments')
    .update({note})
    .eq('id', id)
    .select('*')
    .single();

  if (error) throw error;
  return data as AssessmentRecord;
}

export async function deleteAssessment(id: string) {
  if (!supabase) {
    throw new Error('Supabase is not configured yet.');
  }

  const {error} = await supabase.from('assessments').delete().eq('id', id);
  if (error) throw error;
}
