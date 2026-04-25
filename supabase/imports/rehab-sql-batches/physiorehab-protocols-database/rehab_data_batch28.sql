-- rehab_data_batch28.sql
-- إضافة المرحلة الثانية لبروتوكولات الأرجل والعمود الفقري (الدفعة الأولى من استكمال البيانات)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p2_id INTEGER;
BEGIN

-- 14. Achilles Tendinopathy - Phase 2: Heavy Slow Resistance (HSR)
-- Timeline: Week 4–12
SELECT id INTO proto_id FROM protocols WHERE name = 'Achilles Tendinopathy' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Heavy Slow Resistance (HSR)', 'Week 4–12', 
        ARRAY['Increase tendon stiffness', 'Progressive hypertrophy of calf complex', 'Maintain pain-free loading'],
        ARRAY['Avoid sudden explosive movements', 'Monitor 24-hour pain response', 'Ensure 3s eccentric phase'],
        ARRAY['Able to perform 15 single leg calf raises', 'VISA-A score > 60', 'Pain ≤ 3/10 with daily activity'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Slow Weighted Calf Raise (Standing)', '3 × 8-12 reps (3s up, 3s down)', 'HSR induces collagen synthesis and improves mechanical properties'),
    (p2_id, 'Seated Calf Raise (Soleus focus)', '3 × 12 reps', 'High torque load for the soleus which takes 6-8x BW during running'),
    (p2_id, 'Single Leg Stance on Foam', '3 × 45 sec', 'Proprioceptive challenge during strengthening phase');
END IF;


-- 15. Plantar Fasciitis - Phase 2: Strengthening & Loading
-- Timeline: Week 4–8
SELECT id INTO proto_id FROM protocols WHERE name = 'Plantar Fasciitis' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Strengthening & Loading', 'Week 4–8', 
        ARRAY['Increase load tolerance of the plantar fascia', 'Strengthen intrinsic foot muscles', 'Improve calf flexibility'],
        ARRAY['Avoid barefoot walking on hard surfaces', 'Progress loading based on morning pain'],
        ARRAY['Minimal pain with first steps in the morning', 'Able to walk 30 mins without flare-up'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Rathleff Protocol (Heel raise with toe towel)', '3 × 12 reps (every second day)', 'Winlass mechanism - creates high tension to stimulate remodeling'),
    (p2_id, 'Towel Curls (Weighted)', '3 × 20 reps', 'Strengthen flexor digitorum brevis to support the arch'),
    (p2_id, 'Dynamic Calf Stretch (Wall lunges)', '3 × 15 reps', 'Improve functional dorsiflexion range');
END IF;


-- 16. Ankle Fracture (Post-immobilisation) - Phase 2: Dynamic Stability
-- Timeline: Week 4–8 post-cast
SELECT id INTO proto_id FROM protocols WHERE name = 'Ankle Fracture (Post-immobilisation)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Dynamic Stability & Initial Proprioception', 'Week 4–8 post-cast', 
        ARRAY['Full ROM symmetry', 'Single leg balance stability', 'Preparation for impact loading'],
        ARRAY['Avoid forced end-range inversion', 'Ensure hardware is stable (if ORIF)'],
        ARRAY['Full pain-free ROM', 'Symmetrical WB during squat', 'Good balance control'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Star Excursion Balance Test (Modified)', '3 rounds), 3 directions', 'Dynamic balance training and postural control'),
    (p2_id, 'Single Leg Calf Raise', '3 × 15 reps', 'Restore push-off power and lateral ankle stability'),
    (p2_id, 'Lateral Step-overs', '3 × 12 reps', 'Frontal plane control - crucial for fall prevention');
END IF;


-- 18. Lumbar Disc Herniation - Phase 2: Stabilization & Core Integration
-- Timeline: Week 4–8
SELECT id INTO proto_id FROM protocols WHERE name = 'Lumbar Disc Herniation with Radiculopathy' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Functional Stabilization', 'Week 4–8', 
        ARRAY['Restore core endurance', 'Normalize hip mobility', 'Safe return to light lifting'],
        ARRAY['Avoid combined flexion and rotation under load', 'Monitor for peripheralization of symptoms'],
        ARRAY['Negative Slump test', 'Centralized symptoms', 'Improved functional capacity (ODI score)'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Dead Bug (Level 2 - arm/leg move)', '3 × 15 reps', 'Deep core stabilization with limb movement dissociation'),
    (p2_id, 'Side Plank (Knees or feet)', '3 × 30-45 sec', 'Quadratus lumborum and obliques stabilization'),
    (p2_id, 'Hip Hinge Training (Wall touch)', '3 × 15 reps', 'Teach lifting from hips to spare the lumbar discs');
END IF;


-- 21. Hip Labral Tear (Conservative) - Phase 2: Strengthening
-- Timeline: Week 6–12
SELECT id INTO proto_id FROM protocols WHERE name = 'Hip Labral Tear (Conservative)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Progressive Strengthening', 'Week 6–12', 
        ARRAY['Strengthen hip stabilizers (Glutes/Rotators)', 'Pelvic control during dynamic moves', 'Improve hip endurance'],
        ARRAY['Avoid impingement positions (Flexion/Adduction/IR)', 'Pain-free range only'],
        ARRAY['Full pain-free gain', 'No mechanical symptoms (clicking) with exercise', 'Good pelvic stability during SLS'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Lateral Band Walks', '3 × 15 steps each way', 'Gluteus medius/minimus activation for pelvis level control'),
    (p2_id, 'Single Leg Deadlift (B-stance)', '3 × 12 reps', 'Posterior chain loading with minimal hip flexion compression'),
    (p2_id, 'Copenhagen Plank (Short lever)', '3 × 20 sec', 'Adductor strength - often neglected in hip rehab');
END IF;

END $$;
