-- rehab_data_batch33.sql
-- استكمال البيانات للمراحل المتوسطة (Piriformis, Hip OA, Snapping Hip, Knee Bursitis, Knee OA)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p2_id INTEGER;
    p3_id INTEGER;
BEGIN

-- 45. Piriformis Syndrome - Phase 2: Strengthening & Nerve Glide
-- Timeline: Week 4–12
SELECT id INTO proto_id FROM protocols WHERE name = 'Piriformis Syndrome' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Strengthening & Sciatic Glide', 'Week 4–12', 
        ARRAY['Address underlying hip weakness', 'Normalize nerve mobility', 'Safe return to prolonged sitting'],
        ARRAY['Avoid aggressive direct pressure on the piriformis', 'Stop if leg numbing increases'],
        ARRAY['Pain-free prolonged sitting (30 min)', 'Negative SLR test for neural tension', 'Strong gluteal group'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Glute Bridge with Band', '3 × 15 reps', 'Strengthen Glute Max/Med to offload the Piriformis - which often overworks as a stabilizer'),
    (p2_id, 'Sciatic Nerve Sliders (Seated)', '3 × 10 reps', 'Tensioning/Sliding the nerve through the piriformis canal'),
    (p2_id, 'Hip External Rotation (Isometric to Isotonic)', '3 × 12 reps', 'Re-train the deep rotators for dynamic stability');
END IF;


-- 46. Hip Osteoarthritis (Conservative) - Phase 3: Advanced Loading & Capacity
SELECT id INTO proto_id FROM protocols WHERE name = 'Hip Osteoarthritis (Conservative)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'High Level Function & Maintenance', 'Week 12+', 
        ARRAY['Maximise muscle power', 'Independent management of flares', 'Return to desired hobbies (Golf, Hiking, etc.)'],
        ARRAY['Monitor for "bone-on-bone" grinding during high load', 'Continue weight management if applicable'],
        ARRAY['Full participation in hobbies', 'High confidence in joint stability'])
    RETURNING id INTO p3_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Weighted Goblet Squats (To tolerance)', '3 × 8 reps', 'Building peak strength to support the degenerate joint surface'),
    (p3_id, 'Farmer''s Walks', '3 × 30 meters', 'Integrated core and hip stability under load'),
    (p3_id, 'Single Leg Mini-Squats', '3 × 12 reps', 'Proprioceptive and strength maintenance for daily tasks');
END IF;


-- 47. Snapping Hip Syndrome (Coxa Saltans) - Phase 2: Strength & Kinematic Control
-- Timeline: Week 4–12
SELECT id INTO proto_id FROM protocols WHERE name = 'Snapping Hip Syndrome (Coxa Saltans)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Kinematic Control & Strengthening', 'Week 4–12', 
        ARRAY['Restore normal hip mechanics', 'Strengthen stabilizing muscles', 'Pain-free return to high-flexion tasks'],
        ARRAY['Control pelvic tilt during squats', 'No sudden ballistic high kicks'],
        ARRAY['Abolition of the painful snap', 'Symmetrical hip strength in all planes'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Dead-bugs (Stability focus)', '3 × 15 reps', 'Control the iliopsoas attachment on the spine and femur'),
    (p2_id, 'Side-lying Leg Circles (Large and Small)', '3 × 10 reps each', 'Target gluteal control through full circumduction'),
    (p2_id, 'Eccentric Hip Flexion (Standing with band)', '3 × 12 reps', 'Target the psoas component - especially for internal snapping');
END IF;


-- 51. Knee Osteoarthritis - Phase 2: Strength & Load Progression
-- Timeline: Week 8–16
SELECT id INTO proto_id FROM protocols WHERE name = 'Knee Osteoarthritis' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Strength & Functional Loading', 'Week 8–16', 
        ARRAY['Strengthen quadriceps and hamstrings', 'Improve joint lubrication through movement', 'Restore gait mechanics'],
        ARRAY['Avoid deep impact (jumping)', 'Monitor for effusion after session'],
        ARRAY['Improved KOOS/WOMAC score', 'Walk 30 min with ease', 'Stable knee during stairs'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Wall Squats with Ball', '3 × 15 reps', 'Develop quad strength with supported spine and controlled range'),
    (p2_id, 'Step-downs (Mirror biofeedback)', '3 × 12 reps', 'Critical for stair navigation and patellar tracking'),
    (p2_id, 'Leg Press (Moderate weight)', '3 × 12 reps', 'Multi-joint strengthening with minimal joint shear compared to open chain');
END IF;

END $$;
