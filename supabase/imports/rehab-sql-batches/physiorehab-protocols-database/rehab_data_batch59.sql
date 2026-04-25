-- rehab_data_batch59.sql
-- استكمال المراحل النهائية (Phases 3 & 4) لإصابات اليد، القدم، والركبة
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p3_id INTEGER;
    p4_id INTEGER;
BEGIN

-- 75. 5th Metatarsal Fracture - Phase 4: Maintenance
SELECT id INTO proto_id FROM protocols WHERE name = '5th Metatarsal Fracture (Jones/Stress)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Performance Resilience & Maintenance', 'Month 6+', 
        ARRAY['Maintain peak bone mineral density', 'Integrated lower limb power', 'Zero recurring aching'],
        ARRAY['Gradual return to high-volume lateral sports (Soccer/Tennis)', 'Monitor for focal pain'],
        ARRAY['Full unrestricted season play', 'Hop symmetry > 95%'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p4_id, 'Lateral Speed Skaters', '3 × 15 reps', 'High intensity frontal plane load to test the 5th metatarsal resilience'),
    (p4_id, 'Weighted Heel Raises (Single leg)', '3 × 12 reps (heavy)', 'Maintenance of calf power'),
    (p4_id, 'Agility Ladders (Cross-over focus)', '5 min', 'Integrated foot speed and lateral stability');
END IF;


-- 98. PCL Reconstruction - Phase 4: Competitive Return
SELECT id INTO proto_id FROM protocols WHERE name = 'PCL Reconstruction' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Conditioning & Match Readiness', 'Month 9+', 
        ARRAY['Full competitive return to matches', 'Maximize reactive power', 'Prevention of secondary OA'],
        ARRAY['Avoid repetitive heavy deep squats (> 120°) under heavy load indefinitely', 'Maintain high quad-ham ratio'],
        ARRAY['LSI > 95%', 'Negative posterior drawer test stable'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p4_id, 'Contact Training Drills', '20 min', 'Specific preparation for pivoting and contact'),
    (p4_id, 'Maximal Velocity Sprints', '5-8 sets, 30m', 'High level load for the PCL stabilizing mechanism'),
    (p4_id, 'Squat Jumps into Sprint', '3 × 10 reps', 'Integrated power and task transition');
END IF;


-- 6. MCL Sprain (Grade II) - Phase 4: Prevention & Performance
SELECT id INTO proto_id FROM protocols WHERE name = 'MCL Sprain (Grade II)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Maintenance & Valgus Resilience', 'Month 4+', 
        ARRAY['Zero recurring medial joint pain', 'Maintain peak adductor and gluteal strength', 'Unrestricted sports'],
        ARRAY['Maintain neuromuscular control during fatigue', 'Avoid sudden volume spikes initially'],
        ARRAY['Full symmetric power', 'Confidence in contact'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p4_id, 'Lateral Bounding with Resistance', '3 × 12 reps', 'Specific training for the medial knee constraints'),
    (p4_id, 'Crossover Lunges', '3 × 15 reps', 'Integrated athletic movement with frontal plane challenge'),
    (p4_id, 'Agility Drills (Reactive T-test)', '5 rounds', 'Test the MCL reactive stability under speed');
END IF;


-- 85. Boutonniere Deformity - Phase 3 & 4
SELECT id INTO proto_id FROM protocols WHERE name = 'Boutonniere Deformity' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Advanced Strength & Hand Dexterity', 'Week 12+', 
        ARRAY['Maximize grip and pinch power', 'Stable hand function during high tasks', 'Restore full finger coordination'],
        ARRAY['Avoid forced end-range flexion if extensor lag returns', 'Monitor for swelling'],
        ARRAY['Full functional use of hand', 'Total AROM > pre-injury levels'])
    RETURNING id INTO p3_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Discharge & Maintenance', 'Month 4+', 
        ARRAY['Independent maintenance of range', 'Functional resilience for work/hobby', 'Prevention of recurrence'],
        ARRAY['Use protective splint for contact sports/impact', 'Maintain intrinsic flexibility'],
        ARRAY['Successful return to previous level of hand function'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Weighted Finger Extensions', '3 × 15 reps', 'Strengthen the extensor mechanism against load'),
    (p4_id, 'Hand Grip (Heavy Putty)', '3 × 12 reps', 'Global hand power maintenance');
END IF;

END $$;
