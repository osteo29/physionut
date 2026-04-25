-- rehab_data_batch7.sql
-- Batch 7: Protocols 38 to 45 (Wrist & Hip)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER;
BEGIN

-- 38. Carpal Tunnel Syndrome (Conservative)
INSERT INTO protocols (name, category) VALUES ('Carpal Tunnel Syndrome (Conservative)', 'Elbow & Wrist') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Neural Desensitisation & Symptom Control', 'Week 0–6', 
    ARRAY['Reduce median nerve symptoms', 'Wrist splinting in neutral', 'Identify provocative postures'],
    ARRAY['Urgent referral if muscle atrophy', 'Splint MUST be in neutral (0°)', 'Avoid prolonged wrist flexion'],
    ARRAY['Night symptoms improving', 'Daytime numbness reducing', 'No progression of thenar weakness'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Neutral Wrist Splinting', 'Nightly + provocative activities', 'Keeps carpal tunnel volume maximal'),
(p1_id, 'Median Nerve Slider', '3 × 10 reps each', 'Wrist neutral, extend fingers, oppose thumb — gentle neural gliding'),
(p1_id, 'Tendon Gliding Exercises', '3 × 10 reps each position', 'Reduces adhesions around flexor tendons in canal'),
(p1_id, 'Workplace Ergonomic Assessment', 'Once', 'Keyboard height, mouse position — major modifiable risk');


-- 39. De Quervain''s Tenosynovitis
INSERT INTO protocols (name, category) VALUES ('De Quervain''s Tenosynovitis', 'Elbow & Wrist') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Load Reduction & Isometric Loading', 'Week 0–4', 
    ARRAY['Reduce radial wrist and thumb pain', 'Isometric thumb abduction/extension', 'Thumb spica splint'],
    ARRAY['AVOID Finkelstein''s test position as exercise', 'Thumb spica splint nightly/provocative', 'Corticosteroid highly effective early'],
    ARRAY['Pain ≤3/10 during isometrics', 'Morning stiffness <15 min', 'Finkelstein''s sign reducing'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Isometric Thumb Abduction (against fixed surface)', '5 × 45 sec, 70–80% effort', 'APL + EPB activation — immediate analgesia'),
(p1_id, 'Thumb and Wrist AROM (pain-free)', '3 × 20 reps each', 'Maintain mobility — avoid ulnar deviation at end-range'),
(p1_id, 'Cryotherapy', '15 min × 3–4/day', 'Reduce first dorsal compartment inflammation');


-- 43. Hip Flexor Strain (Iliopsoas)
INSERT INTO protocols (name, category) VALUES ('Hip Flexor Strain (Iliopsoas)', 'Hip') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Acute Management', 'Week 0–2', 
    ARRAY['Reduce pain and muscle guarding', 'Maintain hip ROM', 'Early pain-free activation'],
    ARRAY['Avoid passive hip extension stretch early', 'Avoid resisted hip flexion above 90°', 'Rule out avulsion in adolescents'],
    ARRAY['Walking pain-free without antalgic gait', 'Pain ≤3/10 during isometrics', 'No pain at rest'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Isometric Hip Flexion (submaximal)', '3 × 10 reps, 10 sec', 'Maintain muscle activation without excessive tension'),
(p1_id, 'Supine Hip AROM (flexion)', '3 × 20 reps', 'Prevent muscle shortening and maintain joint mobility'),
(p1_id, 'Core Activation (TrA drawing-in)', '3 × 10 reps, 10 sec hold', 'Stabilise lumbar spine — reduce iliopsoas overload'),
(p1_id, 'Stationary Bike (low resistance, low seat)', '15–20 min', 'Maintain cardiovascular fitness — low-load hip flexion arc');


-- 44. Adductor / Groin Strain
INSERT INTO protocols (name, category) VALUES ('Adductor / Groin Strain', 'Hip') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Acute Phase & Isometric Loading', 'Week 0–2', 
    ARRAY['Reduce medial groin pain', 'Early pain-free isometric loading', 'Patient education — groin vs hernia'],
    ARRAY['Avoid aggressive passive stretching in reactive phase', 'Crutches if antalgic gait', 'Rule out pubic stress fracture'],
    ARRAY['Walking pain-free without antalgic gait', 'Isometric adduction strength ≥60% symmetry'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Isometric Adduction (Copenhagen, submaximal)', '3 × 10 reps, 10 sec', 'Pain-free adductor activation — analgesic and anti-atrophy'),
(p1_id, 'Supine Hip Adduction (squeeze pillow)', '3 × 20 reps, 5 sec hold', 'Isolated adductor loading without weight-bearing stress'),
(p1_id, 'Stationary Bike (low resistance)', '15–20 min', 'Cardiovascular maintenance — low adductor load');

END $$;
