create table if not exists public.exercise_library_entries (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  region text not null,
  description text,
  difficulty text,
  video_url text,
  thumbnail_path text,
  source text default 'supabase',
  created_at timestamptz not null default now()
);

grant usage on schema public to anon, authenticated;
grant select on table public.exercise_library_entries to anon, authenticated;
grant select, insert, update, delete on table public.exercise_library_entries to authenticated;

alter table public.exercise_library_entries enable row level security;

drop policy if exists "exercise_library_entries_read" on public.exercise_library_entries;
create policy "exercise_library_entries_read"
on public.exercise_library_entries
for select
using (true);

drop policy if exists "exercise_library_entries_admin_write" on public.exercise_library_entries;
create policy "exercise_library_entries_admin_write"
on public.exercise_library_entries
for all
to authenticated
using (
  (select count(1) from public.admin_users where user_id = auth.uid()) > 0
)
with check (
  (select count(1) from public.admin_users where user_id = auth.uid()) > 0
);

insert into public.exercise_library_entries (
  slug,
  name,
  region,
  description,
  difficulty,
  video_url,
  thumbnail_path,
  source
)
values
  ('incline-bench-press', 'Incline Bench Press', 'chest', 'Emphasizes the upper chest with a stable incline pressing angle.', 'intermediate', null, '/exercises/thumbnails/incline-bench-press-thumb.svg', 'seed'),
  ('low-incline-dumbbell-press', 'Low Incline Dumbbell Press', 'chest', 'Builds upper-chest strength with a friendlier range than a steep incline.', 'beginner', null, '/exercises/thumbnails/low-incline-dumbbell-press-thumb.svg', 'seed'),
  ('flat-dumbbell-bench-press', 'Flat Dumbbell Bench Press', 'chest', 'A classic chest builder with more arm freedom than a barbell bench.', 'beginner', null, '/exercises/thumbnails/flat-dumbbell-bench-press-thumb.svg', 'seed'),
  ('push-up', 'Push-Up', 'chest', 'Develops chest strength and trunk stiffness with easy scaling options.', 'beginner', null, '/exercises/thumbnails/push-up-thumb.svg', 'seed'),
  ('chest-dip', 'Chest Dip', 'chest', 'Biases the lower chest through deep shoulder extension and bodyweight loading.', 'advanced', null, '/exercises/thumbnails/chest-dip-thumb.svg', 'seed'),
  ('decline-push-up', 'Decline Push-Up', 'chest', 'A bodyweight press that increases chest loading by elevating the feet.', 'intermediate', null, '/exercises/thumbnails/decline-push-up-thumb.svg', 'seed'),
  ('pull-up', 'Pull-Up', 'back', 'A high-value vertical pull for upper-back and lat strength.', 'advanced', null, '/exercises/thumbnails/pull-up-thumb.svg', 'seed'),
  ('neutral-grip-lat-pulldown', 'Neutral-Grip Lat Pulldown', 'back', 'Builds the lats through a guided vertical pull with easier load control.', 'beginner', null, '/exercises/thumbnails/neutral-grip-lat-pulldown-thumb.svg', 'seed'),
  ('straight-arm-band-pulldown', 'Straight-Arm Band Pulldown', 'back', 'Teaches lat engagement without heavy elbow flexion or body swing.', 'beginner', null, '/exercises/thumbnails/straight-arm-band-pulldown-thumb.svg', 'seed'),
  ('barbell-row', 'Barbell Row', 'back', 'Loads the entire posterior chain while building upper-back density.', 'intermediate', null, '/exercises/thumbnails/barbell-row-thumb.svg', 'seed'),
  ('chest-supported-dumbbell-row', 'Chest-Supported Dumbbell Row', 'back', 'Targets the upper back without asking the lower back to hold a hinge.', 'beginner', null, '/exercises/thumbnails/chest-supported-dumbbell-row-thumb.svg', 'seed'),
  ('band-face-pull', 'Band Face Pull', 'back', 'Improves scapular control and posterior shoulder endurance.', 'beginner', null, '/exercises/thumbnails/band-face-pull-thumb.svg', 'seed'),
  ('barbell-shrug', 'Barbell Shrug', 'back', 'Direct trap work with simple loading and easy progression.', 'beginner', null, '/exercises/thumbnails/barbell-shrug-thumb.svg', 'seed'),
  ('prone-y-raise', 'Prone Y Raise', 'back', 'Targets the lower traps and scapular upward-rotation pattern.', 'beginner', null, '/exercises/thumbnails/prone-y-raise-thumb.svg', 'seed'),
  ('back-extension', 'Back Extension', 'back', 'Builds spinal extensor endurance with a simple setup.', 'intermediate', null, '/exercises/thumbnails/back-extension-thumb.svg', 'seed'),
  ('seated-dumbbell-overhead-press', 'Seated Dumbbell Overhead Press', 'shoulders', 'A direct shoulder strength builder that also challenges trunk control.', 'intermediate', null, '/exercises/thumbnails/seated-dumbbell-overhead-press-thumb.svg', 'seed'),
  ('landmine-press', 'Landmine Press', 'shoulders', 'Offers a shoulder-friendly pressing path between flat and overhead.', 'beginner', null, '/exercises/thumbnails/landmine-press-thumb.svg', 'seed'),
  ('dumbbell-lateral-raise', 'Dumbbell Lateral Raise', 'shoulders', 'A simple isolation drill for side-delt size and shoulder shape.', 'beginner', null, '/exercises/thumbnails/dumbbell-lateral-raise-thumb.svg', 'seed'),
  ('cable-rear-delt-fly', 'Cable Rear Delt Fly', 'shoulders', 'Keeps tension on the rear delts through a long arc.', 'intermediate', null, '/exercises/thumbnails/cable-rear-delt-fly-thumb.svg', 'seed'),
  ('band-external-rotation', 'Band External Rotation', 'shoulders', 'Supports shoulder control and cuff endurance around pressing volume.', 'beginner', null, '/exercises/thumbnails/band-external-rotation-thumb.svg', 'seed')
on conflict (slug) do update
set
  name = excluded.name,
  region = excluded.region,
  description = excluded.description,
  difficulty = excluded.difficulty,
  video_url = excluded.video_url,
  thumbnail_path = excluded.thumbnail_path,
  source = excluded.source;
