-- protocols_shoulder_multi_complete_part3.sql
-- الحالات: الكتف والمتعددة - Shoulder & Multi Protocols (Part 3)
-- جميع المراحل (1-4) والتمارين متضمنة

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER; p2_id INTEGER; p3_id INTEGER; p4_id INTEGER;
BEGIN

-- تنظيف البيانات القديمة
DELETE FROM protocols WHERE name IN (
    'Posterior Shoulder Instability',
    'SLAP Lesion (Conservative)',
    'SLAP Lesion Repair (Surgical)',
    'Chronic Pain Syndrome (Generic)',
    'Post-Viral Fatigue Syndrome (Pacing)'
);

---------------------------------------------------------------------------------------
-- 1. Posterior Shoulder Instability
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Posterior Shoulder Instability', 'Shoulder') RETURNING id INTO proto_id;

-- Phase 1 (0-6 Weeks)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Protective Stability', 'Week 0–6', 
    ARRAY['Protect posterior capsule', 'Settle joint pain', 'Initial cuff activation'],
    ARRAY['Avoid excessive horizontal adduction + internal rotation', 'No heavy push moves'],
    ARRAY['Minimal pain with daily tasks', 'Stable joint in neutral'])
RETURNING id INTO p1_id;

-- Phase 2 (6-12 Weeks)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Mobilization & Early Strength', 'Week 6–12', ARRAY['Restore near full ROM', 'Steady cuff load'], ARRAY['Pace push-volume'], ARRAY['Full active ROM in neutral'])
RETURNING id INTO p2_id;

-- Phase 3 (3-6 Months)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Advanced Integrated Load', 'Month 3–6', ARRAY['Restore bench/push power', 'Proprioception'], ARRAY['Monitor post-activity instability sense'], ARRAY['Symmetric power'])
RETURNING id INTO p3_id;

-- Phase 4 (Month 6+)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Full Contact Return', 'Month 6+', ARRAY['Prevention', 'Full season sport'], ARRAY['Maintain cuff habit'], ARRAY['Full performance ready'])
RETURNING id INTO p4_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'ER/IR Isometrics', '3 × 45 sec', 'Early joint control'),
(p2_id, 'Serratus Punch', '3 × 15 reps', 'Scapular support'),
(p3_id, 'Close-grip Bench Press', '3 × 12 reps', 'Controlled posterior loading'),
(p4_id, 'Medicine Ball Wall Chest Pass', '3 × 10 reps', 'Power and reactive speed');


---------------------------------------------------------------------------------------
-- 2. SLAP Lesion (Conservative)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('SLAP Lesion (Conservative)', 'Shoulder') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Unloading & Calming', 'Week 0–4', ARRAY['Settle joint irritation', 'Address post-capsule tightness'], ARRAY['Avoid biceps heavy loading', 'No overhead throwing initially'], ARRAY['Neg O''Briens test early range'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Mobilization & Strength', 'Week 4–12', ARRAY['Restore range', 'Cuff stabilization'], ARRAY['No rapid biceps curls'], ARRAY['Full range elevation'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Functional Loading', 'Month 3–6', ARRAY['Return to overhead work', 'High power'], ARRAY['Monitor for joint clicking'], ARRAY['Symmetric power'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Participation', 'Month 6+', ARRAY['Prevention', 'Full seasonal participation'], ARRAY['Maintain overhead endurance'], ARRAY['Zero recurring symptoms'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 3. SLAP Lesion Repair (Surgical)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('SLAP Lesion Repair (Surgical)', 'Shoulder') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Protection Phase', 'Week 0–6', ARRAY['Protect labral repair', 'Gentle mobility'], ARRAY['Strict NWB', 'No active biceps contraction', 'Sling use'], ARRAY['Healed surgical site', 'ROM goals met'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Sub-maximal Strength/ROM', 'Week 6–12', ARRAY['Restore ROM', 'Early activations'], ARRAY['No heavy biceps load yet'], ARRAY['Full active ROM achieved'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Advanced Strengthening', 'Month 3–6', ARRAY['Restore bulk', 'Initial impact'], ARRAY['Monitor joint tolerance'], ARRAY['LSI > 80%'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'High Performance', 'Month 6–9', ARRAY['Full sport agility', 'Contact sports'], ARRAY['Maintain core stability'], ARRAY['LSI > 95%'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 4. Chronic Pain Syndrome (Generic)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Chronic Pain Syndrome (Generic)', 'Systemic') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Central Desensitization', 'Week 0–4', ARRAY['Address fear of movement', 'Gentle movement rituals'], ARRAY['Avoid "stop at any pain"', 'No heavy initial loading'], ARRAY['Reduced fear avoidance (TSK score)'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Graded Exposure', 'Week 4–12', ARRAY['Exposing the brain to feared moves safely'], ARRAY['Stop if neuro signs spike'], ARRAY['Improved tolerance to daily tasks'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Power & Strength', 'Month 3–6', ARRAY['Build muscle resilience', 'Social/Sport tasks'], ARRAY['Pace volume spikes'], ARRAY['Improved QoL and function'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Lifelong Habituation', 'Ongoing', ARRAY['Independent care habit', 'Prevention of relapse'], ARRAY['Manage lifestyle factors (Sleep/Stress)'], ARRAY['Zero disability'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 5. Post-Viral Fatigue Syndrome (Pacing)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Post-Viral Fatigue Syndrome (Pacing)', 'Systemic') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Baseline Establishment', 'Week 0–4', ARRAY['Find the "energy envelope"', 'Daily pacing rituals'], ARRAY['Avoid Post-Exertional Malaise (PEM)', 'Listen to active rest cues'], ARRAY['Zero PEM crashes for 14 days'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Minimal Graded Activity', 'Week 4–12', ARRAY['Gently expand the envelope', 'Light movement'], ARRAY['Stop if fatigue spikes'], ARRAY['Stable energy through the week'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Functional Expansion', 'Month 3–6', ARRAY['Return to work/social tasks in blocks'], ARRAY['Pace social volume'], ARRAY['Improved function score'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Wellness Maintenance', 'Ongoing', ARRAY['Prevention of relapse', 'Full social return'], ARRAY['Manage lifestyle factors'], ARRAY['Independent pacing mastery'])
RETURNING id INTO p4_id;

END $$;
