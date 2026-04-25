-- rehab_data_batch40.sql
-- استكمال البيانات للمراحل النهائية (Ankle Fracture, Lumbar Disc, Spondylolisthesis, Hip Labral)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p3_id INTEGER;
BEGIN

-- 16. Ankle Fracture (Post-immobilisation) - Phase 3: Return to Impact & Sport
-- Timeline: Week 12+ (Post-Bony Union)
SELECT id INTO proto_id FROM protocols WHERE name = 'Ankle Fracture (Post-immobilisation)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Return to Sport & Impact', 'Week 12+', 
        ARRAY['Safe landing mechanics', 'Full sport-specific agility', 'Confident multi-plane loading'],
        ARRAY['Ensure radiographic union is 100% confirmed', 'Ice after initial high-impact sessions'],
        ARRAY['Hop symmetry > 90%', 'Running pain-free for 30 min', 'Functional confidence (FAAM score)'])
    RETURNING id INTO p3_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Double-leg Jump to Single-leg Land', '3 × 10 reps', 'Training force attenuation and lateral stability upon landing'),
    (p3_id, 'Ladder Drills (High speed)', '5 min', 'Integrated ankle and lower limb neuromuscular speed'),
    (p3_id, 'Box Step-downs (Weighted)', '3 × 12 reps', 'Eccentric capacity for decelerating the body weight');
END IF;


-- 18. Lumbar Disc Herniation with Radiculopathy - Phase 3: Return to Sport & High Load
-- Timeline: Week 12+
SELECT id INTO proto_id FROM protocols WHERE name = 'Lumbar Disc Herniation with Radiculopathy' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'High Level Function & Sport', 'Week 12+', 
        ARRAY['Full return to previous sport/work demands', 'Spinal resilience during multi-planar moves', 'Integrated lower limb and core power'],
        ARRAY['Gradual return to contact sport', 'Ensure good lifting mechanics under fatigue'],
        ARRAY['Negative Slump/SLR tests', 'No residual neurological signs', 'Full load tolerance (Deadlift technique good)'])
    RETURNING id INTO p3_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Modified Burpees (Linear)', '3 × 10 reps', 'Dynamic transition between loaded positions with core control'),
    (p3_id, 'Kettlebell Swings (Light to Moderate)', '3 × 15 reps', 'Explosive posterior chain work with spinal neutral priority'),
    (p3_id, 'Medicine Ball Lateral Toss', '3 × 12 reps', 'Core stability against rotational inertia');
END IF;


-- 20. Spondylolisthesis (Conservative) - Phase 2 & 3: Resilience & Sport
SELECT id INTO proto_id FROM protocols WHERE name = 'Spondylolisthesis (Conservative)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    -- Phase 2: Resilience & Strength
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Resilience & Strengthening', 'Week 6–12', 
        ARRAY['Address global core endurance', 'Strengthen posterior chain (Glutes/Hams)', 'Improve hip mobility to spare the back'],
        ARRAY['Limit extreme end-range lumbar extension', 'Monitor for "slippage" sensation'],
        ARRAY['Hold neutral spine under moderate load', 'Negative prone instability test'])
    RETURNING id INTO p3_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Stir the Pot (Plank on ball)', '3 × 45 sec', 'Dynamic core endurance in neutral positions'),
    (p3_id, 'Hip Hinge Training (Dowel)', '3 × 20 reps', 'Minimize lumbar load during forward bending'),
    (p3_id, 'Glute Bridges (Weighted)', '3 × 15 reps', 'Strong glutes prevent excessive anterior pelvic tilt');
END IF;


-- 21. Hip Labral Tear (Conservative) - Phase 3: Return to Play
-- Timeline: Week 12+
SELECT id INTO proto_id FROM protocols WHERE name = 'Hip Labral Tear (Conservative)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Advanced Strength & Return to Sport', 'Week 12+', 
        ARRAY['Safe pivoting and cutting mechanics', 'Sport-specific power development', 'Long term maintenance program'],
        ARRAY['Avoid repetitive hip internal rotation under heavy axial load', 'Manage volume spikes'],
        ARRAY['Full pain-free sport participation', 'Positive Trendelenburg test absent', 'Hop test symmetry > 90%'])
    RETURNING id INTO p3_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Crossover Steps (Lateral mobility)', '3 × 15 meters', 'Functional integration of the hip rotators'),
    (p3_id, 'Lunge into High Knee (explosive)', '3 × 12 reps', 'Integrated athletic movement with hip stability'),
    (p3_id, 'Single-leg Rotational Drills (Band)', '3 × 10 reps', 'Controlling the femoral head during pelvic rotation');
END IF;

END $$;
