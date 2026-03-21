-- Quick test to verify injuries table exists and RLS is working

-- 1. Check if injuries table exists
SELECT COUNT(*) as injury_count FROM public.injuries;

-- 2. Check if RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('injuries', 'injury_phases', 'supplements', 'meal_examples', 'safety_notes');

-- 3. Check if policies exist
SELECT schemaname, tablename, policyname, permissive, qual, with_check
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename = 'injuries';

-- 4. Check if current user can select from injuries table
SELECT 'has_access' as status FROM public.injuries LIMIT 1;
