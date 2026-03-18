import {createClient} from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;

export type AssessmentLeadInput = {
  name: string;
  email: string;
  calculator_type: string;
  lang: 'en' | 'ar';
  result_summary: string;
};

export async function saveAssessmentLead(input: AssessmentLeadInput) {
  if (!supabase) {
    throw new Error('Supabase is not configured yet.');
  }

  const {error} = await supabase.from('assessment_leads').insert(input);
  if (error) throw error;
}
