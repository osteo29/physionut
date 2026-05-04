-- protocols_hip_pelvis_complete_part1.sql
-- الإصابات: الورك والحوض - Hip & Pelvis Protocols (Part 1)
-- جميع المراحل (1-4) والتمارين متضمنة

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER; p2_id INTEGER; p3_id INTEGER; p4_id INTEGER;
BEGIN

-- تنظيف البيانات القديمة
DELETE FROM protocols WHERE name IN (
    'Hamstring Strain (Grade II)',
    'Iliotibial Band Syndrome',
    'Adductor / Groin Strain',
    'Hip Labral Tear (Conservative)',
    'Athletic Pubalgia (Sports Hernia)'
);

---------------------------------------------------------------------------------------
-- 1. Hamstring Strain (Grade II)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Hamstring Strain (Grade II)', 'Hip/Pelvis') RETURNING id INTO proto_id;

-- Phase 1 (0-1 Week)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Acute Protection', 'Week 0–1', ARRAY['Protect healing tissue', 'Reduce pain/swelling'], ARRAY['No aggressive stretching', 'Avoid fast walking'], ARRAY['Pain-free walking', 'Minimal pain with isometric'])
RETURNING id INTO p1_id;

-- Phase 2 (1-4 Weeks)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Mobilization & Early Loading', 'Week 1–4', ARRAY['Restore range', 'Initial eccentric loading'], ARRAY['Stop at sharp focal pain'], ARRAY['Full AROM flexion', 'Jogging initial tolerance'])
RETURNING id INTO p2_id;

-- Phase 3 (4-12 Weeks)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'High Intensity Agility', 'Week 4–12', ARRAY['Full sprinting power', 'Elite eccentric strength'], ARRAY['Monitor for "tightness" during cold start'], ARRAY['Symmetric power'])
RETURNING id INTO p3_id;

-- Phase 4 (Month 3+)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Performance Maintenance & Prevention', 'Month 3+', ARRAY['Zero recurrence', 'Nordic maintenance'], ARRAY['Maintain volume pacing'], ARRAY['Full season participation'])
RETURNING id INTO p4_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Isometric Bridge', '3 × 30 sec', 'Early muscle activation'),
(p2_id, 'Hamstring Slides', '3 × 12 reps', 'Eccentric introduction'),
(p3_id, 'Nordic Hamstring Curls (Assisted)', '3 × 5 reps', 'Gold standard eccentric strength'),
(p4_id, 'Maximal Sprinting (Graded)', '5 reps', 'Highest level of fiber load');


---------------------------------------------------------------------------------------
-- 2. Iliotibial Band Syndrome
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Iliotibial Band Syndrome', 'Hip/Pelvis') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Phase of Calming', 'Week 0–4', ARRAY['Reduce lateral knee pain', 'Identify shoe/gait issues'], ARRAY['Avoid repetitive impact activity'], ARRAY['VAS Pain < 3/10 during walking'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Hip & Core Loading', 'Week 4–8', ARRAY['Strengthen abductors', 'Pelvic stability'], ARRAY['Monitor lateral compression'], ARRAY['Single leg squat control'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Running Re-integration', 'Week 8–16', ARRAY['Gradual mileage', 'Agility drills'], ARRAY['Avoid hill running initially'], ARRAY['Pain-free 5km run'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Maintenance', 'Month 4+', ARRAY['Prevention', 'Full mileage'], ARRAY['Independent foam rolling / drills'], ARRAY['Zero recurring symptoms'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 3. Adductor / Groin Strain
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Adductor / Groin Strain', 'Hip/Pelvis') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Protection', 'Week 0–2', ARRAY['Settle peak pain', 'Protect fibers'], ARRAY['No wide-leg lunges'], ARRAY['Pain-free adductor squeeze'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Isotonic Loading', 'Week 2–6', ARRAY['Restore length', 'Initial strength'], ARRAY['Avoid explosive kicks'], ARRAY['Full pain-free range'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Advanced Strength', 'Week 6–12', ARRAY['Full power', 'Return to drills'], ARRAY['Monitor for tugging'], ARRAY['HAGOS Score improvement'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Full Return', 'Month 3+', ARRAY['Prevention', 'Contact sport return'], ARRAY['Maintain adductor endurance'], ARRAY['Full season participation'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 4. Hip Labral Tear (Conservative)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Hip Labral Tear (Conservative)', 'Hip/Pelvis') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Settling & Neutrality', 'Week 0–4', ARRAY['Settle joint irritation', 'Improve core habit'], ARRAY['Avoid deep flexion/internal rotation'], ARRAY['Neg FADIR test early range'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Hip Strengthening', 'Week 4–12', ARRAY['Gluteal bulk', 'Joint stability'], ARRAY['Monitor for catching'], ARRAY['Pain-free stairs'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Functional Impact', 'Week 12–20', ARRAY['Return to running', 'High load strength'], ARRAY['Avoid end-range repetitive load'], ARRAY['Full functional confidence'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Maintenance', 'Month 5+', ARRAY['Independent care', 'Prevention'], ARRAY['Maintain joint health'], ARRAY['Zero limitations'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 5. Athletic Pubalgia (Sports Hernia)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Athletic Pubalgia (Sports Hernia)', 'Hip/Pelvis') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Core-Pelvic Protection', 'Week 0–4', ARRAY['Reduce symphysis pain'], ARRAY['No sit-ups', 'Avoid high volume loading'], ARRAY['Pain-free cough/sneeze'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Neutral Strengthening', 'Week 4–8', ARRAY['Symmetric hip/core flow'], ARRAY['No explosive twist'], ARRAY['Stable pelvis in bridge'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Dynamic Power', 'Week 8–16', ARRAY['Kicking power', 'Sprinting'], ARRAY['Monitor groin tugGING'], ARRAY['LSI > 90%'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Full Resilience', 'Month 4+', ARRAY['Prevention', 'Match return'], ARRAY['Maintain core habit'], ARRAY['Full seasonal play'])
RETURNING id INTO p4_id;

END $$;
