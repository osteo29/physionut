-- rehab_data_batch精神.sql
-- استكمال المرحلة الرابعة (Phase 4: Return to Performance) لأهم الإصابات الرياضية والعمود الفقري
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p4_id INTEGER;
BEGIN

-- 1. ACL Reconstruction - Phase 4: Return to Performance & Prevention
SELECT id INTO proto_id FROM protocols WHERE name = 'ACL Reconstruction (Hamstring Graft)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Return to Performance & Injury Prevention', 'Month 9+', 
        ARRAY['Full unrestricted return to sport', 'Maintain > 100% limb symmetry in power', 'Psychological readiness for contact'],
        ARRAY['Avoid sudden massive volume spikes in training', 'Continue ACL prevention drills twice weekly'],
        ARRAY['LSI > 100% (Limb Symmetry Index)', 'Successful return to match play', 'No fear of re-injury (ACL-RSI)'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p4_id, 'Contact Simulation Drills', '20-30 min', 'Prepare the knee for unpredictable external forces'),
    (p4_id, 'Plyometric Depth Jumps (Advanced)', '3 × 8 reps', 'Maximal power and force attenuation training'),
    (p4_id, 'FIFA 11+ Prevention Program', 'Integrated 20 min', 'Evidence-based maintenance to prevent second ACL rupture');
END IF;


-- 13. Lateral Ankle Sprain - Phase 4: Maintenance & Prevention
SELECT id INTO proto_id FROM protocols WHERE name = 'Lateral Ankle Sprain (Grade I-II)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Maintenance & Recurrence Prevention', 'Week 12+', 
        ARRAY['Zero recurrence of sprains', 'Maximal peroneal reaction time', 'Integrated lower limb power'],
        ARRAY['Ensure appropriate footwear for sport', 'Taping/Bracing weaning (if appropriate)'],
        ARRAY['Zero subjective instability', 'Full seasonal participation without issue'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p4_id, 'Unstable Surface Reactive Balance', '10 min', 'Train the ankle to react to quick perturbations'),
    (p4_id, 'Hopping Agility Circuits', '3 rounds', 'integrated foot-eye coordination under fatigue'),
    (p4_id, 'Peroneal Power Loading', '3 × 15 reps (heavy)', 'Dynamic lateral protection capacity');
END IF;


-- 14. Non-specific Low Back Pain - Phase 4: Lifetime Spine Health
SELECT id INTO proto_id FROM protocols WHERE name = 'Non-specific Low Back Pain (Acute)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Lifetime Prevention & Advanced Load', 'Month 4+', 
        ARRAY['Consistent spinal load tolerance', 'Integrated core/hip strength', 'Zero fear-avoidance behavior'],
        ARRAY['Maintain active lifestyle', 'Pace volume during high stress periods'],
        ARRAY['Zero activity restrictions', 'Confidence in managing minor flare-ups'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p4_id, 'Heavy Deadlifts / Squats (Maintenance)', '3 × 8 reps', 'Building a high threshold for spinal tolerance'),
    (p4_id, 'Multi-planar Core Rotations', '3 × 12 reps', 'Stability against complex directional forces'),
    (p4_id, 'Compound Lifting (Cleans/Snatch basics)', '3 × 5 reps', 'Integrated power and movement quality');
END IF;


-- 11. Achilles Tendinopathy - Phase 4: Maintenance & Prevention
SELECT id INTO proto_id FROM protocols WHERE name = 'Achilles Tendinopathy' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Sport-Specific Performance & Maintenance', 'Month 6+', 
        ARRAY['Maximize vertical power and speed', 'Tendon maintenance loading', 'Prevent recurrence'],
        ARRAY['Monitor 24-hour tendon reaction to high load', 'Gradual shoe type transitions'],
        ARRAY['Symmetrical power tests', 'VISA-A score > 90'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p4_id, 'Maximal Velocity Sprints', '5-8 reps', 'Highest level of tendon elastic loading'),
    (p4_id, 'Heavy Slow Resistance (HSR Maintenance)', '1 × weekly (heavy)', 'Maintain tendon structural integrity'),
    (p4_id, 'Plyometric Jump Squats', '3 × 10 reps', 'Global power integration');
END IF;

END $$;
