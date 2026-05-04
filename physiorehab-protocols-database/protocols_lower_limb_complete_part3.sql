-- protocols_lower_limb_complete_part3.sql
-- الحالات: الطرف السفلي والركبة - Lower Limb & Knee (Part 3)
-- جميع المراحل (1-4) والتمارين متضمنة

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER; p2_id INTEGER; p3_id INTEGER; p4_id INTEGER;
BEGIN

-- تنظيف البيانات القديمة
DELETE FROM protocols WHERE name IN (
    'MCL Tear (Grade II - Conservative)',
    'LCL Tear (Grade II - Conservative)',
    'PCL Reconstruction',
    'Quadriceps Contusion (Cork Thigh)',
    'Tibial Stress Fracture (Conservative)'
);

---------------------------------------------------------------------------------------
-- 1. MCL Tear (Grade II - Conservative)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('MCL Tear (Grade II - Conservative)', 'Knee') RETURNING id INTO proto_id;

-- Phase 1 (0-3 Weeks)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Protection & Settling', 'Week 0–3', 
    ARRAY['Protect healing MCL', 'Reduce pain/swelling', 'Restore extension'],
    ARRAY['Avoid valgus stress', 'Limit active flexion if painful', 'Hinged brace often used'],
    ARRAY['Full extension', 'Neg valgus stress pain at 30°'])
RETURNING id INTO p1_id;

-- Phase 2 (3-8 Weeks)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Isotonic Loading', 'Week 3–8', ARRAY['Restore range', 'Initial strength'], ARRAY['No pivoting initially'], ARRAY['Full range ROM'])
RETURNING id INTO p2_id;

-- Phase 3 (8-16 Weeks)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Agility & Impact', 'Week 8–16', ARRAY['Return to running', 'Higher power'], ARRAY['Monitor medial joint line'], ARRAY['Zero pain with cutting'])
RETURNING id INTO p3_id;

-- Phase 4 (Month 4+)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Full Return', 'Month 4+', ARRAY['Prevention', 'Full season play'], ARRAY['Independent load monitoring'], ARRAY['Full athletic confidence'])
RETURNING id INTO p4_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Quad Sets', '3 × 15 reps', 'Maintain muscle tone'),
(p2_id, 'Wall Squats', '3 × 12 reps', 'Controlled loading'),
(p3_id, 'Lateral Band Walks', '3 × 10 steps', 'Specific valgus control training'),
(p4_id, 'Cutting Drills', '5 sets', 'Reactive stability');


---------------------------------------------------------------------------------------
-- 2. LCL Tear (Grade II - Conservative)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('LCL Tear (Grade II - Conservative)', 'Knee') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Protection & PRICER', 'Week 0–3', ARRAY['Protect LCL', 'Reduce swelling'], ARRAY['Avoid varus stress', 'Avoid tibial internal rotation'], ARRAY['Neg varus stress pain'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Range & Mobility', 'Week 3–8', ARRAY['Restore range', 'Muscle activations'], ARRAY['Stop at sharp lateral pain'], ARRAY['Full ROM achieved'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Integrated Load', 'Week 8–16', ARRAY['Return to run', 'Higher power'], ARRAY['Monitor post-activity ache'], ARRAY['Zero pain with impact'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Maintenance', 'Month 4+', ARRAY['Prevention', 'Competition'], ARRAY['Independent maintenance'], ARRAY['Zero recurring instability'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 3. PCL Reconstruction
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('PCL Reconstruction', 'Knee') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Maximum Protection', 'Week 0–6', ARRAY['Protect PCL repair', 'Control swelling'], ARRAY['Strict NWB', 'Avoid active hamstring tasks', 'No posterior tibial translation'], ARRAY['Wound healed', 'ROM goals met'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'WB Progression', 'Week 6–12', ARRAY['Wean gait aid', 'Restore neutral range'], ARRAY['No deep flexion under load'], ARRAY['Normal gait'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Advanced Strength', 'Month 4–8', ARRAY['Restore bulk', 'Power'], ARRAY['Monitor for joint catching'], ARRAY['LSI > 80%'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Performance Ready', 'Month 9+', ARRAY['Return to play', 'Prevention'], ARRAY['Independent maintenance'], ARRAY['LSI > 95%'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 4. Quadriceps Contusion (Cork Thigh)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Quadriceps Contusion (Cork Thigh)', 'Hip/Pelvis') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Acute Compression', 'Week 0–1', ARRAY['Reduce hematoma', 'Maintain range'], ARRAY['Avoid heatmap in first 48h', 'No aggressive massage'], ARRAY['Flexion > 90° achieving'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Mobilization', 'Week 1–3', ARRAY['Full range', 'Activation'], ARRAY['Stop at sharp focal pain'], ARRAY['Full passive flexion achieved'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Strength & Agility', 'Week 3–6', ARRAY['Return to running', 'Strength'], ARRAY['Monitor site tenderness'], ARRAY['Symmetric power'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Full Return', 'Month 2+', ARRAY['Prevention', 'Full contact'], ARRAY['Independent monitoring'], ARRAY['Neg palpation pain'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 5. Tibial Stress Fracture (Conservative)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Tibial Stress Fracture (Conservative)', 'Ankle/Foot') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Unloading & Settlement', 'Week 0–6', ARRAY['Bony healing', 'Pain control'], ARRAY['Strict NWB/PWB', 'No high impact activity'], ARRAY['Zero pain with daily walking'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Early Load Integration', 'Week 6–12', ARRAY['Isotonic strength', 'ROM restoration'], ARRAY['Monitor for focal bone ache return'], ARRAY['Full WB tolerance'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Impact Progress', 'Month 3–6', ARRAY['Jogging initiation', 'Jump mechanics'], ARRAY['Prioritize mechanics over volume'], ARRAY['Symmetric hop tests'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Performance Return', 'Month 6+', ARRAY['Full seasonal play', 'Prevention'], ARRAY['Independent load monitoring'], ARRAY['Zero recurring symptoms'])
RETURNING id INTO p4_id;

END $$;
