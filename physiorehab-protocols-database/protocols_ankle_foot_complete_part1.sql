-- protocols_ankle_foot_complete_part1.sql
-- الإصابات: الكاحل والقدم - Ankle & Foot Protocols (Part 1)
-- جميع المراحل (1-4) والتمارين متضمنة

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER; p2_id INTEGER; p3_id INTEGER; p4_id INTEGER;
BEGIN

-- تنظيف البيانات القديمة
DELETE FROM protocols WHERE name IN (
    'Lateral Ankle Sprain (Grade I-II)',
    'Plantar Fasciitis',
    'Achilles Tendinopathy',
    '5th Metatarsal Fracture (Jones/Stress)',
    'Tibialis Posterior Tendinopathy'
);

---------------------------------------------------------------------------------------
-- 1. Lateral Ankle Sprain (Grade I-II)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Lateral Ankle Sprain (Grade I-II)', 'Ankle/Foot') RETURNING id INTO proto_id;

-- Phase 1 (0-1 Week)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Protection & PRICER', 'Week 0–1', ARRAY['Reduce swelling/pain', 'Early mobilization'], ARRAY['No painful weight bearing', 'Avoid excessive inversion'], ARRAY['Pain-free walking (full WB)', 'Minimal effusion'])
RETURNING id INTO p1_id;

-- Phase 2 (1-4 Weeks)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Mobilization & Balance', 'Week 1–4', ARRAY['Full ROM', 'Proprioception', 'Strength'], ARRAY['Avoid uneven ground initially'], ARRAY['Symmetric ROM', 'Neg Talar Tilt'])
RETURNING id INTO p2_id;

-- Phase 3 (4-12 Weeks)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Power & Agility', 'Week 4–12', ARRAY['Return to running', 'Hopping drills', 'Reactive speed'], ARRAY['Monitor focal pain'], ARRAY['Full independent run'])
RETURNING id INTO p3_id;

-- Phase 4 (Month 3+)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Maintenance & Prevention', 'Month 3+', ARRAY['Zero recurrence', 'Independent drills'], ARRAY['Monitor shoe wear'], ARRAY['Full season participation'])
RETURNING id INTO p4_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Ankle Pumps', '3 × 30 reps', 'Swelling control'),
(p2_id, 'Single-leg Balance (Flat surface)', '3 × 30 sec', 'Proprioception'),
(p3_id, 'Figure-8 Running', '3 sets', 'Integrated agility'),
(p4_id, 'Peroneal Power Loading (Band)', '3 × 15 reps', 'Maintenance of lateral protection');


---------------------------------------------------------------------------------------
-- 2. Plantar Fasciitis
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Plantar Fasciitis', 'Ankle/Foot') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Acute Pain Relief', 'Week 0–4', ARRAY['Reduce "first-step" pain', 'Mobilize foot'], ARRAY['Avoid barefoot on hard floors'], ARRAY['Morning pain reduction > 50%'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Load Progression', 'Week 4–8', ARRAY['Tolerate windlass loading', 'Flexibility'], ARRAY['Monitor focal arch pain'], ARRAY['Full WB tolerance'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Functional Strength', 'Week 8–16', ARRAY['Running re-integration', 'Intrinsic strength'], ARRAY['Paced volume'], ARRAY['Zero pain with impact'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Maintenance', 'Month 4+', ARRAY['Prevention', 'Full activity'], ARRAY['Independent load monitoring'], ARRAY['Zero recurring symptoms'])
RETURNING id INTO p4_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Frozen Water Bottle Roll', '5 min', 'Analgesic effect'),
(p2_id, 'Rathleff Protocol (Weighted Heel Raises)', '3 × 12 reps', 'Load the fascia to promote remodeling'),
(p3_id, 'Towel Curls (Intrinsics)', '3 × 1 min', 'Foot core stability');


---------------------------------------------------------------------------------------
-- 3. Achilles Tendinopathy
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Achilles Tendinopathy', 'Ankle/Foot') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Isometric & Loading Intro', 'Week 0–4', ARRAY['Pain control', 'Establish load habit'], ARRAY['Limit high-velocity elastic work (jumping)'], ARRAY['Tolerate 45 sec iso hold'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Isotonic Loading (HSR)', 'Week 4–12', ARRAY['Build tendon bulk', 'Eccentric strength'], ARRAY['Monitor 24hr tendon pain'], ARRAY['Symmetric calf bulk'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Power & Sport Integration', 'Month 3–6', ARRAY['Plyometrics', 'Running mileage'], ARRAY['Monitor for stiffness'], ARRAY['VISA-A Score > 80'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Maintenance', 'Month 6+', ARRAY['Lifetime health', 'Performance'], ARRAY['Maintain HSR weekly'], ARRAY['Full season play'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 4. 5th Metatarsal Fracture (Jones/Stress)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('5th Metatarsal Fracture (Jones/Stress)', 'Ankle/Foot') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Immobilization', 'Week 0–6', ARRAY['Fracture union', 'Protection'], ARRAY['Strict NWB as per surgeon'], ARRAY['Callus on X-ray'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Mobilization', 'Week 6–12', ARRAY['Full active ROM', 'Early WB'], ARRAY['Avoid lateral torque'], ARRAY['Full active ROM'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Integrated Strength', 'Week 12–20', ARRAY['Global power', 'Impact tolerance'], ARRAY['Stop if bone pain returns'], ARRAY['Hop symmetry > 90%'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Maintenance', 'Month 5+', ARRAY['Full sport return', 'Prevention'], ARRAY['Independent pacing'], ARRAY['Full return to competition'])
RETURNING id INTO p4_id;


---------------------------------------------------------------------------------------
-- 5. Tibialis Posterior Tendinopathy
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Tibialis Posterior Tendinopathy', 'Ankle/Foot') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Unloading & Protection', 'Week 0–6', ARRAY['Settle arch pain'], ARRAY['Avoid excessive pronation'], ARRAY['Reduced navicular drop pain'])
RETURNING id INTO p1_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Isometric to Isotonic', 'Week 6–12', ARRAY['Build arch power'], ARRAY['Monitor medial ankle pain'], ARRAY['Able to do 10 heel raises'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Impact Integration', 'Week 12–24', ARRAY['Running return', 'Stability'], ARRAY['Stop if arch fatigue spikes'], ARRAY['Zero pain with jumping'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Maintenance', 'Month 6+', ARRAY['Prevention', 'Full life'], ARRAY['Independent arch routine'], ARRAY['Full functional return'])
RETURNING id INTO p4_id;

END $$;
