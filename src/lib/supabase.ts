import {
  createClient,
  type AuthChangeEvent,
  type Session,
  type User,
} from '@supabase/supabase-js';
import type {Article} from '../services/articles';
import {decodeMojibake} from '../services/textEncoding';
import type {Language} from '../services/translations';
import type {Database, TableInsert, TableRow} from './supabaseDatabase';

const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const rawSupabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const rawSiteUrl = import.meta.env.VITE_SITE_URL;

const supabaseUrl = typeof rawSupabaseUrl === 'string' ? rawSupabaseUrl.trim() : '';
const supabaseAnonKey = typeof rawSupabaseAnonKey === 'string' ? rawSupabaseAnonKey.trim() : '';
const configuredSiteUrl = typeof rawSiteUrl === 'string' ? rawSiteUrl.trim().replace(/\/+$/, '') : '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

export type AssessmentRecord = TableRow<'assessments'>;
export type AssessmentInsert = Omit<TableInsert<'assessments'>, 'id' | 'created_at' | 'user_id' | 'name' | 'email'>;
export type PublishedArticleRecord = TableRow<'articles'>;

const articleAdminEmailRaw = import.meta.env.VITE_ARTICLE_ADMIN_EMAIL;
const articleAdminEmail =
  typeof articleAdminEmailRaw === 'string' ? articleAdminEmailRaw.trim().toLowerCase() : '';

const arMessages = {
  config:
    'إعداد Supabase غير ظاهر داخل التطبيق الآن. تأكد من وجود VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY ثم أعد تشغيل npm run dev أو أعد بناء الموقع.',
  tableMissing:
    'جدول assessments غير موجود في Supabase حتى الآن. نفذ ملف SQL الخاص بالنظام الآمن أولًا.',
  rls:
    'تم رفض العملية من Supabase بسبب الصلاحيات أو سياسات RLS. راجع سياسات جدول assessments.',
  invalidCredentials: 'بيانات تسجيل الدخول غير صحيحة.',
  emailNotConfirmed: 'يجب تأكيد البريد الإلكتروني قبل تسجيل الدخول.',
  alreadyRegistered: 'هذا البريد مسجل بالفعل.',
  network: 'تعذر الاتصال بـ Supabase حاليًا. تحقق من الإنترنت أو من عنوان المشروع.',
  auth: 'تعذر إتمام تسجيل الدخول أو إنشاء الحساب الآن.',
  save: 'تعذر حفظ النتيجة الآن. تحقق من تسجيل الدخول وسياسات الجدول ثم حاول مرة أخرى.',
  delete: 'تعذر حذف هذا السجل الآن.',
  load: 'تعذر تحميل السجل الآن. تحقق من تسجيل الدخول وإعداد Supabase.',
} as const;

function ar(text: string) {
  return decodeMojibake(text);
}

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
    return ar(arMessages.config);
  }

  return 'Supabase settings are not visible inside the app right now. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set, then restart npm run dev or rebuild the site.';
}

export function isArticleAdminUser(user: User | null) {
  if (!user?.email || !articleAdminEmail) return false;
  return user.email.trim().toLowerCase() === articleAdminEmail;
}

export function getArticleAdminEmail() {
  return articleAdminEmail;
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
      ? ar(arMessages.tableMissing)
      : 'The assessments table does not exist in Supabase yet. Run the secure SQL setup first.';
  }

  if (code === '42501' || /row-level security/i.test(message)) {
    return lang === 'ar'
      ? ar(arMessages.rls)
      : 'Supabase blocked this action because of permissions or RLS policies. Review the assessments table policies.';
  }

  if (/invalid login credentials/i.test(message)) {
    return lang === 'ar' ? ar(arMessages.invalidCredentials) : 'Invalid login credentials.';
  }

  if (/email not confirmed/i.test(message)) {
    return lang === 'ar' ? ar(arMessages.emailNotConfirmed) : 'Your email must be confirmed before signing in.';
  }

  if (/user already registered/i.test(message)) {
    return lang === 'ar' ? ar(arMessages.alreadyRegistered) : 'This email is already registered.';
  }

  if (/failed to fetch/i.test(message) || /network/i.test(message)) {
    return lang === 'ar'
      ? ar(arMessages.network)
      : 'Could not reach Supabase right now. Check your internet connection or project URL.';
  }

  if (/provider is not enabled/i.test(message) || /unsupported provider/i.test(message)) {
    return lang === 'ar'
      ? 'مزود تسجيل الدخول الاجتماعي هذا غير مفعّل حاليًا داخل Supabase Auth.'
      : 'This social login provider is not enabled in Supabase Auth yet.';
  }

  if (action === 'auth') {
    return lang === 'ar' ? ar(arMessages.auth) : 'Could not complete authentication right now.';
  }

  if (action === 'save') {
    return lang === 'ar'
      ? ar(arMessages.save)
      : 'Could not save this result right now. Check authentication and table policies, then try again.';
  }

  if (action === 'delete') {
    return lang === 'ar' ? ar(arMessages.delete) : 'Could not delete this record right now.';
  }

  return lang === 'ar'
    ? ar(arMessages.load)
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

export async function signInWithSocial(provider: 'google' | 'facebook') {
  const client = ensureSupabase();
  const redirectBase =
    configuredSiteUrl ||
    (typeof window !== 'undefined' && window.location.origin
      ? window.location.origin.replace(/\/+$/, '')
      : 'https://physionutrition.vercel.app');
  const {data, error} = await client.auth.signInWithOAuth({
    provider,
    options: {
      // توجيه المستخدم لهذا الرابط بعد نجاح العملية في Google/Facebook
      redirectTo: `${redirectBase}/auth/callback`,
    },
  });
  if (error) throw error;
  return data;
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
  } satisfies TableInsert<'assessments'>;

  const {data, error} = await client.from('assessments').insert(payload).select('*').single();

  if (error) throw error;
  return data;
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
  return data || [];
}

export async function updateAssessmentNote(id: string, note: string) {
  const client = ensureSupabase();
  const {data, error} = await client.from('assessments').update({note}).eq('id', id).select('*').single();

  if (error) throw error;
  return data;
}

export async function deleteAssessment(id: string) {
  const client = ensureSupabase();
  const {error} = await client.from('assessments').delete().eq('id', id);
  if (error) throw error;
}

function mapRecordToArticle(record: PublishedArticleRecord, index: number): Article {
  return {
    id: index + 1,
    slug: record.slug,
    title: record.title,
    excerpt: record.excerpt,
    content: record.content,
    category: record.category,
    date: record.date,
    icon: record.icon,
    image: record.image || undefined,
  };
}

export async function listPublishedArticles(lang: Language) {
  const client = ensureSupabase();
  const {data, error} = await client
    .from('articles')
    .select('*')
    .eq('lang', lang)
    .order('date', {ascending: false})
    .order('created_at', {ascending: false});

  if (error) throw error;
  return (data || []).map(mapRecordToArticle);
}

export async function replacePublishedArticles(lang: Language, articles: Article[]) {
  const client = ensureSupabase();
  const user = await getCurrentUser();

  if (!isArticleAdminUser(user)) {
    throw new Error('Only the article admin can publish changes.');
  }

  const {error: deleteError} = await client.from('articles').delete().eq('lang', lang);
  if (deleteError) throw deleteError;

  if (!articles.length) return;

  const payload: TableInsert<'articles'>[] = articles.map((article) => ({
    lang,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    content: article.content,
    category: article.category,
    date: article.date,
    icon: article.icon,
    image: article.image || null,
  }));

  const {error: insertError} = await client.from('articles').insert(payload);
  if (insertError) throw insertError;
}

export type {User, Session};
