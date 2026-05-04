-- protocols_wrist_hand_complete_part2.sql
-- الحالات: اليد والرسغ - Wrist & Hand Protocols (Part 2)
-- جميع المراحل (1-4) والتمارين متضمنة

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER; p2_id INTEGER; p3_id INTEGER; p4_id INTEGER;
BEGIN

-- تنظيف البيانات القديمة
DELETE FROM protocols WHERE name IN (
    'Scaphoid Fracture (Non-operative)',
    'Boxer''s Fracture (5th Metacarpal)',
    'Trigger Finger (Conservative)',
    'Gamekeeper’s Thumb (UCL Sprain)',
    'Guyon''s Canal Syndrome'
);

---------------------------------------------------------------------------------------
-- 1. Scaphoid Fracture (Non-operative)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Scaphoid Fracture (Non-operative)', 'Wrist/Hand') RETURNING id INTO proto_id;

-- Phase 1: Immobilization (0-12 Weeks)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Immobilization & Protection', 'Week 0–12', 
    ARRAY['Bony union achievement', 'Thumb/Finger mobility maintenance'],
    ARRAY['Strict NWB', 'No heavy lifting or torque', 'Maintain cast integrity'],
    ARRAY['X-ray confirmed union', 'Neg tenderness at anatomical snuffbox'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Mobilization', 'Week 12–16', ARRAY['Restore active wrist ROM', 'Early grip initiation'], ARRAY['Avoid heavy impact initially'], ARRAY['Functional ROM achieveD'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Strength Integration', 'Week 16–24', ARRAY['Restore grip power', 'ADL independence'], ARRAY['Monitor for site pain'], ARRAY['Full strength return'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Functional Maintenance', 'Month 6+', ARRAY['Independent care', 'Prevention'], ARRAY['Maintain flexibility habit'], ARRAY['Full seasonal participation'])
RETURNING id INTO p4_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Finger Tendolon Glides', '3 × 15 reps', 'Prevent adhesion while in cast'),
(p2_id, 'Wrist Flexion/Extension (Active)', '3 × 10 reps', 'Gentle mobility return'),
(p3_id, 'Grip Strengthening (Soft ball)', '3 × 12 reps', 'Early load intro'),
(p4_id, 'Full Weight Bearing Tasks', '5 min daily', 'Long-term maintenance');


---------------------------------------------------------------------------------------
-- 2. Boxer's Fracture (5th Metacarpal)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Boxer''s Fracture (5th Metacarpal)', 'Wrist/Hand') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Casting & Protection', 'Week 0–6', ARRAY['Fracture union', 'Protect ulnar gutter'], ARRAY['Strict NWB', 'No resistive digital move'], ARRAY['Callus on X-ray'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Mobilization', 'Week 6–10', ARRAY['Restore digital flexion', 'Wrist ROM'], ARRAY['Avoid impact forces'], ARRAY['Full digital flexion'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Grip Initiation', 'Week 10–16', ARRAY['Grip power', 'Hand dexterity'], ARRAY['Monitor site ache'], ARRAY['Symmetric grip'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Discharge', 'Month 4+', ARRAY['Maintenance', 'Prevention'], ARRAY['Independent monitoring'], ARRAY['Zero restrictions'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 3. Trigger Finger (Conservative)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Trigger Finger (Conservative)', 'Wrist/Hand') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Unloading & Splinting', 'Week 0–4', ARRAY['Settle peak inflammation', 'Gluten avoidance (no catching)'], ARRAY['Avoid repetitive "clicking"', 'No heavy lifting'], ARRAY['Morning stiffness reduction'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Early Glides', 'Week 4–8', ARRAY['Maintain range', 'Gentle glides'], ARRAY['Avoid heavy grip'], ARRAY['Painless gliding'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Hand Strength', 'Week 8–16', ARRAY['Functional grip power', 'Dexterity'], ARRAY['Monitor for recurrence'], ARRAY['Full functional use'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Independent Care', 'Month 4+', ARRAY['Prevention', 'Maintenance'], ARRAY['Identify early flare signs'], ARRAY['Zero recurring symptoms'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 4. Gamekeeper’s Thumb (UCL Sprain)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Gamekeeper’s Thumb (UCL Sprain)', 'Wrist/Hand') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Immobilization', 'Week 0–6', ARRAY['Protection of UCL', 'Healing'], ARRAY['Strict thumb spica splinting (24/7)'], ARRAY['Neg valgus stress pain'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'AAROM & Weaning', 'Week 6–10', ARRAY['Active ROM initiation', 'Wean splint'], ARRAY['No pinch load yet'], ARRAY['Full AROM achieved'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Pinch & Grip Strength', 'Week 10–16', ARRAY['Restore full pinch power'], ARRAY['Gradual load spikes'], ARRAY['Symmetric pinch power'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Functional Resilience', 'Month 4+', ARRAY['Full return to activity', 'Prevention'], ARRAY['Maintain dexterity habit'], ARRAY['Zero recurring symptoms'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 5. Guyon's Canal Syndrome
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Guyon''s Canal Syndrome', 'Wrist/Hand') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Unloading & Desensitization', 'Week 0–4', ARRAY['Reduce ulnar nerve compression', 'Nerve gliding'], ARRAY['Avoid prolonged weight on ulnar palm'], ARRAY['Reduced numbness'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Mobilization', 'Week 4–8', ARRAY['Maintain range', 'Coordination'], ARRAY['No heavy vibratory tool use'], ARRAY['Pain-free grip > 50%'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Independent Power', 'Week 8–16', ARRAY['Grip strength', 'Full ADL use'], ARRAY['Monitor neuro signs'], ARRAY['Symmetric power'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Ergonomic Maintenance', 'Month 4+', ARRAY['Prevention', 'Technique optimization'], ARRAY['Maintain ergonomics'], ARRAY['Zero recurring symptoms'])
RETURNING id INTO p4_id;

END $$;
