-- rehab_data_batch19.sql
-- استكمال النواقص: البروتوكولات 53, 56, 57, 58, 59
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER;
BEGIN

-- 53. Knee Meniscectomy (Partial)
INSERT INTO protocols (name, category) VALUES ('Knee Meniscectomy (Partial)', 'Knee') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Early Mobilisation & Effusion Control', 'Week 0–2', 
    ARRAY['Reduce joint swelling', 'Restore full knee extension', 'Initiate quadriceps activation', 'Normalise gait'],
    ARRAY['WBAT (Weight Bearing As Tolerated)', 'Avoid deep squats >90° initially', 'Monitor for persistent swelling'],
    ARRAY['Knee extension 0°', 'Knee flexion ≥110°', 'Minimal effusion', 'No lag on SLR (Straight Leg Raise)'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Heel Slides with Towel', '3 × 20 reps', 'Maintain mobility — use towel for overpressure'),
(p1_id, 'Quadriceps Isometrics (Quad sets)', '3 × 20 reps, 10 sec hold', 'Bridge the neuro-muscular gap post-op'),
(p1_id, 'Straight Leg Raise (SLR)', '3 × 15 reps', 'Maintain proximal hip strength without knee stress'),
(p1_id, 'Patellar Mobilisation', '3 × 20 reps', 'Prevent adhesions in the suprapatellar pouch');


-- 56. Sinus Tarsi Syndrome
INSERT INTO protocols (name, category) VALUES ('Sinus Tarsi Syndrome', 'Ankle & Foot') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Inflammation Control & Stability', 'Week 0–4', 
    ARRAY['Reduce sinus tarsi pain/swelling', 'Correct over-pronation mechanics', 'Proprioceptive retraining'],
    ARRAY['Avoid excessive inversion/eversion during acute pain', 'Supportive footwear required', 'Activity modification'],
    ARRAY['Pain free on palpation of sinus tarsi', 'Improving balance on single leg', 'Ready for functional loading'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Ankle Eversion Isometrics', '3 × 15 reps, 5 sec', 'Strengthen peroneals to support lateral ankle'),
(p1_id, 'Short Foot Exercise (Arch lifting)', '3 × 20 reps', 'Provide intrinsic stability — unload sinus tarsi'),
(p1_id, 'Single-leg Balance (Level ground)', '3 × 60 sec', 'Neuromuscular retraining is critical for chronic cases'),
(p1_id, 'Calf Stretching (Gentle)', '3 × 45 sec', 'Reduce equinus load on subtalar joint');


-- 57. 5th Metatarsal Fracture (Jones / Stress Fracture)
INSERT INTO protocols (name, category) VALUES ('5th Metatarsal Fracture (Jones/Stress)', 'Ankle & Foot') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Immobilisation / Protected Loading', 'Week 0–6', 
    ARRAY['Protect fracture healing', 'Non-weight bearing or heel-bearing as per surgeon', 'Prevent calf atrophy'],
    ARRAY['High risk of non-union — do NOT rush loading', 'Maintain immobilization strictly', 'Smoking cessation education (bone healing)'],
    ARRAY['X-ray evidence of callus formation', 'No pain at fracture site', 'Orthopaedic clearance to FWB'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Toe Wiggles and Curls', '3 × 20 reps', 'Maintain intrinsic muscle activation while casted'),
(p1_id, 'Knee/Hip ROM (Active)', '3 × 20 reps', 'Address proximal conditioning in NWB phase'),
(p1_id, 'Isometric Hip Abduction (Side-lying)', '3 × 15 reps', 'Core and hip stability — preparation for gait return');


-- 58. Ankle ORIF (Post-operative)
INSERT INTO protocols (name, category) VALUES ('Ankle ORIF (Post-operative)', 'Ankle & Foot') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Wound Healing & Early ROM', 'Week 0–4', 
    ARRAY['Protect surgical hardware', 'Control edema', 'Early AROM (if stable)', 'Maintain mobility of distal joints'],
    ARRAY['NWB (Non-Weight Bearing) usually 6 weeks', 'Monitor wound integrity', 'DVT prevention focus'],
    ARRAY['Incisions healed', 'Minimal ankle swelling', 'Dorsiflexion to neutral (0°)'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Gentle Ankle AROM (PF/DF)', '3 × 15 reps', 'Maintain joint nutrition — avoid inversion/eversion early'),
(p1_id, 'Toe ROM', '3 × 20 reps', 'Prevent digital stiffness'),
(p1_id, 'Quad Sets / Hamstring Sets', '3 × 20 reps', 'Maintain leg activation while NWB');


-- 59. Hallux Valgus (Bunions - Conservative)
INSERT INTO protocols (name, category) VALUES ('Hallux Valgus (Bunions)', 'Ankle & Foot') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Pain Management & Alignment Support', 'Week 0–8', 
    ARRAY['Reduce 1st MTP joint pain', 'Improve intrinsic foot strength', 'Footwear education', 'Toe alignment'],
    ARRAY['Avoid narrow-toebox footwear', 'Monitor for skin breakdown if using spacers', 'Rule out gout/RA during flare-ups'],
    ARRAY['1st MTP joint pain reduced', 'Patient using correct footwear', 'Intrinsic control improved'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Toe Spreading (Abductor Hallucis)', '3 × 20 reps', 'Activate muscle that opposes bunion deformity'),
(p1_id, 'Short Foot (Arch doming)', '3 × 20 reps', 'Strong arch reduces forefoot splaying'),
(p1_id, 'Big Toe AROM (Flexion/Extension)', '3 × 20 reps', 'Maintain joint mobility — prevent hallux rigidus');

END $$;
