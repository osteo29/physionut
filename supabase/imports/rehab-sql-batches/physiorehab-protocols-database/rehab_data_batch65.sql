-- rehab_data_batch65.sql
-- استكمال المراحل (2-4) لإصابات الركبة المتخصصة والكسور الإجهادية والحوض
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p2_id INTEGER;
    p3_id INTEGER;
    p4_id INTEGER;
BEGIN

-- 1. Medial Plica Syndrome - Phase 2, 3 & 4
SELECT id INTO proto_id FROM protocols WHERE name = 'Medial Plica Syndrome (Conservative)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Cuff Strengthening & Load Management', 'Week 4–8', 
        ARRAY['Address muscle imbalances (VM/VL)', 'Improve hip/core stability', 'Normalise joint gliding'],
        ARRAY['Avoid repetitive impact that causes "snapping"', 'Monitor for synovial irritation'],
        ARRAY['Zero clicking in active ROM', 'Able to do 20 step-ups without pain'])
    RETURNING id INTO p2_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'High Intensity Loading & Power', 'Week 8–16', 
        ARRAY['Restore full joint power', 'Safe return to sport impact', 'Maintain joint lubrication through movement'],
        ARRAY['Monitor for effusion after high-volume sessions'],
        ARRAY['LSI > 90%', 'Neg Plica test'])
    RETURNING id INTO p3_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Functional Resilience & Discharge', 'Month 4+', 
        ARRAY['Independent participation', 'Integrated preventive training', 'Zero recurring friction'],
        ARRAY['Independent pacing'],
        ARRAY['Full pain-free sport participation'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Terminal Knee Extensions (Quads)', '3 × 15 reps', 'Focus on VMO activation to improve patellar tracking away from the plica'),
    (p3_id, 'Lateral Speed Skaters', '3 × 12 reps', 'Stability in the frontal plane'),
    (p4_id, 'Plyometric Slams', '3 × 10 reps', 'High level coordinated power');
END IF;


-- 2. Tibial Stress Fracture - Phase 2, 3 & 4
SELECT id INTO proto_id FROM protocols WHERE name = 'Tibial Stress Fracture (Conservative)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Graduated Loading & Impact Intro', 'Week 6–12', 
        ARRAY['Initial impact tolerance (Walking/Light pogo)', 'Improve lower limb muscle mass', 'Establish healthy biomechanics'],
        ARRAY['Stop at any focal pain over the bone', 'Avoid fast running initially'],
        ARRAY['Zero pain with walking 30 min', 'Heel raise test painless'])
    RETURNING id INTO p2_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Return to Running & Agility', 'Week 12–24', 
        ARRAY['Graduated return to running mileage', 'Sport-specific agility drills', 'Maximize bone mineral density through load'],
        ARRAY['Use "Run/Walk" intervals initially', 'Monitor recovery 24-hours after impact'],
        ARRAY['Completion of return-to-run program without pain'])
    RETURNING id INTO p3_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Maintenance & Prevention', 'Month 6+', 
        ARRAY['Independent mileage management', 'Integrated global robustness', 'Fracture site resilience'],
        ARRAY['Zero focal bone pain allowed'],
        ARRAY['Full return to competition'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Double Leg Pogo Hops', '3 × 30 sec', 'Gradual re-introduction of elastic energy and bone loading'),
    (p3_id, 'Interval Running (1:1 ratio)', '15 min session', 'Tolerate repetitive load cycles'),
    (p4_id, 'Maximal Velocity Sprints', '5 reps, 30m', 'High level stimulus for bone adaptation');
END IF;


-- 3. Sports Hernia (Athletic Pubalgia) - Phase 2, 3 & 4
SELECT id INTO proto_id FROM protocols WHERE name = 'Athletic Pubalgia (Sports Hernia)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Pelvic-Core Stabilisation & Isotonic', 'Week 4–8', 
        ARRAY['Balance the adductor/abdominal force couple', 'Integrated core/hip strength', 'Normalise ADL pain'],
        ARRAY['Avoid "sit-ups" or pure straight-leg raises early', 'Monitor for groin irritation'],
        ARRAY['Reduced pain with coughing/sneezing', 'Pain-free adductor squeeze'])
    RETURNING id INTO p2_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'High Intensity Agility & Power', 'Week 8–16', 
        ARRAY['Restore full kicking/sprinting power', 'Multi-planar pelvic resilience', 'Return to sport drills'],
        ARRAY['Monitor for "tugging" during maximal sprinting'],
        ARRAY['LSI > 90%', 'HAGOS score improvement'])
    RETURNING id INTO p3_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Conditioning & Prevention', 'Month 4+', 
        ARRAY['Independent participation', 'Prevention of recurrence through adductor/core maintenance', 'Long-term pelvic health'],
        ARRAY['Pacing the load'],
        ARRAY['Full pain-free sport participation'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Copenhagen Plank (Level 1 - Knees)', '3 × 20 sec', 'Specific adductor loading to stabilize the pubic symphysis'),
    (p3_id, 'Medicine Ball Rotations', '3 × 15 reps', 'High intensity transverse plane core-hip power'),
    (p4_id, 'Sprint-Start Drills', '5 reps', 'Final check for power transfer across the pelvis');
END IF;

END $$;
