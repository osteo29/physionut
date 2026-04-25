-- rehab_data_batch43.sql
-- استكمال البيانات للمراحل الاحترافية (Radial Tunnel, Trigger Finger, Boutonniere, Extensor Tendon Hand)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER;
    p2_id INTEGER;
BEGIN

-- 83. Radial Tunnel Syndrome - Phase 1 & 2
SELECT id INTO proto_id FROM protocols WHERE name = 'Radial Tunnel Syndrome' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 1, 'Nerve Protection & Desensitization', 'Week 0–4', 
        ARRAY['Reduce mechanosensitivity of radial nerve', 'Address myofascial tightness in supinator', 'Pain-free ADLs'],
        ARRAY['Avoid repetitive forceful pronation/supination', 'No heavy lifting/grip'],
        ARRAY['Reduced tenderness over radial tunnel', 'Improved neural sliders ROM'])
    RETURNING id INTO p1_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p1_id, 'Radial Nerve Sliders', '3 × 10 reps', 'Tension-free gliding to reduce intraneural edema'),
    (p1_id, 'Forearm Extensor Stretch (Gentle)', '3 × 30 sec', 'Decompress the common extensor origin'),
    (p1_id, 'Soft Tissue Release (Myofascial)', 'Daily 5 min', 'Relax the supinator muscle where the nerve exits');

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Gradual Loading & Stability', 'Week 4–12', 
        ARRAY['Increase forearm load tolerance', 'Improve grip strength', 'Integrated elbow/wrist stability'],
        ARRAY['Monitor for "burning" nerve pain after loading', 'Progress rotation speed slowly'],
        ARRAY['Pain-free grip strength > 80%', 'Negative radial nerve tension test'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Wrist Extension with Band', '3 × 15 reps', 'Gradual loading of the extensor carpi radialis brevis'),
    (p2_id, 'Pronation/Supination (Hammer rotation)', '3 × 15 reps', 'Isotonic loading of the supinator complex'),
    (p2_id, 'Power Putty Isometric Grip', '3 × 30 sec', 'Static load to build endurance');
END IF;


-- 84. Trigger Finger (Conservative) - Phase 1 & 2
SELECT id INTO proto_id FROM protocols WHERE name = 'Trigger Finger (Conservative)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 1, 'A1 Pulley Protection & ROM', 'Week 0–4', 
        ARRAY['Reduce inflammation at A1 pulley', 'Maintain DIP/PIP joint mobility', 'Prevent locking'],
        ARRAY['Avoid repetitive "clicking" or locking', 'No heavy gripping'],
        ARRAY['Reduced frequency of locking', 'Pain-free morning ROM'])
    RETURNING id INTO p1_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p1_id, 'Blocking Exercises (DIP/PIP)', '5 reps every 2h', 'Ensure individual joint gliding without high tension'),
    (p1_id, 'Passive extension stretch', '3 × 30 sec', 'Maintain tendon length'),
    (p1_id, 'Tendon Glides (Hook fist only)', '3 × 10 reps', 'Minimize excursion through A1 pulley while moving');

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Strengthening & Functional Use', 'Week 4–8', 
        ARRAY['Restore full grip power', 'Symmetrical manual dexterity', 'Maintenance of symptoms'],
        ARRAY['Stop if "clicking" persists with resistance', 'Avoid high volume repetitive finger work'],
        ARRAY['No locking for 2 weeks', 'Grip strength symmetry > 90%'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Rubber Band Finger Opening', '3 × 15 reps', 'Strengthen extensors to help counter flexor tightness'),
    (p2_id, 'Light Putty Grasp', '3 × 12 reps', 'Integrated functional grip'),
    (p2_id, 'Dexterity Drills (Coin sorting)', '5 min daily', 'Fine motor coordination training');
END IF;

END $$;
