-- rehab_data_batch25.sql
-- استكمال بيانات المراحل: بروتوكول 20 وإضافة المرحلة الثانية لأهم الإصابات
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p2_id INTEGER;
BEGIN

-- 20. Spondylolisthesis (Grade I-II Conservative)
INSERT INTO protocols (name, category) VALUES ('Spondylolisthesis (Conservative)', 'Spine') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Pain Control & Stabilisation', 'Week 0–6', 
    ARRAY['Symptom reduction', 'Neutral spine awareness', 'Core activation without extension'],
    ARRAY['Avoid lumbar extension (arching back)', 'No heavy lifting', 'Avoid high-impact activities'],
    ARRAY['Pain reduction >50%', 'Ability to hold neutral spine during ADLs', 'Strong transverse abdominis activation'])
RETURNING id INTO p2_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p2_id, 'Pelvic Tilts (Pain-free range)', '3 × 15 reps', 'Dissociate hip movement from lumbar spine'),
(p2_id, 'Transverse Abdominis Bracing', '10 × 10 sec', 'Create an internal corset to support the vertebrae'),
(p2_id, 'Hamstring Stretching (Supine with strap)', '3 × 45 sec', 'Reduce posterior pelvic pull');


-- إضافة المرحلة الثانية لبروتوكول 1 (ACL Reconstruction - Hamstring)
SELECT id INTO proto_id FROM protocols WHERE name = 'ACL Reconstruction (Hamstring Graft)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Early Strengthening', 'Week 2–6', 
        ARRAY['Restore full extension (0°)', 'Flexion to 120°', 'Normalise gait', 'Single leg balance > 30 sec'],
        ARRAY['No open chain extension 90-45°', 'Avoid tibial rotation during loaded exercise'],
        ARRAY['Full extension', 'Flexion > 125°', 'Minimal effusion', 'No lag on SLR'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Mini-Squats (0-60°)', '3 × 15 reps', 'Closed chain quadriceps activation'),
    (p2_id, 'Static Cycling (Low resistance)', '15-20 min', 'Improve ROM and aerobic capacity'),
    (p2_id, 'Heel Raises (Bilateral)', '3 × 20 reps', 'Gastrocnemius strengthening for knee stability');
END IF;


-- إضافة المرحلة الثانية لبروتوكول 3 (Meniscus Repair)
SELECT id INTO proto_id FROM protocols WHERE name = 'Meniscus Repair (Post-operative)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Weight Bearing Transition', 'Week 4–8', 
        ARRAY['Progress to full weight bearing', 'Eliminate crutches', 'Restore full ROM'],
        ARRAY['Limit weighted squats to < 60° flexion', 'No twisting/pivoting', 'No deep lunges'],
        ARRAY['Normal gait without assistive device', 'Symmetrical knee ROM', 'No pain with WB'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Wall Slides (Limited range 60°)', '3 × 12 reps', 'Controlled eccentric Loading'),
    (p2_id, 'Step-ups (Forward)', '3 × 15 reps (4-inch step)', 'Functional quadriceps control'),
    (p2_id, 'Single Leg Stance (Eyes open)', '3 × 30 sec', 'Proprioceptive retraining of the joint capitals');
END IF;

END $$;
