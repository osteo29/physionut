-- rehab_data_batch48.sql
-- استكمال البيانات للمراحل الاحترافية (Thumb UCL, Triceps, Youth Shoulder/Knee, Tibial Plateau)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER;
    p2_id INTEGER;
BEGIN

-- 88. Thumb UCL Sprain - Phase 1 & 2
SELECT id INTO proto_id FROM protocols WHERE name = 'Thumb UCL Sprain' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 1, 'Immobilisation & Protection', 'Week 0–4', 
        ARRAY['Protect the ulnar collateral ligament', 'Maintain MP joint stability', 'Wrist/Finger mobility'],
        ARRAY['Avoid any radial deviation force (valgus stress) on the thumb', 'Must wear splint/spica as instructed'],
        ARRAY['Reduced pain at the MCP joint', 'No inflammation'])
    RETURNING id INTO p1_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p1_id, 'Active Tendon Gliding (Fingers 2-5)', '3 × 10 reps', 'Maintain hand function while thumb is protected'),
    (p1_id, 'Wrist ROM (Within splint)', '3 × 15 reps', 'Maintain proximal mobility'),
    (p1_id, 'Gentle Thumb IP Flexion', '3 × 15 reps', 'Maintain distal thumb mobility');

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Mobilisation & Early Grip', 'Week 4–12', 
        ARRAY['Restore active thumb ROM', 'Initiate early pinch and grip strength', 'Functional use of the hand'],
        ARRAY['Avoid forceful "key pinch" initially', 'Monitor for joint line tenderness'],
        ARRAY['Pain-free grip strength > 70%', 'Stable UCL on stress testing'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Thumb Opposition (Touch each fingertip)', '3 × 15 reps', 'Restore functional dexterity'),
    (p2_id, 'Light Pinch (Putty)', '3 × 12 reps', 'Integrated thumb stability during load'),
    (p2_id, 'Wrist extension with resistance', '3 × 15 reps', 'Maintenance of hand-wrist complex stability');
END IF;


-- 93. Triceps Rupture (Post-operative) - Phase 1 & 2
SELECT id INTO proto_id FROM protocols WHERE name = 'Triceps Rupture (Post-operative)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 1, 'Protection & ROM', 'Week 0–4', 
        ARRAY['Protect the triceps repair', 'Gradual restoration of elbow flexion', 'Hand/Wrist mobility'],
        ARRAY['STRICT: No active elbow extension (no triceps use)', 'Limit flexion as per surgeon instruction (usually 0-60°)'],
        ARRAY['Surgical site healed', 'Minimal pain'])
    RETURNING id INTO p1_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p1_id, 'Passive Elbow Flexion/Extension', '3 × 15 reps', 'Safe mobilization through the allowed arc'),
    (p1_id, 'Wrist/Hand Isometrics', 'Daily', 'Circulatory and muscular health of the distal limb'),
    (p1_id, 'Shoulder Shrugs', '3 × 11 reps', 'Maintenance of proximal stability');

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Active Motion & Early Loading', 'Week 4–12', 
        ARRAY['Active elbow extension (gravity-eliminated)', 'Full elbow flexion ROM', 'Initiate submaximal isometrics'],
        ARRAY['Avoid heavy pushing or lifting', 'No explosive triceps work until 12+ weeks'],
        ARRAY['Full AROM flexion/extension', 'Stable repair on assessment'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Active Elbow Extension (Side-lying)', '3 × 20 reps', 'Restore active range without high gravitational demand'),
    (p2_id, 'Triceps Isometrics (Submax)', '3 × 10 sec', 'Safe initiation of muscular tension'),
    (p2_id, 'Weighted Forearm Rotations', '3 × 15 reps', 'Dynamic elbow stability');
END IF;


-- 71. Tibial Plateau Fracture (Post-operative) - Phase 1 & 2
SELECT id INTO proto_id FROM protocols WHERE name = 'Tibial Plateau Fracture (Post-operative)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 1, 'Protection & Immobilization', 'Week 0–6', 
        ARRAY['Protect the tibial articular surface', 'Maintain knee ROM (Locked brace)', 'Circulatory health'],
        ARRAY['STRICT: Non-weight bearing (NWB) or touch-WB only', 'Avoid active knee extension against resistance'],
        ARRAY['Stable hardware visible on X-ray', 'Surgical site healed'])
    RETURNING id INTO p1_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p1_id, 'Ankle Pumps', '20 reps every hour', 'Essential DVT prophylaxis during NWB phase'),
    (p1_id, 'Passive Knee ROM (In brace)', '3 × 15 reps', 'Prevent arthrofibrosis'),
    (p1_id, 'Upper Body Conditioning', '3 sessions per week', 'Maintain general fitness during immobilization');

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Mobilisation & Weight Bearing Transitions', 'Week 6–12', 
        ARRAY['Progress from PWB to FWB (as per surgeon)', 'Restore full ROM', 'Symmetrical quad activation'],
        ARRAY['Monitor for "weight-bearing pain" - reporting joint collapse', 'Avoid impact jumping'],
        ARRAY['Full WB without significant pain', 'Negative Trendelenburg test during PWB'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Mini-Squats (Assisted)', '3 × 15 reps', 'Controlled shared-axial loading'),
    (p2_id, 'Leg Press (Very light)', '3 × 12 reps', 'Safe resistance training through functional arc'),
    (p2_id, 'Step-ups (Low step)', '3 × 15 reps', 'Functional control for gait re-education');
END IF;

END $$;
