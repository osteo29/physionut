-- protocols_sports_postop_complete_part1.sql
-- الحالات: إصابات رياضية وجراحية - Sports & Post-Op Protocols (Part 1)
-- جميع المراحل (1-4) والتمارين متضمنة

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER; p2_id INTEGER; p3_id INTEGER; p4_id INTEGER;
BEGIN

-- تنظيف البيانات القديمة
DELETE FROM protocols WHERE name IN (
    'Post-Concussion Syndrome',
    'Total Hip Replacement (Arthroplasty)',
    'Total Knee Replacement (Arthroplasty)',
    'Femoroacetabular Impingement (FAI - Surgical)',
    'Osteochondritis Dissecans (Knee)'
);

---------------------------------------------------------------------------------------
-- 1. Post-Concussion Syndrome
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Post-Concussion Syndrome', 'Sports Medicine') RETURNING id INTO proto_id;

-- Phase 1 (Initial Rest & Settle)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Relative Rest & Cognitive Pacing', 'Week 0–1', ARRAY['Reduce neuro-metabolic demand', 'Symptom management'], ARRAY['No screen time initial 48h', 'Avoid taxing cognitive work'], ARRAY['Cognitive tasks tolerated 30 min', 'Zero symptoms at rest'])
RETURNING id INTO p1_id;

-- Phase 2 (Active Sub-threshold Ex)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Light Aerobic Integration', 'Week 1–4', ARRAY['Determine Buffalo Treadmill threshold', 'Initial movement'], ARRAY['Monitor for headache spikes'], ARRAY['Stable cardiovascular response'])
RETURNING id INTO p2_id;

-- Phase 3 (Sport Drills)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Sport-Specific Non-contact', 'Variable', ARRAY['Dual-tasking', 'Cognitive processing under load'], ARRAY['Stop if dizziness returns'], ARRAY['Tolerance of high-intensity exercise'])
RETURNING id INTO p3_id;

-- Phase 4 (Clearance)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Full Contact Recovery', 'Variable', ARRAY['Return to play', 'Unrestricted contact'], ARRAY['Must carry Concussion Specialist clearance'], ARRAY['Full Graduated Return-to-Play completion'])
RETURNING id INTO p4_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Deep Breathing & Soft Music', '10 min', 'CNS calming'),
(p2_id, 'Stationary Biking (Sub-symptom)', '15 min', 'Improve blood flow safely'),
(p3_id, 'Agility Drills with Verbal Cues', '10 reps', 'Cognitive-motor dual tasking'),
(p4_id, 'Full Practice (Non-contact to Contact)', '60 min', 'Final integration');


---------------------------------------------------------------------------------------
-- 2. Total Hip Replacement (Arthroplasty)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Total Hip Replacement (Arthroplasty)', 'Post-operative') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Protection & Mobility', 'Week 0–6', ARRAY['Hip precautions education', 'Wound healing', 'Initial gait'], ARRAY['Avoid flexion > 90°', 'No ADduction past midline', 'Protect posterior capsule'], ARRAY['Independent ambulation with walker', 'Surgical site closed'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Functional Strengthening', 'Week 6–12', ARRAY['Wean off gait aids', 'Improve gluteal strength'], ARRAY['Monitor for Trendelenburg sign'], ARRAY['Normal gait without device'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Advanced Proprioception', 'Month 3–6', ARRAY['Return to independent ADLs', 'Power'], ARRAY['Low impact focus'], ARRAY['Symmetric power'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Activity Tolerance', 'Month 6+', ARRAY['Return to golf/swimming/walking', 'Independence'], ARRAY['Avoid high impact (running) long-term'], ARRAY['Zero restrictions in low-impact activity'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 3. Total Knee Replacement (Arthroplasty)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Total Knee Replacement (Arthroplasty)', 'Post-operative') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'ROM & Wound Control', 'Week 0–2', ARRAY['Achieve 0-90° ROM', 'Reduce edema', 'Initial gait'], ARRAY['Protect incision', 'Avoid over-flexion under load'], ARRAY['90° flexion', '0° extension'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Early Strengthening', 'Week 2–8', ARRAY['Achieve 110-120° ROM', 'Normal gait progress'], ARRAY['No high impact'], ARRAY['Functional 115° ROM'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Endurance & Power', 'Week 8–16', ARRAY['Step-ups symmetry', 'ADL power'], ARRAY['Monitor for Baker''s cyst'], ARRAY['Symmetric chair stands'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Functional Discharge', 'Month 4+', ARRAY['Unlimited walking', 'Return to bowling/golf'], ARRAY['Maintain quad bulk'], ARRAY['Zero disability'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 4. Femoroacetabular Impingement (FAI - Surgical)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Femoroacetabular Impingement (FAI - Surgical)', 'Post-operative') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Joint Protection & ROM', 'Week 0–6', ARRAY['Protect labral repair', 'Gentle range'], ARRAY['Restrict WB (per surg)', 'Avoid flexion > 90°'], ARRAY['Clinical range milestones met'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Functional Strength', 'Week 6–12', ARRAY['Normal gait', 'Hip/Core flow'], ARRAY['No deep lunges'], ARRAY['Full WB gait'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Impact Initiation', 'Month 4–6', ARRAY['Jogging return', 'Functional Drills'], ARRAY['Maintain axial alignment'], ARRAY['LSI > 80%'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Return to Play', 'Month 6–9', ARRAY['Full agility', 'Contact sports'], ARRAY['Monitor for joint pinching'], ARRAY['LSI > 90%'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 5. Osteochondritis Dissecans (Knee)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Osteochondritis Dissecans (Knee)', 'Peds/Sports') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Joint Unloading', 'Week 0–12', ARRAY['Bony healing', 'Pain control'], ARRAY['PWB/NWB as per staging', 'No impact loading'], ARRAY['X-ray signs of healing'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Graduated Loading', 'Month 3–6', ARRAY['Isotonic strength', 'ROM restoration'], ARRAY['Monitor for focal effusion'], ARRAY['Neg pressure pain at site'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Impact Progress', 'Month 6–9', ARRAY['Jogging', 'Jump mechanics'], ARRAY['Prioritize mechanics over volume'], ARRAY['Zero symptoms post-run'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Full Performance', 'Month 9+', ARRAY['Return to sport', 'Prevention'], ARRAY['Maintain seasonal pacing'], ARRAY['Full return to competition'])
RETURNING id INTO p4_id;

END $$;
