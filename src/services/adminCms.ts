import {supabase} from '../lib/supabase';
import type {TableInsert, TableRow, TableUpdate} from '../lib/supabaseDatabase';

function ensureSupabase() {
  if (!supabase) {
    throw new Error('Supabase is not configured.');
  }

  return supabase;
}

export type ExerciseLibraryEntryRow = TableRow<'exercise_library_entries'>;
export type ExerciseLibraryEntryInsert = TableInsert<'exercise_library_entries'>;
export type ExerciseLibraryEntryUpdate = TableUpdate<'exercise_library_entries'>;
export type HomepageSettingsRow = TableRow<'homepage_settings'>;
export type HomepageSettingsInsert = TableInsert<'homepage_settings'>;
export type AdminUserRow = TableRow<'admin_users'>;
export type AdminUserUpdate = TableUpdate<'admin_users'>;

export async function listExerciseLibraryEntriesAdmin() {
  const client = ensureSupabase();
  const {data, error} = await client
    .from('exercise_library_entries')
    .select('*')
    .order('region', {ascending: true})
    .order('name', {ascending: true});

  if (error) throw error;
  return data || [];
}

export async function createExerciseLibraryEntry(input: ExerciseLibraryEntryInsert) {
  const client = ensureSupabase();
  const {data, error} = await client.from('exercise_library_entries').insert(input).select('*').single();
  if (error) throw error;
  return data;
}

export async function updateExerciseLibraryEntry(id: string, input: ExerciseLibraryEntryUpdate) {
  const client = ensureSupabase();
  const {data, error} = await client.from('exercise_library_entries').update(input).eq('id', id).select('*').single();
  if (error) throw error;
  return data;
}

export async function deleteExerciseLibraryEntry(id: string) {
  const client = ensureSupabase();
  const {error} = await client.from('exercise_library_entries').delete().eq('id', id);
  if (error) throw error;
}

export async function listHomepageSettings() {
  const client = ensureSupabase();
  const {data, error} = await client.from('homepage_settings').select('*').order('lang', {ascending: true});
  if (error) throw error;
  return data || [];
}

export async function upsertHomepageSettings(input: HomepageSettingsInsert) {
  const client = ensureSupabase();
  const {data, error} = await client
    .from('homepage_settings')
    .upsert(input, {onConflict: 'lang'})
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export async function listAdminUsers() {
  const client = ensureSupabase();
  const {data, error} = await client.from('admin_users').select('*').order('email', {ascending: true});
  if (error) throw error;
  return data || [];
}

export async function updateAdminUser(id: string, input: AdminUserUpdate) {
  const client = ensureSupabase();
  const {data, error} = await client.from('admin_users').update(input).eq('id', id).select('*').single();
  if (error) throw error;
  return data;
}
