-- protocols_shoulder_complete_part2.sql
-- الحالات: الطرف العلوي والكتف - Shoulder Protocols (Part 2)
-- جميع المراحل (1-4) والتمارين متضمنة

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER; p2_id INTEGER; p3_id INTEGER; p4_id INTEGER;
BEGIN

-- تنظيف البيانات القديمة
DELETE FROM protocols WHERE name IN (
    'Adhesive Capsulitis (Frozen Shoulder)',
    'Biceps Tendinopathy (Long Head)',
    'Pectoralis Major Tear',
    'Sternoclavicular Joint Sprain',
    'Scapular Dyskinesis'
);

---------------------------------------------------------------------------------------
-- 1. Adhesive Capsulitis (Frozen Shoulder)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Adhesive Capsulitis (Frozen Shoulder)', 'Shoulder') RETURNING id INTO proto_id;

-- Phase 1: Freezing (0-4 Months)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Pain Management & Calming', 'Month 0–4', 
    ARRAY['Settle severe inflammatory pain', 'Maintain functional range', 'Patient education (long course)'],
    ARRAY['Avoid aggressive stretching (may flare)', 'Do not force through "hard" block'],
    ARRAY['Reduced night pain', 'VAS Pain < 4/10'])
RETURNING id INTO p1_id;

-- Phase 2: Frozen (4-12 Months)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Gradual Mobilization', 'Month 4–12', ARRAY['Restore capsular extensibility', 'Improve multi-planar range'], ARRAY['Stop if pain persists > 24h'], ARRAY['Improved ROM > 50%'])
RETURNING id INTO p2_id;

-- Phase 3: Thawing (12-18 Months)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Resistance & Integration', 'Month 12–18', ARRAY['Restore muscle bulk', 'Return to overhead task'], ARRAY['Monitor joint tolerance'], ARRAY['Near full symmetric ROM'])
RETURNING id INTO p3_id;

-- Phase 4: Full Return
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Functional Maintenance', 'Month 18+', ARRAY['Prevention', 'Full work/sport'], ARRAY['Maintain overhead endurance'], ARRAY['Zero restrictions'])
RETURNING id INTO p4_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Pendulum Swings', '3 × 1 min', 'Gentle joint decompression'),
(p2_id, 'Pulley-assisted Elevation', '3 × 10 reps', 'Passive-active range focus'),
(p3_id, 'Full Can Raises', '3 × 12 reps', 'Supraspinatus strengthening'),
(p4_id, 'Overhead Carry (Lockout)', '3 × 20 meters', 'Shoulder stability maintenance');


---------------------------------------------------------------------------------------
-- 2. Biceps Tendinopathy (Long Head)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Biceps Tendinopathy (Long Head)', 'Shoulder') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Unloading & Isometrics', 'Week 0–4', ARRAY['Reduce anterior pain', 'Activity modification'], ARRAY['No heavy curls', 'Avoid rapid overhead reaching'], ARRAY['Pain-free daily use'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Isotonic Loading', 'Week 4–8', ARRAY['Build tendon capacity', 'Scapular control'], ARRAY['Monitor for night pain'], ARRAY['Full strength symmetry'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Integrated Loading', 'Week 8–16', ARRAY['Global power', 'Specific task drill'], ARRAY['Monitor for focal throbbing'], ARRAY['Zero pain with load'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Maintenance', 'Month 4+', ARRAY['Prevention', 'Performance'], ARRAY['Maintain HSR weekly'], ARRAY['Full return to play'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 3. Pectoralis Major Tear
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Pectoralis Major Tear', 'Shoulder') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Protection & Settling', 'Week 0–6', ARRAY['Protect healing fiber', 'ROM into tolerance'], ARRAY['Strict NWB', 'No heavy horizontal adduction'], ARRAY['Clinical range goals met'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Mobilization', 'Week 6–12', ARRAY['Full range', 'Early activation'], ARRAY['No high impact load'], ARRAY['Full passive ROM'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Power & Strength', 'Month 3–6', ARRAY['Restore bench press/push capacity'], ARRAY['Monitor for focal pull'], ARRAY['LSI > 80%'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Full Return', 'Month 6+', ARRAY['Prevention', 'Competition'], ARRAY['Maintain muscle habit'], ARRAY['Full performance return'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 4. Sternoclavicular Joint Sprain
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Sternoclavicular Joint Sprain', 'Shoulder') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Symptom Reduction', 'Week 0–2', ARRAY['Settle joint pain', 'Protect'], ARRAY['Avoid overhead elevation initially'], ARRAY['Painless daily reaching'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Mobilization', 'Week 2–6', ARRAY['Restore scapular flow', 'Cuff strength'], ARRAY['No heavy carry on side'], ARRAY['Full active ROM shoulder'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Resistance', 'Week 6–12', ARRAY['Integrated power', 'Scapular stability'], ARRAY['Monitor joint clicking'], ARRAY['Symmetric power'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Participation', 'Month 3+', ARRAY['Full return to sport', 'Prevention'], ARRAY['Maintain posture habit'], ARRAY['Full season play'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 5. Scapular Dyskinesis
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Scapular Dyskinesis', 'Shoulder') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Conscious Correction', 'Week 0–4', ARRAY['Identify scapular tilt', 'Lower trap activation'], ARRAY['Avoid heavy overhead initially'], ARRAY['Good control in mini-wall slide'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Strength & Endurance', 'Week 4–8', ARRAY['Trap/Serratus bulk', 'Cuff support'], ARRAY['Monitor for fatigue based shrugging'], ARRAY['Zero winging in push-up'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'High Intensity Agility', 'Week 8–16', ARRAY['Reactive stability', 'Power'], ARRAY['Maintain form'], ARRAY['Full athletic confidence'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Functional Maintenance', 'Month 4+', ARRAY['Prevention during play', 'Maintenance'], ARRAY['Independent screen every month'], ARRAY['Zero focal fatigue pain'])
RETURNING id INTO p4_id;

END $$;
