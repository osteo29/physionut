-- rehab_data_batch16.sql
-- استكمال النواقص: البروتوكولات 26, 28, 29, 32, 33
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER;
BEGIN

-- 26. Greater Trochanteric Pain Syndrome (GTPS / Gluteal Tendinopathy)
INSERT INTO protocols (name, category) VALUES ('Greater Trochanteric Pain Syndrome', 'Hip') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Load Modification & Isometric Loading', 'Week 0–4', 
    ARRAY['Reduce lateral hip pain', 'Identify and remove compression loads', 'Isometric gluteal loading'],
    ARRAY['Avoid side-lying on affected side', 'Avoid crossing legs (adduction compression)', 'No aggressive IT band stretching'],
    ARRAY['Pain ≤3/10 during isometrics', 'Night pain resolving', 'VISA-G improving'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Isometric Hip Abduction (standing)', '5 × 45 sec, 80% effort', 'Immediate analgesic effect — push foot into wall'),
(p1_id, 'Pelvic Leveling (Trendelenburg control)', '3 × 15 reps', 'Gluteus medius activation — maintain level pelvis'),
(p1_id, 'Sleep Education (Pillow between knees)', 'Every night', 'Reduces adduction compression on gluteal tendons'),
(p1_id, 'Weight-bearing Education (Don''t hang on hip)', 'All day reminders', 'Avoid passive hip adduction while standing');


-- 28. AC Joint Sprain (Grade I-II)
INSERT INTO protocols (name, category) VALUES ('AC Joint Sprain (Grade I-II)', 'Shoulder') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Protection & Pain Management', 'Week 0–2', 
    ARRAY['Protect AC joint ligaments', 'Reduce pain and inflammation', 'Maintain pain-free ROM'],
    ARRAY['Sling for comfort if needed', 'Avoid heavy lifting or carrying', 'No cross-body adduction'],
    ARRAY['Pain ≤3/10', 'Shoulder AROM improving up to 90° flexion'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Shoulder Shrugs (gentle)', '3 × 20 reps', 'Maintain trapezius and levator scapulae activation'),
(p1_id, 'Isometric Rotator Cuff (neutral)', '3 × 10 reps, 5 sec', 'Maintain cuff activation without AC joint stress'),
(p1_id, 'Scapular Retraction', '3 × 15 reps', 'Pull blades back and down — offload anterior AC joint'),
(p1_id, 'Elbow and Hand AROM', '3 × 20 reps', 'Prevent distal stiffness');


-- 29. Thoracic Outlet Syndrome (TOS)
INSERT INTO protocols (name, category) VALUES ('Thoracic Outlet Syndrome', 'Spine') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Desensitisation & Postural Correction', 'Week 0–6', 
    ARRAY['Reduce neurovascular symptoms', 'Address muscle imbalances (tight pec minor)', 'Diaphragmatic breathing focus'],
    ARRAY['Avoid overhead activities if provocative', 'Avoid heavy carrying', 'Monitor for vascular change signs'],
    ARRAY['Symptoms reducing from distal to proximal', 'Improving posture and breathing control'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Pectoralis Minor Stretch (doorway)', '3 × 45 sec', 'Open the outlet space — don''t force to pain'),
(p1_id, 'Diaphragmatic Breathing', '5 min, 3× daily', 'Reduce scalene activity and upper rib elevation'),
(p1_id, 'Scapular Squeeze and Hold', '3 × 15 reps, 5 sec', 'Address scapular depression/protraction'),
(p1_id, 'Nerve Gliding (Brachial Plexus Slider)', '3 × 10 reps each', 'Gentle neural excursion — avoid "zinging" sensation');


-- 32. SLAP Lesion (Conservative)
INSERT INTO protocols (name, category) VALUES ('SLAP Lesion (Conservative)', 'Shoulder') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Pain Control & Range Maintenance', 'Week 0–4', 
    ARRAY['Reduce biceps tendon/labral irritation', 'Restore GIRD (Glenohumeral IR Deficit)', 'Scapular stabilisation'],
    ARRAY['Avoid heavy biceps loading', 'Avoid combined abduction/ER (painful position)', 'Address GIRD early'],
    ARRAY['Pain ≤3/10', 'Internal rotation ROM improving', 'Ready for cuff strengthening'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Sleeper Stretch', '3 × 45 sec', 'Address posterior capsule tightness — critical for SLAP'),
(p1_id, 'Cross-body Stretch', '3 × 45 sec', 'Complementary to sleeper stretch'),
(p1_id, 'Isometric ER/IR (neutral)', '3 × 15 reps', 'Rotator cuff activation to stabilise head in socket');


-- 33. Posterior Shoulder Instability
INSERT INTO protocols (name, category) VALUES ('Posterior Shoulder Instability', 'Shoulder') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Posterior Protection & Scapular Control', 'Week 0–4', 
    ARRAY['Protect posterior capsule', 'Scapular stabilisation', 'Rotator cuff activation'],
    ARRAY['Avoid horizontal adduction', 'Avoid internal rotation under load', 'No push-up positions'],
    ARRAY['No posterior subluxation episodes', 'Scapular control improving'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Scapular Retraction and Depression', '3 × 15 reps', 'Maintain stable base for GH joint'),
(p1_id, 'Isometric Rotator Cuff (neutral)', '3 × 15 reps', 'Focus on ER — infraspinatus acts as posterior guard'),
(p1_id, 'Rhythmic Stabilisation (supine, 90° flexion)', '3 × 1 min', 'Neuromuscular control of GH joint');

END $$;
