import {supabase, isSupabaseConfigured} from '../lib/supabase';
import type {TableRow} from '../lib/supabaseDatabase';

export type ExerciseLibraryRow = TableRow<'exercise_library_entries'>;
const EXERCISE_SUPABASE_TIMEOUT_MS = 4000;

export async function fetchExerciseLibraryEntriesFromSupabase(): Promise<ExerciseLibraryRow[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), EXERCISE_SUPABASE_TIMEOUT_MS);

  try {
    const {data, error} = await supabase
      .from('exercise_library_entries')
      .select('*')
      .order('region')
      .order('name')
      .abortSignal(controller.signal);

    if (error) {
      console.error('Error fetching exercise library entries:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Exercise library fetch timed out or failed:', error);
    return [];
  } finally {
    clearTimeout(timeout);
  }
}
