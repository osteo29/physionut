-- rehab_data_batch52.sql
-- استكمال البيانات للمراحل النهائية (Phase 3) والبروتوكولات المتبقية
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER;
    p2_id INTEGER;
    p3_id INTEGER;
BEGIN

-- 75. 5th Metatarsal Fracture - Phase 3: Return to Sport
SELECT id INTO proto_id FROM protocols WHERE name = '5th Metatarsal Fracture (Jones/Stress)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Return to Play & Impact', 'Week 12+', 
        ARRAY['Full return to sport/running mileage', 'Maximal power at push-off', 'Long-term bone health maintenance'],
        ARRAY['Monitor for "aching" after sports spikes', 'Ensure shoe cushioning is adequate'],
        ARRAY['Full pain-free sport participation', 'Symmetry in hopping tests > 95%'])
    RETURNING id INTO p3_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Single-leg Pogo Hops', '3 × 20 reps', 'Tendon stiffness and elastic energy development'),
    (p3_id, 'Suicide Sprints', '5 rounds', 'Linear acceleration/deceleration under load'),
    (p3_id, 'Ladder Drills (Agility)', '5 min', 'Integrated footwork and coordination');
END IF;


-- 98. PCL Reconstruction - Phase 3: Advanced Strength & Power
SELECT id INTO proto_id FROM protocols WHERE name = 'PCL Reconstruction' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Advanced Strength & Return to Sport', 'Month 4–9', 
        ARRAY['Maximize quad and hamstring strength', 'Integrated plyometrics', 'Return to sport-specific drills'],
        ARRAY['Ensure hamstring strength is restored before high-speed sprints', 'Monitor for "sag" recurrence with heavy load'],
        ARRAY['Symmetrical quad strength', 'Successful completion of Return to Play testing'])
    RETURNING id INTO p3_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Walking Lunges (Weighted)', '3 × 15 reps', 'Functional integrated lower limb power'),
    (p3_id, 'Romanian Deadlifts (RDL)', '3 × 12 reps', 'Controlled hamstring loading - essential now that the graft is mature'),
    (p3_id, 'Box Jumps (Plyometric)', '3 × 10 reps', 'Explosive vertical capacity');
END IF;


-- 63. Supraspinatus Tendinopathy (Chronic) - Phase 1, 2 & 3
SELECT id INTO proto_id FROM protocols WHERE name = 'Supraspinatus Tendinopathy (Chronic)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 1, 'Symptom Inhibition & Initial Load', 'Week 0–4', 
        ARRAY['Reduce pain during reaching', 'Establish rotator cuff activation (submax)', 'Correct scapular posture'],
        ARRAY['Avoid repetitive overhead lifting early', 'Monitor for night pain'],
        ARRAY['VAS pain < 3/10 during ADLs', 'Negative painful arc range'])
    RETURNING id INTO p1_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Isotonic Loading & Scapular Stability', 'Week 4–12', 
        ARRAY['Gradual loading of the rotator cuff', 'Improve scapulohumeral rhythm', 'Incorporate eccentric work'],
        ARRAY['Maintain movement quality over resistance weight', 'Avoid compensations with upper trapezius'],
        ARRAY['Full ROM with 2kg resistance', 'Symmetrical scapular control during descent'])
    RETURNING id INTO p2_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Power & Sport Specificity', 'Week 12+', 
        ARRAY['Full return to overhead tasks/sport', 'Increase upper limb rate of force development', 'Long-term tendon health'],
        ARRAY['Gradual return to high-volume throwing/hitting', 'Pace volume spikes'],
        ARRAY['Symmetrical rotator cuff strength', 'Confident performance in sport-specific tests'])
    RETURNING id INTO p3_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p1_id, 'Shoulder External Rotation Isometrics', '10 × 10 sec', 'Safe initiation of cuff tension without joint shear'),
    (p2_id, 'Scapular Pushes (Wall)', '3 × 15 reps', 'Improve serratus anterior recruitment for stability'),
    (p3_id, 'Plyometric Ball Throws (Floor)', '3 × 15 reps', 'Explosive cuff stabilization');
END IF;

END $$;
