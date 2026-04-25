-- rehab_data_batch37.sql
-- استكمال البيانات للمراحل المتوسطة للإصابات الرياضية (Quad, Calf, MTSS, Stress Fracture)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p2_id INTEGER;
BEGIN

-- 81. Quadriceps Strain (Grade II) - Phase 2: Strengthening & Initial Loading
-- Timeline: Week 2–4
SELECT id INTO proto_id FROM protocols WHERE name = 'Quadriceps Strain (Grade II)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Strengthening & Functional Loading', 'Week 2–4', 
        ARRAY['Incorporate eccentric loading', 'Restore full pain-free ROM', 'Symmetrical strength during bodyweight exercises'],
        ARRAY['Avoid maximal knee extension early', 'No ballistic kicking'],
        ARRAY['Pain-free single leg squat (Partial)', 'Able to jog 10 min without pain', 'Symmetrical quad muscle bulk'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Slow Bodyweight Squats', '3 × 15 reps', 'Load the quadriceps through functional range'),
    (p2_id, 'Terminal Knee Extension (TKE) with band', '3 × 15 reps', 'Isolate VMO activation for patellar tracking and stability'),
    (p2_id, 'Single Leg Deadlift (B-Stance)', '3 × 12 reps', 'Core and hip stability while loading the lower limb');
END IF;


-- 82. Calf Strain (Gastrocnemius) - Phase 2: Loading & Strength
-- Timeline: Week 2–6
SELECT id INTO proto_id FROM protocols WHERE name = 'Calf Strain (Gastrocnemius)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Isotonic Loading & Power Progress', 'Week 2–6', 
        ARRAY['Restore full ankle dorsiflexion ROM', 'Progression to single leg calf raise', 'Begin linear gait speed increases'],
        ARRAY['Avoid sudden explosive push-offs', 'Monitor for nocturnal calf cramping'],
        ARRAY['3 × 15 single leg calf raises with 0 pain', 'Pain-free skipping/low-intensity hopping'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Single Leg Calf Raise (Slow)', '3 × 15 reps', 'Restore push-off power and muscle endurance'),
    (p2_id, 'Wall Calf Stretches', '3 × 30 sec', 'Ensure flexibility of the gastroc/soleus complex to prevent re-injury'),
    (p2_id, 'Toe Walks', '3 × 20 meters', 'Dynamic stability and intrinsic foot loading');
END IF;


-- 86. Medial Tibial Stress Syndrome (Shin Splints) - Phase 2: Biomechanical Correction
-- Timeline: Week 4–12
SELECT id INTO proto_id FROM protocols WHERE name = 'Medial Tibial Stress Syndrome (Shin Splints)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Biomechanical Support & Strength', 'Week 4–12', 
        ARRAY['Strengthen deep foot flexors and tibialis posterior', 'Improve calf endurance', 'Correct proximal hip instability'],
        ARRAY['Avoid running on hard surfaces (concrete) initially', 'Gradual introduction of impact loading'],
        ARRAY['Pain-free palpation of the medial tibial border', 'Run 15 min without pain'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Resisted Ankle Inversion (Elastic band)', '3 × 20 reps', 'Target Tibialis Posterior - key dynamic supporter of the arch'),
    (p2_id, 'Single Leg Squat (Knee alignment focus)', '3 × 12 reps', 'Ensure neutral knee/hip axis to reduce tibial shear stress'),
    (p2_id, 'Arch Lifts (Short foot)', '3 × 15 reps', 'Intrinsic muscle support for the longitudinal arch');
END IF;


-- 89. Distal Biceps Rupture (Post-op) - Phase 2: Active ROM & Early Activation
-- Timeline: Week 6–12
SELECT id INTO proto_id FROM protocols WHERE name = 'Distal Biceps Rupture (Post-op)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Active Motion & Early Loading', 'Week 6–12', 
        ARRAY['Full active elbow extension', 'Unrestricted forearm rotation (AROM)', 'Submaximal isometric activation'],
        ARRAY['NO RESISTIVE ELBOW FLEXION until Week 10-12', 'Avoid heavy carrying', 'No forceful supination'],
        ARRAY['Full AROM flexion and extension', 'Full supination AROM', 'Stable repair on assessment'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Active Elbow Flex/Ext (Standing)', '3 × 20 reps', 'Restore active range without load'),
    (p2_id, 'Forearm Rotations (Pencil or screwdriver motion)', '3 × 20 reps each', 'Functional re-education of supinator/pronator muscles'),
    (p2_id, 'Scapular Sets', '3 × 15 reps', 'Maintenance of proximal stability');
END IF;

END $$;
