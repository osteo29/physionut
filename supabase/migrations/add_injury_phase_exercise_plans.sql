alter table public.injury_phases
add column if not exists exercise_plans jsonb default '[]'::jsonb;
