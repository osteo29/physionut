import {supabase} from '../lib/supabase';
import type {Database} from '../lib/supabaseDatabase';

export type AdminDashboardMetrics = {
  injuries: number;
  phases: number;
  articles: number;
  assessments: number;
  leads: number;
};

function ensureSupabase() {
  if (!supabase) {
    throw new Error('Supabase is not configured.');
  }

  return supabase;
}

type DashboardTable = keyof Pick<
  Database['public']['Tables'],
  'injuries' | 'injury_phases' | 'articles' | 'assessments' | 'assessment_leads'
>;

async function fetchCount(table: DashboardTable) {
  const client = ensureSupabase();
  const {count, error} = await client.from(table).select('*', {count: 'exact', head: true});
  if (error) throw error;
  return count || 0;
}

export async function fetchAdminDashboardMetrics(): Promise<AdminDashboardMetrics> {
  const [injuries, phases, articles, assessments, leads] = await Promise.all([
    fetchCount('injuries'),
    fetchCount('injury_phases'),
    fetchCount('articles'),
    fetchCount('assessments'),
    fetchCount('assessment_leads'),
  ]);

  return {
    injuries,
    phases,
    articles,
    assessments,
    leads,
  };
}
