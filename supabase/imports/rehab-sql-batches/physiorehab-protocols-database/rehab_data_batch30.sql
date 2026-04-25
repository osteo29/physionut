-- rehab_data_batch30.sql
-- استكمال البيانات للمراحل المتوسطة (Wrist, Hip, Shoulder, Spine, Knee)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p2_id INTEGER;
BEGIN

-- 24. Distal Radius Fracture - Phase 2: Strengthening & Functional Loading
-- Timeline: Week 4–8 post-cast removal
SELECT id INTO proto_id FROM protocols WHERE name = 'Distal Radius Fracture (Post-immobilisation)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Strengthening & Functional Loading', 'Week 4–8 post-cast removal', 
        ARRAY['Full functional ROM', 'Restore grip strength to 80%', 'Safe return to weight bearing through hand'],
        ARRAY['Avoid heavy sudden lifting', 'Gradual progression into extension loading (push-ups)'],
        ARRAY['Grip strength > 75% other side', 'Full pain-free extension AROM', 'Stable joint - no clicking'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Wrist Extension with Dumbbell', '3 × 15 reps (0.5-1kg)', 'Target wrist extensors - often weak post-immobilisation'),
    (p2_id, 'Squeezing Power Putty', '5 min activity', 'Functional grip and intrinsic muscle work'),
    (p2_id, 'Wall Push-ups (Hands flat)', '3 × 12 reps', 'Early weight bearing through the radius and ulna');
END IF;


-- 26. Greater Trochanteric Pain Syndrome - Phase 2: Load Progressive
-- Timeline: Week 4–10
SELECT id INTO proto_id FROM protocols WHERE name = 'Greater Trochanteric Pain Syndrome' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Progressive Loading', 'Week 4–10', 
        ARRAY['Address gluteal medius/minimus tendinopathy', 'Improve lateral hip stability', 'Enhance lower limb kinematics'],
        ARRAY['Avoid side-lying on affected side', 'No "hanging" on the hip - avoid adduction past neutral'],
        ARRAY['Able to climb stairs without lateral hip pain', 'Symmetrical hip abduction strength'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Standing Hip Abduction (Resistance band)', '3 × 15 reps', 'Functional loading in weight bearing'),
    (p2_id, 'Bridging with Band (Hip abduction focus)', '3 × 12 reps', 'Gluteal activation without excessive bursa compression'),
    (p2_id, 'Step-ups (Mirror feedback)', '3 × 12 reps', 'Pelvic stability - keep pelvis level during the entire move');
END IF;


-- 28. AC Joint Sprain (Grade I-II) - Phase 2: Early Strengthening
-- Timeline: Week 3–8
SELECT id INTO proto_id FROM protocols WHERE name = 'AC Joint Sprain (Grade I-II)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Early Strengthening & Stability', 'Week 3–8', 
        ARRAY['Full pain-free AROM', 'Scapular control during movement', 'Restore rotator cuff strength'],
        ARRAY['Avoid heavy push movements', 'No contact sports', 'Avoid painful overhead reaches'],
        ARRAY['Full ROM without compensation', 'Stable scapula during elevation', 'No pain with resisted internal rotation'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Scapular Pushes (Wall)', '3 × 15 reps', 'Serratus anterior focus - critical for overhead control'),
    (p2_id, 'Shoulder Rows (Band)', '3 × 15 reps', 'Strengthen posterior stabilizers and deltoids'),
    (p2_id, 'External Rotation (Sidelying)', '3 × 15 reps', 'Isolate rotator cuff to provide humeral head stability');
END IF;


-- 30. Quadriceps Tendinopathy - Phase 2: Isotonic Loading
-- Timeline: Week 4–12
SELECT id INTO proto_id FROM protocols WHERE name = 'Quadriceps Tendinopathy' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Isotonic Strengthening', 'Week 4–12', 
        ARRAY['Progressive hypertrophy of the quadriceps', 'Load the tendon through functional range', 'Address kinetic chain deficits'],
        ARRAY['Avoid explosive jumping', 'Monitor pain levels (should stay < 3/10 during exercise)'],
        ARRAY['Able to perform 15 single leg squats (partial range)', 'VISA-P > 70'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Slow Leg Press (Single leg focus)', '3 × 12 reps', 'Controlled loading to encourage collagen synthesis'),
    (p2_id, 'Bulgarian Split Squats', '3 × 10 reps', 'High torque functional load for the quadriceps and glutes'),
    (p2_id, 'Spanish Squat (Belt/Band)', '3 × 45 sec', 'High isometric and tension component for patellar/quad tendon');
END IF;

END $$;
