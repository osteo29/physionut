-- rehab_data_batch32.sql
-- استكمال البيانات للمراحل المتوسطة (Carpal Tunnel, De Quervain's, Scaphoid, TFCC, FAI, Hip Flexor, Adductor)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p2_id INTEGER;
BEGIN

-- 38. Carpal Tunnel Syndrome - Phase 2: Strengthening & Nerve Gliding
-- Timeline: Week 6–12
SELECT id INTO proto_id FROM protocols WHERE name = 'Carpal Tunnel Syndrome (Conservative)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Strengthening & Functional Integration', 'Week 6–12', 
        ARRAY['Restore grip and pinch strength', 'Full neural mobility', 'Safe return to loaded tasks'],
        ARRAY['Monitor for return of night symptoms', 'Avoid repetitive end-range wrist flexion during heavy work'],
        ARRAY['No numbness at rest', 'Grip strength > 90% other side', 'Negative Phalen''s test'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Pinch Strength (Putty or clip)', '3 × 15 reps', 'Thenar muscle conditioning - compensate for median nerve fatigue'),
    (p2_id, 'Median Nerve Tensioning (Gentle)', '3 × 10 reps', 'Progress from sliders to mild tensioning for full neural mobility'),
    (p2_id, 'Wrist Extension with Light Weight', '3 × 15 reps', 'Antagonist strengthening helps maintain a neutral channel position');
END IF;


-- 39. De Quervain's Tenosynovitis - Phase 2: Progressive Loading
-- Timeline: Week 4–8
SELECT id INTO proto_id FROM protocols WHERE name = 'De Quervain''s Tenosynovitis' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Progressive Loading & Mobilisation', 'Week 4–8', 
        ARRAY['Full pain-free thumb and wrist ROM', 'Progress from isometrics to concentric/eccentric loading', 'Normalize lifting mechanics'],
        ARRAY['Stop if sharp pain returns over the radial styloid', 'Avoid excessive hammering movements initially'],
        ARRAY['Pain-free resisted thumb abduction', 'Negative Finkelstein test', 'Full radial deviation AROM'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Eccentric Thumb Abduction (Weighted)', '3 × 15 reps', 'Stimulate tendon repair in the first dorsal compartment'),
    (p2_id, 'Radial Deviation Strengthening', '3 × 12 reps', 'Target APL and EPB muscles in their functional plane'),
    (p2_id, 'Tennis Ball Squeezes', '3 × 15 reps', 'Integrated grip and thumb stability');
END IF;


-- 42. Femoroacetabular Impingement (FAI) - Phase 2: Strength & Dynamic Control
-- Timeline: Week 6–16
SELECT id INTO proto_id FROM protocols WHERE name = 'Femoroacetabular Impingement (FAI)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Strength & Dynamic Control', 'Week 6–16', 
        ARRAY['Enhance proximal (core/hip) stability', 'Safe increase in athletic loading', 'Improve pelvic control'],
        ARRAY['Avoid combined Flexion/Internal Rotation (FADIR position)', 'Monitor for groin "catching"'],
        ARRAY['Negative FADIR test for pain', 'Symmetrical hip rotation strength', 'Stable squat to 90°'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Single Leg Squats (Partial range)', '3 × 10 reps', 'Develop neuromuscular control of the hip/knee/ankle axis'),
    (p2_id, 'Copenhagen Plank (Short lever)', '3 × 20 sec', 'Adductor endurance is protective for FAI and groin pain'),
    (p2_id, 'Bird-Dog (Advanced)', '3 × 15 reps', 'Cross-body core stability to support pelvic tilt');
END IF;


-- 44. Adductor / Groin Strain - Phase 2: Strengthening & Eccentric Load
-- Timeline: Week 2–6
SELECT id INTO proto_id FROM protocols WHERE name = 'Adductor / Groin Strain' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Strengthening & Eccentric Load', 'Week 2–6', 
        ARRAY['Progressively load the adductor complex', 'Improve pelvic stability under load', 'Begin linear running'],
        ARRAY['No sudden lateral changes of direction', 'Monitor for "tugging" sensation in groin'],
        ARRAY['Full pain-free eccentric adduction', 'Symmetrical adductor strength', 'Pain-free jog/run'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Copenhagen Adduction (Long lever/Level 2)', '3 × 8 reps', 'High intensity adductor loading - evidence based for injury prevention'),
    (p2_id, 'Lateral Lunges (Partial depth)', '3 × 12 reps', 'Frontal plane strength and eccentric control'),
    (p2_id, 'Slider Adduction (Eccentric)', '3 × 10 reps', 'Controlled lengthening of the adductor fibers');
END IF;

END $$;
