-- rehab_data_batch42.sql
-- استكمال البيانات للمراحل الاحترافية (PCL Reconstruction, Brachial Plexus, Thoracic conditions)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER;
    p2_id INTEGER;
BEGIN

-- 98. PCL Reconstruction - Phase 1: Protection & ROM
SELECT id INTO proto_id FROM protocols WHERE name = 'PCL Reconstruction' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 1, 'Maximum Protection', 'Week 0–6', 
        ARRAY['Protect the graft from posterior shear', 'Control pain and swelling', 'Gradual ROM (0-90°)'],
        ARRAY['STRICT: No active hamstring contraction', 'Brace locked in extension for walking', 'Avoid posterior tibial sag'],
        ARRAY['Surgical site healed', 'Minimal pain', 'Passive extension to 0°'])
    RETURNING id INTO p1_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p1_id, 'Quad Sets (Superior patellar glide)', '10 × 10 sec', 'Ensure the quads are active to counteract the posterior gravitational pull'),
    (p1_id, 'Patellar Mobilization (All directions)', '3 × 30 sec', 'Prevent intra-articular adhesions'),
    (p1_id, 'Ankle Pumps', '20 reps every hour', 'Circulatory health post-surgery');

    -- Phase 2: Early Strengthening
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Early Strengthening & Functional Loading', 'Week 6–12', 
        ARRAY['Increase ROM beyond 90°', 'Initiate active quad loading (closed chain)', 'Optimize gait mechanics'],
        ARRAY['No isolated open chain hamstring curls', 'Monitor for increased joint laxity'],
        ARRAY['Full symmetrical extension', 'Normal gait without crutches', 'ROM 120°'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Mini-Squats (0-45°)', '3 × 15 reps', 'Closed chain activation is safe for the PCL graft'),
    (p2_id, 'Stationary Bike (High seat)', '15 min', 'Improve ROM without high shear forces'),
    (p2_id, 'Single Leg Stance (Supported)', '3 × 30 sec', 'Early proprioceptive retraining');
END IF;


-- 99. Brachial Plexus Injury - Phase 3: Advanced Strengthening & Functional Return
SELECT id INTO proto_id FROM protocols WHERE name = 'Brachial Plexus Injury' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Functional Integration', 'Month 4+', 
        ARRAY['Maximise multi-joint coordination', 'Return to heavy lifting/overhead tasks', 'Neuromuscular fatigue management'],
        ARRAY['Avoid repetitive heavy overhead reaches if scapula is unstable', 'Pace activity based on neurological fatigue'],
        ARRAY['Stable strength in all key muscle groups', 'Improved DASH functional score'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Overhead Carry (Waiter walk)', '3 × 15 meters', 'Dynamic shoulder stability under static load'),
    (p2_id, 'Wall Ball Taps (Light)', '3 × 30 sec', 'High-frequency proprioceptive feed-back'),
    (p2_id, 'PNF Diagonals with resistance', '3 × 12 reps', 'Integrated athletic functional movement patterns');
END IF;


-- 100. Thoracic Hyperkyphosis - Phase 1 & 2
SELECT id INTO proto_id FROM protocols WHERE name = 'Thoracic Hyperkyphosis' LIMIT 1;
IF proto_id IS NOT NULL THEN
    -- Phase 1
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 1, 'Postural Awareness & Mobility', 'Week 0–4', 
        ARRAY['Address thoracic stiffness', 'Improve respiratory capacity', 'Correction of forward head posture'],
        ARRAY['Avoid forced end-range extension if pain is sharp', 'Monitor for rib pain'],
        ARRAY['Improved thoracic extension ROM', 'Reduced visual forward head angle'])
    RETURNING id INTO p1_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p1_id, 'Thoracic Foam Rolling (Extension)', '3 × 1 min', 'Focal mobilization into extension segments'),
    (p1_id, 'Pectoralis Doorway Stretch', '3 × 45 sec', 'Open the anterior chest to allow better upright posture'),
    (p1_id, 'Scapular Squeezes', '3 × 15 reps', 'Activate middle/lower traps');

    -- Phase 2
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Strengthening & Endurance', 'Week 4–12', 
        ARRAY['Strengthen posterior chain', 'Maintain upright posture during activity', 'Integrated core/spinal stability'],
        ARRAY['Ensure neutral spine during lifting', 'Avoid excessive neck strain'],
        ARRAY['Able to maintain tall posture for 30 min', 'Symmetrical strength in rows'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Prone Y-Raise', '3 × 12 reps', 'Target lower trapezius - key for upright posture'),
    (p2_id, 'Wall Angels', '3 × 15 reps', 'Neuromuscular re-education of shoulder/thoracic rhythm'),
    (p2_id, 'Kettlebell Sumo Deadlift', '3 × 12 reps', 'Global posterior chain strengthening');
END IF;

END $$;
