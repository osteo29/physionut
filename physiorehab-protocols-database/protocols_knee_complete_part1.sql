-- protocols_knee_complete_part1.sql
-- الإصابات (1-5): الركبة - Knee Protocols
-- جميع المراحل (1-4) والتمارين متضمنة في هذا الملف

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER; p2_id INTEGER; p3_id INTEGER; p4_id INTEGER;
BEGIN

-- تنظيف البيانات القديمة لهذه البروتوكولات لضمان عدم التكرار
DELETE FROM protocols WHERE name IN (
    'ACL Reconstruction (Hamstring Graft)',
    'ACL Strain (Grade I-II - Conservative)',
    'Meniscus Tear (Conservative)',
    'Meniscus Repair (Surgical)',
    'Patellofemoral Pain Syndrome (PFPS)'
);

---------------------------------------------------------------------------------------
-- 1. ACL Reconstruction (Hamstring Graft)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('ACL Reconstruction (Hamstring Graft)', 'Knee') RETURNING id INTO proto_id;

-- Phase 1
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Immediate Post-op', 'Week 0–2', 
    ARRAY['Control pain & swelling', 'Achieve full passive extension', 'Quadriceps activation'],
    ARRAY['No active extension 0–90°', 'Protect graft', 'PWB with crutches'],
    ARRAY['Full passive extension', 'SLR without lag'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Quadriceps Sets', '3 × 20 reps', 'VMO activation'),
(p1_id, 'Ankle Pumps', '3 × 30 reps', 'DVT prevention'),
(p1_id, 'Heel Slides', '3 × 15 reps', 'Gentle flexion');

-- Phase 2
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Early Strengthening', 'Week 2–6', 
    ARRAY['0–120° ROM', 'Normalise gait', 'Neuromuscular re-ed'],
    ARRAY['Avoid OKC extension 0–60°', 'No pivoting'],
    ARRAY['Full ROM 0–120°', 'Normal gait pattern'])
RETURNING id INTO p2_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p2_id, 'Mini Squats (0–45°)', '3 × 15 reps', 'Control valgus'),
(p2_id, 'Step-Ups', '3 × 15 reps', 'Lead with affected leg');

-- Phase 3
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Advanced Strengthening', 'Week 6–12', 
    ARRAY['LSI > 70%', 'Begin jogging', 'Develop power'],
    ARRAY['No reactive sports', 'Monitor effusion'],
    ARRAY['LSI > 80% strength', 'Hop test symmetry > 80%'])
RETURNING id INTO p3_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p3_id, 'Bulgarian Split Squats', '4 × 10 reps', 'Tolerate single leg load'),
(p3_id, 'Romanian Deadlifts', '4 × 10 reps', 'Posterior chain focus');

-- Phase 4
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Return to Performance', 'Month 4–9+', 
    ARRAY['LSI > 90%', 'Sport-specific agility', 'Psychological readiness'],
    ARRAY['Avoid sudden volume spikes', '9 months min for contact'],
    ARRAY['LSI > 90%', 'ACL-RSI score > 65'])
RETURNING id INTO p4_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p4_id, 'T-Agility Drills', '5 sets', 'Reactive speed'),
(p4_id, 'FIFA 11+ Maintenance', '20 min', 'Injury prevention');


---------------------------------------------------------------------------------------
-- 2. ACL Strain (Grade I-II - Conservative)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('ACL Strain (Grade I-II - Conservative)', 'Knee') RETURNING id INTO proto_id;

-- Phase 1
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Acute Protection', 'Week 0–2', 
    ARRAY['Reduce effusion', 'Restore extension', 'Basic quad activation'],
    ARRAY['No pivoting', 'Brace if unstable'],
    ARRAY['Full extension', 'Minimal swelling'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Quad Sets', '3 × 15 reps', 'Isometric activation'),
(p1_id, 'Straight Leg Raise', '3 × 15 reps', 'Proximal control');

-- Progressing to Phases 2, 3, 4 fully
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Dynamic Stability', 'Week 2–8', ARRAY['Normal gait', 'LSI > 80%'], ARRAY['Avoid high-risk pivots'], ARRAY['Neg giving way'])
RETURNING id INTO p2_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Power & Agility', 'Week 8–16', ARRAY['Full power', 'Return to drills'], ARRAY['Monitor impact'], ARRAY['Symmetric hop tests'])
RETURNING id INTO p3_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'High Performance', 'Month 4+', ARRAY['Sport return', 'Prevention'], ARRAY['Maintenance loading'], ARRAY['Full season play'])
RETURNING id INTO p4_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p2_id, 'Single-leg Balance', '3 × 30 sec', 'Proprioception'),
(p3_id, '45° Cutting Drills', '3 × 10 reps', 'Specific ACL load'),
(p4_id, 'Sprints with Deceleration', '5 reps', 'Final stage control');


---------------------------------------------------------------------------------------
-- 3. Meniscus Tear (Conservative)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Meniscus Tear (Conservative)', 'Knee') RETURNING id INTO proto_id;

-- Phase 1
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Protection & Settling', 'Week 0–4', 
    ARRAY['Decrease pain/swelling', 'Restore ROM', 'Maintain quad tone'],
    ARRAY['Avoid deep squats > 90°', 'No pivoting'],
    ARRAY['Pain-free walking', 'Full extension'])
RETURNING id INTO p1_id;

-- Phase 2
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Isotonic Loading', 'Week 4–8', ARRAY['Increase weight-bearing', 'Strength'], ARRAY['No twisting'], ARRAY['Full strength'])
RETURNING id INTO p2_id;

-- Phase 3
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Power & Agility', 'Week 8–16', ARRAY['Return to impact', 'Power'], ARRAY['Monitor locking'], ARRAY['Hop symmetry > 90%'])
RETURNING id INTO p3_id;

-- Phase 4
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Discharge & Maintenance', 'Month 4+', ARRAY['Prevention', 'Full sport'], ARRAY['Load management'], ARRAY['Zero symptoms'])
RETURNING id INTO p4_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Wall Squats (0-45°)', '3 × 15 reps', 'Quad activation'),
(p2_id, 'Step Ups', '3 × 12 reps', 'Functional strength'),
(p3_id, 'Split Squats', '3 × 10 reps', 'Unilateral load'),
(p4_id, 'Pogo Hops', '3 × 20 reps', 'Tendon stiffness');


---------------------------------------------------------------------------------------
-- 4. Meniscus Repair (Surgical)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Meniscus Repair (Surgical)', 'Knee') RETURNING id INTO proto_id;

-- Phase 1
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Maximum Protection', 'Week 0–6', 
    ARRAY['Protect repair site', 'Full extension', 'Quad activation'],
    ARRAY['NWB/PWB based on surgeon', 'Flexion limited to 90°', 'No active hamstrings if posterior horn'],
    ARRAY['Healed incision', '90° flexion achieved'])
RETURNING id INTO p1_id;

-- Phase 2
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Weight Bearing Progression', 'Week 6–12', ARRAY['Full WB', 'Full ROM', 'Basic strength'], ARRAY['No deep squats'], ARRAY['Normal gait'])
RETURNING id INTO p2_id;

-- Phase 3
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Advanced Strengthening', 'Month 3–5', ARRAY['Restore power', 'Initial jogging'], ARRAY['No pivoting'], ARRAY['LSI > 80%'])
RETURNING id INTO p3_id;

-- Phase 4
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Return to Sport', 'Month 5–9', ARRAY['Full agility', 'Contact readiness'], ARRAY['Monitor swelling'], ARRAY['LSI > 95%'])
RETURNING id INTO p4_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Quad Sets', '3 × 20 reps', 'Maintain muscle tone'),
(p2_id, 'Bilateral Leg Press (0-90°)', '3 × 15 reps', 'Controlled loading'),
(p3_id, 'Single-leg Squats', '3 × 10 reps', 'Balance and power'),
(p4_id, 'Cutting Drills', '5 sets', 'Reactive stability');


---------------------------------------------------------------------------------------
-- 5. Patellofemoral Pain Syndrome (PFPS)
---------------------------------------------------------------------------------------
INSERT INTO protocols (name, category) VALUES ('Patellofemoral Pain Syndrome (PFPS)', 'Knee') RETURNING id INTO proto_id;

-- Phase 1
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Calming & Initial Strength', 'Week 0–4', 
    ARRAY['Pain reduction', 'VMO/Hip activation', 'Biomechanical education'],
    ARRAY['Avoid aggravating stairs', 'No heavy deep lunges'],
    ARRAY['VAS Pain < 3/10', 'Good hip control in mini-squat'])
RETURNING id INTO p1_id;

-- Phase 2 (Strengthening)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Loading & Mechanics', 'Week 4–8', ARRAY['Load tolerance', 'Hip muscle bulk'], ARRAY['Monitor patellar tracking'], ARRAY['Pain-free step-downs'])
RETURNING id INTO p2_id;

-- Phase 3 (Return to Activity)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Impact & Running', 'Week 8–16', ARRAY['Running re-integration', 'High power'], ARRAY['Soft landings'], ARRAY['Zero pain with impact'])
RETURNING id INTO p3_id;

-- Phase 4 (Maintenance)
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 4, 'Independent Care', 'Month 4+', ARRAY['Prevention', 'Full mileage'], ARRAY['Maintain glute strength'], ARRAY['Zero limitations'])
RETURNING id INTO p4_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Clamshells', '3 × 20 reps', 'Gluteus medius focus'),
(p2_id, 'Spanish Squats', '3 × 45 sec', 'Isometric tendon/quad load'),
(p3_id, 'Box Jumps (Soft)', '3 × 10 reps', 'Force attenuation'),
(p4_id, 'Single-leg Leg Press', '3 × 15 reps', 'Maintenance of symmetric power');

END $$;
