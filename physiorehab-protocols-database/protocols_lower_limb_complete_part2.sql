-- protocols_lower_limb_complete_part2.sql
-- الحالات: الطرف السفلي - Lower Limb Protocols (Part 2)
-- جميع المراحل (1-4) والتمارين متضمنة

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER; p2_id INTEGER; p3_id INTEGER; p4_id INTEGER;
BEGIN

-- تنظيف البيانات القديمة
DELETE FROM protocols WHERE name IN (
    'Greater Trochanteric Pain Syndrome (GTPS)',
    'Patellar Tendinopathy (Jumper''s Knee)',
    'Knee Osteoarthritis',
    'Popliteal Cyst (Baker''s Cyst)',
    'Hip Labral Tear (Surgical)'
);

---------------------------------------------------------------------------------------
-- 1. Greater Trochanteric Pain Syndrome (GTPS)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Greater Trochanteric Pain Syndrome (GTPS)', 'Hip/Pelvis') RETURNING id INTO proto_id;

-- Phase 1 (0-4 Weeks)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Calming & Tension Reducing', 'Week 0–4', ARRAY['Reduce lateral hip compression', 'Improve gluteal habit'], ARRAY['Avoid crossing legs', 'No side-lying on affected side without pillow'], ARRAY['Pain VAS < 3/10', 'Painless single leg stance'])
RETURNING id INTO p1_id;

-- Phase 2 (4-12 Weeks)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Isotonic Loading', 'Week 4–12', ARRAY['Build gluteus medius bulk', 'Pelvic stability'], ARRAY['Monitor for night pain'], ARRAY['Full strength symmetry'])
RETURNING id INTO p2_id;

-- Phase 3 (3-6 Months)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'High Load Resistance', 'Month 3–6', ARRAY['Restore full power', 'Return to impact'], ARRAY['Monitor post-ex ache'], ARRAY['VISA-G Score > 80'])
RETURNING id INTO p3_id;

-- Phase 4 (Ongoing)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Maintenance', 'Month 6+', ARRAY['Prevention', 'Independent care'], ARRAY['Maintain gluteal habit weekly'], ARRAY['Zero recurring symptoms'])
RETURNING id INTO p4_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Clamshells (Isometric)', '3 × 45 sec', 'Early gluteal activation'),
(p2_id, 'Lateral Band Walks', '3 × 15 steps', 'Dynamic abductor load'),
(p3_id, 'Step-downs', '3 × 12 reps', 'Functional stability'),
(p4_id, 'Single-leg Hip Hikes', '3 × 15 reps', 'Maintenance of pelvic control');


---------------------------------------------------------------------------------------
-- 2. Patellar Tendinopathy (Jumper's Knee)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Patellar Tendinopathy (Jumper''s Knee)', 'Knee') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Isometric & Pain Modulation', 'Week 0–4', ARRAY['Reduce tendon pain', 'Maintain quad tone'], ARRAY['Avoid high velocity jumping'], ARRAY['Painless 45 sec isometric hold'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Isotonic Loading (HSR)', 'Week 4–12', ARRAY['Build tendon bulk', 'Improve quad capacity'], ARRAY['Monitor for post-ex pain spikes'], ARRAY['Symmetric calf/quad bulk'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Power & Plyometrics', 'Month 3–6', ARRAY['Return to hopping/jumping', 'Speed'], ARRAY['Monitor for 24h ache'], ARRAY['VISA-P Score > 80'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Performance Maintenance', 'Month 6+', ARRAY['Lifetime management', 'Sport return'], ARRAY['Maintain HSR twice weekly'], ARRAY['Full season participation'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 3. Knee Osteoarthritis
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Knee Osteoarthritis', 'Knee') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Joint Unloading', 'Week 0-4', ARRAY['Settle joint/effusion', 'Mechanical fixes'], ARRAY['Avoid deep squats'], ARRAY['Reduced swelling'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Muscle Armor Build', 'Week 4-12', ARRAY['Quad strength (shock absorber)'], ARRAY['Monitor for warmth'], ARRAY['Independent walking'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Life Integration', 'Month 3-6', ARRAY['Return to hiking/golf', 'ADL power'], ARRAY['Pace volume'], ARRAY['KOOS Score improvement'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Maintenance', 'Ongoing', ARRAY['Prevention of progression'], ARRAY['Maintain hydration/weight'], ARRAY['Stable motor function'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 4. Baker's Cyst (Popliteal Cyst)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Popliteal Cyst (Baker''s Cyst)', 'Knee') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Resolution of Primary Pathology', 'Week 0-4', ARRAY['Identify primary cause (meniscus/OA)', 'Edema control'], ARRAY['Avoid excessive knee extension if tight'], ARRAY['Reduced posterior tightness'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Mobilization', 'Week 4-8', ARRAY['Restore range', 'Gentle activations'], ARRAY['Stop if fluid spikes'], ARRAY['Full ROM'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Strength Re-integration', 'Month 2-4', ARRAY['Stability', 'Power'], ARRAY['Monitor joint tolerance'], ARRAY['Symmetric power'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Prevention', 'Ongoing', ARRAY['Independent monitoring'], ARRAY['Maintain primary pathology control'], ARRAY['Zero recurring fluid'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 5. Hip Labral Tear (Surgical)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Hip Labral Tear (Surgical)', 'Hip/Pelvis') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Maximum Protection', 'Week 0–6', ARRAY['Protect repair', 'Gentle mobility'], ARRAY['Strict WB limit (crutches)', 'No flexion > 90°', 'No ER > 20°'], ARRAY['Clinical range met', 'Stable incision'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Weight Bearing Progress', 'Week 6–12', ARRAY['Wean off crutches', 'Neutral strength'], ARRAY['No deep lunges'], ARRAY['Normal gait'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Advanced Strengthening', 'Month 3–6', ARRAY['Restore bulk', 'Initial impact'], ARRAY['Monitor for joint catching'], ARRAY['LSI > 80%'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Return to Sport', 'Month 6+', ARRAY['Full agility', 'Agility drills'], ARRAY['Maintain core stability'], ARRAY['LSI > 90%'])
RETURNING id INTO p4_id;

END $$;
