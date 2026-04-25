-- rehab_data_batch38.sql
-- استكمال البيانات للمراحل المتوسطة للإصابات العصبية والأطفال (Sever's, CRPS, TMJ, Brachial Plexus)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p2_id INTEGER;
BEGIN

-- 91. Sever's Disease (Calcaneal Apophysitis) - Phase 2: Loading & Biomechanics
-- Timeline: Week 4–8
SELECT id INTO proto_id FROM protocols WHERE name = 'Sever''s Disease (Calcaneal Apophysitis)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Load Management & Strength', 'Week 4–8', 
        ARRAY['Improve calf flexibility', 'Strengthen foot intrinsics', 'Safe return to sport'],
        ARRAY['Avoid barefoot walking on hard floors', 'Monitor pain during jumping'],
        ARRAY['Pain-free daily activities', 'Able to perform 20 bilateral calf raises', 'Morning stiffness absent'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Gastrocnemius Stretch (Wall)', '3 × 30 sec', 'Reduce traction load of the Achilles on the calcaneal apophysis'),
    (p2_id, 'Short Foot Exercises', '3 × 15 reps', 'Intrinsics help offload the posterior heel'),
    (p2_id, 'Controlled Landings', '3 × 10 reps (Low jump)', 'Teach proper force attenuation to protect the heel');
END IF;


-- 97. Complex Regional Pain Syndrome (CRPS Type I) - Phase 2: Desensitization & Functional Loading
-- Timeline: Ongoing Week 4+
SELECT id INTO proto_id FROM protocols WHERE name = 'Complex Regional Pain Syndrome (CRPS Type I)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'GMI & Functional Desensitization', 'Week 4+', 
        ARRAY['Graded Motor Imagery (GMI)', 'Normalization of limb perception', 'Introduction of active movement'],
        ARRAY['Avoid pushing into extreme "flare-up" pain', 'Patience with the central nervous system response'],
        ARRAY['Reduced allodynia', 'Ability to touch and move limb without severe distress', 'Improved autonomic signs (color/temp)'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Mirror Box Therapy', '10 min daily', 'Re-train brain perception of the affected limb using the visual of the healthy limb'),
    (p2_id, 'Tactile Discrimination (Various textures)', '5 min daily', 'Fine-tune the sensory cortex to reduce allodynia'),
    (p2_id, 'Gentle Active ROM (Within tolerance)', 'Short frequent sessions', 'Maintain joint mobility and promote blood flow');
END IF;


-- 100. Temporomandibular Joint Dysfunction (TMJ) - Phase 2: Coordination & Strengthening
-- Timeline: Week 3–8
SELECT id INTO proto_id FROM protocols WHERE name = 'Temporomandibular Joint Dysfunction (TMJ)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Coordination & Strengthening', 'Week 3–8', 
        ARRAY['Normalize dental occlusion during movement', 'Strengthen jaw openers and stabilizers', 'Correct cervical posture'],
        ARRAY['Avoid hard foods (nuts, tough meats)', 'No wide yawning initially', 'Avoid gum chewing'],
        ARRAY['Pain-free opening > 3 fingers width', 'Stable jaw movement without clicking', 'Reduced facial tension'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Jaw Opening with Tongue on Palate', '3 × 15 reps', 'Ensures rotation of the condyle before translation - reducing joint impingement'),
    (p2_id, 'Resisted Mandibular Opening (Partial)', '3 × 10 reps', 'Isotonic strengthening of the suprahyoid muscles'),
    (p2_id, 'Cervical Retreats (Chin tucks)', '3 × 20 reps', 'Head position directly influences TMJ mechanics');
END IF;


-- 98. Brachial Plexus Injury - Phase 2: Nerve Glide & Early Muscle Activation
-- Timeline: Week 6–12
SELECT id INTO proto_id FROM protocols WHERE name = 'Brachial Plexus Injury' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Nerve Gliding & Stability', 'Week 6–12', 
        ARRAY['Promote neutral healing of the nerve roots', 'Minimize muscle atrophy in affected limb', 'Restore scapular stability'],
        ARRAY['Avoid forced end-range neck lateral flexion away from injury', 'Monitor for progressive weakness'],
        ARRAY['Stabilization of strength grades', 'Reduced neural sensitivity to stretch'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Brachial Plexus Sliders', '3 × 10 reps', 'Promote intraneural blood flow and reduce tethering'),
    (p2_id, 'Shoulder Shrugs (Active)', '3 × 15 reps', 'Maintenance of the upper trapezius and levator scapulae'),
    (p2_id, 'Passive Hand/Finger ROM', 'Daily', 'Prevent joint stiffness while waiting for motor re-innervation');
END IF;

END $$;
