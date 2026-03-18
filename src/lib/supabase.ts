import {createClient} from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

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
