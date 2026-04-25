-- rehab_data_batch9.sql
-- Batch 9: Protocols 54 to 61 (Ankle/Foot & Spine)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER;
BEGIN

-- 54. Peroneal Tendinopathy
INSERT INTO protocols (name, category) VALUES ('Peroneal Tendinopathy', 'Ankle & Foot') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Isometric Loading & Load Reduction', 'Week 0–4', 
    ARRAY['Reduce lateral ankle and peroneal pain', 'Tendon loading via isometrics', 'Identify provocative activities'],
    ARRAY['Avoid stretching peroneal tendons in reactive phase', 'Reduce running mileage by 50%', 'Avoid inversion stress loading'],
    ARRAY['Pain ≤3/10 during isometrics', 'Morning stiffness <15 min', 'VISA-P improving'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Isometric Eversion (band, mid-range)', '5 × 45 sec, 70–80% effort', 'Foot on floor, push outward — immediate analgesic effect'),
(p1_id, 'Isometric Plantarflexion (wall)', '5 × 45 sec', 'Maintain tendon activation without provoking pain'),
(p1_id, 'Single-leg Balance (stable surface)', '3 × 45 sec', 'Proprioceptive loading with minimal tendon stress');


-- 55. Posterior Tibial Tendon Dysfunction (PTTD)
INSERT INTO protocols (name, category) VALUES ('Posterior Tibial Tendon Dysfunction (PTTD)', 'Ankle & Foot') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Acute / Offloading', 'Week 0–4', 
    ARRAY['Reduce pain and inflammation along medial ankle', 'Support arch via orthotic or CAM boot', 'Maintain tibialis posterior activation'],
    ARRAY['Stage II+: CAM boot or UCBL orthosis required', 'Avoid barefoot walking on hard surfaces', 'No heel raises in reactive phase'],
    ARRAY['Pain ≤3/10 with weight bearing', 'Swelling resolving', 'Ready for progressive loading'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Isometric Tibialis Posterior (arch doming)', '3 × 10 reps, 10 sec hold', 'Short foot exercise — dome arch without curling toes'),
(p1_id, 'Seated Calf Raises (bilateral)', '3 × 20 reps', 'Low load — avoid full single-leg load in acute phase'),
(p1_id, 'Pool Walking / Hydrotherapy', '20 min', 'Offloaded functional walking — excellent early option');


-- 61. Spinal Stenosis (Lumbar — Conservative)
INSERT INTO protocols (name, category) VALUES ('Spinal Stenosis (Lumbar — Conservative)', 'Spine') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Symptom Management & Flexion-Based Mobility', 'Week 0–6', 
    ARRAY['Reduce neurogenic claudication', 'Identify directional preference (flexion)', 'Improve walking tolerance'],
    ARRAY['Avoid lumbar extension — narrows spinal canal further', 'Monitor for progressive neurological deficit', 'Cauda equina symptoms = emergency'],
    ARRAY['Walking tolerance improving (>10 min)', 'Pain ≤4/10 with daily activities', 'Understanding of symptom-relief positions'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Posterior Pelvic Tilt (supine)', '3 × 20 reps, 5 sec hold', 'Flatten lumbar lordosis — opens spinal canal; core activation'),
(p1_id, 'Knee-to-Chest Stretch (bilateral)', '3 × 45 sec', 'Lumbar flexion — opens posterior canal; immediate relief'),
(p1_id, 'Stationary Bike (slightly forward lean)', '20–30 min', 'Flexion-biased cardio — reduces claudication vs treadmill');

END $$;
