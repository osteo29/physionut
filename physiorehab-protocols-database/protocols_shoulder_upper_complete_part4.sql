-- protocols_shoulder_upper_complete_part4.sql
-- الحالات: الكتف والطرف العلوي - Shoulder & Upper Limb (Part 4)
-- جميع المراحل (1-4) والتمارين متضمنة

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER; p2_id INTEGER; p3_id INTEGER; p4_id INTEGER;
BEGIN

-- تنظيف البيانات القديمة
DELETE FROM protocols WHERE name IN (
    'Suprascapular Nerve Entrapment',
    'Long Thoracic Nerve Palsy',
    'Pectoralis Minor Tightness (Management)',
    'Infraspinatus Strain',
    'Teres Major Strain'
);

---------------------------------------------------------------------------------------
-- 1. Suprascapular Nerve Entrapment
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Suprascapular Nerve Entrapment', 'Shoulder') RETURNING id INTO proto_id;

-- Phase 1 (0-4 Weeks)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Neural Unloading', 'Week 0–4', 
    ARRAY['Reduce nerve irritation', 'Improve scapular flow', 'Settle pain'],
    ARRAY['Avoid repetitive heavy overhead activity', 'Limit forceful external rotation initially'],
    ARRAY['Reduced focal throbbing', 'Stable ADL tolerance'])
RETURNING id INTO p1_id;

-- Phase 2 (4-12 Weeks)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Cuff Strengthening', 'Week 4–12', ARRAY['Build supra/infraspinatus power', 'Scapular control'], ARRAY['No high velocity throwing'], ARRAY['Full strength return'])
RETURNING id INTO p2_id;

-- Phase 3 (3-6 Months)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Advanced Integrated Load', 'Month 3–6', ARRAY['Restore overhead power', 'Endurance'], ARRAY['Monitor post-activity neuro-ache'], ARRAY['Symmetric power'])
RETURNING id INTO p3_id;

-- Phase 4 (Month 6+)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Functional Maintenance', 'Month 6+', ARRAY['Prevention', 'Performance'], ARRAY['Maintain cuff endurance habit'], ARRAY['Zero recurring symptoms'])
RETURNING id INTO p4_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Shoulder Blade Pinches', '3 × 15 reps', 'Setting a stable base'),
(p2_id, 'Full Can Raises', '3 × 12 reps', 'Specific supraspinatus activation'),
(p3_id, 'External Rotation with Band (Arm Elevated)', '3 × 15 reps', 'High level cuff loading'),
(p4_id, 'Overhead Military Press (Light)', '3 × 10 reps', 'Functional maintenance');


---------------------------------------------------------------------------------------
-- 2. Long Thoracic Nerve Palsy
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Long Thoracic Nerve Palsy', 'Shoulder') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Protective Serratus Initiation', 'Week 0–6', ARRAY['Protect neural supply', 'Prevent winging', 'Shoulder range maintenance'], ARRAY['Avoid end-range heavy pushing', 'No heavy carry'], ARRAY['Neg night pain', 'Stable scapular tone'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Mobilization & Early Activation', 'Week 6–12', ARRAY['Active serratus punch', 'Trap support'], ARRAY['Stop if winging spikes during ex'], ARRAY['ROM elevation > 140°'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Functional Strength', 'Month 3–6', ARRAY['Restore push power', 'Integrated power'], ARRAY['Monitor for fatigue based shrugging'], ARRAY['Zero winging in push-up'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Resilience Maintenance', 'Month 6+', ARRAY['Full seasonal play', 'Prevention'], ARRAY['Independent screen habit'], ARRAY['Full seasonal return'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 3. Pectoralis Minor Tightness (Management)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Pectoralis Minor Tightness (Management)', 'Shoulder') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Myofascial Release & Stretching', 'Week 0–4', ARRAY['Improve muscle length', 'Settle neural tension'], ARRAY['No aggressive over-stretching into pain'], ARRAY['Improved Coracoid tenderness'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Antagonist Strengthening', 'Week 4–8', ARRAY['Lower trap bulk', 'Scapular posterior tilt'], ARRAY['Monitor for shrugging'], ARRAY['Zero winging in active reach'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Integrated Mobility', 'Week 8–16', ARRAY['Full range elevation with control', 'Power'], ARRAY['Maintain posture habit'], ARRAY['Full asymmetric symmetry'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Conditioning', 'Month 4+', ARRAY['Prevention', 'Technique optimization'], ARRAY['Daily stretching ritual'], ARRAY['Zero recurring symptoms'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 4. Infraspinatus Strain
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Infraspinatus Strain', 'Shoulder') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Protection & Isometric Flow', 'Week 0–2', ARRAY['Protect healing fibers', 'Reduce pain'], ARRAY['No heavy external rotation'], ARRAY['Painless daily arm use'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Isotonic Enrichment', 'Week 2–6', ARRAY['Restore muscle bulk', 'Load tolerance'], ARRAY['Stop at sharp focal pain'], ARRAY['Full active ROM pain-free'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Power Return', 'Week 6–12', ARRAY['High power throwing drills', 'Stability'], ARRAY['Monitor post-activity ache'], ARRAY['Symmetric power'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Full Play', 'Month 3+', ARRAY['Full seasonal play', 'Prevention'], ARRAY['Maintain cuff volume habit'], ARRAY['Full return to play'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 5. Teres Major Strain
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Teres Major Strain', 'Shoulder') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Unloading & Settlement', 'Week 0–2', ARRAY['Reduce axial pain'], ARRAY['Avoid heavy pulling/adduction initially'], ARRAY['Pain-free daily reach'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Range Initiation', 'Week 2–6', ARRAY['Improve range', 'Activation'], ARRAY['Stop if sharp pinch returns'], ARRAY['Full range achieved'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Integrated Pull Load', 'Week 6–12', ARRAY['Restore rowing power', 'Strength'], ARRAY['Monitor for fatigue based shrugging'], ARRAY['Symmetric power'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Performance Ready', 'Month 3+', ARRAY['Prevention', 'Full work return'], ARRAY['Maintain muscle habit'], ARRAY['Full seasonal return'])
RETURNING id INTO p4_id;

END $$;
