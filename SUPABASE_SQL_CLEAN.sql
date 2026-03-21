--=====================================================
-- INJURY MANAGEMENT DATABASE SCHEMA
-- نظام إدارة الإصابات الرياضية
-- CLEAN SQL CODE - Ready to paste in Supabase
--=====================================================

-- جدول الإصابات الرئيسي
CREATE TABLE IF NOT EXISTS public.injuries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  injury_id_slug TEXT UNIQUE NOT NULL,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  category TEXT NOT NULL,
  body_region_en TEXT NOT NULL,
  body_region_ar TEXT NOT NULL,
  overview_en TEXT,
  overview_ar TEXT,
  rehab_summary_en TEXT,
  rehab_summary_ar TEXT,
  common_in TEXT[] DEFAULT '{}',
  red_flags TEXT[] DEFAULT '{}',
  related_calculators TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- جدول مراحل التعافي (5 مراحل لكل إصابة)
CREATE TABLE IF NOT EXISTS public.injury_phases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  injury_id UUID NOT NULL REFERENCES public.injuries(id) ON DELETE CASCADE,
  phase_number INT NOT NULL,
  label_en TEXT NOT NULL,
  label_ar TEXT NOT NULL,
  duration_en TEXT NOT NULL,
  duration_ar TEXT NOT NULL,
  recovery_window TEXT NOT NULL,
  goals_en TEXT[] DEFAULT '{}',
  goals_ar TEXT[] DEFAULT '{}',
  nutrition_focus_en TEXT[] DEFAULT '{}',
  nutrition_focus_ar TEXT[] DEFAULT '{}',
  recommended_foods_en TEXT[] DEFAULT '{}',
  recommended_foods_ar TEXT[] DEFAULT '{}',
  avoid_foods_en TEXT[] DEFAULT '{}',
  avoid_foods_ar TEXT[] DEFAULT '{}',
  exercises_en TEXT[] DEFAULT '{}',
  exercises_ar TEXT[] DEFAULT '{}',
  prohibited_movements_en TEXT[] DEFAULT '{}',
  prohibited_movements_ar TEXT[] DEFAULT '{}',
  protein_min_per_kg NUMERIC(3,1),
  protein_max_per_kg NUMERIC(3,1),
  hydration_ml_per_kg INT,
  omega3_grams NUMERIC(4,1),
  creatine_grams NUMERIC(4,1),
  collagen_min_per_kg NUMERIC(3,1),
  collagen_max_per_kg NUMERIC(3,1),
  vitamin_c_mg INT,
  calcium_mg INT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(injury_id, phase_number)
);

-- جدول المكملات الغذائية
CREATE TABLE IF NOT EXISTS public.supplements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phase_id UUID NOT NULL REFERENCES public.injury_phases(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  dose_en TEXT NOT NULL,
  dose_ar TEXT NOT NULL,
  reason_en TEXT NOT NULL,
  reason_ar TEXT NOT NULL,
  timing_en TEXT,
  timing_ar TEXT,
  caution_en TEXT,
  caution_ar TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- جدول أمثلة الوجبات
CREATE TABLE IF NOT EXISTS public.meal_examples (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phase_id UUID NOT NULL REFERENCES public.injury_phases(id) ON DELETE CASCADE,
  diet_style TEXT NOT NULL,
  breakfast_en TEXT NOT NULL,
  breakfast_ar TEXT NOT NULL,
  lunch_en TEXT NOT NULL,
  lunch_ar TEXT NOT NULL,
  dinner_en TEXT NOT NULL,
  dinner_ar TEXT NOT NULL,
  snack_en TEXT,
  snack_ar TEXT,
  shopping_list_en TEXT[] DEFAULT '{}',
  shopping_list_ar TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(phase_id, diet_style)
);

-- جدول ملاحظات الأمان
CREATE TABLE IF NOT EXISTS public.safety_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  injury_id UUID NOT NULL REFERENCES public.injuries(id) ON DELETE CASCADE,
  medications_en TEXT[] DEFAULT '{}',
  medications_ar TEXT[] DEFAULT '{}',
  supplements_en TEXT[] DEFAULT '{}',
  supplements_ar TEXT[] DEFAULT '{}',
  contraindication_medications TEXT[] DEFAULT '{}',
  contraindication_supplements TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(injury_id)
);

-- تفعيل Row Level Security
ALTER TABLE public.injuries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.injury_phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.supplements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_examples ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.safety_notes ENABLE ROW LEVEL SECURITY;

-- السماح بالقراءة للجميع (Public Read Access)
CREATE POLICY "injuries_read" ON public.injuries FOR SELECT USING (true);
CREATE POLICY "injury_phases_read" ON public.injury_phases FOR SELECT USING (true);
CREATE POLICY "supplements_read" ON public.supplements FOR SELECT USING (true);
CREATE POLICY "meal_examples_read" ON public.meal_examples FOR SELECT USING (true);
CREATE POLICY "safety_notes_read" ON public.safety_notes FOR SELECT USING (true);

-- إنشاء indexes للأداء العالي
CREATE INDEX idx_injuries_slug ON public.injuries(injury_id_slug);
CREATE INDEX idx_injuries_category ON public.injuries(category);
CREATE INDEX idx_injuries_body_region ON public.injuries(body_region_en);
CREATE INDEX idx_injury_phases_injury_id ON public.injury_phases(injury_id);
CREATE INDEX idx_supplements_phase_id ON public.supplements(phase_id);
CREATE INDEX idx_meal_examples_phase_id ON public.meal_examples(phase_id);
CREATE INDEX idx_safety_notes_injury_id ON public.safety_notes(injury_id);
