-- protocols_spine_complete_part1.sql
-- الإصابات: العمود الفقري - Spine Protocols (Part 1)
-- جميع المراحل (1-4) والتمارين متضمنة

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER; p2_id INTEGER; p3_id INTEGER; p4_id INTEGER;
BEGIN

-- تنظيف البيانات القديمة
DELETE FROM protocols WHERE name IN (
    'Non-specific Low Back Pain (Acute)',
    'Lumbar Disc Herniation with Radiculopathy',
    'Cervicogenic Headache',
    'Whiplash Associated Disorder (WAD)',
    'Spondylolysis / Spondylolisthesis'
);

---------------------------------------------------------------------------------------
-- 1. Non-specific Low Back Pain (Acute)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Non-specific Low Back Pain (Acute)', 'Spine') RETURNING id INTO proto_id;

-- Phase 1: Symptom Reduction (0-2 Weeks)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Calming & Movement Re-education', 'Week 0–2', 
    ARRAY['Reduce pain/inflammation', 'Maintain mobility', 'Education on pacing'],
    ARRAY['Avoid prolonged bed rest', 'No heavy lifting', 'Gentle movement within tolerated range'],
    ARRAY['Pain VAS < 4/10', 'Improved tolerance to walking 10 min'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Knee to Chest (Bilateral)', '3 × 15 reps', 'Lower back unloading'),
(p1_id, 'Pelvic Tilts', '3 × 20 reps', 'Gentle spinal mobilization'),
(p1_id, 'Deep Diaphragmatic Breathing', '5 min daily', 'Parasympathetic activation for pain');

-- Phase 2: Core & Hip Stabilization (2-6 Weeks)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Stabilization & Global Power', 'Week 2–6', ARRAY['Restore spinal neutrality', 'Gluteal strength'], ARRAY['Avoid end-range flexion under load'], ARRAY['Full ADL independence'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Load Progression', 'Week 6–12', ARRAY['Higher load deadlifts', 'Return to sport drills'], ARRAY['Monitor for fatigue-based failure'], ARRAY['Neg Oswestry Score change'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Lifetime Maintenance', 'Month 3+', ARRAY['Lifetime spinal health', 'High threshold load'], ARRAY['Pace volume spikes'], ARRAY['Zero fear-avoidance'])
RETURNING id INTO p4_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p2_id, 'Bird-Dog', '3 × 12 reps', 'Anti-rotation stability'),
(p3_id, 'Kettlebell Deadlifts', '3 × 12 reps', 'Hip hinge with spinal neutral'),
(p4_id, 'Heavy Barbell Deadlifts (Maintenance)', '3 × 8 reps', 'High threshold robustness');


---------------------------------------------------------------------------------------
-- 2. Lumbar Disc Herniation with Radiculopathy
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Lumbar Disc Herniation with Radiculopathy', 'Spine') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Centralization & Protection', 'Week 0–4', ARRAY['Centralize leg pain', 'Reduce neural tension'], ARRAY['No flexion-rotation', 'Avoid long sitting'], ARRAY['Symptoms centralized from foot to calf/back'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Neural Mobility & Global Strengthening', 'Week 4–12', ARRAY['Restore SLR range', 'Improve core endurance'], ARRAY['Stop if peripheralization occurs'], ARRAY['SLR > 70° pain-free'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Advanced Strength & Return to Activity', 'Month 3–6', ARRAY['Restore push/pull capacity', 'Return to work/manual tasks'], ARRAY['Gradual load into flexion'], ARRAY['Neg neurological signs'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Performance Resilience', 'Month 6+', ARRAY['Lifetime management', 'Postural robustness'], ARRAY['Monitor for neuro signs during fatigue'], ARRAY['Oswestry score < 5%'])
RETURNING id INTO p4_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'McKenzie Extensions (Prone)', '10 reps, hourly', 'Drive centralization'),
(p2_id, 'Sciatic Sliders (Nerve Gliding)', '3 × 15 reps', 'Improve neural excursion'),
(p3_id, 'Farmers Walk', '3 × 30 meters', 'Global postural stabilization');


---------------------------------------------------------------------------------------
-- 3. Cervicogenic Headache
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Cervicogenic Headache', 'Spine') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Aura Phase & Protection', 'Week 0–2', ARRAY['Reduce headache frequency', 'Cervical mobility'], ARRAY['Avoid long desk work'], ARRAY[' Headache reduction > 30%'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Endurance & Coordination', 'Week 2–8', ARRAY['Deep neck flexor focus', 'Posture'], ARRAY['No high velocity rotation'], ARRAY['Full neck AROM'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Integrated Strength', 'Week 8–16', ARRAY['Trap/Levator strengthening', 'ADL endurance'], ARRAY['Monitor post-ex HA'], ARRAY['NDI < 15%'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Maintenance', 'Month 4+', ARRAY['Independent care', 'Ergonomics'], ARRAY['Frequent micro-breaks'], ARRAY['Zero headaches'])
RETURNING id INTO p4_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Suboccipital Release', '2 min', 'Reduce tension at C0-C1'),
(p2_id, 'Deep Neck Flexor Lifts', '3 × 10 reps', 'Coordination'),
(p3_id, 'Scapular Retractions (Band)', '3 × 15 reps', 'Proximal support');


---------------------------------------------------------------------------------------
-- 4. Whiplash Associated Disorder (WAD)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Whiplash Associated Disorder (WAD)', 'Spine') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Calming & Initial Mobilization', 'Week 0–4', ARRAY['Settle peak pain', 'Early range'], ARRAY['No neck collars (unless fracture)', 'Gentle pacing'], ARRAY['Reduced fear of movement'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Proprioception & Initial Strength', 'Week 4–12', ARRAY['Restore neck sensing', 'Cervical stability'], ARRAY['Stop if HA worsens'], ARRAY['Full neck range'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Dynamic Stability', 'Month 3–6', ARRAY['Resisted neck drills', 'Integrated limb power'], ARRAY['Avoid jarring moves'], ARRAY['Return to work'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Functional Resilience', 'Month 6+', ARRAY['Independent management', 'Full social return'], ARRAY['Maintain ergonomics'], ARRAY['Zero restrictions'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 5. Spondylolysis / Spondylolisthesis
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Spondylolysis / Spondylolisthesis', 'Spine') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Unloading & Protection', 'Week 0–6', ARRAY['Fracture healing (if acute)', 'Neutral posture'], ARRAY['Avoid high velocity extension', 'No heavy impact'], ARRAY['Bone healing confirmed or pain-free extension'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Anti-extension Stability', 'Week 6–12', ARRAY['Strong core endurance', 'Maintain neural mobility'], ARRAY['Avoid bridging or deep backbends'], ARRAY['Stable neutral spine in ADLs'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Loading within Neutral', 'Month 3–6', ARRAY['Return to sports', 'Progressive leg/core loading'], ARRAY['Clearance for impact'], ARRAY['Zero pain with running/jumping'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Performance Maintenance', 'Month 6+', ARRAY['Lifetime management', 'Integrated athletic tasks'], ARRAY['Independent load monitoring'], ARRAY['Full seasonal return'])
RETURNING id INTO p4_id;

END $$;
