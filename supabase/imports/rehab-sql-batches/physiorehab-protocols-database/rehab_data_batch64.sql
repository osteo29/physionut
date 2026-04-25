-- rehab_data_batch64.sql
-- استكمال المراحل (2-4) لإصابات العظام والكسور في الطرف العلوي
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p2_id INTEGER;
    p3_id INTEGER;
    p4_id INTEGER;
BEGIN

-- 2. AC Joint Sprain (Grade I-II) - Phase 2, 3 & 4
SELECT id INTO proto_id FROM protocols WHERE name = 'AC Joint Sprain (Grade I-II)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Cuff Strengthening & Initial Loading', 'Week 4–8', 
        ARRAY['Restore rotator cuff stability', 'Initial resistance above 90° elevation', 'Address scapular dyskinesis'],
        ARRAY['No heavy unassisted overhead lifting initially', 'Avoid horizontal adduction'],
        ARRAY['Pain-free elevation to 150°', 'Negative Paxinos test'])
    RETURNING id INTO p2_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Advanced Strength & Sport Drills', 'Week 8–16', 
        ARRAY['Full return to heavy lifting/sport', 'Maximize explosive shoulder power', 'Stability during contact'],
        ARRAY['Monitor for "clicking" or local pain during heavy push exercises'],
        ARRAY['Negative Cross-arm test', 'Full symmetrical strength'])
    RETURNING id INTO p3_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Conditioning & Prevention', 'Month 4+', 
        ARRAY['Maintenance of AC joint stability', 'Global upper body robustness', 'Long-term shoulder health'],
        ARRAY['Gradual return to contact (Rugby/Judo)'],
        ARRAY['Zero activity restrictions'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Shoulder External Rotation (Band)', '3 × 15 reps', 'Offload the AC joint through dynamic centering of the humeral head'),
    (p3_id, 'Push-up into Plank Plus', '3 × 12 reps', 'Integrated scapular and girdle stability'),
    (p4_id, 'Dumbbell Snatch (Light-to-Moderate)', '3 × 10 reps', 'High level coordinated power');
END IF;


-- 1. Clavicle Fracture (Non-operative) - Phase 2, 3 & 4
SELECT id INTO proto_id FROM protocols WHERE name = 'Clavicle Fracture (Non-operative)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Mobilization & Muscle Recruitment', 'Week 6–12', 
        ARRAY['Restore full passive and active ROM', 'Early concentric resistance', 'Normalise scapular motion'],
        ARRAY['Avoid heavy lifting (> 2kg) until clinical union confirmed', 'No contact sports'],
        ARRAY['Full active ROM in all planes', 'X-ray showing callus formation'])
    RETURNING id INTO p2_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Resistance & Load Re-introduction', 'Week 12–20', 
        ARRAY['Return to previous strength levels', 'Address global upper body deficits', 'Initial explosive drills'],
        ARRAY['Monitor for focal pain over fracture site during loading'],
        ARRAY['DASH Score < 10%', 'Clinical union fully confirmed'])
    RETURNING id INTO p3_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Functional Return & Maintenance', 'Month 5+', 
        ARRAY['Full competitive return to sports', 'Maintenance of shoulder health', 'Fracture site resilience'],
        ARRAY['Zero pain with maximal loading'],
        ARRAY['Full return to competition'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Shoulder Pulley Extension', '10 reps', 'Maintain joint mobility safely'),
    (p3_id, 'Dumbbell Rows', '3 × 12 reps', 'Build posterior girdle strength to support the clavicle'),
    (p4_id, 'Overhead Press (Progressive)', '3 × 10 reps', 'Final check for bone and muscle loading capacity');
END IF;


-- 3. humerus fracture (mid-shaft) - Phase 2, 3 & 4
SELECT id INTO proto_id FROM protocols WHERE name = 'Humeral Shaft Fracture' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Mobilization & Early Loading', 'Week 6–12', 
        ARRAY['Full ROM of shoulder and elbow', 'Establish light muscle activation', 'Reduce edema'],
        ARRAY['Avoid torsion/twisting forces at fracture site', 'Use brace as directed'],
        ARRAY['Active ROM > 90% other side', 'Clinical healing on X-ray'])
    RETURNING id INTO p2_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Integrated Strength & Resistance', 'Week 12–24', 
        ARRAY['Restore push/pull power', 'Address shoulder/elbow/wrist chain', 'ADL re-integration'],
        ARRAY['Avoid overhead explosive tasks initially'],
        ARRAY['Full symmetrical strength'])
    RETURNING id INTO p3_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Full Recovery & Discharge', 'Month 6+', 
        ARRAY['Independent gym/sport return', 'Maintenance of limb bone health', 'Prevention of recurrence'],
        ARRAY['Zero pain with high resistance'],
        ARRAY['Full function'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Bicep/Tricep Isometrics', '3 × 10 reps', 'Maintain muscle mass without moving the bone excessively'),
    (p3_id, 'Cable Chest Press', '3 × 15 reps', 'Controlled directional load'),
    (p4_id, 'Pull-ups', '3 × 8 reps', 'Final check for integrated limb strength');
END IF;

END $$;
