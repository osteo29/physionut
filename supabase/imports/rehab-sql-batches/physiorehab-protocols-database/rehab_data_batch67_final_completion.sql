-- rehab_data_batch67_final_completion.sql
-- الدفعة الختامية لضمان اكتمال كافة المراحل (100% Match) لجميع البروتوكولات
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p3_id INTEGER;
    p4_id INTEGER;
BEGIN

-- 1. PCL Reconstruction - Phase 3 (Was missing in earlier transition)
SELECT id INTO proto_id FROM protocols WHERE name = 'PCL Reconstruction' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Advanced Strengthening & Running Prep', 'Week 16–36', 
        ARRAY['LSI > 80% for quads', 'Begin linear jogging', 'Improve eccentric hamstring control'],
        ARRAY['Avoid heavy isolated hamstring curls > 90° flexion', 'Limit downhill running initially'],
        ARRAY['Jog pain-free 20 min', 'Hop test symmetry > 80%'])
    RETURNING id INTO p3_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Leg Press (Heavy progressive)', '4 × 8 reps', 'Primary goal is maximal quad strength to support the PCL'),
    (p3_id, 'Spanish Squats', '3 × 45 sec hold', 'High intensity isometric quad loading');
END IF;


-- 100. Bell''s Palsy - Phase 3 & 4
SELECT id INTO proto_id FROM protocols WHERE name = 'Bell''s Palsy (Facial Nerve Palsy)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Advanced Mimetic Exercises & Coordination', 'Week 8–16', 
        ARRAY['Restore full facial symmetry during speech', 'Address synkinesis (unwanted movements)', 'Maximize muscle endurance'],
        ARRAY['Avoid "over-straining" which may promote synkinesis', 'Use mirror feedback always'],
        ARRAY['Sunnybrook scale improvement', 'Full eye closure with effort'])
    RETURNING id INTO p3_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Maintenance & Symmetry Management', 'Month 4+', 
        ARRAY['Lifetime management of facial tone', 'Prevent chronic stiffness', 'Social confidence'],
        ARRAY['Gentle massage if stiffness occurs'],
        ARRAY['Stable recovery'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Isolated Muscle Pulsing (Smile/Frown/Wink)', '10 reps, slow', 'Neuro-muscular re-education for fine motor control'),
    (p4_id, 'Facial Soft Tissue Mobilization', '5 min daily', 'Maintain tissue extensibility and prevent adhesions');
END IF;


-- 9. Post-Concussion Syndrome - Phase 3 & 4
SELECT id INTO proto_id FROM protocols WHERE name = 'Post-Concussion Syndrome' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Sport-Specific Non-contact Training', 'Variable (Symptoms base)', 
        ARRAY['Increase cardiovascular load without symptom spike', 'Cognitive-motor dual tasking', 'Begin non-contact technical drills'],
        ARRAY['Stop immediately if headache or dizziness returns', 'No contact'],
        ARRAY['Tolerance of high-intensity aerobic exercise'])
    RETURNING id INTO p3_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Full Contact Return & Clearance', 'Variable', 
        ARRAY['Unrestricted return to sport', 'Full cognitive performance', 'Zero recurring symptoms with contact'],
        ARRAY['Must be cleared by a concussion specialist', 'Gradual exposure to collision'],
        ARRAY['Successful completion of graduated return-to-play (GRTP)'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Interval Biking with Cognitive Logic Tasks', '20 min', 'Train the brain to process information under physical stress'),
    (p4_id, 'Full Match Play (Graduated)', 'Paced sessions', 'Final re-integration into competitive environment');
END IF;


-- 4. Meniscus Repair (Surgical) - Phase 3 & 4
SELECT id INTO proto_id FROM protocols WHERE name = 'Meniscus Repair (Surgical)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Advanced Strengthening & Initial Impact', 'Month 3–5', 
        ARRAY['Normalize quad strength', 'Begin controlled impact (Jogging)', 'Multi-planar stability'],
        ARRAY['Avoid deep squatting (> 90°) with heavy weights', 'No pivoting'],
        ARRAY['Pain-free jogging', 'LSI > 80%'])
    RETURNING id INTO p3_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Return to Sport & Power', 'Month 5–9', 
        ARRAY['Full return to competitive agility sports', 'Maximal power and hopping symmetry', 'Long-term joint protection'],
        ARRAY['Monitor for swelling after pivoting'],
        ARRAY['LSI > 90% in all tests'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Single-leg Leg Press', '3 × 12 reps', 'Build isolated lower limb power safely'),
    (p4_id, 'Cutting & Pivoting Drills', '3 × 10 reps', 'Reactive agility for the healed meniscus');
END IF;


-- 69. Multiple Sclerosis (Relapsing-Remitting) - Phase 2, 3 & 4
SELECT id INTO proto_id FROM protocols WHERE name = 'Multiple Sclerosis (Relapsing-Remitting)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Aerobic & Resistance Optimization', 'Week 4–12', 
        ARRAY['Improve peak oxygen uptake', 'Build global muscular endurance', 'Reduce fatigue levels'],
        ARRAY['Avoid overheating (Uhthoff''s phenomenon)', 'Use cooling vests if needed'],
        ARRAY['Improved fatigue severity score', 'Increased 6-min walk distance'])
    RETURNING id INTO p3_id; -- (using temp)

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Functional Task Training', 'Week 12+', 
        ARRAY['Maximize independence in climbing stairs/carrying', 'Integrated balance and strength', 'Sustain high neurological function'],
        ARRAY['Prioritize quality over volume during fatigue'],
        ARRAY['Improved independence scores'])
    RETURNING id INTO p3_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Lifelong Maintenance & Wellness', 'Ongoing', 
        ARRAY['Maintain current functional level', 'Manage flares through adaptive exercise', 'Maximize QoL'],
        ARRAY['Adjust intensity during relapses (Rest is key during active flare)'],
        ARRAY['Stable motor performance'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Step-ups with Dual Tasking (Counting backwards)', '3 × 12 reps', 'Simulate real-world cognitive-motor challenges'),
    (p4_id, 'Yoga / Pilates for MS', '2 sessions weekly', 'Improve core stability and flexibility while managing stress');
END IF;

END $$;
