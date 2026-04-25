-- rehab_data_batch58.sql
-- استكمال المراحل النهائية (Phases 3 & 4) لإصابات الظهر، الأعصاب، والأطفال
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p3_id INTEGER;
    p4_id INTEGER;
BEGIN

-- 18. Lumbar Disc Herniation - Phase 4: Spinal Performance
SELECT id INTO proto_id FROM protocols WHERE name = 'Lumbar Disc Herniation with Radiculopathy' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Performance Resilience & Maintenance', 'Month 6+', 
        ARRAY['Maximize spinal load capacity', 'Return to high-impact sport/manual labor', 'Lifetime maintenance plan'],
        ARRAY['Monitor for neurological signs during fatigue', 'Avoid sudden heavy unassisted forward bending early morning'],
        ARRAY['Oswestry score < 5%', 'Full confidence in heavy lifting'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p4_id, 'Kettlebell Swings (High volume)', '3 × 20 reps', 'Build explosive posterior chain endurance'),
    (p4_id, 'Farmers Walk (Heavy)', '3 × 40 meters', 'Global postural stabilization under load'),
    (p4_id, 'Barbell Cleans (Basic)', '3 × 5 reps', 'Integrated athletic movement with spinal neutral priority');
END IF;


-- 97. CRPS Type I - Phase 3 & 4: Full Mobilization
SELECT id INTO proto_id FROM protocols WHERE name = 'Complex Regional Pain Syndrome (CRPS Type I)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'High Intensity Graded Loading', 'Month 3+', 
        ARRAY['Integrated limb use in ADLs', 'Improve muscle strength and bulk', 'Address sympathetic tone'],
        ARRAY['Monitor for "flare-ups" longer than 24hrs', 'Use positive reinforcement'],
        ARRAY['Reduced limb color/temp changes', 'Grip/Limb strength symmetry > 75%'])
    RETURNING id INTO p3_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Social & Physical Re-integration', 'Month 6+', 
        ARRAY['Full return to previous social/physical life', 'Independent pain management skills', 'Strength maintenance'],
        ARRAY['Address emotional resilience', 'Prevent avoidant behavior'],
        ARRAY['Full return to work/activity'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Weighted ADL Tasks (Lifting/Carrying)', 'Daily 30 min', 'Normalizing the sensory experience of load'),
    (p4_id, 'Global Gym Conditioning', '3 sessions wkly', 'Integrated whole-body robustnes to reduce central sensitization');
END IF;


-- 91. Sever''s Disease - Phase 3 & 4: Sport Integration
SELECT id INTO proto_id FROM protocols WHERE name = 'Sever''s Disease (Calcaneal Apophysitis)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Impact Tolerance & Performance', 'Week 8–16', 
        ARRAY['Full return to impact sport', 'Improve calf/achilles power', 'Address jumping mechanics'],
        ARRAY['Monitor for heel pain during high-volume tournaments', 'Soft landings are key'],
        ARRAY['Zero pain with jumping', 'Symmetrical calf strength'])
    RETURNING id INTO p3_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Growth Phase Maintenance', 'Until Skeletal Maturity', 
        ARRAY['Maintain flexibility during growth spurts', 'Symptom-free development', 'Continued athletic development'],
        ARRAY['Re-screen flexibility every 3 months', 'Use heel cups if needed during heavy loads'],
        ARRAY['Completion of growth with zero chronic pain'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Plyometric Box Jumps', '3 × 12 reps', 'Build reactive power in the posterior chain'),
    (p4_id, 'Maintenance Gastroc/Soleus Stretches', 'Daily', 'Crucial during periods of rapid bone growth');
END IF;


-- 95. Juvenile Osgood-Schlatter - Phase 3 & 4
SELECT id INTO proto_id FROM protocols WHERE name = 'Juvenile Osgood-Schlatter' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Advanced Power & Agility', 'Week 12+', 
        ARRAY['Full sport-specific speed/agility', 'Maximal quad load tolerance', 'Safe return to competition'],
        ARRAY['Avoid sudden load spikes after periods of rest', 'Ice after matches'],
        ARRAY['Zero pain with maximal acceleration', 'Good landing mechanics'])
    RETURNING id INTO p3_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Prevention & Maintenance', 'Ongoing', 
        ARRAY['Maintain quadriceps length during growth', 'Prevent recurrence of apophysitis', 'Independent load monitoring'],
        ARRAY['Continue flexibility training', 'Monitor footwear'],
        ARRAY['Skeletal maturity achieved without disability'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Linear Sprints with Deceleration', '5 reps, 20m', 'Specific load for the patellar tendon energy storage'),
    (p4_id, 'Standing Quad Stretches (Maintenance)', 'Daily', 'Reduce tensile load on the tibial tubercle during growth/sport');
END IF;

END $$;
