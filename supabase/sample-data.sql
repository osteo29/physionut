-- Sample Data Insertion Script
-- إدراج بيانات عينة لاختبار النظام
-- 
-- استخدم هذا الملف لـ:
-- 1. اختبار الجداول بعد الإنشاء
-- 2. فهم هيكل البيانات
-- 3. توفير بيانات عينة للتطوير

-- ============================================================
-- 1. INSERT into injuries table
-- ============================================================

INSERT INTO public.injuries (
  injury_id_slug,
  name_en,
  name_ar,
  category,
  body_region_en,
  body_region_ar,
  overview_en,
  overview_ar,
  rehab_summary_en,
  rehab_summary_ar,
  common_in,
  red_flags,
  related_calculators
) VALUES (
  'knee-acl-tear',
  'ACL Tear (Anterior Cruciate Ligament)',
  'تمزق الرباط الصليبي',
  'Ligament Injury',
  'Knee',
  'الركبة',
  'Complete or partial tear of the anterior cruciate ligament, often occurring from sudden direction change or impact.',
  'تمزق كامل أو جزئي للرباط الصليبي الأمامي، يحدث غالباً من تغيير اتجاه مفاجئ أو ضربة.',
  'Full ACL rehabilitation requires 6-12 months with focus on strength, proprioception, and functional movement patterns.',
  'إعادة تأهيل شاملة للرباط الصليبي تتطلب 6-12 شهراً مع التركيز على القوة والتوازن والحركة الوظيفية.',
  ARRAY['Athletes', 'Sports enthusiasts', 'Dancers'],
  ARRAY['Severe swelling', 'Inability to bear weight', 'Loud pop feeling'],
  ARRAY['BMI Calculator', 'Protein Calculator']
);

-- ============================================================
-- 2. INSERT into injury_phases table
-- Phase 1: Acute/Inflammatory Phase (Weeks 1-2)
-- ============================================================

INSERT INTO public.injury_phases (
  injury_id,
  phase_number,
  label_en,
  label_ar,
  duration_en,
  duration_ar,
  recovery_window,
  goals_en,
  goals_ar,
  nutrition_focus_en,
  nutrition_focus_ar,
  recommended_foods_en,
  recommended_foods_ar,
  avoid_foods_en,
  avoid_foods_ar,
  exercises_en,
  exercises_ar,
  prohibited_movements_en,
  prohibited_movements_ar,
  protein_min_per_kg,
  protein_max_per_kg,
  hydration_ml_per_kg,
  omega3_grams,
  vitamin_c_mg,
  calcium_mg
) SELECT 
  id,
  1,
  'Acute/Inflammatory Phase',
  'المرحلة الحادة والالتهابية',
  'Weeks 1-2',
  'الأسبوع الأول والثاني',
  '1-2 weeks',
  ARRAY['Rest and protect the knee', 'Reduce swelling and pain', 'Maintain upper body fitness'],
  ARRAY['الراحة وحماية الركبة', 'تقليل التورم والألم', 'الحفاظ على لياقة الجزء العلوي'],
  ARRAY['Anti-inflammatory foods', 'Protein recovery', 'Hydration management'],
  ARRAY['الأطعمة المضادة للالتهاب', 'البروتين للتعافي', 'إدارة السوائل'],
  ARRAY['Salmon', 'Leafy greens', 'Berries', 'Eggs', 'Bone broth'],
  ARRAY['السمك', 'الأوراق الخضراء', 'التوت', 'البيض', 'مرق العظام'],
  ARRAY['Fried foods', 'Excessive sugar', 'Alcohol', 'Processed meats'],
  ARRAY['الأطعمة المقلية', 'السكريات الزائدة', 'الكحول', 'اللحوم المصنعة'],
  ARRAY['Quad sets', 'Glute activation', 'Upper body mobility'],
  ARRAY['تمارين الفخذ الأمامي', 'تنشيط الأرداف', 'مرونة الجزء العلوي'],
  ARRAY['Jumping', 'Running', 'Pivoting', 'Squats', 'Lunges', 'Deep twisting'],
  ARRAY['القفز', 'الجري', 'الدوران', 'السكوات', 'الاندفاعات', 'الالتواء العميق'],
  1.8,
  2.0,
  40,
  2,
  200,
  1200
FROM public.injuries WHERE injury_id_slug = 'knee-acl-tear'
LIMIT 1;

-- Phase 2: Early Mobilization Phase (Weeks 3-6)
INSERT INTO public.injury_phases (
  injury_id,
  phase_number,
  label_en,
  label_ar,
  duration_en,
  duration_ar,
  recovery_window,
  goals_en,
  goals_ar,
  nutrition_focus_en,
  nutrition_focus_ar,
  protein_min_per_kg,
  protein_max_per_kg,
  hydration_ml_per_kg,
  collagen_min_per_kg,
  collagen_max_per_kg,
  vitamin_c_mg
) SELECT 
  id,
  2,
  'Early Mobilization Phase',
  'مرحلة التحريك المبكرة',
  'Weeks 3-6',
  'الأسابيع 3-6',
  '3-6 weeks',
  ARRAY['Restore range of motion', 'Begin gentle strengthening', 'Improve muscle activation'],
  ARRAY['استعادة مدى الحركة', 'بدء تقوية لطيفة', 'تحسين تنشيط العضلات'],
  ARRAY['Collagen synthesis', 'Continued protein intake', 'Reduce inflammation'],
  ARRAY['بناء الكولاجين', 'الاستمرار في البروتين', 'تقليل الالتهاب'],
  1.8,
  2.2,
  45,
  10,
  15,
  250
FROM public.injuries WHERE injury_id_slug = 'knee-acl-tear'
LIMIT 1;

-- Phase 3: Strengthening Phase (Weeks 7-12)
INSERT INTO public.injury_phases (
  injury_id,
  phase_number,
  label_en,
  label_ar,
  duration_en,
  duration_ar,
  recovery_window,
  goals_en,
  goals_ar,
  nutrition_focus_en,
  nutrition_focus_ar,
  protein_min_per_kg,
  protein_max_per_kg,
  hydration_ml_per_kg,
  creatine_grams,
  collagen_min_per_kg,
  collagen_max_per_kg,
  vitamin_c_mg,
  calcium_mg
) SELECT 
  id,
  3,
  'Strengthening Phase',
  'مرحلة التقوية',
  'Weeks 7-12',
  'الأسابيع 7-12',
  'weeks_2_6',
  ARRAY['Build muscle strength', 'Restore proprioception', 'Improve running mechanics'],
  ARRAY['بناء قوة العضلات', 'استعادة الإحساس', 'تحسين آلية الركض'],
  ARRAY['Protein synthesis', 'Muscle recovery', 'Collagen formation'],
  ARRAY['تخليق البروتين', 'استعادة العضلات', 'تكوين الكولاجين'],
  1.8,
  2.2,
  50,
  5,
  10,
  15,
  500,
  1200
FROM public.injuries WHERE injury_id_slug = 'knee-acl-tear'
LIMIT 1;

-- Phase 4: Advanced Strengthening (Weeks 13-20)
INSERT INTO public.injury_phases (
  injury_id,
  phase_number,
  label_en,
  label_ar,
  duration_en,
  duration_ar,
  recovery_window,
  goals_en,
  goals_ar,
  nutrition_focus_en,
  nutrition_focus_ar,
  protein_min_per_kg,
  protein_max_per_kg,
  hydration_ml_per_kg,
  creatine_grams,
  collagen_min_per_kg,
  collagen_max_per_kg,
  vitamin_c_mg,
  calcium_mg
) SELECT 
  id,
  4,
  'Advanced Strengthening',
  'التقوية المتقدمة',
  'Weeks 13-20',
  'الأسابيع 13-20',
  'over_6_weeks',
  ARRAY['Sport-specific training', 'Power development', 'Agility work'],
  ARRAY['تدريب خاص بالرياضة', 'تطوير القوة', 'تحسين الرشاقة'],
  ARRAY['Explosive power', 'Joint stability', 'Endurance'],
  ARRAY['القوة المتفجرة', 'استقرار المفاصل', 'التحمل'],
  2.0,
  2.2,
  40,
  8,
  8,
  12,
  400,
  1000
FROM public.injuries WHERE injury_id_slug = 'knee-acl-tear'
LIMIT 1;

-- Phase 5: Return to Sport (Weeks 21+)
INSERT INTO public.injury_phases (
  injury_id,
  phase_number,
  label_en,
  label_ar,
  duration_en,
  duration_ar,
  recovery_window,
  goals_en,
  goals_ar,
  nutrition_focus_en,
  nutrition_focus_ar,
  protein_min_per_kg,
  protein_max_per_kg,
  hydration_ml_per_kg,
  creatine_grams,
  collagen_min_per_kg,
  collagen_max_per_kg,
  vitamin_c_mg,
  calcium_mg
) SELECT 
  id,
  5,
  'Return to Sport',
  'العودة للرياضة',
  'Weeks 21+',
  'الأسابيع 21 فما فوق',
  'over_6_weeks',
  ARRAY['Full sport participation', 'Prevent re-injury', 'Maintain performance'],
  ARRAY['المشاركة الكاملة في الرياضة', 'منع إعادة الإصابة', 'الحفاظ على الأداء'],
  ARRAY['Maintenance nutrition', 'Performance optimization'],
  ARRAY['تغذية الصيانة', 'تحسين الأداء'],
  1.6,
  2.0,
  35,
  5,
  5,
  10,
  300,
  800
FROM public.injuries WHERE injury_id_slug = 'knee-acl-tear'
LIMIT 1;

-- ============================================================
-- 3. INSERT into supplements table
-- ============================================================

INSERT INTO public.supplements (
  phase_id,
  name,
  dose_en,
  dose_ar,
  reason_en,
  reason_ar,
  timing_en,
  timing_ar,
  caution_en,
  caution_ar,
  order_index
) SELECT 
  id,
  'Omega-3 Fish Oil',
  '2000-3000 mg EPA/DHA daily',
  '2000-3000 ملغ يومياً',
  'Reduces inflammation and supports joint recovery',
  'يقلل الالتهاب ويدعم تعافي المفاصل',
  'With meals, split morning and evening',
  'مع الطعام، موزع بين الصباح والمساء',
  'May cause fish aftertaste or stomach upset; take with food',
  'قد يسبب طعم السمك أو اضطراب المعدة؛ تناول مع الطعام',
  1
FROM public.injury_phases WHERE phase_number = 1 AND injury_id IN (
  SELECT id FROM public.injuries WHERE injury_id_slug = 'knee-acl-tear'
)
LIMIT 1;

INSERT INTO public.supplements (
  phase_id,
  name,
  dose_en,
  dose_ar,
  reason_en,
  reason_ar,
  timing_en,
  timing_ar,
  caution_en,
  caution_ar,
  order_index
) SELECT 
  id,
  'Vitamin C',
  '500-1000 mg daily',
  '500-1000 ملغ يومياً',
  'Supports collagen synthesis and immune function',
  'يدعم بناء الكولاجين والمناعة',
  'Morning with food',
  'في الصباح مع الطعام',
  'Excess intake may cause diarrhea',
  'الإفراط قد يسبب إسهال',
  2
FROM public.injury_phases WHERE phase_number = 1 AND injury_id IN (
  SELECT id FROM public.injuries WHERE injury_id_slug = 'knee-acl-tear'
)
LIMIT 1;

-- ============================================================
-- 4. INSERT into meal_examples table
-- ============================================================

INSERT INTO public.meal_examples (
  phase_id,
  diet_style,
  breakfast_en,
  breakfast_ar,
  lunch_en,
  lunch_ar,
  dinner_en,
  dinner_ar,
  snack_en,
  snack_ar,
  shopping_list_en,
  shopping_list_ar
) SELECT 
  id,
  'omnivore',
  'Scrambled eggs (3) with salmon (120g), whole grain toast, blueberries',
  'بيض مقلي مع سمك السلمون وخبز القمح الكامل والتوت',
  'Grilled chicken breast (150g), sweet potato, steamed broccoli, olive oil',
  'صدر دجاج مشوي مع البطاطس الحلوة والبروكلي المسلوق',
  'Lean beef (130g), brown rice, sautéed spinach with garlic',
  'لحم بقري قليل الدهون مع الأرز البني والسبانخ المقلية',
  'Greek yogurt (200ml) with almonds and honey',
  'زبادي يوناني مع اللوز والعسل',
  ARRAY['Eggs', 'Salmon', 'Chicken', 'Beef', 'Sweet potato', 'Broccoli', 'Spinach', 'Blueberries', 'Almonds', 'Honey', 'Greek yogurt'],
  ARRAY['البيض', 'السمك', 'الدجاج', 'اللحم', 'البطاطس الحلوة', 'البروكلي', 'السبانخ', 'التوت', 'اللوز', 'العسل', 'الزبادي']
FROM public.injury_phases WHERE phase_number = 1 AND injury_id IN (
  SELECT id FROM public.injuries WHERE injury_id_slug = 'knee-acl-tear'
)
LIMIT 1;

INSERT INTO public.meal_examples (
  phase_id,
  diet_style,
  breakfast_en,
  breakfast_ar,
  lunch_en,
  lunch_ar,
  dinner_en,
  dinner_ar,
  snack_en,
  snack_ar,
  shopping_list_en,
  shopping_list_ar
) SELECT 
  id,
  'vegetarian',
  'Greek yogurt (200ml), granola, berries, flax seeds',
  'زبادي يوناني مع الجرانولا والتوت وبذور الكتان',
  'Chickpea salad with quinoa, roasted vegetables, tahini dressing',
  'سلطة الحمص مع الكينوا والخضار المشوية',
  'Lentil pasta with marinara, roasted mushrooms, side salad',
  'معكرونة العدس مع صلصة الطماطم والفطر المشوي',
  'Hummus with whole grain crackers and vegetables',
  'الحمص مع البسكويت والخضار',
  ARRAY['Greek yogurt', 'Granola', 'Berries', 'Flax seeds', 'Chickpeas', 'Quinoa', 'Lentils', 'Tahini', 'Vegetables'],
  ARRAY['الزبادي', 'الجرانولا', 'التوت', 'بذور الكتان', 'الحمص', 'الكينوا', 'العدس', 'الطحينة', 'الخضار']
FROM public.injury_phases WHERE phase_number = 1 AND injury_id IN (
  SELECT id FROM public.injuries WHERE injury_id_slug = 'knee-acl-tear'
)
LIMIT 1;

-- ============================================================
-- 5. INSERT into safety_notes table
-- ============================================================

INSERT INTO public.safety_notes (
  injury_id,
  medications_en,
  medications_ar,
  supplements_en,
  supplements_ar,
  contraindication_medications,
  contraindication_supplements
) SELECT 
  id,
  ARRAY['NSAIDs (ibuprofen, naproxen) - use cautiously, may affect healing after first 2 weeks', 'Acetaminophen - safer alternative for pain management'],
  ARRAY['مضادات الالتهاب (إيبوبروفين) - استخدم بحذر، قد تؤثر على الشفاء', 'الأسيتامينوفين - بديل أكثر أماناً'],
  ARRAY['Omega-3 supplements - aids anti-inflammatory response', 'Vitamin C - supports collagen synthesis', 'Collagen peptides - structural support for ligament repair'],
  ARRAY['مكملات أوميغا 3 - تدعم الاستجابة المضادة للالتهاب', 'فيتامين C - يدعم بناء الكولاجين', 'ببتيدات الكولاجين - دعم بنيوي لإصلاح الرباط'],
  ARRAY['High-dose NSAIDs (prolonged use)', 'Anticoagulants (blood thinners)'],
  ARRAY['فيتامين E عالي الجرعات (قد يزيد النزيف)', 'الجنكة بيلوبا (قد تزيد النزيف)']
FROM public.injuries 
WHERE injury_id_slug = 'knee-acl-tear'
LIMIT 1;

-- ============================================================
-- 6. INSERT into admin_users table (Sample admin user)
-- ============================================================

-- Note: This is a sample admin user setup
-- IMPORTANT: Create the user account FIRST in Supabase Auth Dashboard at:
-- https://app.supabase.com/project/[YOUR_PROJECT_ID]/auth/users
-- Then replace the UUID below with the actual user_id from Supabase Auth
-- Email: ahmed.reda.a.r.1234@gmail.com (Full admin access)

INSERT INTO public.admin_users (
  user_id,
  email,
  full_name,
  role,
  can_edit_injuries,
  can_edit_phases,
  can_edit_supplements,
  can_delete
) VALUES (
  '8a047956-43c2-48aa-afd3-d43601bd43c9'::uuid,
  'ahmed.reda.a.r.1234@gmail.com',
  'Ahmed Reda - System Administrator',
  'admin',
  true,
  true,
  true,
  true
);

-- Additional moderator example (commented for reference)
-- INSERT INTO public.admin_users VALUES (
--   gen_random_uuid(),
--   '00000000-0000-0000-0000-000000000001'::uuid,
--   'moderator@example.com',
--   'Content Moderator',
--   'moderator',
--   true,
--   true,
--   true,
--   false
-- );

-- ============================================================
-- 7. Verification Queries
-- ============================================================

-- Check all tables
SELECT 'INJURIES' as table_name, COUNT(*) as count FROM public.injuries
UNION ALL
SELECT 'PHASES' as table_name, COUNT(*) as count FROM public.injury_phases
UNION ALL
SELECT 'SUPPLEMENTS' as table_name, COUNT(*) as count FROM public.supplements
UNION ALL
SELECT 'MEAL EXAMPLES' as table_name, COUNT(*) as count FROM public.meal_examples
UNION ALL
SELECT 'SAFETY NOTES' as table_name, COUNT(*) as count FROM public.safety_notes
UNION ALL
SELECT 'ADMIN USERS' as table_name, COUNT(*) as count FROM public.admin_users;

-- Show complete ACL rehabilitation program
SELECT 
  i.name_en,
  i.name_ar,
  i.category,
  COUNT(DISTINCT ip.id) as phase_count,
  COUNT(DISTINCT s.id) as supplement_count,
  COUNT(DISTINCT me.id) as meal_plan_count
FROM public.injuries i
LEFT JOIN public.injury_phases ip ON i.id = ip.injury_id
LEFT JOIN public.supplements s ON ip.id = s.phase_id
LEFT JOIN public.meal_examples me ON ip.id = me.phase_id
WHERE i.injury_id_slug = 'knee-acl-tear'
GROUP BY i.id, i.name_en, i.name_ar, i.category;

-- Show phases breakdown
SELECT 
  i.name_en as injury,
  ip.phase_number,
  ip.label_en,
  ip.duration_en,
  ip.protein_min_per_kg,
  ip.protein_max_per_kg
FROM public.injuries i
JOIN public.injury_phases ip ON i.id = ip.injury_id
WHERE i.injury_id_slug = 'knee-acl-tear'
ORDER BY ip.phase_number;

-- Show supplements for each phase
SELECT 
  ip.phase_number,
  ip.label_en,
  s.name,
  s.dose_en,
  s.reason_en
FROM public.injury_phases ip
LEFT JOIN public.supplements s ON ip.id = s.phase_id
WHERE ip.injury_id IN (
  SELECT id FROM public.injuries WHERE injury_id_slug = 'knee-acl-tear'
)
ORDER BY ip.phase_number, s.order_index;

-- Verify RLS is working (should require authentication)
SELECT COUNT(*) as admin_user_count FROM public.admin_users;

-- ============================================================
-- 8. Additional Test Data (Optional)
-- ============================================================

-- You can add more injuries here following the same pattern
-- Example: Hamstring Strain, Shoulder Impingement, Tennis Elbow, etc.

-- ✅ Setup complete! You can now:
-- 1. Replace '00000000-0000-0000-0000-000000000000' with your actual admin user ID from Supabase Auth
-- 2. Test the admin dashboard with these policies
-- 3. Add more injury types as needed
