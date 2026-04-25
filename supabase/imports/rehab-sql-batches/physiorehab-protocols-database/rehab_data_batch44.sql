-- rehab_data_batch44.sql
-- استكمال البيانات للمراحل الاحترافية (Rectus Femoris, Gluteal Strain, Pectoralis Major, Triceps Rupture)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER;
    p2_id INTEGER;
BEGIN

-- 89. Rectus Femoris Strain - Phase 1 & 2
SELECT id INTO proto_id FROM protocols WHERE name = 'Rectus Femoris Strain' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 1, 'Initial Healing & Muscle Activation', 'Week 0–2', 
        ARRAY['Protect the injury site', 'Pain-free active movement', 'Establish initial quad control'],
        ARRAY['No explosive kicking or sprinting', 'Avoid deep pain-inducing stretching'],
        ARRAY['Pain-free walking', 'Full extension AROM', 'Negative SLR lag'])
    RETURNING id INTO p1_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p1_id, 'Quad Sets (Superior glide)', '10 × 10 sec', 'Safe isometric recruitment'),
    (p1_id, 'Hip Flexion (Gravity-eliminated)', '3 × 15 reps', 'Pain-free mobility'),
    (p1_id, 'Static Glute Bridges', '3 × 15 reps', 'Core support for the anterior hip');

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Progressive Loading & Eccentric Load', 'Week 2–6', 
        ARRAY['Restore full quad torque', 'Initiate eccentric loading', 'Improve running kinematics'],
        ARRAY['Monitor for "tugging" during push-offs', 'Slow progress with ballistic moves'],
        ARRAY['Pain-free jogging', 'Symmetrical quad girth', 'Full hip/knee ROM'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Eccentric Knee Extension (Controlled)', '3 × 12 reps', 'Gradual tissue remodeling through strain'),
    (p2_id, 'Lunge into High Knee', '3 × 15 reps', 'Functional integrated movement'),
    (p2_id, 'Split Squats', '3 × 12 reps', 'High intensity quad loading');
END IF;


-- 91. Pectoralis Major Rupture - Phase 1 & 2
SELECT id INTO proto_id FROM protocols WHERE name = 'Pectoralis Major Rupture' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 1, 'Protection & ROM', 'Week 0–4', 
        ARRAY['Protect the repair/injury', 'Maintain ROM (Limit ER/Elevation)', 'Hand/Wrist mobility'],
        ARRAY['NO RESISTANCE: No pushing or lifting', 'Limit elevation to 90° initially'],
        ARRAY['Surgical site healed', 'Minimal resting pain'])
    RETURNING id INTO p1_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p1_id, 'Pendulum Swings', '3 × 1 min', 'Passive mobilization into safe ranges'),
    (p1_id, 'Scapular Pushes', '3 × 15 reps', 'Proximal stability without pecs demand'),
    (p1_id, 'Grip Strenghening (Ball)', 'Daily', 'Maintain distal limb function');

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Early Activation & Strengthening', 'Week 4–12', 
        ARRAY['Restore full AROM', 'Introduce submaximal isometrics', 'Normalization of scapular rhythm'],
        ARRAY['No heavy bench press or flyes', 'Monitor for anterior shoulder instability'],
        ARRAY['Full symmetrical ROM', 'Stable scapula during elevation'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Pec Isometric Squeezes (Submax)', '3 × 10 sec', 'Safe initiation of muscular tension'),
    (p2_id, 'Shoulder Shrugs & Rows', '3 × 15 reps', 'Integrated upper limb support'),
    (p2_id, 'Wall Slides (Flexion)', '3 × 12 reps', 'Active ROM re-education');
END IF;

END $$;
