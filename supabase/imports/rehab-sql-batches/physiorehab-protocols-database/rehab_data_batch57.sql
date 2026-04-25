-- rehab_data_batch57.sql
-- استكمال المراحل النهائية (Phases 3 & 4) لإصابات الطرف السفلي (Hip, Knee, Ankle)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p3_id INTEGER;
    p4_id INTEGER;
BEGIN

-- 25. Hamstring Strain (Grade II) - Phase 4: High Velocity & Prevention
SELECT id INTO proto_id FROM protocols WHERE name = 'Hamstring Strain (Grade II)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Elite Performance & Injury Prevention', 'Month 3+', 
        ARRAY['Maintain maximal sprint velocity without fear', 'High-level eccentric strength maintenance', 'Integrated athletic robustness'],
        ARRAY['Monitor for "tightness" during cold weather/early season', 'Zero skipping of maintenance drills'],
        ARRAY['Symmetry in Isokinetic testing (if available)', 'Full confidence during competitive matches'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p4_id, 'Nordic Hamstring Curls (Maintenance)', '3 × 5 reps (1x week)', 'Evidence-based gold standard for preventing recurrence'),
    (p4_id, 'Maximal Speed Change-of-direction', '5-8 sets', 'Train the muscle to handle deceleration at high force'),
    (p4_id, 'Isometric Hamstring Bridges (High load)', '3 × 30 sec', 'Tendon and muscle junction structural health');
END IF;


-- 27. Iliotibial Band Syndrome - Phase 4: Running Volume Maintenance
SELECT id INTO proto_id FROM protocols WHERE name = 'Iliotibial Band Syndrome' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Performance Mileage & Prevention', 'Month 4+', 
        ARRAY['Maintain high-volume running without biomechanical breakdown', 'Improve vertical and lateral power', 'Independent load monitoring'],
        ARRAY['Avoid sudden jumps in vertical gain (hills) > 15% per wk', 'Monitor for shoe wear patterns'],
        ARRAY['Consistent running mileage (pre-injury levels)', 'Zero ITB tenderness after long runs'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p4_id, 'Lateral Bounding into Sprint', '3 × 10 reps', 'Reactive hip stability during dynamic propulsion'),
    (p4_id, 'Single-leg Kettlebell Swings', '3 × 12 reps', 'Integrated gluteal/core power'),
    (p4_id, 'Slope Running (Graduated)', '15-20 min', 'Specific loading for ITB shear stress tolerance');
END IF;


-- 44. Adductor / Groin Strain - Phase 4: Competitive Return
SELECT id INTO proto_id FROM protocols WHERE name = 'Adductor / Groin Strain' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Match Play & Pelvic Robustness', '12+ Weeks', 
        ARRAY['Full return to competitive contact sport', 'Maximal power during kick/shoot', 'Pelvic-core resilience'],
        ARRAY['Avoid cumulative fatigue in the adductors during pre-season', 'Maintain adductor flexibility'],
        ARRAY['HAGOS Score > 90', 'Grip strength (adductor squeeze) symmetry'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p4_id, 'Copenhagen Plank (Level 3 - Propped)', '3 × 30 sec', 'Maintenance of peak adductor strength'),
    (p4_id, 'Reactive Cutting Drills (Chaos)', '10 min', 'Address neural response during rapid directional changes'),
    (p4_id, 'Full Sprints with Kicking', 'Graded session', 'integrated high-velocity specific task loading');
END IF;


-- 21. Hip Labral Tear (Conservative) - Phase 4: Maintenance
SELECT id INTO proto_id FROM protocols WHERE name = 'Hip Labral Tear (Conservative)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Independent Care & Life Integration', 'Week 20+', 
        ARRAY['Maintain structural stability of the hip joint', 'Prevent irritation during extreme ranges', 'Support general athleticism'],
        ARRAY['Avoid repetitive heavy impact if hip feels "catchy"', 'Maintain core-glute endurance'],
        ARRAY['Zero activity limitations', 'Confident management of hip load'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p4_id, 'Plyometric Box Step-ups', '3 × 10 reps', 'Develop explosive power while controlling the hip joint'),
    (p4_id, 'Deep Goblet Squats (Controlled)', '3 × 12 reps', 'Maintain joint mobility and strength throughout full range'),
    (p4_id, 'Lateral Speed Skaters', '3 × 15 reps', 'Frontal plane stability and explosive propulsion');
END IF;

END $$;
