-- protocols_elbow_forearm_complete_part1.sql
-- الحالات: إصابات المرفق والساعد - Elbow & Forearm Protocols (Part 1)
-- جميع المراحل (1-4) والتمارين متضمنة

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER; p2_id INTEGER; p3_id INTEGER; p4_id INTEGER;
BEGIN

-- تنظيف البيانات القديمة
DELETE FROM protocols WHERE name IN (
    'Lateral Epicondylalgia (Tennis Elbow)',
    'Medial Epicondylalgia (Golfer''s Elbow)',
    'Distal Radius Fracture (Post-operative)',
    'Elbow Dislocation (Non-operative)',
    'Olecranon Bursitis'
);

---------------------------------------------------------------------------------------
-- 1. Lateral Epicondylalgia (Tennis Elbow)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Lateral Epicondylalgia (Tennis Elbow)', 'Elbow/Forearm') RETURNING id INTO proto_id;

-- Phase 1 (0-4 Weeks)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Unloading & Isometric Intro', 'Week 0–4', ARRAY['Settle peak pain', 'Identify load triggers'], ARRAY['Avoid heavy gripping', 'No repetitive wrist extension'], ARRAY['VAS Pain < 3/10', 'Tolerate 45s isometric hold'])
RETURNING id INTO p1_id;

-- Phase 2 (4-8 Weeks)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Isotonic Loading (HSR)', 'Week 4–8', ARRAY['Build tendon capacity', 'Grip strength'], ARRAY['Monitor for night pain'], ARRAY['Full strength symmetry'])
RETURNING id INTO p2_id;

-- Phase 3 (8-16 Weeks)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Advanced Return to Sport', 'Week 8–16', ARRAY['Plyometrics (Tennis focus)', 'High load training'], ARRAY['Avoid volume spikes'], ARRAY['Zero pain with full match play'])
RETURNING id INTO p3_id;

-- Phase 4 (Month 4+)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Maintenance', 'Month 4+', ARRAY['Prevention', 'Technique optimization'], ARRAY['Maintain HSR weekly'], ARRAY['Full season participation'])
RETURNING id INTO p4_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Isometric Wrist Extension', '3 × 45 sec', 'Pain modulation'),
(p2_id, 'Weighted Wrist Eccentric Extension', '3 × 12 reps', 'Tendon remodeling'),
(p3_id, 'Ball Squeeze & Release Drills', '3 × 1 min', 'Grip endurance'),
(p4_id, 'Forearm Flexor/Extensor Maintenance', '3 × 15 reps', 'Maintenance of capacity');


---------------------------------------------------------------------------------------
-- 2. Medial Epicondylalgia (Golfer's Elbow)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Medial Epicondylalgia (Golfer''s Elbow)', 'Elbow/Forearm') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Calming & Initial Load', 'Week 0–4', ARRAY['Reduce medial pain', 'Activity modification'], ARRAY['No forced curls', 'Avoid heavy valgus load'], ARRAY['Pain-free daily grip'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Isotonic Enrichment', 'Week 4–8', ARRAY['Load flexor tendons'], ARRAY['Monitor ulnar nerve signs'], ARRAY['Full grip strength'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Sports Drills', 'Week 8–16', ARRAY['Swing mechanics', 'Power'], ARRAY['Monitor post-activity ache'], ARRAY['Zero pain with impact'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Prevention', 'Month 4+', ARRAY['Independent management', 'Prevention'], ARRAY['Maintain forearm bulk'], ARRAY['Full seasonal return'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 3. Distal Radius Fracture (Post-operative)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Distal Radius Fracture (Post-operative)', 'Elbow/Forearm') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Post-op Protection', 'Week 0–2', ARRAY['Wound healing', 'Edema control', 'Early digital ROM'], ARRAY['NWB on extremity', 'No heavy lifting'], ARRAY['Full digital active ROM'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Wrist Mobilization', 'Week 2–6', ARRAY['Active wrist ROM', 'Supination/Pronation'], ARRAY['No resistive loading yet'], ARRAY['Functional wrist ROM achieved'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Resistance Training', 'Week 6–12', ARRAY['Grip strength', 'Global limb power'], ARRAY['Monitor bone site pain'], ARRAY['Symmetric grip power'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Functional Return', 'Month 3+', ARRAY['Full ADL/Work return', 'Sport'], ARRAY['Maintain flexibility'], ARRAY['Independent function achieved'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 4. Elbow Dislocation (Non-operative)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Elbow Dislocation (Non-operative)', 'Elbow/Forearm') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Stable Protection', 'Week 0–2', ARRAY['Protect collateral ligaments', 'Edema control'], ARRAY['Avoid extension > 30° initially', 'No heavy load'], ARRAY['ROM 30-90° achieved'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Functional ROM', 'Week 2–6', ARRAY['Restore near full ROM', 'Early stabilization'], ARRAY['Avoid valgus/varus torque'], ARRAY['Flexion > 130°'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Advanced Strength', 'Week 6–12', ARRAY['Restore full extension', 'Strength'], ARRAY['Monitor joint tolerance'], ARRAY['Symmetric power'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Return to Play', 'Month 3+', ARRAY['Contact sports clearance', 'Prevention'], ARRAY['Independent maintenance'], ARRAY['Zero instability signs'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 5. Olecranon Bursitis
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Olecranon Bursitis', 'Elbow/Forearm') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Infection Rule-out & Unloading', 'Week 0–2', ARRAY['Exclude septic bursitis', 'Compressive therapy', 'Protect site'], ARRAY['Avoid direct pressure on tip of elbow'], ARRAY['Reduced focal swelling'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Mobilization', 'Week 2–4', ARRAY['Gentle ROM', 'Settle remaining fluid'], ARRAY['No repetitive friction'], ARRAY['Full pain-free extension'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Gradual Return', 'Week 4–8', ARRAY['Return to ADLs/Contact'], ARRAY['Use elbow padding for contact'], ARRAY['Zero recurring fluid'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Maintenance', 'Month 2+', ARRAY['Prevention'], ARRAY['Avoid chronic friction'], ARRAY['Stable recovery'])
RETURNING id INTO p4_id;

END $$;
