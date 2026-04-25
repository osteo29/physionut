-- rehab_data_batch54_final.sql
-- الدفعة الختامية: استكمال المراحل النهائية (Phase 3) لجميع الحالات المتبقية
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p3_id INTEGER;
BEGIN

-- 73. Knee Meniscectomy - Phase 3: Return to Play
SELECT id INTO proto_id FROM protocols WHERE name = 'Knee Meniscectomy (Partial)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Return to Sport / High Impact', 'Week 6–12', 
        ARRAY['Full return to previous activity levels', 'Maximise lower limb power', 'Prevent recurring effusion'],
        ARRAY['Monitor joint for swelling after agility work', 'Soft landing mechanics in plyometrics'],
        ARRAY['Step-down test perfection', 'Hop test symmetry > 90%'])
    RETURNING id INTO p3_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Shuttle Sprints', '3 × 10 reps', 'Linear agility and deceleration control'),
    (p3_id, 'Single-leg Box Jumps', '3 × 10 reps', 'Peak explosive power'),
    (p3_id, 'Skipping (Double under focus)', '3 × 2 min', 'Neuromuscular stiffness and conditioning');
END IF;


-- 76. Ankle ORIF - Phase 3: Return to Sport
SELECT id INTO proto_id FROM protocols WHERE name = 'Ankle ORIF (Post-operative)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Impact & Agility Integration', 'Week 12+', 
        ARRAY['Full sport-specific agility', 'Confident multi-planar loading', 'Full impact tolerance'],
        ARRAY['Monitor for "aching" after sports', 'Ensure hardware isn''t causing focal tenderness with shoes'],
        ARRAY['Full pain-free sport participation', 'Symmetrical hop test results'])
    RETURNING id INTO p3_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Ladder Drills (High speed)', '5 min daily', 'Speed and coordination integration'),
    (p3_id, 'Figure-8 Runs', '5 rounds', 'Rotational and lateral loading of the ankle hardware'),
    (p3_id, 'Weighted Single-leg Hops', '3 × 12 reps', 'Maximal force attenuation capacity');
END IF;


-- 77. Hallux Valgus - Phase 3: Normal Function
SELECT id INTO proto_id FROM protocols WHERE name = 'Hallux Valgus (Bunions)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Functional Loading & Return to Sport', 'Week 8-12+', 
        ARRAY['Normal push-off power during running', 'Return to sport-specific footwear', 'Integrated balance'],
        ARRAY['Monitor for great toe joint pain with high impact', 'Avoid narrow-toebox shoes initially'],
        ARRAY['Full pain-free transition to all shoes', 'Stable great toe joint on movement'])
    RETURNING id INTO p3_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Toe Walks (Impact focus)', '3 × 20 meters', 'Functional strengthening of the great toe under load'),
    (p3_id, 'Single-leg Stance (Unstable surface)', '3 × 45 sec', 'Neuromuscular support for the medial arch'),
    (p3_id, 'Short Foot in dynamic squat', '3 × 12 reps', 'Incorporate intrinsic support into global movement');
END IF;


-- 100. Thoracic Hyperkyphosis - Phase 3: Full Integration
SELECT id INTO proto_id FROM protocols WHERE name = 'Thoracic Hyperkyphosis' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Postural Power & Resilience', 'Week 12+', 
        ARRAY['Stabilize posture under high load', 'Full functional thoracic mobility', 'Prevent recurrence during fatigue'],
        ARRAY['Monitor for shoulder/neck strain during heavy lifting', 'Maintain core support at all times'],
        ARRAY['Symmetrical back endurance (Biering-Sorensen score)', 'Reduced visual postural drift'])
    RETURNING id INTO p3_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Overhead Barbell Carries', '3 × 20 meters', 'Peak postural stability under load'),
    (p3_id, 'Renegade Rows', '3 × 12 reps', 'Core and thoracic integration'),
    (p3_id, 'T-Spine Mobility with Breathing', '3 × 10 reps', 'integrated respiratory/spinal health');
END IF;

END $$;
