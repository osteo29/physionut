-- rehab_data_batch23.sql
-- استكمال النواقص: البروتوكولات 90, 92, 93, 94, 95
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER;
BEGIN

-- 90. Triceps Rupture (Post-operative)
INSERT INTO protocols (name, category) VALUES ('Triceps Rupture (Post-operative)', 'Upper Limb') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Protection & Passive Loading', 'Week 0–6', 
    ARRAY['Protect healing triceps tendon', 'Controlled ROM restoration', 'Edema management'],
    ARRAY['Hinged elbow brace with limited flexion block', 'No active elbow extension', 'Avoid forceful passive flexion beyond limits'],
    ARRAY['Wound healed', 'Extension full', 'Flexion gain appropriate for protocol'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Hinged Elbow Brace (-30° extension block)', 'Full time', 'Protects from end-range flexion stretch'),
(p1_id, 'Active Grip Strength', '3 × 20 reps', 'Maintain forearm engagement'),
(p1_id, 'Shoulder AROM (Sling used)', '3 × 15 reps', 'Prevent shoulder stiffness');


-- 92. Little Leaguer''s Shoulder (Proximal Humerus Epiphysitis)
INSERT INTO protocols (name, category) VALUES ('Little Leaguer''s Shoulder', 'Paediatric & Special') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Complete Rest & Protection', 'Week 0–6+', 
    ARRAY['Allow growth plate healing', 'Identify biomechanical errors', 'Maintain cuff and scapular endurance without throwing'],
    ARRAY['NO throwing or overhead loading', 'Educate parents on growth plate continuum', 'Exclude humerus fracture'],
    ARRAY['Zero pain at rest and with AROM', 'X-ray evidence of physis narrowing/healing', 'Strong scapular base'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'No Throwing / Overhead Lifting', 'Daily', 'Mandatory for growth plate bone healing'),
(p1_id, 'Scapular Stability Exercises', '3 × 20 reps', 'Build the foundation for future throwing return'),
(p1_id, 'Internal Rotation Stretch (GIRD focus)', '3 × 45 sec', 'Address loss of IR common in overhead athletes');


-- 93. Juvenile Osgood-Schlatter (Paediatric Focus)
INSERT INTO protocols (name, category) VALUES ('Juvenile Osgood-Schlatter', 'Paediatric & Special') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Pain Management & Tissue Length', 'Week 0–4', 
    ARRAY['Reduce tibial tuberosity pain', 'Identify provocative sports', 'Long-term load management education'],
    ARRAY['Avoid complete rest — keep child active within pain tolerance', 'No aggressive quad stretching during flare-up', 'Bone maturation resolves the condition'],
    ARRAY['Pain ≤3/10 with daily activity', 'Reduced swelling at tuberosity'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Isometrics (Mid-range quad sets)', '3 × 15 reps', 'Maintain muscle tone without high patellar traction'),
(p1_id, 'Hamstring Stretching', '3 × 45 sec', 'Reduced posterior tension increases knee efficiency'),
(p1_id, 'Activity Pacing Program', 'Ongoing', 'Reduce jumping/running volume by 30-50% during peaks');


-- 94. Sinding-Larsen-Johansson Syndrome
INSERT INTO protocols (name, category) VALUES ('Sinding-Larsen-Johansson', 'Paediatric & Special') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Load Modification & Patellar Protection', 'Week 0–4', 
    ARRAY['Reduce inferior patellar pole pain', 'Offload patellar tendon traction', 'Parental education'],
    ARRAY['Similar to Osgood-Schlatter but at the lower pole of patella', 'Avoid deep squatting and jumping', 'Avoid aggressive quad stretching'],
    ARRAY['Pain-free walking', 'Minimal tenderness at inferior pole'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Quadriceps Isometrics', '5 × 45 sec, submaximal', 'Tendon/bone load policy — reduces pain'),
(p1_id, 'Calf Stretching', '3 × 45 sec', 'Reduce general lower limb tension'),
(p1_id, 'Hip Strengthening (Glutes)', '3 × 15 reps', 'Address proximal power to unload the knee');


-- 95. Perthes Disease (Legg-Calvé-Perthes)
INSERT INTO protocols (name, category) VALUES ('Perthes Disease', 'Paediatric & Special') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Joint Protection & ROM Maintenance', 'Week 0–12+', 
    ARRAY['Maintain hip ROM (especially Abduction)', 'Pain control', 'Prevent femoral head deformity'],
    ARRAY['NWB or PWB often required per orthopaedic plan', 'Avoid high impact or repetitive heavy loading', 'Regular X-ray monitoring'],
    ARRAY['Hip abduction >35°', 'Minimal pain during gait', 'Radiological stability'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Passive Hip Abduction (Supine)', '3 × 20 reps', 'Ensures femoral head seating in acetabulum'),
(p1_id, 'Stationary Bike (Low resistance)', '20 min daily', 'Cartilage nutrition and joint mobility'),
(p1_id, 'Pool Exercises (Buoyancy supported)', '30 min', 'Ideal environment for mobility in Perthes');

END $$;
