-- rehab_data_batch53.sql
-- استكمال المراحل النهائية (Phase 3) لأشهر الإصابات (Rotator Cuff, Impingement, LBP, Achilles, PFPS)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p3_id INTEGER;
BEGIN

-- 9. Rotator Cuff Repair - Phase 3: Return to Sport / Heavy Load
SELECT id INTO proto_id FROM protocols WHERE name = 'Rotator Cuff Repair (Post-operative)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Advanced Strength & Sport Integration', 'Month 6–12', 
        ARRAY['Full return to sport/heavy labor', 'Maximise rotator cuff power', 'Long term maintenance program'],
        ARRAY['Avoid excessive overhead volume spikes', 'Monitor for anterior shoulder fatigue'],
        ARRAY['Symmetrical rotator cuff strength', 'Confident participation in previous high-load tasks'])
    RETURNING id INTO p3_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Plyometric Medicine Ball Toss (Chest/Side)', '3 × 15 reps', 'High rate-of-force capacity for the shoulder complex'),
    (p3_id, 'Overhead Dumbbell Press (Controlled)', '3 × 10 reps', 'Functional integrated power'),
    (p3_id, 'Pull-ups or Heavily Weighted Rows', '3 × 12 reps', 'Global upper body power');
END IF;


-- 10. Shoulder Impingement Syndrome - Phase 3: High Level Strength
SELECT id INTO proto_id FROM protocols WHERE name = 'Shoulder Impingement Syndrome' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Functional Strength & Maintenance', 'Week 12+', 
        ARRAY['Full power in sport plane', 'Stable shoulder during high-velocity moves', 'Address any remaining kinetic chain deficits'],
        ARRAY['Gradual return to overhead sports (Tennis/Swimming)', 'Maintain thoracic mobility'],
        ARRAY['Full pain-free overhead range', 'Cuff strength > 90% other side'])
    RETURNING id INTO p3_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Bodyweight Dips', '3 × 10-15 reps', 'Integrated shoulder and triceps power'),
    (p3_id, 'Shoulder 90/90 External Rotation (Band)', '3 × 15 reps', 'Specific stability for throwing athletes'),
    (p3_id, 'Farmers Walk (Uneven load)', '3 × 30 meters', 'Scapular stability under dynamic postural challenge');
END IF;


-- 14. Non-specific Low Back Pain (Acute) - Phase 3: Resilience & Load
SELECT id INTO proto_id FROM protocols WHERE name = 'Non-specific Low Back Pain (Acute)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Spinal Resilience & Weight Loading', 'Week 8+', 
        ARRAY['Full return to occupational/sport tasks', 'Confident lifting/bending mechanics', 'Long-term spinal health'],
        ARRAY['Maintain neutral spine under fatigue', 'Avoid sudden heavy rotational loads initially'],
        ARRAY['Full pain-free spine ROM', 'Oswestry Disability Index < 10%'])
    RETURNING id INTO p3_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Deadlifts (Kettlebell or Barbell)', '3 × 10 reps', 'Integrated posterior chain and core strength'),
    (p3_id, 'Turkish Get-ups (Partial)', '3 × 8 reps each side', 'Multi-planar core and limb stability'),
    (p3_id, 'Pallof Press (Rotational stability)', '3 × 15 reps', 'Core anti-rotation strength');
END IF;


-- 12. Achilles Tendinopathy - Phase 3: Energy Storage & Plyometrics
SELECT id INTO proto_id FROM protocols WHERE name = 'Achilles Tendinopathy' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Energy Storage & Return to Impact', 'Week 12+', 
        ARRAY['Restore tendon stiffness and power', 'Full return to running/jumping', 'Symmetrical calf volume'],
        ARRAY['Monitor for "morning after" pain', 'Soft landing mechanics in plyometrics'],
        ARRAY['Symmetrical single-leg calf raise', 'Pain-free high speed skipping'])
    RETURNING id INTO p3_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Single-leg Pogo Hops', '3 × 20 reps', 'Tendon elastic capacity development'),
    (p3_id, 'Box Jumps', '3 × 12 reps', 'Explosive vertical power'),
    (p3_id, 'Calf Raises with heavy load', '3 × 8 reps (Slow)', 'Maintain tendon structural integrity');
END IF;


-- 4. Patellofemoral Pain Syndrome (PFPS) - Phase 3: Return to Play
SELECT id INTO proto_id FROM protocols WHERE name = 'Patellofemoral Pain Syndrome (PFPS)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Advanced Loading & Impact', 'Week 12+', 
        ARRAY['Full return to running/jumping', 'Correct lower limb mechanics under fatigue', 'Symmetrical hip/quad power'],
        ARRAY['Ensure no medial knee collapse during landing', 'Gradual increase in running volume'],
        ARRAY['Hop test symmetry > 90%', 'Pain-free full squat with load'])
    RETURNING id INTO p3_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Single-leg Bounding', '3 × 15 meters', 'Functional force attenuation'),
    (p3_id, 'Sprint Drills', '5 reps, 20 meters', 'Integrated athletic gait mechanics'),
    (p3_id, 'Curtsy Lunges (Weighted)', '3 × 12 reps each side', 'Integrated hip/knee stabilization in the frontal plane');
END IF;

END $$;
