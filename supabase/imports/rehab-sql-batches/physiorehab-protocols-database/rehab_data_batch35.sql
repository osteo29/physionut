-- rehab_data_batch35.sql
-- استكمال البيانات للمراحل المتوسطة للعمود الفقري (Stenosis, Facet, WAD, Laminectomy)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p2_id INTEGER;
BEGIN

-- 61. Spinal Stenosis (Lumbar — Conservative) - Phase 2: Core Endurance & Flexion Bias
-- Timeline: Week 6–12
SELECT id INTO proto_id FROM protocols WHERE name = 'Spinal Stenosis (Lumbar — Conservative)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Endurance & Stability', 'Week 6–12', 
        ARRAY['Improve walking tolerance', 'Strengthen core and hip stabilizers', 'Maximize functional flexion range'],
        ARRAY['Avoid prolonged lumbar extension', 'Monitor for claudication symptoms', 'No heavy lifting'],
        ARRAY['Able to walk 20 min without stopping', 'Symmetrical hip flexion strength'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Knee-to-Chest with Core Bracing', '3 × 15 reps', 'Open the intervertebral canal while activating the transverse abdominis'),
    (p2_id, 'Glute Bridges (Maintain posterior tilt)', '3 × 15 reps', 'Strengthen glutes to help reduce anterior pelvic tilt during walking'),
    (p2_id, 'Seated Forward Fold (Gentle)', '3 × 30 sec', 'Decompress the posterior neural structures');
END IF;


-- 62. Facet Joint Dysfunction (Lumbar) - Phase 2: Load Progressive
-- Timeline: Week 3–8
SELECT id INTO proto_id FROM protocols WHERE name = 'Facet Joint Dysfunction (Lumbar)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Load Progressive & Dynamic Stability', 'Week 3–8', 
        ARRAY['Restore pain-free rotation and extension', 'Increase spinal load tolerance', 'Integrated core/pelvic control'],
        ARRAY['Stop if "locking" sensation returns', 'Avoid explosive twists'],
        ARRAY['Full pain-free spine ROM', 'Able to hold plank for 45 sec', 'No sharp pain with quadrant testing'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Bird-Dog (With resistance level 2)', '3 × 12 reps', 'Rotational stability challenge for the multifidus'),
    (p2_id, 'Side Plank with Leg Abduction', '3 × 10 reps', 'High demand on lateral stabilizers to offload facet joints'),
    (p2_id, 'Thoracic Rotations (Seated)', '3 × 15 reps', 'Ensure mobility is not all coming from the lumbar segments');
END IF;


-- 66. Whiplash Associated Disorder (WAD Grade II) - Phase 2: Sensomotor & Deep Flexor Control
-- Timeline: Week 3–8
SELECT id INTO proto_id FROM protocols WHERE name = 'Whiplash Associated Disorder (WAD Grade II)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Sensomotor Control & Proprioception', 'Week 3–8', 
        ARRAY['Improve deep neck flexor endurance', 'Restore cervico-cephalic proprioception', 'Normalize scapular control'],
        ARRAY['Avoid heavy strength training for the neck too early', 'Stop if dizziness or visual changes occur'],
        ARRAY['Deep Neck Flexor Endurance (Cranio-cervical flexion) > 26mmHg/30sec', 'Joint Position Sense (Laser tracking) accuracy improved'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Cranio-cervical Flexion (Pressure biofeedback)', '10 × 10 sec holds', 'Re-educate the Longus Capitus/Colli - which are often inhibited post-WAD'),
    (p2_id, 'Gaze Stability (VOR) Exercises', '3 × 1 min', 'Essential for dizziness management and vestibular-neck coordination'),
    (p2_id, 'Shoulder Blade Retraction/Depression', '3 × 15 reps', 'Scapular set - reduce upper trap overactivity');
END IF;


-- 70. Post-Laminectomy Rehabilitation - Phase 2: Stabilization & Mobility
-- Timeline: Week 6–12
SELECT id INTO proto_id FROM protocols WHERE name = 'Post-Laminectomy Rehabilitation' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Stabilization & Functional Loading', 'Week 6–12', 
        ARRAY['Improve core musculature', 'Dynamic spinal stability', 'Increase walking endurance to 45 min'],
        ARRAY['Follow surgeon specific weight lifting restrictions', 'Avoid combined flexion/rotation under load'],
        ARRAY['Incision fully healed', 'Increased neural mobility (SLR improve)', 'Pain-free simple ADLs'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Dead Bug (Level 1)', '3 × 12 reps', 'Anti-extension core control - protecting the posterior surgical site'),
    (p2_id, 'Walking (Graded Program)', '30-45 min daily', 'Aerobic fitness and neural gliding'),
    (p2_id, 'Neural Glide (Slump slider)', '3 × 10 reps', 'Prevent post-op scar tissue adhesions around the nerve root');
END IF;

END $$;
