-- protocols_pediatrics_complete_part1.sql
-- الإصابات: الأطفال والنمو - Pediatrics & Growth Protocols (Part 1)
-- جميع المراحل (1-4) والتمارين متضمنة

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER; p2_id INTEGER; p3_id INTEGER; p4_id INTEGER;
BEGIN

-- تنظيف البيانات القديمة
DELETE FROM protocols WHERE name IN (
    'Sever''s Disease (Calcaneal Apophysitis)',
    'Juvenile Osgood-Schlatter',
    'Sinding-Larsen-Johansson Syndrome',
    'Perthes Disease (Conservative)',
    'SCFE (Post-operative)'
);

---------------------------------------------------------------------------------------
-- 1. Sever's Disease (Calcaneal Apophysitis)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Sever''s Disease (Calcaneal Apophysitis)', 'Pediatrics') RETURNING id INTO proto_id;

-- Phase 1 (0-2 Weeks)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Initial Calming', 'Week 0–2', ARRAY['Reduce heel pain', 'Load management education', 'Calf flexibility'], ARRAY['Avoid high impact (jumping/running)', 'No barefoot walking on hard floors'], ARRAY['Pain-free walking', 'Zero resting pain'])
RETURNING id INTO p1_id;

-- Phase 2 (2-8 Weeks)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Graduated Loading', 'Week 2–8', ARRAY['Calf strengthening', 'Functional stability', 'Initial impact tolerance'], ARRAY['Stop at pain > 3/10 during activity'], ARRAY['Full strength symmetry', 'Painless heel rise'])
RETURNING id INTO p2_id;

-- Phase 3 (8-16 Weeks)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Impact & Sport Integration', 'Week 8–16', ARRAY['Return to running/sport', 'Plyometric power'], ARRAY['Monitor for tournament volume spikes'], ARRAY['Zero pain with jumping'])
RETURNING id INTO p3_id;

-- Phase 4 (Ongoing)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Growth Maintenance', 'Until Maturity', ARRAY['Prevention during growth spurts', 'Maintenance of flexibility'], ARRAY['Re-screen every 3 months'], ARRAY['Full seasonal participation'])
RETURNING id INTO p4_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Gastroc/Soleus Stretches', '3 × 30 sec', 'Reduce tensile load on apophysis'),
(p2_id, 'Double Leg Heel Raises', '3 × 15 reps', 'Calf capacity build'),
(p3_id, 'Linear Sprints with Soft Landing', '5 reps', 'Specific impact tolerance'),
(p4_id, 'Daily Flexibility Routine', '5 min daily', 'Maintenance during growth');


---------------------------------------------------------------------------------------
-- 2. Juvenile Osgood-Schlatter
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Juvenile Osgood-Schlatter', 'Pediatrics') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Settling & Unloading', 'Week 0–4', ARRAY['Reduce tibial tubercle pain', 'Improve quad length'], ARRAY['Avoid repetitive kneeling or jumping'], ARRAY['Neg pressure pain at tubercle'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Isotonic Loading', 'Week 4–12', ARRAY['Build quad load tolerance', 'Improve hip stability'], ARRAY['Stop if aching returns'], ARRAY['Full quad capacity symmetry'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Agility & Impact', 'Week 12+', ARRAY['Return to sport speed', 'Safe jumping mechanics'], ARRAY['Monitor post-match swelling'], ARRAY['Zero pain with acceleration'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Prevention', 'Ongoing', ARRAY['Maintenance', 'Growth management'], ARRAY['Independent load monitoring'], ARRAY['Skeletal maturity achieved without disability'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 3. Sinding-Larsen-Johansson Syndrome
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Sinding-Larsen-Johansson Syndrome', 'Pediatrics') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Acute Calming', 'Week 0–4', ARRAY['Settle inferior patellar pole pain'], ARRAY['Limit heavy impact'], ARRAY['Reduced focal tenderness'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Quad Control', 'Week 4–8', ARRAY['Improve quad length/control'], ARRAY['Monitor for irritation spurts'], ARRAY['Zero pain with stairs'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Power Return', 'Week 8–16', ARRAY['Return to youth sport', 'Jumping mechanics'], ARRAY['Monitor season spikes'], ARRAY['Pain-free jumping'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Maintenance', 'Ongoing', ARRAY['Prevention during growth', 'Flexibility maintenance'], ARRAY['Independent monitoring'], ARRAY['Zero recurring symptoms'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 4. Perthes Disease (Conservative)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Perthes Disease (Conservative)', 'Pediatrics') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Joint Unloading', 'Month 0–6', ARRAY['Protect femoral head', 'Maintain ROM'], ARRAY['Restrict impact activity (as per staging)'], ARRAY['Neg hip irrigation'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Early Active Loading', 'Month 6–12', ARRAY['NWB to PWB transition', 'Muscle activation'], ARRAY['X-ray monitoring'], ARRAY['Stable re-ossification'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Re-integration', 'Year 1–2', ARRAY['Gradual return to ADLs', 'Swimming/Cycling'], ARRAY['Avoid high impact'], ARRAY['Stable clinical exam'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Maintenance', 'Ongoing', ARRAY['Lifelong hip health', 'Low impact activity'], ARRAY['Maintain range'], ARRAY['Mature femoral head form'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 5. SCFE (Post-operative)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('SCFE (Post-operative)', 'Pediatrics') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Post-op Protection', 'Week 0–6', ARRAY['Protect stabilization', 'Early mobilization'], ARRAY['Restrict weight bearing as ordered'], ARRAY['Wound healing', 'Full active ROM'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'WB Progression', 'Week 6–12', ARRAY['PWB to FWB', 'Muscle activation'], ARRAY['No high impact'], ARRAY['Normal gait'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Advanced Strength', 'Month 3–6', ARRAY['Full power', 'Low impact activity'], ARRAY['Monitor hip joint symptoms'], ARRAY['Symmetric power'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Return to Play', 'Month 6+', ARRAY['Full youth sport return', 'Prevention'], ARRAY['Independent load monitoring'], ARRAY['Full season participation'])
RETURNING id INTO p4_id;

END $$;
