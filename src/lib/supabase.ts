import {
  createClient,
  type AuthChangeEvent,
  type Session,
  type User,
} from '@supabase/supabase-js';

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
  user_id: string;
  name: string | null;
  email: string | null;
  calculator_type: string;
  value_label: string;
  value_numeric: number | null;
  value_unit: string | null;
  lang: 'en' | 'ar';
  note: string | null;
};

export type AssessmentInsert = Omit<
  AssessmentRecord,
  'id' | 'created_at' | 'user_id' | 'name' | 'email'
>;

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
  action: 'save' | 'load' | 'delete' | 'auth',
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
      ? 'جدول assessments غير موجود في Supabase حتى الآن. نفذ ملف SQL الخاص بالنظام الآمن أولًا.'
      : 'The assessments table does not exist in Supabase yet. Run the secure SQL setup first.';
  }

  if (code === '42501' || /row-level security/i.test(message)) {
    return lang === 'ar'
      ? 'تم رفض العملية من Supabase بسبب الصلاحيات أو سياسات RLS. راجع سياسات جدول assessments.'
      : 'Supabase blocked this action because of permissions or RLS policies. Review the assessments table policies.';
  }

  if (/invalid login credentials/i.test(message)) {
    return lang === 'ar'
      ? 'بيانات تسجيل الدخول غير صحيحة.'
      : 'Invalid login credentials.';
  }

  if (/email not confirmed/i.test(message)) {
    return lang === 'ar'
      ? 'يجب تأكيد البريد الإلكتروني قبل تسجيل الدخول.'
      : 'Your email must be confirmed before signing in.';
  }

  if (/user already registered/i.test(message)) {
    return lang === 'ar'
      ? 'هذا البريد مسجل بالفعل.'
      : 'This email is already registered.';
  }

  if (/failed to fetch/i.test(message) || /network/i.test(message)) {
    return lang === 'ar'
      ? 'تعذر الاتصال بـ Supabase حاليًا. تحقق من الإنترنت أو من عنوان المشروع.'
      : 'Could not reach Supabase right now. Check your internet connection or project URL.';
  }

  if (action === 'auth') {
    return lang === 'ar'
      ? 'تعذر إتمام تسجيل الدخول أو إنشاء الحساب الآن.'
      : 'Could not complete authentication right now.';
  }

  if (action === 'save') {
    return lang === 'ar'
      ? 'تعذر حفظ النتيجة الآن. تحقق من تسجيل الدخول وسياسات الجدول ثم حاول مرة أخرى.'
      : 'Could not save this result right now. Check authentication and table policies, then try again.';
  }

  if (action === 'delete') {
    return lang === 'ar'
      ? 'تعذر حذف هذا السجل الآن.'
      : 'Could not delete this record right now.';
  }

  return lang === 'ar'
    ? 'تعذر تحميل السجل الآن. تحقق من تسجيل الدخول وإعداد Supabase.'
    : 'Could not load the tracking log right now. Check authentication and Supabase setup.';
}

function ensureSupabase() {
  if (!supabase) {
    throw new Error('Supabase is not configured yet.');
  }

  return supabase;
}

export async function getCurrentUser() {
  const client = ensureSupabase();
  const {data, error} = await client.auth.getUser();
  if (error) throw error;
  return data.user;
}

export async function getCurrentSession() {
  const client = ensureSupabase();
  const {data, error} = await client.auth.getSession();
  if (error) throw error;
  return data.session;
}

export async function signUpWithEmail(
  email: string,
  password: string,
  options?: {fullName?: string},
) {
  const client = ensureSupabase();
  const {data, error} = await client.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: options?.fullName || '',
      },
    },
  });
  if (error) throw error;
  return data;
}

export async function signInWithEmail(email: string, password: string) {
  const client = ensureSupabase();
  const {data, error} = await client.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signOutCurrentUser() {
  const client = ensureSupabase();
  const {error} = await client.auth.signOut();
  if (error) throw error;
}

export function onSupabaseAuthChange(
  callback: (event: AuthChangeEvent, session: Session | null) => void,
) {
  const client = ensureSupabase();
  return client.auth.onAuthStateChange(callback);
}

export async function saveAssessment(input: AssessmentInsert) {
  const client = ensureSupabase();
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('Authentication required.');
  }

  const fallbackName =
    typeof user.user_metadata?.full_name === 'string' && user.user_metadata.full_name.trim()
      ? user.user_metadata.full_name.trim()
      : user.email?.split('@')[0] || 'User';

  const payload = {
    ...input,
    user_id: user.id,
    name: fallbackName,
    email: user.email || null,
  };

  const {data, error} = await client
    .from('assessments')
    .insert(payload)
    .select('*')
    .single();

  if (error) throw error;
  return data as AssessmentRecord;
}

export async function listAssessmentsForCurrentUser() {
  const client = ensureSupabase();
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('Authentication required.');
  }

  const {data, error} = await client
    .from('assessments')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', {ascending: false});

  if (error) throw error;
  return (data || []) as AssessmentRecord[];
}

export async function updateAssessmentNote(id: string, note: string) {
  const client = ensureSupabase();
  const {data, error} = await client
    .from('assessments')
    .update({note})
    .eq('id', id)
    .select('*')
    .single();

  if (error) throw error;
  return data as AssessmentRecord;
}

export async function deleteAssessment(id: string) {
  const client = ensureSupabase();
  const {error} = await client.from('assessments').delete().eq('id', id);
  if (error) throw error;
}

export type {User, Session};
