-- protocols_neuro_internal_complete_part1.sql
-- الحالات: العصبية والباطنية - Neuro & Internal Protocols (Part 1)
-- جميع المراحل (1-4) والتمارين متضمنة

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER; p2_id INTEGER; p3_id INTEGER; p4_id INTEGER;
BEGIN

-- تنظيف البيانات القديمة
DELETE FROM protocols WHERE name IN (
    'Stroke Recovery (Sub-acute)',
    'Parkinson''s Disease (Early Stage)',
    'Multiple Sclerosis (Relapsing-Remitting)',
    'Bell''s Palsy (Facial Nerve Palsy)',
    'Complex Regional Pain Syndrome (CRPS Type I)'
);

---------------------------------------------------------------------------------------
-- 1. Stroke Recovery (Sub-acute)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Stroke Recovery (Sub-acute)', 'Neurological') RETURNING id INTO proto_id;

-- Phase 1 (0-1 Month Post-stroke)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Acute Neuro-Facilitation', 'Month 0–1', ARRAY['Early mobility', 'Prevent contractures', 'Core stability'], ARRAY['Monitor BP/HR spikes', 'Aspiration precautions'], ARRAY['Stable sitting balance'])
RETURNING id INTO p1_id;

-- Phase 2 (1-3 Months)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Task-Specific Training', 'Month 1–3', ARRAY['Walking with assistance', 'Upper limb reaching'], ARRAY['Fatigue management'], ARRAY['Safe transfer ability'])
RETURNING id INTO p2_id;

-- Phase 3 (3-6 Months)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Functional Gait Optimization', 'Month 3–6', ARRAY['Improve gait speed/quality', 'ADL integration'], ARRAY['Fall risk management'], ARRAY['Berg Balance Score improvement'])
RETURNING id INTO p3_id;

-- Phase 4 (Month 6+)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Community Integration', 'Month 6+', ARRAY['Participation in social life', 'Maintenance'], ARRAY['Prevent secondary atrophy'], ARRAY['Independent community ambulation'])
RETURNING id INTO p4_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Weight Shifting (Sitting)', '3 × 1 min', 'Neuro-muscular facilitation'),
(p2_id, 'Sit-to-Stand Drills', '3 × 10 reps', 'Functional strength'),
(p3_id, 'Obstacle Course Walking', '15 min', 'Reactive balance'),
(p4_id, 'Group Community Exercise', '2 weekly', 'Maintenance and social');


---------------------------------------------------------------------------------------
-- 2. Parkinson's Disease (Early Stage)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Parkinson''s Disease (Early Stage)', 'Neurological') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Diagnostic Intake & Calibration', 'Week 0–4', ARRAY['Establish baseline fitness', 'Neuro-education'], ARRAY['Monitor orthostatic hypotension'], ARRAY['Stable movement habit'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Large Amplitude Training', 'Week 4–12', ARRAY['Combat bradykinesia', 'Improve amplitude'], ARRAY['Avoid risky balance moves solo'], ARRAY['Improved gait speed'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'High Intensity Dual-Task', 'Month 3+', ARRAY['Complex move training', 'Dual tasking'], ARRAY['Prioritize quality of move'], ARRAY['Stabilized motor score'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Maintenance', 'Ongoing', ARRAY['Neuroprotection', 'Active life'], ARRAY['Independent monitoring'], ARRAY['Stable motor performance'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 3. Multiple Sclerosis (Relapsing-Remitting)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Multiple Sclerosis (Relapsing-Remitting)', 'Neurological') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Energy Conservation & Basic Strength', 'Week 0–4', ARRAY['Establish low-exertion baseline'], ARRAY['Avoid overheating'], ARRAY['Stable fatigue score'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Aerobic Optimization', 'Week 4–12', ARRAY['Improve O2 uptake', 'Reduce fatigue'], ARRAY['Use cooling vests if needed'], ARRAY['Increased 6-min walk distance'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Functional Tasks', 'Week 12+', ARRAY['Independent stair climbing'], ARRAY['Prioritize quality over volume'], ARRAY['Improved independence scores'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Wellness Maintenance', 'Ongoing', ARRAY['Maintain current level', 'Manage flares'], ARRAY['Adjust during relapses'], ARRAY['Stable performance'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 4. Bell's Palsy (Facial Nerve Palsy)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Bell''s Palsy (Facial Nerve Palsy)', 'Neurological') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Initial Protection', 'Week 0–2', ARRAY['Eye protection (patching)', 'Reduce inflammation'], ARRAY['Do not use electrical stim'], ARRAY['Full eye closure with help'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Mimetic Initiation', 'Week 2–8', ARRAY['Initial muscle flares'], ARRAY['Avoid over-straining'], ARRAY['Visible muscle contraction'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Symmetry & Coordination', 'Week 8–16', ARRAY['Facial symmetry during speech'], ARRAY['Monitor synkinesis'], ARRAY['Full eye closure'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Maintenance', 'Month 4+', ARRAY['Lifetime tone management'], ARRAY['Gentle massage'], ARRAY['Stable recovery'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 5. Complex Regional Pain Syndrome (CRPS Type I)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Complex Regional Pain Syndrome (CRPS Type I)', 'Neurological') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Desensitization', 'Week 0–4', ARRAY['Reduce hyperalgesia', 'GMI (Mirror therapy)'], ARRAY['Avoid "no pain, no gain" approach'], ARRAY['Painless touch of different textures'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Graded Motor Imagery', 'Week 4–8', ARRAY['Correct cortical mapping'], ARRAY['Monitor for symptom spikes'], ARRAY['Normal lateralization speed'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'High Intensity Loading', 'Month 3+', ARRAY['Improve muscle bulk', 'ADL use'], ARRAY['Monitor for 24h flare'], ARRAY['Limb symmetry > 75%'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Social Integration', 'Month 6+', ARRAY['Full return to life', 'Pain management'], ARRAY['Address emotional resilience'], ARRAY['Full return to work'])
RETURNING id INTO p4_id;

END $$;
