-- protocols_shoulder_complete_part1.sql
-- الإصابات: الكتف - Shoulder Protocols (Part 1)
-- جميع المراحل (1-4) والتمارين متضمنة

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER; p2_id INTEGER; p3_id INTEGER; p4_id INTEGER;
BEGIN

-- تنظيف البيانات القديمة
DELETE FROM protocols WHERE name IN (
    'Anterior Shoulder Dislocation (First-time)',
    'Rotator Cuff Repair (Surgical)',
    'Subacromial Pain Syndrome (Impingement)',
    'AC Joint Sprain (Grade I-II)',
    'Clavicle Fracture (Non-operative)'
);

---------------------------------------------------------------------------------------
-- 1. Anterior Shoulder Dislocation (First-time)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Anterior Shoulder Dislocation (First-time)', 'Shoulder') RETURNING id INTO proto_id;

-- Phase 1: Acute Protection (0-3 Weeks)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Acute Protection', 'Week 0–3', 
    ARRAY['Protect healing capsule', 'Reduce pain/swelling', 'Maintain hand/wrist function'],
    ARRAY['No Abduction + External Rotation (High five position)', 'Avoid forced extension', 'Sling for comfort'],
    ARRAY['Minimal pain at rest', 'Active ROM 90° flexion'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Pendulum Swings', '3 × 1 min', 'Passive mobility'),
(p1_id, 'External Rotation (Isometric)', '3 × 10 reps', 'Cuff activation without movement'),
(p1_id, 'Scapular Squeezes', '3 × 15 reps', 'Proximal stability');

-- Phase 2: ROM & Initial Strength (3-8 Weeks)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Mobilization & Early Strength', 'Week 3–8', ARRAY['Restore near full ROM', 'Steady cuff strengthening'], ARRAY['Avoid end-range ER'], ARRAY['ER > 45°', 'Neg apprehension at 90°'])
RETURNING id INTO p2_id;

-- Phase 3: Advanced Strength (8-16 Weeks)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Advanced Integrated Strength', 'Week 8–16', ARRAY['Full power', 'Proprioception', 'Heavy loading'], ARRAY['Build load gradually'], ARRAY['Symmetric strength'])
RETURNING id INTO p3_id;

-- Phase 4: High Performance (Month 4-12)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Return to Contact / Sport', 'Month 4+', ARRAY['Full contact', 'Reactive stability', 'Prevention'], ARRAY['Maintain cuff endurance'], ARRAY['Full confidence', 'WOSI Score > 85%'])
RETURNING id INTO p4_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p2_id, 'ER with Band (Arm at side)', '3 × 15 reps', 'Cuff isolation'),
(p3_id, 'Push-up into Plank Plus', '3 × 12 reps', 'Scapular stability'),
(p4_id, 'Plyometric Push-ups', '3 × 10 reps', 'Power and reactive stability');


---------------------------------------------------------------------------------------
-- 2. Rotator Cuff Repair (Surgical)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Rotator Cuff Repair (Surgical)', 'Shoulder') RETURNING id INTO proto_id;

-- Phase 1 (0-6 Weeks)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Protective PROM', 'Week 0–6', ARRAY['Protect repair', 'Passive ROM goals'], ARRAY['No active movement', 'Strict sling use'], ARRAY['Passive Flexion 120°'])
RETURNING id INTO p1_id;

-- Phase 2 (6-12 Weeks)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'AAROM to AROM', 'Week 6–12', ARRAY['Full active ROM', 'Early isometrics'], ARRAY['No heavy lifting'], ARRAY['Full active ROM pain-free'])
RETURNING id INTO p2_id;

-- Phase 3 (12-20 Weeks)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Resistance Training', 'Week 12–20', ARRAY['Restore strength', 'ADL integration'], ARRAY['Monitor pain'], ARRAY['Strength > 80% other side'])
RETURNING id INTO p3_id;

-- Phase 4 (Month 5+)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Functional Maintenance', 'Month 5+', ARRAY['Full sport/work return', 'Prevention'], ARRAY['Gradual overhead loading'], ARRAY['Full independence'])
RETURNING id INTO p4_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Table Slides', '3 × 10 reps', 'Passive flexion'),
(p2_id, 'Wall Crawls', '3 × 10 reps', 'Assist active elevation'),
(p3_id, 'Full Can Raises', '3 × 12 reps', 'Supraspinatus strengthening'),
(p4_id, 'Resistance Band High-to-Low Rows', '3 × 15 reps', 'Maintenance of posterior stability');


---------------------------------------------------------------------------------------
-- 3. Subacromial Pain Syndrome (Impingement)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Subacromial Pain Syndrome (Impingement)', 'Shoulder') RETURNING id INTO proto_id;

-- All 4 Phases
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Pain Control & Posture', 'Week 0–4', ARRAY['Reduce impingement', 'Restore range'], ARRAY['Avoid painful overhead move'], ARRAY['VAS < 3/10'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Cuff Strengthening', 'Week 4–8', ARRAY['Load cuff', 'Scapular control'], ARRAY['Paced volume'], ARRAY['Pain-free elevation'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Load Progression', 'Week 8–16', ARRAY['Heavy loading', 'Full function'], ARRAY['Monitor focal pain'], ARRAY['Full strength'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Prevention', 'Month 4+', ARRAY['Maintenance', 'Performance'], ARRAY['Maintain endurance'], ARRAY['Zero recurring symptoms'])
RETURNING id INTO p4_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Sleeper Stretch', '3 × 30 sec', 'Address GIRD'),
(p2_id, 'Scapular Rows', '3 × 15 reps', 'Setting the base'),
(p3_id, 'Military Press (Dumbbell)', '3 × 10 reps', 'Overhead load tolerance');


---------------------------------------------------------------------------------------
-- 4. AC Joint Sprain (Grade I-II)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('AC Joint Sprain (Grade I-II)', 'Shoulder') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Initial Protection', 'Week 0–2', ARRAY['Settle peak pain'], ARRAY['No horiz. adduction'], ARRAY['ROM to 90° flexion'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Mobilization', 'Week 2–6', ARRAY['Restore range', 'Cuff strength'], ARRAY['No heavy carry'], ARRAY['Full range'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Power & Agility', 'Week 6–12', ARRAY['Push/pull power'], ARRAY['Monitor AC tenderness'], ARRAY['Neg Cross-arm test'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Contact Return', 'Month 3+', ARRAY['Full sport'], ARRAY['Maintain stability'], ARRAY['Clearance for contact'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 5. Clavicle Fracture (Non-operative)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Clavicle Fracture (Non-operative)', 'Shoulder') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Immobilization', 'Week 0–6', ARRAY['Fracture healing', 'Pain control'], ARRAY['No elevation > 90°'], ARRAY['Clinical union signs'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Mobilization', 'Week 6–12', ARRAY['Full active ROM'], ARRAY['NWB on limb'], ARRAY['Full ROM'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Resistance', 'Week 12–20', ARRAY['Strength', 'ADL integration'], ARRAY['Monitor site pain'], ARRAY['Full union confirmed'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Full Return', 'Month 5+', ARRAY['Sport return'], ARRAY['Zero pain with load'], ARRAY['Full seasonal participation'])
RETURNING id INTO p4_id;

END $$;
