-- rehab_data_batch24_final_cleanup.sql
-- اللمسات الأخيرة: البروتوكولات 7, 98, 99
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER;
BEGIN

-- 7. PCL Reconstruction
INSERT INTO protocols (name, category) VALUES ('PCL Reconstruction', 'Knee') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Maximum Protection', 'Week 0–6', 
    ARRAY['Protect graft from posterior tibial translation', 'Control effusion', 'Wound healing', 'Maintain ROM (0-90°)'],
    ARRAY['Sling/Brace locked in extension for 2-4 weeks', 'No active hamstring contraction (at least 6-8 weeks)', 'No posterior tibial loading'],
    ARRAY['Minimal effusion', 'Full extension 0°', 'Flexion up to 90°', 'No lag on SLR'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Quadriceps Isometrics (Quad sets)', '3 × 20 reps, 10 sec', 'Active anterior translation of tibia supports the graft'),
(p1_id, 'Patellar Mobilisation', '3 × 20 reps', 'Prevent adhesions in the patellofemoral joint'),
(p1_id, 'Ankle Pumps', '10 × hourly', 'DVT prophylaxis'),
(p1_id, 'Passive Knee ROM (Prone is best)', '3 × 15 reps, 0-90°', 'Gravity assists flexion without posterior tibial sag');


-- 98. Brachial Plexus Injury (Neurological)
INSERT INTO protocols (name, category) VALUES ('Brachial Plexus Injury', 'Neurological / Other') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Joint Preservation & Neural Protection', 'Week 0–8', 
    ARRAY['Protect healing nerve roots', 'Maintain passive range of all upper limb joints', 'Patient education on sensory loss'],
    ARRAY['Prevent subluxation of the shoulder (use sling/support)', 'Avoid aggressive nerve pulling/stretching', 'Monitor for pressure sores in anaesthetic areas'],
    ARRAY['Safe joint mobility maintained', 'No secondary contractures developed', 'Management plan established'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Passive ROM - Shoulder/Elbow/Wrist/Hand', '3 × 15 reps each, twice daily', 'Mandatory to prevent frozen joints during paralysis'),
(p1_id, 'Shoulder Support (Slings/Bracing)', 'Ongoing', 'Prevent inferior subluxation from weight of limb'),
(p1_id, 'Sensory Education (Visual inspection of skin)', 'Daily', 'Patient must check for injuries in areas without feeling');


-- 99. Thoracic Hyperkyphosis (Non-Scheuermann''s)
INSERT INTO protocols (name, category) VALUES ('Thoracic Hyperkyphosis', 'Spine') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Postural Awareness & Anterior Length', 'Week 0–8', 
    ARRAY['Improve thoracic extension range', 'Strengthen postural extensors', 'Open anterior chest wall'],
    ARRAY['Assess for bone density (Osteoporosis in elderly)', 'Avoid forceful sustained flexion', 'Monitor for rib pain'],
    ARRAY['Improved height measurement', 'Reduction in mid-back pain', 'Improved respiratory capacity'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Thoracic Extension over Bolster', '3 × 1 min', 'Passive remodeling of thoracic curvature'),
(p1_id, 'Wall Angels', '3 × 15 reps', 'Neuromuscular retraining of scapular stabilisers'),
(p1_id, 'Deep Breathing Exercises', '5 min, twice daily', 'Increase rib cage expansion and lung volume');

END $$;
