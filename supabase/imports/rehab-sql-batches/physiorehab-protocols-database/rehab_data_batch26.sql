-- rehab_data_batch26.sql
-- إضافة المرحلة الثانية لبروتوكولات الكتف والكاحل
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p2_id INTEGER;
BEGIN

-- Phase 2 for 9. Rotator Cuff Repair (Post-operative)
SELECT id INTO proto_id FROM protocols WHERE name = 'Rotator Cuff Repair (Post-operative)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Active-Assisted ROM & Early Activation', 'Week 6–12', 
        ARRAY['Full PROM', 'Gradual AAROM progress', 'Scapular stability', 'Decrease use of sling'],
        ARRAY['No heavy lifting/pulling', 'Avoid sudden reaching', 'No weight bearing through arm'],
        ARRAY['Pain-free AAROM to 140° elevation', 'Good scapular control', 'Minimal resting pain'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Pulley Exercises (Elevation)', '3 × 15 reps', 'Assisted range without high muscular demand'),
    (p2_id, 'Scapular Isometrics (Squeezes)', '3 × 10 reps, 5s hold', 'Foundation for rotator cuff function'),
    (p2_id, 'Table Slides (Flexion)', '3 × 15 reps', 'Gravity-assisted rhythmic initiation');
END IF;


-- Phase 2 for 10. Shoulder Impingement Syndrome
SELECT id INTO proto_id FROM protocols WHERE name = 'Shoulder Impingement Syndrome' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Strength & Scapular Integration', 'Week 4–8', 
        ARRAY['Address muscle imbalances', 'Improve rotator cuff endurance', 'Normalize scapulohumeral rhythm'],
        ARRAY['Avoid repetitive overhead work', 'Stop if "pinching" sensation returns', 'Monitor pectoralis tightness'],
        ARRAY['Full AROM without compensation', 'Stable scapula during elevation', 'Negative Hawkins-Kennedy test'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Side-lying External Rotation', '3 × 15 reps (v. light weight)', 'Isolate infraspinatus and teres minor'),
    (p2_id, 'Serratus Punch (Supine)', '3 × 15 reps', 'Critical for dynamic scapular upward rotation'),
    (p2_id, 'Prone Rows', '3 × 12 reps', 'Strengthen mid-traps and rhomboids for postural balance');
END IF;


-- Phase 2 for 13. Lateral Ankle Sprain (Grade I-II)
SELECT id INTO proto_id FROM protocols WHERE name = 'Lateral Ankle Sprain (Grade I-II)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Early Proprioception & Loading', 'Week 2–4', 
        ARRAY['Full weight bearing with normal gait', 'Basic balance stability', 'Eccentric strength initiation'],
        ARRAY['Avoid aggressive inversion on uneven ground', 'Monitor for "giving way" sensations'],
        ARRAY['Able to SLS for 30s', 'Pain-free calf raise', 'Normal dorsiflexion ROM'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Single Leg Stance (Firm surface)', '3 × 30-45 sec', 'Static balance and peroneal activation'),
    (p2_id, 'Ankle Eversion (Band resistance)', '3 × 20 reps', 'Strengthen primary lateral stabilisers (Peroneals)'),
    (p2_id, 'Toe Walks (Short distance)', '3 × 10 meters', 'Dynamic stability of the midfoot/ankle complex');
END IF;


-- Phase 2 for 4. Patellofemoral Pain Syndrome (PFPS)
SELECT id INTO proto_id FROM protocols WHERE name = 'Patellofemoral Pain Syndrome (PFPS)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Functional Strength & Alignment', 'Week 4–8', 
        ARRAY['Correct lower limb kinematics', 'Proximal (hip) strengthening', 'Increase quad torque without pain'],
        ARRAY['Limit deep squats if symptomatic', 'Ensure no valgus collapse during movement'],
        ARRAY['Pain-free step down (8-inch)', 'Negative patellar tilt on palpation', 'Ability to lunge without pain'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Clamshells (Resistance band)', '3 × 20 reps', 'Gluteus medius strength controls femoral internal rotation'),
    (p2_id, 'Weighted Glute Bridges', '3 × 15 reps', 'Posterior chain recruitment to offload the anterior knee'),
    (p2_id, 'Split Squats (Controlled)', '3 × 12 reps', 'Functional loading with focus on knee-over-toe alignment');
END IF;

END $$;
