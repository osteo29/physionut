-- rehab_data_batch22.sql
-- استكمال النواقص: البروتوكولات 79, 83, 84, 88, 89
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER;
BEGIN

-- 79. Thumb UCL Sprain (Gamekeeper''s / Skier''s Thumb)
INSERT INTO protocols (name, category) VALUES ('Thumb UCL Sprain', 'Upper Limb') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Immobilisation & Protection', 'Week 0–6', 
    ARRAY['Allow UCL ligament healing', 'Protect MCP joint from valgus stress', 'Maintain digital and wrist mobility'],
    ARRAY['High risk of Stener lesion (if grade III) — needs surgery', 'No pinch-grip or thumb abduction', 'Splint mandatory 24/7'],
    ARRAY['6 weeks immobilisation completed', 'Stability confirmed on stress test', 'No pain at joint line'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Thumb Spica Splinting', '24 hours/day (6 weeks)', 'Strict protection of the ulnar collateral ligament'),
(p1_id, 'Finger ROM', '3 × 20 reps', 'Maintain hand function while thumb isolated'),
(p1_id, 'Wrist AROM (Gentle)', '3 × 15 reps', 'Maintain wrist mobility — avoid thumb pull');


-- 83. Rectus Femoris Strain (Grade II)
INSERT INTO protocols (name, category) VALUES ('Rectus Femoris Strain', 'Sports & Trauma') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Acute Management & Protection', 'Week 0–2', 
    ARRAY['Reduce hematoma/edema', 'Protect healing muscle fibers', 'Maintain knee and hip joint mobility'],
    ARRAY['Avoid aggressive stretching into hip extension + knee flexion', 'No resisted hip flexion', 'Avoid deep heat in first 72h'],
    ARRAY['Pain-free walking', 'Knee flexion ≥90°', 'Minimal tenderness on palpation'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Quadriceps Isometrics (Sub-maximal)', '5 × 10 reps, 5 sec', 'Painless activation — prevents atrophy'),
(p1_id, 'Heel Slides (Knee ROM)', '3 × 20 reps', 'Gentle mobility within comfort zone'),
(p1_id, 'Gluteal Sets / Bridge (Mid-range)', '3 × 15 reps', 'Establish posterior chain support');


-- 84. Gluteal Strain / Tear
INSERT INTO protocols (name, category) VALUES ('Gluteal Strain', 'Sports & Trauma') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Acute Protection & Early Loading', 'Week 0–3', 
    ARRAY['Protect healing gluteal fibers', 'Reduce focal pain', 'Normalise gait'],
    ARRAY['Avoid aggressive internal rotation or adduction stretching', 'No heavy resisted abduction', 'Modify sleep position (pillow between legs)'],
    ARRAY['Pain-free gait without Trendelenburg', 'Slightly resisted abduction is painless'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Isometric Hip Abduction (Supine)', '5 × 45 sec, 50% effort', 'Activation without muscle lengthening stress'),
(p1_id, 'Standing Gluteal Squeezes', '3 × 20 reps', 'Establish pelvic stability'),
(p1_id, 'Short Foot Exercise', '3 × 20 reps', 'Foot-hip connection for stability during gait');


-- 88. Pectoralis Major Rupture (Conservative)
INSERT INTO protocols (name, category) VALUES ('Pectoralis Major Rupture', 'Upper Limb') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Protection & Tissue Healing', 'Week 0–4', 
    ARRAY['Protect healing muscle/tendon', 'Reduce pain and hematoma', 'Maintain scapular and distal mobility'],
    ARRAY['Sling for 3–4 weeks', 'No active horizontal adduction or abduction/ER', 'Avoid heavy lifting'],
    ARRAY['Pain resolving', 'Pendulum exercises tolerated', 'Passive abduction up to 90°'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Sling Immobilisation', 'Continuous', 'Necessary for large muscle tear protection'),
(p1_id, 'Pendulum Exercises', '3 × 5 min', 'Passive synovial fluid movement — pain relief'),
(p1_id, 'Elbow/Wrist AROM', '3 × 20 reps', 'Prevent distal stiffness');


-- 89. Distal Biceps Rupture (Post-operative)
INSERT INTO protocols (name, category) VALUES ('Distal Biceps Rupture (Post-op)', 'Upper Limb') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Splinting & Early ROM', 'Week 0–4', 
    ARRAY['Protect surgical repair', 'Controlled early mobility', 'Wound management', 'Edema control'],
    ARRAY['Hinged elbow brace with extension block (usually -30°)', 'No active elbow flexion or supination', 'No resisted elbow extension'],
    ARRAY['Extension to -30° achieved', 'Wound healed', 'Minimal forearm/elbow swelling'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Passive Elbow Flexion/Extension (within brace limits)', '3 × 15 reps', 'Restore ROM without tendon stress'),
(p1_id, 'Active Grip Strengthening', '3 × 20 reps, light balls', 'Maintain forearm muscle activation'),
(p1_id, 'Shoulder AROM (Sling used for support)', '3 × 15 reps', 'Prevent secondary frozen shoulder');

END $$;
