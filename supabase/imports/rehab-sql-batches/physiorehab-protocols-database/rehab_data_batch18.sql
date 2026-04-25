-- rehab_data_batch18.sql
-- استكمال النواقص: البروتوكولات 45, 48, 49, 50, 51
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER;
BEGIN

-- 45. Piriformis Syndrome
INSERT INTO protocols (name, category) VALUES ('Piriformis Syndrome', 'Hip') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Desensitisation & Neural Unloading', 'Week 0–4', 
    ARRAY['Reduce sciatic nerve irritation', 'Address piriformis muscle tension', 'Modify sitting/loading habits'],
    ARRAY['Avoid prolonged sitting on hard surfaces', 'No aggressive stretching of piriformis in acute phase', 'Exclude lumbar disc pathology'],
    ARRAY['Sciatic pain centralising', 'Straight leg raise (SLR) improving', 'Sitting tolerance >30 min'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Sciatic Nerve Slider (Seated)', '3 × 10 reps', 'Tension-free neural excursion — don''t force it'),
(p1_id, 'Soft Tissue Release (Tennis ball/Foam roller)', '2 min gentle', 'Self-massage to piriformis belly — avoid focal nerve pressure'),
(p1_id, 'Diaphragmatic Breathing', '5 min, 3× daily', 'Reduce pelvic floor / deep gluteal guarding'),
(p1_id, 'Standing Glute Squeezes', '3 × 15 reps, 5 sec', 'Neuromuscular resetting of the gluteal group');


-- 48. Pes Anserine Bursitis
INSERT INTO protocols (name, category) VALUES ('Pes Anserine Bursitis', 'Knee') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Inflammation Control & Mechanical Unloading', 'Week 0–4', 
    ARRAY['Reduce medial knee pain', 'Identify causative mechanical factors (valgus)', 'Maintain quadriceps and hamstring function'],
    ARRAY['Avoid direct pressure on bursa', 'No aggressive hamstring stretching', 'Caution with heavy resisted knee flexion'],
    ARRAY['Pain ≤3/10 during ADLs', 'Knee flexion ROM full', 'Medial point tenderness reduced'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Isometric Quad Sets', '3 × 20 reps', 'Maintain knee stability without bursal irritation'),
(p1_id, 'Adductor Strengthening (Light)', '3 × 15 reps', 'Address muscle balance around the pes anserine tendons'),
(p1_id, 'Hamstring Isometrics (Seated)', '3 × 15 reps, 5 sec', 'Gentle activation to maintain tone without friction'),
(p1_id, 'Ice and Padding Education', '10 min', 'Reduce focal inflammation');


-- 49. Baker''s Cyst (Symptomatic)
INSERT INTO protocols (name, category) VALUES ('Baker''s Cyst (Symptomatic)', 'Knee') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Effusion Management & Joint Protection', 'Week 0–4', 
    ARRAY['Control joint swelling (effusion)', 'Address primary intra-articular pathology (e.g. meniscus)', 'Maintain mobility'],
    ARRAY['Cyst itself is often secondary — don''t just treat the cyst', 'Avoid forceful end-range knee flexion', 'Avoid aggressive impact'],
    ARRAY['Knee effusion reduced', 'Pain-free knee flexion >110°', 'Ready for weight-bearing progression'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Ankle Pumps', '10 reps every hour', 'Circulation and muscle pump — reduces global leg edema'),
(p1_id, 'Heel Slides (pain-free range)', '3 × 20 reps', 'Controlled mobility to manage synovial fluid flow'),
(p1_id, 'Quad Sets', '3 × 20 reps', 'Maintain extension — extension is often lost when effusion is high'),
(p1_id, 'Compression Wrap', 'All day', 'Graduated compression from foot to mid-thigh');


-- 50. Tibial Plateau Fracture (Post-operative)
INSERT INTO protocols (name, category) VALUES ('Tibial Plateau Fracture (Post-operative)', 'Knee') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Protection & ROM Initiation', 'Week 0–6', 
    ARRAY['Protect surgical fixation', 'Initiate early ROM', 'Wound healing/edema control', 'DVT prevention'],
    ARRAY['Strict NWB (Non-Weight Bearing) as per surgeon', 'Avoid resisted knee extension', 'Monitor neurovascular status distal to plate'],
    ARRAY['Wound healed', 'Knee flexion ≥90°', 'Radiological stability confirmed'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Ankle Pumps / Circles', '10 × hourly', 'Critical DVT prophylaxis in NWB phase'),
(p1_id, 'Passive/Active-Assisted Knee Flexion', '3 × 15 reps', 'Gravity-assisted off side of bed or heel slides'),
(p1_id, 'Patellar Mobilisation', '3 × 20 reps', 'Prevent patellofemoral adhesions post-plate application');


-- 51. Knee Osteoarthritis (Knee OA - Conservative)
INSERT INTO protocols (name, category) VALUES ('Knee Osteoarthritis', 'Knee') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Pain Control & Functional Loading', 'Week 0–8', 
    ARRAY['Reduce chronic knee pain', 'Improve weight-bearing tolerance', 'Strengthen shock-absorbing muscles (quads)', 'Weight management education'],
    ARRAY['Avoid high-impact activities in flare-ups', 'Exercise into mild discomfort (≤3/10) is safe and beneficial', 'Watch for swelling'],
    ARRAY['Knee strength improved by 20%', 'Walking distance increased', 'Patient empowered with self-management'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Stationary Bike (low resistance)', '15–30 min daily', 'Cartilage lubrication through cyclic loading'),
(p1_id, 'Sit-to-Stand (Functional Strength)', '3 × 12 reps', 'Builds quadriceps and gluteal strength for ADLs'),
(p1_id, 'Terminal Knee Extension (banded)', '3 × 15 reps', 'Focus on VMO and lockout strength'),
(p1_id, 'Step-ups / Step-downs (low)', '3 × 10 reps each leg', 'Neuromuscular control during weight-bearing');

END $$;
