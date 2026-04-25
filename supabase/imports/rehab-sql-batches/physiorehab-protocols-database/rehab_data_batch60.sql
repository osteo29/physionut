-- rehab_data_batch60.sql
-- استكمال المراحل النهائية (Phases 1-4) للحالات الصحية العامة والنسائية
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p2_id INTEGER;
    p3_id INTEGER;
    p4_id INTEGER;
BEGIN

-- 67. Menopause-related Osteoporosis - Phase 2, 3 & 4
SELECT id INTO proto_id FROM protocols WHERE name = 'Menopause-related Osteoporosis' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Progressive Loading & Resistance', 'Month 3–6', 
        ARRAY['Improve muscular strength and balance', 'Introduce axial loading (controlled)', 'Enhance joint stability'],
        ARRAY['Avoid high-impact jumping if bone density is critical', 'No excessive spinal flexion under load'],
        ARRAY['Able to lift 3kg in all major tasks', 'Symmetrical balance on one leg > 10 sec'])
    RETURNING id INTO p2_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'High Intensity Osteogenic Loading', 'Month 6–12', 
        ARRAY['Maximise osteogenic stimulate (bone building)', 'Return to impact activities (if safe)', 'Global robustness'],
        ARRAY['Ensure gradual progression of heavy lifts', 'Monitor for fatigue-related falls'],
        ARRAY['Consistent 3x week strength training', 'Improved functional balance score'])
    RETURNING id INTO p3_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Lifetime Maintenance & Fall Prevention', 'Ongoing', 
        ARRAY['Maintain bone mineral density', 'Prevent falls and fractures', 'Maintain independent lifestyle'],
        ARRAY['Zero tolerance for "risk of falling" environments'],
        ARRAY['Stable DEXA scan results', 'Zero fractures'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Dumbbell Squats', '3 × 12 reps', 'Axial loading to stimulate femoral neck bone density'),
    (p3_id, 'Deadlifts (Controlled load)', '3 × 10 reps', 'High intensity stimulus for lumbar spine and hip bone health'),
    (p4_id, 'Balance Drills (Eyes closed)', '3 × 45 sec', 'Crucial fall prevention training');
END IF;


-- 65. Pregnancy-related Pelvic Girdle Pain - Phase 2, 3 & 4
SELECT id INTO proto_id FROM protocols WHERE name = 'Pregnancy-related Pelvic Girdle Pain' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Core-Pelvic Stabilisation', 'Week 4–12', 
        ARRAY['Stabilize the pelvic ring', 'Improve adductor/gluteal strength', 'Manage daily movement pain'],
        ARRAY['Avoid asymmetrical wide-leg tasks (e.g. wide lunges)', 'Monitor for symphysis pubis pain'],
        ARRAY['Reduced pain with walking', 'Negative ASLR test'])
    RETURNING id INTO p2_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Post-Partum Re-integration', 'Post-delivery Week 0–12', 
        ARRAY['Restore pelvic floor function', 'Re-build abdominal wall strength', 'Return to safe exercise'],
        ARRAY['Gradual return to running/jumping (Wait until pelvic floor is stable)', 'No heavy abdominal crunches early'],
        ARRAY['Pelvic floor control confirmed', 'Pain-free ADLs'])
    RETURNING id INTO p3_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Full Fitness & Resilience', 'Month 4+ Post-partum', 
        ARRAY['Full return to previous fitness levels', 'Prevent recurrence of pelvic pain', 'Integrated core power'],
        ARRAY['Individual pacing based on recovery'],
        ARRAY['Zero pelvic pain', 'Satisfactory return to sports'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Adductor Squeezes (Ball/Pillow)', '3 × 15 reps', 'Stabilize the pubic symphysis through adductor activation'),
    (p3_id, 'Pelvic Floor Initialisations', 'Daily', 'Crucial recovery post-delivery'),
    (p4_id, 'Single-leg Bridges', '3 × 15 reps', 'Integrated glute-core stability for running and life');
END IF;


-- 60. General Osteoarthritis (Knee/Hip) - Phase 2, 3 & 4
SELECT id INTO proto_id FROM protocols WHERE name = 'General Osteoarthritis (Knee/Hip)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Isotonic Strengthening', 'Week 4–12', 
        ARRAY['Increase joint load tolerance', 'Improve gait mechanics', 'Reduce joint stiffness through movement'],
        ARRAY['Avoid "swelling-inducing" high impact early', 'Monitor for morning stiffness'],
        ARRAY['Able to walk 20 min without flare-up', 'Improved WOMAC score'])
    RETURNING id INTO p2_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Advanced Loading & Weight Management', 'Month 3–6', 
        ARRAY['Maximise muscle volume to offload the joints', 'Integrated balance and agility', 'Sustainable exercise habit'],
        ARRAY['Respect the "pain threshold" (Don''t exceed 4/10 pain)', 'Use supportive footwear'],
        ARRAY['Stronger quad/glute capacity', 'Satisfactory weight management'])
    RETURNING id INTO p3_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Lifelong Joint Health & Activity', 'Ongoing', 
        ARRAY['Maintain mobility for life', 'Avoid joint replacement as long as possible', 'Quality of life'],
        ARRAY['Regular low-impact loading', 'Avoid prolonged sedentary behavior'],
        ARRAY['Independent management of symptoms'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Stationary Bike (Low resistance)', '15-20 min', 'Cyclic loading improves articular cartilage health and reduces stiffness'),
    (p3_id, 'Step-ups with Handrail', '3 × 12 reps', 'Functional loading for stairs and hills'),
    (p4_id, 'Walking Program (Graded)', '30 min daily', 'The most effective long-term therapy for OA');
END IF;

END $$;
