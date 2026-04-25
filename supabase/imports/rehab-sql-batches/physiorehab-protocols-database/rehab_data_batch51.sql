-- rehab_data_batch51.sql
-- استكمال البيانات للمراحل الاحترافية (Tibial Stress Fracture, Femoral Stress Reaction, Perthes, Tibialis Anterior)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER;
    p2_id INTEGER;
    p3_id INTEGER;
BEGIN

-- 47. Tibial Stress Fracture (Return to Running) - Phase 1, 2 & 3
SELECT id INTO proto_id FROM protocols WHERE name = 'Tibial Stress Fracture (Return to Running)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    -- Phase 1
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 1, 'Bone Healing & Unloaded Movement', 'Week 0–6', 
        ARRAY['Achieve painless ADLs', 'Optimize vitamin D/calcium intake', 'Maintain calf/quad endurance (unloaded)'],
        ARRAY['No running or jumping', 'Avoid walking on hard surfaces if painful'],
        ARRAY['Pain-free palpation of the tibia', 'Pain-free weight bearing'])
    RETURNING id INTO p1_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p1_id, 'Pool Running (Deep water)', '3 sessions per wk', 'Maintain cardiovascular fitness and running mechanics without impact'),
    (p1_id, 'Seated Calf Raises', '3 × 15 reps', 'Maintenance of muscle volume without weight-bearing force'),
    (p1_id, 'Quad Sets & SLR', '3 × 15 reps', 'Maintain global limb power');

    -- Phase 2
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Gradual Impact Loading', 'Week 6–12', 
        ARRAY['Begin run/walk progression', 'Improve impact attenuation mechanics', 'Symmetrical lower limb strength'],
        ARRAY['Must follow a "reloading" schedule (e.g. Alter-G or 1-min walk/run)', 'Stop immediately if aching persists for > 1hr'],
        ARRAY['Able to run 30 min at 70% intensity pain-free', 'Negative vibration test (tuning fork)'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Weighted Wall Squats', '3 × 15 reps', 'Improve axial load tolerance through the tibia'),
    (p2_id, 'Double-leg Pogo Hops', '3 × 20 reps', 'Introduce controlled impact under high stiffness'),
    (p2_id, 'Modified Step-downs', '3 × 15 reps', 'Neuromuscular control of the lower limb axis');

    -- Phase 3
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Full Return to High-Intensity Running', 'Week 12+', 
        ARRAY['Full return to mileage/sport', 'Long term monitoring of load spikes', 'Bone health maintenance'],
        ARRAY['Avoid sudden jumps in weekly mileage (> 10%)', 'Ice after initial high-volume sessions'],
        ARRAY['Running mileage symmetric to pre-injury levels', 'Symmetry in single-leg bounding'])
    RETURNING id INTO p3_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Single-leg Bounding', '3 × 15 meters', 'High level force attenuation'),
    (p3_id, 'Sprint Starts', '5 reps, 20 meters', 'Peak tibial loading through vertical ground reaction forces'),
    (p3_id, 'Plyometric Box Landings', '3 × 10 reps', 'Force absorption training');
END IF;


-- 97. Perthes Disease - Phase 1 & 2
SELECT id INTO proto_id FROM protocols WHERE name = 'Perthes Disease' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 1, 'Hip Protection & Motion Maintenance', 'Phase: Fragmentation', 
        ARRAY['Maintain hip abduction range', 'Control pain and synovitis', 'Prevent femoral head collapse'],
        ARRAY['Avoid forced high-impact sports initially (as per orthopaedist)', 'Limit activities that cause deep groin pain'],
        ARRAY['Stable hip ROM', 'Low baseline pain'])
    RETURNING id INTO p1_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p1_id, 'Passive Hip Abduction (Supine)', '3 × 30 sec', 'Keeps the femoral head seated in the acetabulum'),
    (p1_id, 'Active Quad Sets', '3 × 15 reps', 'Maintenance of muscle bulk without joint shear'),
    (p1_id, 'Swimming (Non-impact activity)', '3 sessions per wk', 'Maintain fitness without axial loading');

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Mobilisation & Progressive WB', 'Phase: Re-ossification', 
        ARRAY['Improve functional gait', 'Strengthen gluteus medius/maximus', 'Return to daily pediatric activities'],
        ARRAY['Monitor for a "limping" gait - indicating need to offload', 'Avoid sudden heavy falls on the hip'],
        ARRAY['Negative Trendelenburg sign', 'Full weight bearing allowed'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Side-lying Leg Raises', '3 × 15 reps', 'Strengthen abduction - vital for pelvic stability'),
    (p2_id, 'Supported Single-leg Stance', '3 × 30 sec', 'Neuromuscular stability retraining'),
    (p2_id, 'Mini-Squats (Bodyweight)', '3 × 12 reps', 'Core-hip integration');
END IF;

END $$;
