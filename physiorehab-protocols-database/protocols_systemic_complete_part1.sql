-- protocols_systemic_complete_part1.sql
-- الحالات: جهازية ومتعددة المفاصل - Systemic Protocols (Part 1)
-- جميع المراحل (1-4) والتمارين متضمنة

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER; p2_id INTEGER; p3_id INTEGER; p4_id INTEGER;
BEGIN

-- تنظيف البيانات القديمة
DELETE FROM protocols WHERE name IN (
    'Fibromyalgia',
    'Osteoarthritis Management',
    'Rheumatoid Arthritis (Stable Phase)',
    'Hemophilia (Joint Bleed Prevention)',
    'Systemic Lupus Erythematosus (SLE)'
);

---------------------------------------------------------------------------------------
-- 1. Fibromyalgia
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Fibromyalgia', 'Systemic') RETURNING id INTO proto_id;

-- Phase 1 (0-4 Weeks)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Education & Pacing Intro', 'Week 0–4', ARRAY['Settle peak flare', 'Establish "boom-bust" cycle awareness', 'Gentle movement'], ARRAY['Avoid high-intensity effort initially', 'Prioritize sleep hygiene'], ARRAY['Stable pain scores', 'Improved sleep quality'])
RETURNING id INTO p1_id;

-- Phase 2 (4-12 Weeks)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Graded Aerobic Conditioning', 'Week 4–12', ARRAY['Increase O2 uptake', 'Gentle global loading'], ARRAY['Stop before total exhaustion'], ARRAY['Tolerate 20 min low-impact cardio'])
RETURNING id INTO p2_id;

-- Phase 3 (3-6 Months)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Resilience & Strength', 'Month 3–6', ARRAY['Improve muscle core endurance', 'Social re-integration'], ARRAY['Monitor post-ex fatigue'], ARRAY['Improved Fibromyalgia Impact Score'])
RETURNING id INTO p3_id;

-- Phase 4 (Ongoing)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Lifelong Wellness', 'Ongoing', ARRAY['Independent pacing', 'Full participation in life'], ARRAY['Manage flares through active rest'], ARRAY['Stable QoL scores'])
RETURNING id INTO p4_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Pool Walking (Hydrotherapy)', '15 min', 'Unloading of joints'),
(p2_id, 'Gentle Tai-Chi', '20 min', 'Mind-body coordination'),
(p3_id, 'Bodyweight Circuit (Large muscle groups)', '3 × 10 reps', 'Global metabolic enrichment'),
(p4_id, 'Daily Movement Ritual', '10 min morning', 'Maintenance of mobility');


---------------------------------------------------------------------------------------
-- 2. Osteoarthritis Management
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Osteoarthritis Management', 'Systemic') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Joint Unloading & Calming', 'Week 0–4', ARRAY['Reduce peak mechanical pain', 'Biomechanical fixes'], ARRAY['Avoid repetitive high impact'], ARRAY['Pain VAS < 4/10'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Neuromuscular Stabilization', 'Week 4–12', ARRAY['Build muscle "shock absorbers"', 'Gait optimization'], ARRAY['Monitor for joint effusion post-ex'], ARRAY['Full independent walking'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Functional Loading', 'Month 3–6', ARRAY['Heavy-slow resistance (HSR)', 'Life integration'], ARRAY['Monitor for "locking" signs'], ARRAY['LSI > 80% strength'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Lifetime Protection', 'Ongoing', ARRAY['Avoid surgery as long as possible', 'Prevention'], ARRAY['Maintain weight management'], ARRAY['Stable joint function'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 3. Rheumatoid Arthritis (Stable Phase)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Rheumatoid Arthritis (Stable Phase)', 'Systemic') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Joint Protection & ROM', 'Week 0–4', ARRAY['Maintain active range', 'Protect in-flare joints'], ARRAY['No heavy loading during active flare'], ARRAY['Zero new morning stiffness'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Conditioning', 'Week 4–12', ARRAY['Global aerobic fitness', 'Maintenance'], ARRAY['Stop if warmth/redness occurs'], ARRAY['Stable inflammatory markers'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Strength Integration', 'Month 3–6', ARRAY['Restore muscle bulk', 'ADL power'], ARRAY['Avoid excessive axial loading'], ARRAY['Improved HAQ-DI scores'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Maintenance', 'Ongoing', ARRAY['Wellness', 'Participation'], ARRAY['Adjust for flares'], ARRAY['Stable motor function'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 4. Hemophilia (Joint Bleed Prevention)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Hemophilia (Joint Bleed Prevention)', 'Systemic') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Bleed Protection & ROM', 'Acute', ARRAY['Settle hematoma', 'Gentle mobility'], ARRAY['NWB as per hematologist', 'No aggressive stretching'], ARRAY['Zero new swelling'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Stability Initiation', 'Sub-acute', ARRAY['Improve joint sensing', 'Activation'], ARRAY['Monitor for deep heat (sign of bleed)'], ARRAY['Stable joint range'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Resistance Training', 'Long-term', ARRAY['Build muscle armor to protect joints'], ARRAY['Avoid high impact contact sports'], ARRAY['Symmetric power'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Activity Maintenance', 'Lifelong', ARRAY['Safe lifestyle', 'Conditioning'], ARRAY['Independent bleed monitoring'], ARRAY['Zero recurring joint disablement'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 5. Systemic Lupus Erythematosus (SLE)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Systemic Lupus Erythematosus (SLE)', 'Systemic') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Fatigue Management Intro', 'Week 0–4', ARRAY['Determine peak energy times', 'Gentle movement'], ARRAY['Avoid sun exposure during ex'], ARRAY['Reduced fatigue severity score'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Graduated Loading', 'Week 4–12', ARRAY['Aerobic endurance', 'Joint mobility'], ARRAY['Stop if skin lesions/heat spikes occur'], ARRAY['Improved cardio capacity'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Active Wellness', 'Month 3–6', ARRAY['Full core endurance', 'Social tasks'], ARRAY['Maintain hydration'], ARRAY['Stabilized QoL'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Lifelong Habitus', 'Ongoing', ARRAY['Maintenance', 'Prevention of secondary issues'], ARRAY['Independent flare monitoring'], ARRAY['Full life participation'])
RETURNING id INTO p4_id;

END $$;
