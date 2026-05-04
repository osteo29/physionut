-- protocols_spine_trunk_complete_part2.sql
-- الحالات: العمود الفقري والجذع - Spine & Trunk Protocols (Part 2)
-- جميع المراحل (1-4) والتمارين متضمنة

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER; p2_id INTEGER; p3_id INTEGER; p4_id INTEGER;
BEGIN

-- تنظيف البيانات القديمة
DELETE FROM protocols WHERE name IN (
    'Scoliosis (Adolescent Idiopathic - Conservative)',
    'Rib Fracture (Conservative)',
    'Ankylosing Spondylitis (Early Stage)',
    'Thoracic Outlet Syndrome (TOS)',
    'SI Joint Dysfunction'
);

---------------------------------------------------------------------------------------
-- 1. Scoliosis (Adolescent Idiopathic - Conservative)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Scoliosis (Adolescent Idiopathic - Conservative)', 'Spine') RETURNING id INTO proto_id;

-- Phase 1 (0-3 Months)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Self-Correction & Education', 'Month 0–3', 
    ARRAY['Establish active self-correction habit', 'Improve respiratory capacity', 'Postural awareness'],
    ARRAY['Avoid excessive end-range axial loading initially', 'Consistent brace wear (if ordered)'],
    ARRAY['Independent self-correction achieved', 'Stable Cobb angle'])
RETURNING id INTO p1_id;

-- Phase 2 (3-9 Months)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Stabilization & Global Power', 'Month 3–9', ARRAY['Build core endurance in corrected posture', 'Lower limb strength'], ARRAY['Monitor for compensation fatigue'], ARRAY['Improved trunk rotation score'])
RETURNING id INTO p2_id;

-- Phase 3 (9-18 Months)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'High Intensity Agility', 'Month 9+', ARRAY['Return to sports in corrected form', 'Integrated power'], ARRAY['Maintain corrected alignment during impact'], ARRAY['Zero pain with seasonal sport'])
RETURNING id INTO p3_id;

-- Phase 4 (Ongoing)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Growth Maintenance', 'Until Maturity', ARRAY['Maintain gains through growth spurts', 'Full life participation'], ARRAY['Bi-annual checkups'], ARRAY['Skeletal maturity reached stably'])
RETURNING id INTO p4_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Schroth Breathing (Rotational)', '10 min daily', 'De-rotate ribs through breath'),
(p2_id, 'Correction Plank', '3 × 45 sec', 'Maintain alignment under core load'),
(p3_id, 'Deadlifts (Corrected Position)', '3 × 12 reps', 'Integrated structural load'),
(p4_id, 'Maintenance Yoga / Pilates', '2 sessions weekly', 'Lifetime mobility maintenance');


---------------------------------------------------------------------------------------
-- 2. Rib Fracture (Conservative)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Rib Fracture (Conservative)', 'Trunk') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Pain & Pulmonary Protection', 'Week 0–3', ARRAY['Prevent pneumonia', 'Reduce focal pain', 'Settle fracture'], ARRAY['Avoid heavy coughing (unsupported)', 'No heavy lifting'], ARRAY['Painless deep breath'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Trunk Mobilization', 'Week 3–6', ARRAY['Restore spinal rotation', 'Active breathing'], ARRAY['Avoid high impact'], ARRAY['Full spinal ROM'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Resisted Loading', 'Week 6–12', ARRAY['Restore push/pull power', 'Core endurance'], ARRAY['Monitor focal bony pain'], ARRAY['Full union confirmed'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Full Return', 'Month 3+', ARRAY['Contact sports return', 'Prevention'], ARRAY['Independent load monitoring'], ARRAY['Zero recurring symptoms'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 3. Ankylosing Spondylitis (Early Stage)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Ankylosing Spondylitis (Early Stage)', 'Spine') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Anti-inflammatory Mobility', 'Week 0–4', ARRAY['Settle stiffness', 'Morning mobility routine establishment'], ARRAY['Avoid high impact during flares'], ARRAY['BASDAI score reduction'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Postural Strengthening', 'Week 4–12', ARRAY['Build extensor habit', 'Respiratory expansion'], ARRAY['Monitor for uveitis / peripheral flare'], ARRAY['Full expansion goals met'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Integrated Global Power', 'Month 3–6', ARRAY['Higher load deadlifts', 'Social tasks'], ARRAY['Pace volume spikes'], ARRAY['Stable QoL'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Lifelong Habituation', 'Lifelong', ARRAY['Prevention of fusion habit', 'Full life participation'], ARRAY['Independent monitoring'], ARRAY['Stable motor function'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 4. Thoracic Outlet Syndrome (TOS)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Thoracic Outlet Syndrome (TOS)', 'Spine/Neck') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Neural Unloading', 'Week 0–4', ARRAY['Reduce neurovascular compression', 'First rib mobility'], ARRAY['Avoid heavy shoulder bags', 'Limit overhead repetitive work'], ARRAY['Reduced upper limb numbness'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Scapular Flow Re-education', 'Week 4–12', ARRAY['Improve scapular tilt', 'Thoracic mobility'], ARRAY['Monitor for venous congestion signs'], ARRAY['Full nerve gliding tolerance'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Integrated Strength', 'Month 3–6', ARRAY['Postural endurance', 'Upper limb power'], ARRAY['Monitor for neuro signs during fatigue'], ARRAY['Symmetric power'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Ergonomic Resilience', 'Ongoing', ARRAY['Prevention', 'Technique optimization'], ARRAY['Independent breaks habit'], ARRAY['Full functional return'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 5. SI Joint Dysfunction
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('SI Joint Dysfunction', 'Hip/Pelvis') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Calming & Stability Intro', 'Week 0–2', ARRAY['Reduce direct SI pain', 'Tear/Shear reduction'], ARRAY['Avoid repetitive asymmetric lunges', 'No heavy twisting'], ARRAY['Neg Fortin finger test pain'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Pelvic Girdle Load', 'Week 2–8', ARRAY['Strengthen glutes/abs', 'Symmetric loading'], ARRAY['Stop if sharp focal pain returns'], ARRAY['Stable neutral pelvis in gait'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Agility & Impact', 'Week 8–16', ARRAY['Return to running', 'Higher power'], ARRAY['Monitor post-activity ache'], ARRAY['Zero pain with impact'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Maintenance', 'Month 4+', ARRAY['Prevention', 'Full seasonal play'], ARRAY['Independent load monitoring'], ARRAY['Zero recurring symptoms'])
RETURNING id INTO p4_id;

END $$;
