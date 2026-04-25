-- rehab_data_batch12.sql
-- Batch 12: Protocols 78 to 85 (Hand, Shoulder & Sports Trauma)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER;
BEGIN

-- 80. Proximal Humerus Fracture (Non-operative)
INSERT INTO protocols (name, category) VALUES ('Proximal Humerus Fracture (Non-operative)', 'Upper Limb') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Protection & Pendular Exercises', 'Week 0–3', 
    ARRAY['Fracture protection via sling', 'Reduce pain/muscle spasm', 'Prevent shoulder stiffness', 'ROM maintenance'],
    ARRAY['Sling immobilisation required', 'No active abduction/ER', 'Vascular injury check', 'Nerve injury check'],
    ARRAY['Pain ≤4/10 at rest', 'Fracture site not tender', 'Early callus on X-ray', 'Ready for assisted motion'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Pendular (Codman) Exercises', '3 × 5 min, 3–4×/day', 'Gravity-assisted — passive glenohumeral motion'),
(p1_id, 'Elbow/Wrist/Hand AROM', '3 × 20 reps', 'Prevent distal stiffness while in sling'),
(p1_id, 'Cervical ROM', '3 × 15 reps', 'Reduce secondary cervical muscle guarding'),
(p1_id, 'Ice and Pain Management', '15 min × 4–6/day', 'Facilitates pendular motion compliance');


-- 81. Quadriceps Strain (Grade II)
INSERT INTO protocols (name, category) VALUES ('Quadriceps Strain (Grade II)', 'Sports & Trauma') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Acute Management', 'Day 0–5', 
    ARRAY['Reduce haematoma and inflammation', 'Protect partial tear', 'Maintain baseline strength', 'Establish baseline measurements'],
    ARRAY['AVOID massage in first 48–72h', 'Avoid deep heat', 'No passive stretching into pain'],
    ARRAY['Walking pain-free', 'Knee flexion ≥90°', 'Swelling stabilised', 'Ready for loading'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Isometric Quadriceps (quad sets)', '3 × 20 reps, sub-maximal', 'Pain-free activation — reduce atrophy without stress'),
(p1_id, 'Ankle Pumps', '10 reps every hour', 'DVT prophylaxis — maintain circulation'),
(p1_id, 'Bike (low resistance)', '15–20 min', 'Cardiovascular maintenance — avoid if knee flexion painful'),
(p1_id, 'PRICE Protocol', '15 min × 4–6/day', 'Reduce haematoma formation');


-- 82. Calf Strain (Gastrocnemius)
INSERT INTO protocols (name, category) VALUES ('Calf Strain (Gastrocnemius)', 'Sports & Trauma') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Acute Management', 'Day 0–5', 
    ARRAY['Reduce haematoma and pain', 'Protect medial gastrocnemius', 'Maintain mobility', 'Cardiovascular fitness'],
    ARRAY['Avoid aggressive stretching', 'Heel raise in shoe recommended', 'Crutches if FWB painful', 'Watch for Homan''s sign'],
    ARRAY['Walking pain-free', 'Tenderness reducing', 'Single-leg raise attempted', 'Ready for loading'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Sub-maximal Isometric Plantarflexion', '3 × 20 reps', 'Prevent complete atrophy without stressing tear'),
(p1_id, 'Ankle Pumps (AROM)', '10 reps every hour', 'Maintain ankle mobility — DVT prophylaxis'),
(p1_id, 'Stationary Bike', '15–20 min', 'Minimal plantarflexion force'),
(p1_id, 'PRICE Protocol', 'Every 4–6h', 'Compression bandage from forefoot to knee');


-- 85. Tibial Stress Fracture (Return to Running)
INSERT INTO protocols (name, category) VALUES ('Tibial Stress Fracture (Return to Running)', 'Sports & Trauma') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Rest & Load Reduction', 'Week 0–6', 
    ARRAY['Eliminate tibial pain', 'Allow bone healing', 'Identify predisposing factors', 'Maintain fitness'],
    ARRAY['High-risk sites need NWB', 'Posteromedial tibia modification', 'Rule out RED-S', 'Bone stress index screening'],
    ARRAY['Pain-free weight-bearing', 'No tibial pain with hop test', 'MRI/CT evidence of healing', 'Predisposing factors addressed'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Deep Water Running', '30–45 min daily', 'Zero impact cardiovascular — maintains VO2max'),
(p1_id, 'Stationary Bike (no impact)', '30–40 min daily', 'Low tibial load maintenance'),
(p1_id, 'Hip Strengthening (non-impact)', '3 × 15 reps', 'Reduce tibial loading on return');

END $$;
