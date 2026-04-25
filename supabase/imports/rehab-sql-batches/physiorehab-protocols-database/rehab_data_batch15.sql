-- rehab_data_batch15.sql
-- استكمال النواقص: البروتوكولات 11, 12, 15, 19, 20
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER;
    p2_id INTEGER;
    p3_id INTEGER;
BEGIN

-- 11. Frozen Shoulder (Adhesive Capsulitis)
INSERT INTO protocols (name, category) VALUES ('Frozen Shoulder (Adhesive Capsulitis)', 'Shoulder') RETURNING id INTO proto_id;

-- Phase 1
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Painful / Freezing', 'Month 0–9', 
    ARRAY['Pain management', 'Maintain available ROM', 'Prevent further stiffness', 'Education'],
    ARRAY['Avoid aggressive stretching in painful phase', 'Corticosteroid injection may be indicated'],
    ARRAY['Pain stability (not resolution)', 'Maintaining available ROM'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Pendulums', '3 × 3 min all directions', 'Pain relief and gentle distraction — key exercise'),
(p1_id, 'AAROM Flexion (cane)', '3 × 15 reps', 'Good arm assists — go to comfortable range only'),
(p1_id, 'ER Stretching (gentle)', '3 × 30 sec', 'Elbow at side, cane-assisted — no forcing'),
(p1_id, 'Heat before exercise', '10 min', 'Reduce viscosity of synovial fluid — improve ROM');

-- Phase 2
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Stiffness / Frozen', 'Month 3–12', 
    ARRAY['Progressively restore ROM', 'Pain reducing', 'Restore function for ADL'],
    ARRAY['Progressive stretching appropriate now pain reducing', 'Gentle but consistent pressure'],
    ARRAY['Gaining ROM weekly', 'Flexion >150°', 'Functional daily activities improving'])
RETURNING id INTO p2_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p2_id, 'Capsular Stretching (ER, IR, flexion)', '3 × 60 sec each direction', 'End-range hold, gentle over-pressure'),
(p2_id, 'Sleeper Stretch', '3 × 45 sec', 'Key for posterior capsule tightness'),
(p2_id, 'Pulleys', '3 × 20 reps', 'Aggressive ROM — daily consistency is key'),
(p2_id, 'Strengthening (pain-free range)', '3 × 15 reps', 'Band ER/IR, scapular exercises');


-- 12. Anterior Shoulder Dislocation (First-time)
INSERT INTO protocols (name, category) VALUES ('Anterior Shoulder Dislocation (First-time)', 'Shoulder') RETURNING id INTO proto_id;

-- Phase 1
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Immobilisation', 'Week 0–3', 
    ARRAY['Tissue healing', 'Pain & swelling management', 'Maintain distal function'],
    ARRAY['Sling immobilisation 2–3 weeks', 'Avoid ER and extension', 'No overhead movements'],
    ARRAY['Pain settling', 'Week 3 sling removal clearance'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Elbow ROM', '3 × 20 reps', 'Maintain elbow mobility in sling'),
(p1_id, 'Wrist and hand strengthening', '3 × 20 reps', 'Grip strength — prevent distal atrophy'),
(p1_id, 'Isometric Rotator Cuff (submaximal)', '3 × 10 reps, 5 sec hold', 'Maintain cuff activation without stress');


-- 15. Plantar Fasciitis
INSERT INTO protocols (name, category) VALUES ('Plantar Fasciitis', 'Ankle & Foot') RETURNING id INTO proto_id;

-- Phase 1
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Acute Pain Management', 'Week 0–4', 
    ARRAY['Reduce morning pain', 'Load management', 'Intrinsic foot strengthening'],
    ARRAY['Avoid barefoot walking on hard surfaces', 'Night splint if severe', 'Orthotic support'],
    ARRAY['Morning pain <4/10', 'First-step pain reducing'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Plantar Fascia Stretch (intrinsic)', '3 × 30 sec each foot', 'Pull toes back before stepping — pre-activity'),
(p1_id, 'Calf Stretching (gastrocnemius)', '3 × 45 sec each', 'Knee straight — reduce tension on fascia'),
(p1_id, 'Short Foot Exercise', '3 × 20 reps, 5 sec hold', 'Arch activation — dome the foot without curling toes'),
(p1_id, 'Ice Massage', '5–10 min', 'Frozen water bottle rolling — post activity');


-- 19. Cervical Radiculopathy
INSERT INTO protocols (name, category) VALUES ('Cervical Radiculopathy', 'Spine') RETURNING id INTO proto_id;

-- Phase 1
INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Acute Nerve Root Management', 'Week 0–4', 
    ARRAY['Reduce arm pain', 'Centralise symptoms', 'Offload neural structures'],
    ARRAY['URGENT: Myelopathy signs — surgical referral', 'No cervical manipulation in acute phase', 'Avoid sustained cervical extension'],
    ARRAY['Arm pain centralising', 'Pain ≤4/10', 'No progressive neurological deficit'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Cervical Retraction (chin tucks)', '3 × 15 reps, 5 sec hold', 'Unload neural foramen — McKenzie retraction'),
(p1_id, 'Neural Mobilisation — Median Nerve Slider', '3 × 10 reps each', 'Wrist ext/flex with elbow + shoulder movement'),
(p1_id, 'Upper Cervical Traction (manual)', 'Per physiotherapist', 'Opens neural foramen — often immediate relief');

END $$;
