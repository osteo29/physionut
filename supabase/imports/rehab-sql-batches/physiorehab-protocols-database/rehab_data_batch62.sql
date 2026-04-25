-- rehab_data_batch62.sql
-- استكمال المراحل (2-4) لإصابات الركبة والكتف الأولية التي بدأت في الدفعات الأولى
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p2_id INTEGER;
    p3_id INTEGER;
    p4_id INTEGER;
BEGIN

-- 2. Meniscus Tear (Conservative) - Phase 2, 3 & 4
SELECT id INTO proto_id FROM protocols WHERE name = 'Meniscus Tear (Conservative)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Isotonic Loading & Stability', 'Week 4–8', 
        ARRAY['Improve quad and hamstring strength', 'Normalise gait mechanics', 'Establish neutral knee stability'],
        ARRAY['Avoid deep squats (> 90°) initially', 'No pivoting under load'],
        ARRAY['Full pain-free extension', 'Neg McMurray test early range'])
    RETURNING id INTO p2_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'High Intensity Loading & Power', 'Week 8–16', 
        ARRAY['Restore full joint power', 'Safe cutting and pivoting', 'Return to impact'],
        ARRAY['Monitor for "locking" during high speed work', 'Soft landing mechanics'],
        ARRAY['Symmetrical lower limb strength', 'Hop symmetry > 90%'])
    RETURNING id INTO p3_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Functional Resilience & Discharge', 'Month 4+', 
        ARRAY['Independent sport participation', 'Maximize robustness and joint health', 'Prevention of secondary OA'],
        ARRAY['Monitor for effusion after high-volume sessions'],
        ARRAY['Full functional confidence', 'Zero recurring symptoms'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Step-ups', '3 × 15 reps', 'Functional loading through middle range'),
    (p3_id, 'Split Squats', '3 × 12 reps', 'High intensity quad and balance work'),
    (p4_id, 'Pogo Hops', '3 × 20 reps', 'Tendon stiffness and joint reactive power');
END IF;


-- 3. ACL Strain (Grade I-II) - Phase 2, 3 & 4
SELECT id INTO proto_id FROM protocols WHERE name = 'ACL Strain (Grade I-II - Conservative)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Dynamic Stability & Initial Plyometrics', 'Week 4–12', 
        ARRAY['Improve reactive stability', 'Initiate low-level plyometrics', 'Maximize quad activation'],
        ARRAY['Ensure no medial collapse during movement', 'Limit rapid change-of-direction initially'],
        ARRAY['Positive stability on single leg hop', 'Symmetrical quad power'])
    RETURNING id INTO p2_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Advanced Strength & Sport Drills', 'Week 12–24', 
        ARRAY['Full agility and reactive cutting', 'Maximize explosive power', 'Return to sport-specific drills'],
        ARRAY['Monitor for "giving way" sensation'],
        ARRAY['LSI > 90%', 'Neg Lachman/Pivot Shift'])
    RETURNING id INTO p3_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Performance Maintenance & Prevention', 'Month 6+', 
        ARRAY['Unrestricted sport return', 'Maintenance of peak power', 'Prevention of re-injury'],
        ARRAY['Zero skipping of maintenance drills'],
        ARRAY['Full return to competition'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Ladder Drills (Linear)', '5 min', 'Focus on quick footwork and control'),
    (p3_id, '45° Cutting Drills', '3 × 10 reps', 'Specific ACL loading during directional change'),
    (p4_id, 'Full Match Play Simulation', 'Graded time', 'Integrated athletic endurance and power');
END IF;

END $$;
