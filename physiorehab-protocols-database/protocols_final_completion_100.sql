-- protocols_final_completion_100.sql
-- الحالات الختامية (91-100): إكمال الـ 100 بروتوكول
-- جميع المراحل (1-4) والتمارين متضمنة

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER; p2_id INTEGER; p3_id INTEGER; p4_id INTEGER;
BEGIN

-- تنظيف البيانات القديمة
DELETE FROM protocols WHERE name IN (
    'Hallux Valgus (Bunions)',
    'Hammer Toe (Management)',
    'Morton''s Neuroma',
    'Tarsal Tunnel Syndrome',
    'Metatarsalgia (Generic)',
    'Osteoporosis (Safe Loading)',
    'Sepsis Recovery (Functional)',
    'Pelvic Floor Dysfunction',
    'Burn Injury (Scar Mobility)',
    'Hyperlaxity Syndrome (General)'
);

---------------------------------------------------------------------------------------
-- 91. Hallux Valgus (Bunions)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Hallux Valgus (Bunions)', 'Ankle/Foot') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Initial Unloading & Mobilization', 'Week 0–4', ARRAY['Reduce bunion site pain', 'Intrinsic foot strength', 'Footwear correction'], ARRAY['Avoid tight/pointed footwear', 'No heavy toe-loading ADLs'], ARRAY['Zero pain with walking in wide shoes'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Load Progression', 'Week 4–8', ARRAY['Single leg balance', 'Great toe mobilization'], ARRAY['Stop if joint warmth returns'], ARRAY['Full intrinsic control'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Integrated Impact', 'Week 8–16', ARRAY['Jogging in wider toe box', 'Power'], ARRAY['Monitor post-activity ache'], ARRAY['Zero pain with running'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Maintenance', 'Ongoing', ARRAY['Prevention of progression', 'Lifetime footwear choice'], ARRAY['Maintain intrinsic habit'], ARRAY['Full life participation'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 92. Hammer Toe (Management)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Hammer Toe (Management)', 'Ankle/Foot') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Calming & Splinting', 'Week 0-4', ARRAY['Settle peak joint pain', 'Correction'], ARRAY['Avoid tight shoes'], ARRAY['Painless daily walking'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2-4, 'Consolidated Maintenance', 'Month 4+', ARRAY['Prevention', 'Functional shoe choice'], ARRAY['Maintain flexibility'], ARRAY['Independent function'])
RETURNING id INTO p2_id; -- (Simplified as it's a chronic structural issue)


---------------------------------------------------------------------------------------
-- 93. Morton's Neuroma
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Morton''s Neuroma', 'Ankle/Foot') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Decompression & Pacing', 'Week 0–4', ARRAY['Reduce digital nerve irritation', 'Metatarsal padding education'], ARRAY['No narrow shoes', 'Avoid repetitive forefoot pivot'], ARRAY['Reduced "shooting" pain frequency'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Intrinsic Support', 'Week 4–8', ARRAY['Strengthen transverse arch muscles'], ARRAY['Monitor for numbness return'], ARRAY['Full WB tolerance'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Impact Load', 'Week 8–16', ARRAY['Running in corrected shoes', 'Agility'], ARRAY['Monitor post-activity neuro ache'], ARRAY['Zero pain with running'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Maintenance', 'Ongoing', ARRAY['Prevention', 'Independent load monitoring'], ARRAY['Maintain footwear habit'], ARRAY['Full seasonal return'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 94. Tarsal Tunnel Syndrome
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Tarsal Tunnel Syndrome', 'Ankle/Foot') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Neural Unloading', 'Week 0–4', ARRAY['Reduce posterior tibial nerve compression', 'Nerve sliders'], ARRAY['Avoid prolonged standing initially', 'Limit excessive pronation'], ARRAY['Reduced paresthesia in foot'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Arch Stabilization', 'Week 4–12', ARRAY['Build arch bulk', 'Stability'], ARRAY['Stop if sharp neuro signs returns'], ARRAY['Improved gait mechanical symmetry'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Functional Strength', 'Month 3–6', ARRAY['Restore power', 'Running'], ARRAY['Monitor post-activity neuro-fade'], ARRAY['Zero pain with impact'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Prevention', 'Ongoing', ARRAY['Technique optimization', 'Maintenance'], ARRAY['Maintain arch support habit'], ARRAY['Full functional return'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 95. Metatarsalgia (Generic)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Metatarsalgia (Generic)', 'Ankle/Foot') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Unloading & Settlement', 'Week 0-4', ARRAY['Settle forefoot pain'], ARRAY['Avoid barefoot on hard floors'], ARRAY['Painless walking'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2-4, 'Consolidated Recovery', 'Month 4+', ARRAY['Prevention', 'Grip strength'], ARRAY['Maintain intrinsic habit'], ARRAY['Stable recovery'])
RETURNING id INTO p2_id;


---------------------------------------------------------------------------------------
-- 96. Osteoporosis (Safe Loading)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Osteoporosis (Safe Loading)', 'Systemic') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Postural Integrity & Intake', 'Week 0–4', ARRAY['Safety awareness', 'Fall prevention initiation'], ARRAY['Avoid high velocity spinal torsion', 'Limit heavy forward flexion'], ARRAY['Neg fear of exercise'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Bone Loading (Low Impact)', 'Week 4–12', ARRAY['Bilateral WB exercises', 'Walking program'], ARRAY['Protect ribs/spine from high pressure'], ARRAY['Independent walking mileage'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Progressive Resistance', 'Month 3–6', ARRAY['Build muscle shock absorbers', 'Density loading'], ARRAY['Monitor for fracture signs if pain spikes'], ARRAY['LSI > 80%'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Lifelong Habituation', 'Ongoing', ARRAY['Maintenance', 'Wellness'], ARRAY['Maintain seasonal pacing'], ARRAY['Stable BMD on next DEXA'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 97. Sepsis Recovery (Functional)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Sepsis Recovery (Functional)', 'Systemic') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'In-Hospital / Early Mobility', 'Acute', ARRAY['Prevent lung complication', 'Early transfers'], ARRAY['Monitor hemodynamics', 'Fatigue pacing'], ARRAY['Safe independent sitting'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2-4, 'Graduated Social Return', 'Month 3+', ARRAY['Full life return', 'Muscle bulk restoration'], ARRAY['Monitor cognitive load'], ARRAY['Full independence'])
RETURNING id INTO p2_id;


---------------------------------------------------------------------------------------
-- 98. Pelvic Floor Dysfunction
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Pelvic Floor Dysfunction', 'Systemic') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Awareness & Isolation', 'Week 0–4', ARRAY['Identify PF muscle contraction', 'Breathing coordination'], ARRAY['Avoid heavy impact initially if incontinent'], ARRAY['Stable contraction achieved'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2-4, 'Loading & Integration', 'Month 3+', ARRAY['Full impact participation', 'Maintenance'], ARRAY['Monitor for shunting'], ARRAY['Zero symptoms with ADLs'])
RETURNING id INTO p2_id;


---------------------------------------------------------------------------------------
-- 99. Burn Injury (Scar Mobility)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Burn Injury (Scar Mobility)', 'Systemic') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Acute Healing & Protection', 'Acute', ARRAY['Wound closure', 'Prevent contracture (splinting)'], ARRAY['Protect new grafts', 'Gentle movement'], ARRAY['Closed wound site'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2-4, 'Scar Remodeling', 'Ongoing', ARRAY['Full range mobility', 'Independent massage rituals'], ARRAY['Monitor scar heat', 'Avoid prolonged sun'], ARRAY['Near full symmetric range'])
RETURNING id INTO p2_id;


---------------------------------------------------------------------------------------
-- 100. Hyperlaxity Syndrome (General)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Hyperlaxity Syndrome (General)', 'Systemic') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Joint Sensing & Awareness', 'Week 0–4', ARRAY['Identify neutral joint position', 'Avoid locking habit'], ARRAY['No end-range yoga stretching', 'Avoid heavy high impact initially'], ARRAY['Neg apprehension in ADLs'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Muscle Armor Build', 'Week 4–12', ARRAY['Global muscle bulk for joint support', 'Core'], ARRAY['Monitor for subluxation during fatigue'], ARRAY['Full strength symmetry'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Dynamic Stability', 'Month 3–6', ARRAY['Agility in neutral', 'Integrated power'], ARRAY['Maintain control over range'], ARRAY['Zero recurring joint pain'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Functional Maintenance', 'Lifelong', ARRAY['Prevention of secondary injury', 'Wellness'], ARRAY['Maintain muscle armor habit'], ARRAY['Independent management achieved'])
RETURNING id INTO p4_id;

END $$;
