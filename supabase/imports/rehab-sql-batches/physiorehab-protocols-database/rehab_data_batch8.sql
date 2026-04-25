-- rehab_data_batch8.sql
-- Batch 8: Protocols 46 to 53 (Hip & Knee)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER;
BEGIN

-- 46. Hip Osteoarthritis (Conservative)
INSERT INTO protocols (name, category) VALUES ('Hip Osteoarthritis (Conservative)', 'Hip') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Pain Management & Education', 'Weeks 0–8', 
    ARRAY['Reduce pain and improve quality of life', 'OA is manageable education', 'Identify and modify pain-provoking activities'],
    ARRAY['Avoid high-impact loading during flares', 'Manage patient expectations', 'Orthopaedic referral if severe Grade III-IV'],
    ARRAY['Pain controlled to ≤4/10', 'Walking 20 min without significant pain', 'Patient engaged with education'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Hydrotherapy / Aquatic Exercise', '30 min, 3× per week', 'Offloaded exercise — ideal for high pain-severity OA'),
(p1_id, 'Stationary Bike', '20–30 min', 'Low-impact cardiovascular — hip ROM maintenance'),
(p1_id, 'Seated Hip AROM', '3 × 20 reps each direction', 'Maintain synovial fluid circulation and prevent joint stiffening'),
(p1_id, 'Gentle Walking (paced)', '20–30 min daily', 'Best evidence for hip OA — graded activity');


-- 47. Snapping Hip Syndrome (Coxa Saltans)
INSERT INTO protocols (name, category) VALUES ('Snapping Hip Syndrome (Coxa Saltans)', 'Hip') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Pain Reduction & Load Modification', 'Week 0–4', 
    ARRAY['Reduce pain associated with snapping', 'Identify type of snapping (Internal/External)', 'Modify provocative activities'],
    ARRAY['Intra-articular snapping with locking needs urgent review', 'Avoid provocative hip movements', 'Reduce repetitive hip flexion'],
    ARRAY['Painful snapping episodes reduced in frequency', 'Pain ≤3/10 during daily activities'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Hip AROM (pain-free arcs, slow)', '3 × 20 reps each', 'Controlled movement through range — identify and avoid snap arc'),
(p1_id, 'Iliopsoas Isometric (for internal type)', '3 × 10 reps, 10 sec hold', 'Maintain muscle activation without provocative snap movement'),
(p1_id, 'IT Band / Hip Abductor Stretching', '3 × 45 sec each', 'Reduce IT band tension over greater trochanter');


-- 52. Osgood-Schlatter Disease
INSERT INTO protocols (name, category) VALUES ('Osgood-Schlatter Disease', 'Knee') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Acute / Protection', 'Week 0-4 (typical)', 
    ARRAY['Reduce pain and inflammation', 'Protect injured structure', 'Maintain adjacent joint mobility'],
    ARRAY['Avoid aggravating movements', 'Respect tissue healing timeline', 'Monitor for worsening'],
    ARRAY['Pain ≤3/10 at rest', 'Swelling resolving', 'Ready for progressive loading'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Isometric Activation', '3 × 10 reps, 5–10 sec', 'Sub-maximal — maintain activation without loading injured tissue'),
(p1_id, 'Adjacent Joint ROM', '3 × 20 reps', 'Maintain mobility in joints proximal and distal to injury'),
(p1_id, 'Gentle Aerobic Conditioning', '20 min', 'Bike, pool, or arm ergometer — based on injury site');

END $$;
