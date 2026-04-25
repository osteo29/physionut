-- rehab_data_batch27.sql
-- إضافة المرحلة الثالثة والعودة للنشاط لأهم البروتوكولات
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p3_id INTEGER;
BEGIN

-- Phase 3 for 1. ACL Reconstruction (Hamstring Graft)
SELECT id INTO proto_id FROM protocols WHERE name = 'ACL Reconstruction (Hamstring Graft)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Plyometrics & Dynamic Control', 'Week 12–24', 
        ARRAY['Symmetrical quad strength (>90%)', 'Safe landing mechanics', 'Initiate straight line running'],
        ARRAY['No contact sports yet', 'Monitor for "rotational instability"'],
        ARRAY['Hop test symmetry > 90%', 'Pain-free running', 'Psychological readiness (ACL-RSI scale)'])
    RETURNING id INTO p3_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Double-Leg Box Jumps (Landing focus)', '3 × 10 reps', 'Soft landing, avoid valgus, emphasize attenuation'),
    (p3_id, 'Linear Running (Intervals)', '10 min walk/run mix', 'Gradual re-introduction of impact forces'),
    (p3_id, 'Agility Ladders (Basic)', '5 min', 'Improve neuromuscular footwork speed');
END IF;


-- Phase 2 for 17. Non-specific Low Back Pain (Acute)
SELECT id INTO proto_id FROM protocols WHERE name = 'Non-specific Low Back Pain (Acute)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Core Stability & Functional Load', 'Week 2–6', 
        ARRAY['Eliminate fear-avoidance beliefs', 'Increase spinal load tolerance', 'Return to full ADLs'],
        ARRAY['Progress intensity gradually', 'Avoid extreme repetitive end-range bending'],
        ARRAY['Pain-free lumbar ROM', 'Safe lifting of 10kg with good form', 'No neurological symptoms'])
    RETURNING id INTO p3_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Bird-Dog (Controlled level)', '3 × 12 reps each side', 'Spine stabilization against rotational force'),
    (p3_id, 'Deadlift Technique (Dowels or light weight)', '3 × 15 reps', 'Restore hip hinge pattern — offload the back'),
    (p3_id, 'Brisk Walking', '30 min daily', 'Movement is medicine for disc nutrition and muscle tone');
END IF;


-- Phase 2 for 46. Hip Osteoarthritis (Conservative)
SELECT id INTO proto_id FROM protocols WHERE name = 'Hip Osteoarthritis (Conservative)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Joint Loading & Global Strength', 'Week 6–12', 
        ARRAY['Increase walking distance without limp', 'Strengthen glutes and quads', 'Improve joint lubrication'],
        ARRAY['Avoid high-impact jumping', 'Use anti-inflammatories if flare-ups occur'],
        ARRAY['Walk 20 min without increased pain', 'Positive trend in WOMAC score', 'Improved balance and gait'])
    RETURNING id INTO p3_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Standing Hip Abduction (Band)', '3 × 15 reps', 'Improve lateral stability for gait'),
    (p3_id, 'Water Aerobics (Walking/leg lifts)', '30 min session', 'Low-impact resisted exercise — buoyant relief'),
    (p3_id, 'Stair Step-downs (Controlled)', '3 × 10 reps', 'Eccentric control of the knee/hip complex');
END IF;


-- Phase 3 for 13. Lateral Ankle Sprain (Grade I-II)
SELECT id INTO proto_id FROM protocols WHERE name = 'Lateral Ankle Sprain (Grade I-II)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Return to Sport / Play', 'Week 4–8', 
        ARRAY['Full agility speed', 'Confident cutting movements', 'Brace weaning (if applicable)'],
        ARRAY['Avoid uneven surfaces without support initially', 'Ice after high intensity sessions'],
        ARRAY['Figure-of-8 run (Pain-free)', 'Star Excursion Balance Test within 5% of other side', 'No subjective instability'])
    RETURNING id INTO p3_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Plyometric Skater Hops', '3 × 12 reps', 'Develop lateral explosive power and control'),
    (p3_id, 'Cutting Drills (Change of direction)', '3 × 10 reps (45°)', 'Functional sport-specific simulation'),
    (p3_id, 'Reactive Balance (Toss ball while on one leg)', '5 min', 'Neurocognitive demand while stabilizing');
END IF;

END $$;
