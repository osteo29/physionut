-- rehab_data_batch5.sql
-- Batch 5: Protocols 23 to 29 (Elbow, Wrist, Hip, Knee, Shoulder, Spine)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER;
    p2_id INTEGER;
    p3_id INTEGER;
BEGIN

-- 23. Lateral Epicondylalgia (Tennis Elbow)
INSERT INTO protocols (name, category) VALUES ('Lateral Epicondylalgia (Tennis Elbow)', 'Elbow & Wrist') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Isometric Loading & Load Management', 'Week 0–4', 
    ARRAY['Reduce lateral elbow pain', 'Isometric wrist extension for analgesia', 'Identify and modify provocative activities'],
    ARRAY['Avoid stretching wrist flexors in reactive phase', 'Reduce grip-intensive activity by 50%', 'Avoid painful movements'],
    ARRAY['Pain ≤3/10 during isometrics', 'Morning stiffness <15 min', 'Provocative activities identified'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Isometric Wrist Extension (table edge)', '5 × 45 sec, 70–80% effort', 'Immediate analgesic effect — elbow at 90°, forearm pronated'),
(p1_id, 'Isometric Grip', '5 × 45 sec', 'Maintain hand and forearm activation without provocation'),
(p1_id, 'Nerve Mobilisation (radial nerve slider)', '3 × 10 reps each', 'Radial nerve often sensitised in Tennis Elbow'),
(p1_id, 'Bike / Swimming', '20–30 min', 'Cardiovascular maintenance — minimal forearm loading');


-- 24. Distal Radius Fracture (Post-immobilisation)
INSERT INTO protocols (name, category) VALUES ('Distal Radius Fracture (Post-immobilisation)', 'Elbow & Wrist') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Post-immobilisation Mobilisation', 'Week 0–4 post-cast removal', 
    ARRAY['Restore wrist ROM', 'Reduce post-immobilisation oedema', 'Restore grip strength'],
    ARRAY['Avoid aggressive passive wrist stretching for first 4 weeks', 'Monitor for CRPS signs', 'No resistive loading until AROM is 50%+ of other side'],
    ARRAY['Wrist AROM >50% of contralateral side', 'Oedema significantly reduced', 'Grip strength beginning to improve'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Wrist AROM — all planes', '3 × 20 reps each direction', 'Flexion, extension, radial and ulnar deviation — gentle'),
(p1_id, 'Forearm Rotation (pronation/supination)', '3 × 20 reps each', 'Often most restricted post-cast — critical for hand function'),
(p1_id, 'Tendon Gliding Exercises (hand)', '3 × 10 reps each position', 'Maintain finger tendon mobility in cast'),
(p1_id, 'Contrast Bathing (warm/cold)', '2 × daily', 'Reduce stiffness and pain — thermal circulation');


-- 25. Hamstring Strain (Grade II)
INSERT INTO protocols (name, category) VALUES ('Hamstring Strain (Grade II)', 'Hip') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Acute Protection & Early Loading', 'Week 0–2', 
    ARRAY['Reduce pain and haematoma formation', 'Maintain tissue mobility', 'Early pain-free active ROM'],
    ARRAY['DO NOT aggressively stretch hamstring in first 2 weeks', 'Monitor for proximal avulsion', 'Crutches if antalgic gait'],
    ARRAY['Walking pain-free without antalgic gait', 'Isometric strength 70% or greater of other side', 'Pain ≤3/10 during exercises'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Prone Knee Flexion (AROM)', '3 × 20 reps', 'Maintain hamstring muscle activation without tension on tear'),
(p1_id, 'Isometric Hamstring (submaximal)', '3 × 10 reps, 10 sec', 'Early loading — pain ≤3/10; anti-atrophy effect'),
(p1_id, 'Hip Hinge (body weight only)', '3 × 10 reps', 'Gentle eccentric loading in safe range'),
(p1_id, 'RICE Protocol / Compression', '48–72h', 'Reduce haematoma — ice 15 min × 4/day');


-- 27. Iliotibial Band Syndrome
INSERT INTO protocols (name, category) VALUES ('Iliotibial Band Syndrome', 'Knee') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Reduce Irritation', 'Week 0–3', 
    ARRAY['Reduce lateral knee pain', 'Modify training load', 'Address contributing factors'],
    ARRAY['Avoid 30° knee flexion range (impingement zone)', 'Reduce running mileage 50%', 'Avoid downhill running'],
    ARRAY['Pain ≤3/10 with walking', 'Reduce provocative running'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Foam Roll IT Band / Glutes', '2 × 2 min', 'Release TFL and proximal IT band — not directly over knee'),
(p1_id, 'Hip Abductor Strengthening (standing)', '3 × 20 reps', 'Key driver — weak glute med increases ITB tension'),
(p1_id, 'Clamshell (band)', '3 × 20 reps', 'Hip ER strengthening');

END $$;
