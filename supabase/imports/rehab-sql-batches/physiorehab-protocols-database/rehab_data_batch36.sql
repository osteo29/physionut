-- rehab_data_batch36.sql
-- استكمال البيانات للمراحل المتوسطة لليد والطرف العلوي (Cubital, Trigger, Flexor Tendon, Dupuytren's)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p2_id INTEGER;
BEGIN

-- 71. Cubital Tunnel Syndrome - Phase 2: Neural Mobility & Functional Loading
-- Timeline: Week 6–12
SELECT id INTO proto_id FROM protocols WHERE name = 'Cubital Tunnel Syndrome' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Neural Mobility & Strengthening', 'Week 6–12', 
        ARRAY['Restore ulnar nerve glide', 'Address elbow and wrist weakness', 'Reduce nocturnal symptoms'],
        ARRAY['Avoid prolonged elbow flexion (> 90°)', 'Monitor for intrinsic muscle wasting'],
        ARRAY['Full pain-free AROM', 'Negative Tinel''s at elbow', 'Grip strength > 75% other side'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Ulnar Nerve Slider (Waiters Tray)', '3 × 12 reps', 'Gentle gliding of the nerve through the cubital tunnel'),
    (p2_id, 'Intrinsic Muscle Strengthen (Lumbrical hold)', '3 × 15 reps', 'Maintenance of the small muscles of the hand affected by ulnar neuropathy'),
    (p2_id, 'Wrist Flexion with resistance', '3 × 15 reps', 'Strengthen the flexor carpi ulnaris (FCU) - common site of compression');
END IF;


-- 76. Flexor Tendon Repair (Zone II) - Phase 2: Active Motion and Tendon Gliding
-- Timeline: Week 4–8 (Post-op)
SELECT id INTO proto_id FROM protocols WHERE name = 'Flexor Tendon Repair (Zone II)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Active Motion & Early Gliding', 'Week 4–8', 
        ARRAY['Initiate active flexion', 'Maintain passive ROM', 'Prevent dense adhesions'],
        ARRAY['NO RESISTANCE: No lifting or pulling', 'Maintain protective splint as per therapist instruction'],
        ARRAY['Differential tendon gliding achieved', 'Active flexion to 50% of range'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Tendon Glides (Hook, Flat, Fist)', '10 reps every 2h', 'Essential to prevent sticking of the tendon repair to the sheath'),
    (p2_id, 'Active Finger Extension (In splint)', '3 × 15 reps', 'Maintain extensor mechanism while protecting the flexor repair'),
    (p2_id, 'Passive Finger Flexion (Blocking exercises)', '3 × 15 reps', 'Ensure individual joint mobility (DIP/PIP)');
END IF;


-- 78. Dupuytren's (Post-operative) - Phase 2: ROM and Scar Management
-- Timeline: Week 2–8
SELECT id INTO proto_id FROM protocols WHERE name = 'Dupuytren''s (Post-operative)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'ROM & Scar Management', 'Week 2-8', 
        ARRAY['Maintain surgical correction', 'Maximize finger extension', 'Desensitize the surgical scar'],
        ARRAY['Must wear extension splint (especially at night)', 'Monitor for skin breakdown over scar'],
        ARRAY['Full active extension', 'Healed wound', 'Stable grip'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Composite Finger Extension Stretch', '3 × 1 min', 'Counteract the contracture tendency post-operatively'),
    (p2_id, 'Scar Massage (Gentle circular)', '5 min daily', 'Softens the scar and prevents adherence to underlying tendons'),
    (p2_id, 'Towel Grasp (Intrinsic work)', '3 × 20 reps', 'Functional grip re-education');
END IF;


-- 80. Proximal Humerus Fracture (Non-operative) - Phase 2: AAROM and Early Strengthening
-- Timeline: Week 4–10 (Post-Radiographic Callus)
SELECT id INTO proto_id FROM protocols WHERE name = 'Proximal Humerus Fracture (Non-operative)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'AAROM & Early Strengthening', 'Week 4–10', 
        ARRAY['Restore active shoulder ROM', 'Introduce isometric strengthening', 'Begin to wean from sling'],
        ARRAY['Avoid heavy lifting across body', 'No forceful pushing/pulling'],
        ARRAY['AAROM flexion > 140°', 'Stable healing visible on X-ray'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Cane Exercises (Flexion/ER)', '3 × 15 reps', 'Assisted range of motion with gradual effort'),
    (p2_id, 'Shoulder Isometric Squeezes', '3 × 10 reps', 'Early activation of the deltoid and rotator cuff without joint shear'),
    (p2_id, 'Wall Slides (AAROM)', '3 × 12 reps', 'Gravity assisted elevation');
END IF;

END $$;
