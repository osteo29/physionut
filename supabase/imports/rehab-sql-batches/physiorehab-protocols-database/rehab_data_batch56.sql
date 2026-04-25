-- rehab_data_batch56.sql
-- استكمال المراحل النهائية (Phases 3 & 4) لإصابات الطرف العلوي (Shoulder, Elbow, Wrist)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p3_id INTEGER;
    p4_id INTEGER;
BEGIN

-- 12. Anterior Shoulder Dislocation - Phase 4: High Performance Stability
SELECT id INTO proto_id FROM protocols WHERE name = 'Anterior Shoulder Dislocation (First-time)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Return to Contact / Collision Sport', 'Month 6–12', 
        ARRAY['Full return to contact sport', 'Maximize reactive stability in vulnerable positions', 'Integrated upper body power'],
        ARRAY['Monitor for "apprehension" during heavy collisions', 'Maintain cuff endurance'],
        ARRAY['Neg Apprehension/Relocation tests', 'WOSI score > 85%', 'Full symmetrical strength'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p4_id, 'Plyometric Push-ups (Clapping)', '3 × 10 reps', 'High rate-of-force capacity for the anterior shoulder'),
    (p4_id, 'Overhead Med-Ball Slam', '3 × 15 reps', 'Explosive stability during rapid elevation'),
    (p4_id, 'Contact Simulation (Tackling/Grappling)', 'Graded session', 'Specific sport demand re-integration');
END IF;


-- 23. Tennis Elbow (Lateral Epicondylalgia) - Phase 4: Maintenance
SELECT id INTO proto_id FROM protocols WHERE name = 'Lateral Epicondylalgia (Tennis Elbow)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Conditioning & Prevention', 'Month 4+', 
        ARRAY['Maintain tendon resilience', 'Increase forearm endurance for high volume', 'Optimize kinetic chain (Shoulder/Core)'],
        ARRAY['Monitor for overuse during tournament/heavy work spikes', 'Ensure ergonomic setup remains optimal'],
        ARRAY['Zero recurring pain after high volume', 'PRTEE score improvement stable'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p4_id, 'Heavy Slow Forearm Extensions', '1 × weekly (heavy)', 'Maintenance of tendon health'),
    (p4_id, 'Grip Endurance Holds (Timed)', '3 × 60 sec', 'Functional endurance for manual tasks'),
    (p4_id, 'Rotator Cuff/Scapular Power Drills', '3 × 15 reps', 'Offload the elbow through proximal strength');
END IF;


-- 30. Carpal Tunnel Syndrome - Phase 3 & 4
SELECT id INTO proto_id FROM protocols WHERE name = 'Carpal Tunnel Syndrome (Conservative)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Advanced Strengthening & ADL Integration', 'Week 8–16', 
        ARRAY['Return to full work/manual tasks', 'Address global upper limb deficits', 'Maintain neural mobility'],
        ARRAY['Monitor for return of night-time tingling', 'Avoid heavy vibratory tool use initially'],
        ARRAY['Pinch/Grip strength symmetry > 90%', 'Zero constant numbness'])
    RETURNING id INTO p3_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Ergonomic Resilience & Maintenance', 'Month 4+', 
        ARRAY['Lifetime management of symptoms', 'Optimize ergonomic posture', 'Wrist resilience'],
        ARRAY['Maintain frequent micro-breaks during typing', 'Regular neural gliding'],
        ARRAY['Full functional ability at work/sport'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Weighted Wrist Extension/Flexion', '3 × 15 reps', 'Load tolerance for the forearm muscles'),
    (p3_id, 'Precision Pinch Drills (Fine items)', '5 min daily', 'Fine motor coordination'),
    (p4_id, 'Median Nerve Sliders (Integrated into warm-up)', '10 reps daily', 'Prevent chronic adhesion');
END IF;


-- 50. De Quervain''s - Phase 3 & 4
SELECT id INTO proto_id FROM protocols WHERE name = 'De Quervain''s Tenosynovitis (Conservative)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 1, 'Immobilization & Calming', 'Week 0-3', 
        ARRAY['Reduce pain at radial styloid', 'Protect APL/EPB tendons', 'Establish pain-free ROM'],
        ARRAY['Avoid repetitive thumb abduction/extension', 'Wear spica splint for resting'],
        ARRAY['Neg Finkelstein test', 'Pain VAS < 2/10'])
    RETURNING id INTO p3_id; -- (Re-adding P1 since I missed it earlier)

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Mobilization & Early Loading', 'Week 3-8', 
        ARRAY['Active ROM without pain', 'Early isometric activation', 'ADL integration'],
        ARRAY['Stop if sharp pain returns over tendons', 'No heavy lifting/grip'],
        ARRAY['Full active ROM thumb/wrist'])
    RETURNING id INTO p4_id;

    -- Adding P3 and P4 to complete the 100% match
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Advanced Strength & Return to Activity', 'Week 8-16', 
        ARRAY['Restore full grip/pinch power', 'Tendon loading into extension', 'Return to manual sport/work'],
        ARRAY['Gradual return to repetitive tasks', 'Monitor for swelling'],
        ARRAY['Grip strength symmetry > 90%'])
    RETURNING id INTO p3_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Discharge & High Level Function', 'Month 4+', 
        ARRAY['Independent management', 'Ergonomic optimization', 'Maintenance of strength'],
        ARRAY['Pacing the load', 'Maintain flexibility'],
        ARRAY['Full pain-free sport participation'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Resisted Thumb Abduction (Rubber band)', '3 × 15 reps', 'Load the APL/EPB tendons in a controlled manner'),
    (p4_id, 'Wrist Stability in Neutral (Holding weights)', '3 × 30 sec', 'Static stability for daily tasks');
END IF;

END $$;
