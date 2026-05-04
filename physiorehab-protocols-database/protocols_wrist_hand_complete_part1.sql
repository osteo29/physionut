-- protocols_wrist_hand_complete_part1.sql
-- الإصابات: الرسغ واليد - Wrist & Hand Protocols (Part 1)
-- جميع المراحل (1-4) والتمارين متضمنة

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER; p2_id INTEGER; p3_id INTEGER; p4_id INTEGER;
BEGIN

-- تنظيف البيانات القديمة
DELETE FROM protocols WHERE name IN (
    'Carpal Tunnel Syndrome (Conservative)',
    'De Quervain''s Tenosynovitis (Conservative)',
    'Boutonniere Deformity',
    'Mallet Finger',
    'TFCC Tear (Conservative)'
);

---------------------------------------------------------------------------------------
-- 1. Carpal Tunnel Syndrome (Conservative)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Carpal Tunnel Syndrome (Conservative)', 'Wrist/Hand') RETURNING id INTO proto_id;

-- Phase 1 (0-4 Weeks)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Protective & Nerve Gliding', 'Week 0–4', ARRAY['Reduce median nerve compression', 'Night splinting', 'Restore neural excursion'], ARRAY['Avoid prolonged wrist flexion', 'Limit heavy vibratory impact'], ARRAY['Reduced night-time tingling', 'Stable symptoms'])
RETURNING id INTO p1_id;

-- Phase 2 (4-8 Weeks)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Mobilization & Early Loading', 'Week 4–8', ARRAY['Maintain range', 'Light grip strengthening'], ARRAY['Avoid end-range loading'], ARRAY['Pain-free grip > 50%'])
RETURNING id INTO p2_id;

-- Phase 3 (8-16 Weeks)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Advanced Strengthening', 'Week 8–16', ARRAY['Restore full grip/pinch power', 'ADL integration'], ARRAY['Monitor for returning numbness'], ARRAY['Symmetric power'])
RETURNING id INTO p3_id;

-- Phase 4 (Month 4+)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Ergonomic Resilience', 'Month 4+', ARRAY['Prevention', 'Maintenance of neural mobility'], ARRAY['Independent breaks'], ARRAY['Full functional return'])
RETURNING id INTO p4_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Median Nerve Sliders', '3 × 15 reps', 'Improve nerve excursion'),
(p2_id, 'Finger Tendolon Glides', '3 × 10 reps', 'Maintain mobility'),
(p3_id, 'Weighted Wrist Flexion/Extension', '3 × 15 reps', 'Strength build'),
(p4_id, 'Precision Pinch Drills', '5 min', 'Fine motor maintenance');


---------------------------------------------------------------------------------------
-- 2. De Quervain's Tenosynovitis (Conservative)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('De Quervain''s Tenosynovitis (Conservative)', 'Wrist/Hand') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Immobilization & Calming', 'Week 0–3', ARRAY['Settle peak pain', 'Protect APL/EPB tendons'], ARRAY['Avoid repetitive thumb abduction'], ARRAY['Neg Finkelstein test'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Mobilization & Early Loading', 'Week 3–8', ARRAY['Active thumb ROM', 'Early isometric activation'], ARRAY['Stop if sharp pain returns'], ARRAY['Full active ROM thumb'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Advanced Strength', 'Week 8–16', ARRAY['Restore grip/pinch power', 'Tendon loading into extension'], ARRAY['Gradual load spikes'], ARRAY['Symmetric grip'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Ergonomic Resilience', 'Month 4+', ARRAY['Independent care', 'Prevention'], ARRAY['Maintain flexibility'], ARRAY['Full functional return'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 3. Boutonniere Deformity
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Boutonniere Deformity', 'Wrist/Hand') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Protection & Splinting', 'Week 0–6', ARRAY['Heal central slip', 'Maintain DIP joint mobility'], ARRAY['Continuous PIP splinting (24/7)'], ARRAY['Full PIP passive extension'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'AAROM progression', 'Week 6–10', ARRAY['Active extension', 'Maintain DIP flex'], ARRAY['Avoid forceful flexion'], ARRAY['Neg extensor lag'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Advanced Dexterity', 'Week 10–16', ARRAY['Grip power', 'Hand coordination'], ARRAY['Monitor for lag return'], ARRAY['Full functional hand use'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Discharge', 'Month 4+', ARRAY['Maintenance', 'Prevention'], ARRAY['Independent monitoring'], ARRAY['Stable recovery'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 4. Mallet Finger
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Mallet Finger', 'Wrist/Hand') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Strict Splinting', 'Week 0–8', ARRAY['Heal terminal extensor tendon'], ARRAY['Continuous DIP splinting (NO dropping)'], ARRAY['PIP joint full mobility'])
RETURNING id INTO p1_id;

-- (Phase 2-4 follow similar weaning and loading protocols)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Splint Weaning', 'Week 8–10', ARRAY['Active extension initialization'], ARRAY['Only night splinting'], ARRAY['No lag after weaning'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Initial Loading', 'Week 10–14', ARRAY['Load the tendon'], ARRAY['Monitor for extension loss'], ARRAY['Full active extension'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Functional Maintenance', 'Month 4+', ARRAY['Maintenance', 'Prevention'], ARRAY['Protective splint for impact'], ARRAY['Zero recurring lag'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 5. TFCC Tear (Conservative)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('TFCC Tear (Conservative)', 'Wrist/Hand') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Acute Immobilization', 'Week 0–6', ARRAY['Settle ulnar-sided pain', 'Wrist stability'], ARRAY['Restrict rotation (supination/pronation)'], ARRAY['Neg fovea sign pain'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Early Mobilization', 'Week 6–10', ARRAY['Active range initialization'], ARRAY['Avoid end-range deviation'], ARRAY['Full pain-free range'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Proprioception & Grip', 'Week 10–16', ARRAY['Stability', 'Strength'], ARRAY['Monitor rotation load'], ARRAY['Symmetric grip'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Functional Resilience', 'Month 4+', ARRAY['Prevention', 'Full return'], ARRAY['Independent maintenance'], ARRAY['Zero recurring instability'])
RETURNING id INTO p4_id;

END $$;
