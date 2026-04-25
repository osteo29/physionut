-- rehab_data_batch10.sql
-- Batch 10: Protocols 62 to 69 (Spine Focused)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER;
BEGIN

-- 62. Facet Joint Dysfunction (Lumbar)
INSERT INTO protocols (name, category) VALUES ('Facet Joint Dysfunction (Lumbar)', 'Spine') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Pain Control & Mobilisation', 'Week 0–3', 
    ARRAY['Reduce lumbar facet joint pain', 'Restore segmental lumbar mobility', 'Identify directional preference'],
    ARRAY['Avoid end-range lumbar extension and rotation', 'Rule out red flags', 'Facet pain is often worse in morning'],
    ARRAY['Pain ≤3/10 with daily activities', 'Lumbar ROM improving (flexion)', 'Morning stiffness under 30 min'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Knee-to-Chest Stretches', '3 × 45 sec', 'Flexion unloads facet joint — primary pain-relief position'),
(p1_id, 'Lumbar Rotation Stretch', '3 × 30 sec each', 'Gentle facet mobilisation — stop at pain barrier'),
(p1_id, 'Posterior Pelvic Tilt (standing, wall)', '3 × 20 reps', 'Reduce lumbar lordosis — offload posterior facets'),
(p1_id, 'Walking (paced)', '15–20 min × 2/day', 'Controlled loading — better than rest');


-- 63. Sacroiliac Joint Dysfunction
INSERT INTO protocols (name, category) VALUES ('Sacroiliac Joint Dysfunction', 'Spine') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Pain Control & Joint Stabilisation', 'Week 0–4', 
    ARRAY['Reduce SIJ pain', 'SIJ compression via sacral belt', 'Identify provocative positions'],
    ARRAY['Confirm SIJ diagnosis via 3+ tests', 'Avoid single-leg stance loading early', 'SIJ belt worn 24h initially'],
    ARRAY['Pain ≤3/10 with daily activities', 'SIJ provocation tests reducing', 'Able to stand single-leg 10 sec'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Posterior Pelvic Tilt (supine)', '3 × 20 reps', 'Transversus abdominis activation — force closure of SIJ'),
(p1_id, 'Clamshell (band)', '3 × 20 reps', 'Gluteus medius — reduces SIJ shear via posterior oblique sling'),
(p1_id, 'Inner Range Quad (SLR in slight flexion)', '3 × 15 reps', 'VMO + hip stabiliser activation — reduce pelvic instability');


-- 66. Whiplash Associated Disorder (WAD Grade II)
INSERT INTO protocols (name, category) VALUES ('Whiplash Associated Disorder (WAD Grade II)', 'Spine') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Acute Management', 'Week 0–3', 
    ARRAY['Reduce acute cervical pain', 'Maintain mobility', 'Screen for yellow flags'],
    ARRAY['WAD Grade III/IV require referral', 'Avoid hard cervical collar', 'Early psychological support'],
    ARRAY['Pain ≤4/10 with daily activities', 'Cervical ROM recovering (rotation)', 'Yellow flags screened'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Cervical AROM — all planes (immediate)', '3 × 10 reps each direction', 'Early movement is the single most important intervention'),
(p1_id, 'Cervical Retraction (chin tucks)', '3 × 15 reps, 5 sec hold', 'Restore natural cervical curve — reduce facet tension'),
(p1_id, 'Heat Application', '15 min × 3–4/day', 'Reduce paraspinal muscle spasm — improve mobility');


-- 67. Osteoporotic Vertebral Fracture (Conservative)
INSERT INTO protocols (name, category) VALUES ('Osteoporotic Vertebral Fracture (Conservative)', 'Spine') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Protection & Pain Management', 'Week 0–6', 
    ARRAY['Fracture healing via protected activity', 'Acute pain control', 'Prevent deconditioning'],
    ARRAY['AVOID all spinal flexion exercises', 'No lumbar rotation under load', 'Monitor neurological status'],
    ARRAY['Pain ≤4/10 with walking', 'Fracture clinically stable', 'Neurological status intact'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Breathing Exercises (diaphragmatic)', '5 min × 4/day', 'Maintain chest expansion — prevents pneumonia'),
(p1_id, 'Isometric Gluteal Sets', '3 × 20 reps', 'Maintain hip extensor activation without spinal loading'),
(p1_id, 'Hip Extension in Standing (gentle)', '3 × 15 reps', 'Posterior chain activation — neutral spine maintained');

END $$;
