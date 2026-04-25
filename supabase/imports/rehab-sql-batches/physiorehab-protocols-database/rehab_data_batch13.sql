-- rehab_data_batch13.sql
-- Batch 13: Protocols 86 to 93 (Sports & Paediatric)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER;
BEGIN

-- 86. Medial Tibial Stress Syndrome (Shin Splints)
INSERT INTO protocols (name, category) VALUES ('Medial Tibial Stress Syndrome (Shin Splints)', 'Sports & Trauma') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Load Reduction & Bone Stress Protection', 'Week 0–4', 
    ARRAY['Reduce medial tibial pain', 'Identify training provocations', 'Maintain fitness low-impact', 'Patient education on stress continuum'],
    ARRAY['Exclude tibial stress fracture', 'Cease running if pinpoint tenderness', 'Reduce load by 50-80%', 'Footwear assessment'],
    ARRAY['Pain ≤2/10 with walking', 'Bony point tenderness resolved', 'Stress fracture excluded'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Pool Running / Aqua Jogging', '30–45 min, 5×/week', 'Zero tibial impact load'),
(p1_id, 'Stationary Bike', '30 min daily', 'Non-weight-bearing cardiovascular maintenance'),
(p1_id, 'Calf Raises (bilateral, pain-free)', '3 × 20 reps', 'Maintain soleus/gastroc activation'),
(p1_id, 'Tibialis Posterior Strengthening (band)', '3 × 20 reps', 'Key muscle for tibial stress absorption'),
(p1_id, 'Walking (pain-free distance only)', 'As tolerated', 'Maintain bone loading stimulus at sub-threshold');


-- 87. Stress Reaction (Femoral Neck)
INSERT INTO protocols (name, category) VALUES ('Stress Reaction (Femoral Neck)', 'Sports & Trauma') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Protected Weight Bearing & Bone Protection', 'Week 0–8', 
    ARRAY['Prevent progression to fracture', 'Non-weight-bearing per orthopaedic guidance', 'Maintain fitness/strength', 'Identify RED-S'],
    ARRAY['URGENT: Tension side fracture = emergency', 'NWB mandatory if tension-side', 'No single-leg stance', 'Bone health focus'],
    ARRAY['Orthopaedic clearance', 'MRI evidence of healing', 'Pain ≤2/10 with protected walking'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Pool Walking / Aqua Running', '30–45 min daily', 'Zero-impact cardiovascular fitness'),
(p1_id, 'Stationary Bike (seated)', '30 min daily', 'Low femoral neck load'),
(p1_id, 'Ankle Pumps', '10 × hourly if NWB', 'DVT prevention during restricted mobility'),
(p1_id, 'Hip Abductor Isometrics (side-lying)', '3 × 20 reps, 5 sec', 'Maintain glute med without femoral neck loading');


-- 91. Sever''s Disease (Calcaneal Apophysitis)
INSERT INTO protocols (name, category) VALUES ('Sever''s Disease (Calcaneal Apophysitis)', 'Paediatric & Special') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Load Management & Pain Reduction', 'Week 0–4', 
    ARRAY['Reduce apophyseal pain', 'Identify provocative sport activities', 'Parent education on self-limiting', 'Heel lift or cushioned orthotics'],
    ARRAY['Resolves with maturity (13-15 girls, 14-16 boys)', 'Avoid complete rest', 'Monitor for stress fracture', 'Avoid barefoot sport'],
    ARRAY['Pain ≤3/10 with modified activity', 'Child comfortable walking', 'Heel squeeze test improving'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Heel Lifts / Cushioned Insoles', 'Wear in all footwear', 'Reduce traction stress at calcaneal apophysis'),
(p1_id, 'Calf Stretching (gastrocnemius)', '3 × 45 sec, twice daily', 'Reduce Achilles traction force on growth plate'),
(p1_id, 'Swimming / Cycling', '30 min, 3–5×/week', 'Low calcaneal impact'),
(p1_id, 'Activity Modification', 'Ongoing', 'Reduce running/jumping volume by 50%');

END $$;
