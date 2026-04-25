-- rehab_data_batch17.sql
-- استكمال النواقص: البروتوكولات 34, 35, 40, 41, 42
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER;
BEGIN

-- 34. Supraspinatus Tendinopathy (Chronic)
INSERT INTO protocols (name, category) VALUES ('Supraspinatus Tendinopathy (Chronic)', 'Shoulder') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Isometric Loading & Scapular Base', 'Week 0–4', 
    ARRAY['Reduce tendon pain', 'Maintain ROM', 'Establish scapular stability'],
    ARRAY['Avoid impingement positions (overhead)', 'Isometric loading should be painless', 'Avoid heavy lifting'],
    ARRAY['Pain ≤3/10', 'VISA-S score improving', 'Scapular control achieved'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Isometric Abduction (hand at side)', '5 × 45 sec, submaximal', 'Tendon loading policy — analgesia through load'),
(p1_id, 'Scapular Setting (Wall slides)', '3 × 15 reps, slow', 'Control of upward rotation'),
(p1_id, 'Sleeper Stretch', '3 × 45 sec', 'Address GIRD/Posterior capsule — reduced compressive load on cuff');


-- 35. Calcific Tendinitis (Acute/Reactive)
INSERT INTO protocols (name, category) VALUES ('Calcific Tendinitis (Acute/Reactive)', 'Shoulder') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Pain Management & Desensitisation', 'Week 0–2', 
    ARRAY['Management of severe pain', 'Decrease muscle spasm', 'Maintain PROM', 'Education'],
    ARRAY['Pain can be extremely high — use ice/medication', 'Avoid any resisted exercise', 'Sling for comfort only if needed'],
    ARRAY['Resting pain manageable', 'Cessation of acute inflammatory symptoms'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Pendulum Exercises', '3 × 5 min', 'Passive synovial fluid circulation — essential for pain relief'),
(p1_id, 'Cervical/Elbow ROM', '3 × 20 reps', 'Address secondary guarding in neck and elbow'),
(p1_id, 'Ice and Position Education', '15 min, 4× daily', 'Sleep slightly upright to reduce pressure');


-- 40. Scaphoid Fracture (Non-operative - Cast Phase)
INSERT INTO protocols (name, category) VALUES ('Scaphoid Fracture (Non-operative)', 'Upper Limb') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Immobilisation & Protection', 'Week 0–8+', 
    ARRAY['Protect fracture site', 'Custom cast maintenance', 'Digital/Thumb mobility', 'Shoulder/Elbow ROM'],
    ARRAY['Strict compliance with casting — blood supply is critical', 'Avoid lifting or weight-bearing through hand', 'Monitor for swelling/compartment issues'],
    ARRAY['X-ray evidence of healing (bridging)', 'Thumb CMC joint clear'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Digital ROM (Claw/Fist)', '3 × 20 reps', 'Maintain tendon gliding while wrist is casted'),
(p1_id, 'Thumb ROM (within cast limits)', '3 × 20 reps', 'Limit CMC stiffness'),
(p1_id, 'Shoulder/Elbow AROM', '3 × 20 reps', 'Address secondary stiffness from "sling-posture"');


-- 41. TFCC Injury (Triangular Fibrocartilage Complex)
INSERT INTO protocols (name, category) VALUES ('TFCC Injury', 'Upper Limb') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Immobilisation & Load Management', 'Week 0–6', 
    ARRAY['Reduce ulnar-sided wrist pain', 'Splinting (ulnar gutter or wrist brace)', 'Maintain grip and digital motion'],
    ARRAY['Avoid wrist ulnar deviation + compression', 'No heavy lifting or wringing clothes', 'Forceful grip modification'],
    ARRAY['Ulnar-sided pain reduced', 'Pain-free weight bearing starting'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Wrist Bracing (night and heavy activity)', 'As needed', 'Stabilise ulnar-sided structures'),
(p1_id, 'Digital Tendon Glides', '3 × 15 reps each position', 'Prevent adhesion while wrist motion restricted'),
(p1_id, 'Pain-free Isometric Wrist Stability', '3 × 10 reps, 5 sec', 'Co-contraction of wrist flexors/extensors');


-- 42. Femoroacetabular Impingement (FAI - Conservative)
INSERT INTO protocols (name, category) VALUES ('Femoroacetabular Impingement (FAI)', 'Hip') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Load Modification & Deep Hip Stability', 'Week 0–6', 
    ARRAY['Eliminate pinching/groin pain', 'Identify provocative postures (deep flexion/IR)', 'Establish deep hip rotator and gluteal stability'],
    ARRAY['Avoid end-range hip flexion + IR', 'No deep squats or lunges for now', 'Avoid prolonged sitting'],
    ARRAY['Positive FADIR test improving', 'Pain ≤3/10', 'Deep rotators engaging'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Clamshells (hip position matters)', '3 × 20 reps', 'Target deep rotators — don''t roll pelvis'),
(p1_id, 'Bridge with Band (Isometric abduction)', '3 × 15 reps, 5 sec hold', 'Glute med activation in mid-range'),
(p1_id, 'Single-leg Stance (Pelvic level)', '3 × 60 sec', 'Neuromuscular hip stability during loading');

END $$;
