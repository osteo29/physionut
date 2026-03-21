create extension if not exists "pgcrypto";

create table if not exists public.assessment_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  calculator_type text not null,
  lang text not null check (lang in ('en', 'ar')),
  result_summary text not null
);

alter table public.assessment_leads enable row level security;

drop policy if exists "Allow anonymous lead inserts" on public.assessment_leads;

create policy "Allow anonymous lead inserts"
on public.assessment_leads
for insert
to anon
with check (true);

-- ========================================
-- INJURY MANAGEMENT DATABASE SCHEMA
-- ========================================

-- Main injuries table (فئات الإصابات)
create table if not exists public.injuries (
  id uuid primary key default gen_random_uuid(),
  injury_id_slug text unique not null, -- "acl_injury", "hamstring_strain", etc
  name_en text not null,
  name_ar text not null,
  category text not null, -- Ligament, Tendon, Muscle, Bone, Joint, Spine, Post-surgery, Overuse, Sports, Pediatric, Geriatric
  body_region_en text not null,
  body_region_ar text not null,
  overview_en text,
  overview_ar text,
  rehab_summary_en text,
  rehab_summary_ar text,
  common_in text[] default '{}',
  red_flags text[] default '{}',
  related_calculators text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Injury phases table (مراحل التعافي - 5 مراحل لكل إصابة)
create table if not exists public.injury_phases (
  id uuid primary key default gen_random_uuid(),
  injury_id uuid not null references public.injuries(id) on delete cascade,
  phase_number int not null, -- 1-5
  label_en text not null,
  label_ar text not null,
  duration_en text not null,
  duration_ar text not null,
  recovery_window text not null, -- under_48h, days_3_14, weeks_2_6, over_6_weeks
  goals_en text[] default '{}',
  goals_ar text[] default '{}',
  nutrition_focus_en text[] default '{}',
  nutrition_focus_ar text[] default '{}',
  recommended_foods_en text[] default '{}',
  recommended_foods_ar text[] default '{}',
  avoid_foods_en text[] default '{}',
  avoid_foods_ar text[] default '{}',
  exercises_en text[] default '{}',
  exercises_ar text[] default '{}',
  prohibited_movements_en text[] default '{}',
  prohibited_movements_ar text[] default '{}',
  protein_min_per_kg numeric(3,1),
  protein_max_per_kg numeric(3,1),
  hydration_ml_per_kg int,
  omega3_grams numeric(4,1),
  creatine_grams numeric(4,1),
  collagen_min_per_kg numeric(3,1),
  collagen_max_per_kg numeric(3,1),
  vitamin_c_mg int,
  calcium_mg int,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(injury_id, phase_number)
);

-- Supplements table (المكملات الغذائية)
create table if not exists public.supplements (
  id uuid primary key default gen_random_uuid(),
  phase_id uuid not null references public.injury_phases(id) on delete cascade,
  name text not null,
  dose_en text not null,
  dose_ar text not null,
  reason_en text not null,
  reason_ar text not null,
  timing_en text,
  timing_ar text,
  caution_en text,
  caution_ar text,
  order_index int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Meal examples table (أمثلة الوجبات)
create table if not exists public.meal_examples (
  id uuid primary key default gen_random_uuid(),
  phase_id uuid not null references public.injury_phases(id) on delete cascade,
  diet_style text not null, -- "omnivore", "vegetarian"
  breakfast_en text not null,
  breakfast_ar text not null,
  lunch_en text not null,
  lunch_ar text not null,
  dinner_en text not null,
  dinner_ar text not null,
  snack_en text,
  snack_ar text,
  shopping_list_en text[] default '{}',
  shopping_list_ar text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(phase_id, diet_style)
);

-- Safety notes table (ملاحظات الأمان والتفاعلات)
create table if not exists public.safety_notes (
  id uuid primary key default gen_random_uuid(),
  injury_id uuid not null references public.injuries(id) on delete cascade,
  medications_en text[] default '{}',
  medications_ar text[] default '{}',
  supplements_en text[] default '{}',
  supplements_ar text[] default '{}',
  contraindication_medications text[] default '{}',
  contraindication_supplements text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(injury_id)
);

-- Enable Row Level Security
alter table public.injuries enable row level security;
alter table public.injury_phases enable row level security;
alter table public.supplements enable row level security;
alter table public.meal_examples enable row level security;
alter table public.safety_notes enable row level security;

-- RLS Policies (السماح بالقراءة للجميع)
drop policy if exists "injuries_read" on public.injuries;
drop policy if exists "injury_phases_read" on public.injury_phases;
drop policy if exists "supplements_read" on public.supplements;
drop policy if exists "meal_examples_read" on public.meal_examples;
drop policy if exists "safety_notes_read" on public.safety_notes;

create policy "injuries_read" on public.injuries for select using (true);
create policy "injury_phases_read" on public.injury_phases for select using (true);
create policy "supplements_read" on public.supplements for select using (true);
create policy "meal_examples_read" on public.meal_examples for select using (true);
create policy "safety_notes_read" on public.safety_notes for select using (true);

-- Create indexes for better performance
create index if not exists idx_injuries_slug on public.injuries(injury_id_slug);
create index if not exists idx_injuries_category on public.injuries(category);
create index if not exists idx_injuries_body_region on public.injuries(body_region_en);
create index if not exists idx_injury_phases_injury_id on public.injury_phases(injury_id);
create index if not exists idx_supplements_phase_id on public.supplements(phase_id);
create index if not exists idx_meal_examples_phase_id on public.meal_examples(phase_id);
create index if not exists idx_safety_notes_injury_id on public.safety_notes(injury_id);
