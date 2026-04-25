-- rehab_data_batch50.sql
-- استكمال البيانات للمراحل النهائية (Calf, Quad, Tibial Stress, Femoral Neck, Iliopsoas)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p2_id INTEGER;
    p3_id INTEGER;
BEGIN

-- 81. Quadriceps Strain (Grade II) - Phase 3: Return to Play
SELECT id INTO proto_id FROM protocols WHERE name = 'Quadriceps Strain (Grade II)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'High Intensity Sport & Running', 'Week 4–8+', 
        ARRAY['Full maximal sprint speed (100%)', 'Safe reactive kicking', 'Integrated lower limb power'],
        ARRAY['Monitor for quad "tightness" during maximal deceleration', 'Gradual re-introduction of high-volume pivoting'],
        ARRAY['Symmetrical quad strength', 'Pain-free maximal kicking/striking', 'Hop test symmetry > 95%'])
    RETURNING id INTO p3_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Sprint Starts', '5-8 reps, 20 meters', 'Specific loading in high-velocity lengthening'),
    (p3_id, 'Agility Ladders (High speed)', '5 min drils', 'Neuromuscular footwork speed and coordination'),
    (p3_id, 'Broad Jumps into Sprint', '3 × 10 reps', 'Explosive power and rapid transition to linear gait');
END IF;


-- 82. Calf Strain (Gastrocnemius) - Phase 3: Return to Play
SELECT id INTO proto_id FROM protocols WHERE name = 'Calf Strain (Gastrocnemius)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'High Level Function & Sport', 'Week 6–12', 
        ARRAY['Full sprint capacity', 'Safe reactive hopping', 'Confident multi-planer agility'],
        ARRAY['Monitor for nocturnal cramping', 'No maximal sprints until hop tests > 95%'],
        ARRAY['Symmetrical calf raise capacity', 'VISA-A score/equivalent symmetry'])
    RETURNING id INTO p3_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Pogo Hops (Stiff ankle)', '3 × 20 reps', 'Develop reactive stiffness and elastic energy storage in the achilles/gastroc'),
    (p3_id, 'Suicide Sprints', '5 rounds', 'Linear acceleration/deceleration under fatigue'),
    (p3_id, 'Box Jumps (Plyometric)', '3 × 12 reps', 'Explosive power development');
END IF;


-- 28. Hip Flexor Strain (Iliopsoas) - Phase 1 & 2
SELECT id INTO proto_id FROM protocols WHERE name = 'Hip Flexor Strain (Iliopsoas)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 1, 'Initial Healing & Muscle Activation', 'Week 0–2', 
        ARRAY['Protect the injury site', 'Pain-free active movement', 'Normalisation of pelvic alignment'],
        ARRAY['Avoid forced end-range hip extension stretching', 'No high-impact running'],
        ARRAY['Pain-free walking', 'Full hip flexion AROM', 'Negative SLR lag'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Seated Hip Flexion Isometrics', '10 × 10 sec', 'Safe initiation of psoas activation'),
    (p2_id, 'Pelvic Tilts (Supine)', '3 × 15 reps', 'Core-hip integration and postural reset'),
    (p2_id, 'Supine Heel Slides', '3 × 15 reps', 'Maintenance of mobility');

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Strengthening & Functional Loading', 'Week 2–6', 
        ARRAY['Restore full psoas torque', 'Maintain core support during movement', 'Safe return to linear jogging'],
        ARRAY['Monitor for "groin tugging" during sprints', 'Progress load based on 24hr pain'],
        ARRAY['Symmetrical strength during testing', 'Pain-free jog/run'])
    RETURNING id INTO p3_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Standing Hip Flexion with Resistance', '3 × 15 reps', 'Functional loading of the hip flexors in standing'),
    (p3_id, 'Dead-bugs (Level 2)', '3 × 15 reps', 'Core stability during moving hip loads'),
    (p3_id, 'Lunge with Overhead Reach', '3 × 12 reps', 'Dynamic functional lengthening');
END IF;

END $$;
