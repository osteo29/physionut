-- rehab_data_batch63.sql
-- استكمال المراحل (2-4) لمجموعة كبيرة من الإصابات الشائعة (Foot, Knee, Shoulder)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p2_id INTEGER;
    p3_id INTEGER;
    p4_id INTEGER;
BEGIN

-- 7. Plantar Fasciitis - Phase 2, 3 & 4
SELECT id INTO proto_id FROM protocols WHERE name = 'Plantar Fasciitis' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Load Progression & Stretching', 'Week 4–8', 
        ARRAY['Increase windlass mechanism tolerance', 'Improve gastroc/soleus flexibility', 'Normalize gait'],
        ARRAY['Avoid barefoot walking on hard floors', 'Monitor for "first step" pain in morning'],
        ARRAY['Morning pain < 3/10', 'Full weight bearing tolerance'])
    RETURNING id INTO p2_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Functional Strength & Impact', 'Week 8–16', 
        ARRAY['Full return to running/sport', 'Maximize intrinsic foot strength', 'Long-term load management'],
        ARRAY['Gradual return to high-volume impact', 'Wear appropriate footwear'],
        ARRAY['Zero recurring symptoms with activity'])
    RETURNING id INTO p3_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Maintenance & Prevention', 'Month 4+', 
        ARRAY['Prevent recurrence', 'Integrated lower limb robustness', 'Independent management'],
        ARRAY['Independent load monitoring'],
        ARRAY['Zero activity restrictions'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Rathleff Protocol (Weighted Heel Raises)', '3 × 12 reps', 'Evidence-based loading for plantar fascia thickening and strength'),
    (p3_id, 'Jump Rope (Short sessions)', '3 × 2 min', 'Gradual impact tolerance'),
    (p4_id, 'Intrinsics Maintenance', 'Daily', 'Support the medial longitudinal arch');
END IF;


-- 15. Neck Pain (Cervicogenic Headache) - Phase 2, 3 & 4
SELECT id INTO proto_id FROM protocols WHERE name = 'Cervicogenic Headache' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Cervical Endurance & Coordination', 'Week 4–8', 
        ARRAY['Improve endurance of deep neck flexors', 'Normalize scapular posture', 'Reduce headache frequency'],
        ARRAY['Avoid prolonged static neck flexion', 'No high-velocity neck rotation early'],
        ARRAY['Headache frequency reduced by 50%', 'Full neck AROM'])
    RETURNING id INTO p2_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Advanced Integrated Strength', 'Week 8–16', 
        ARRAY['Integrated upper limb and neck stability', 'Resistance training for traps/levator', 'Return to high-load ADLs'],
        ARRAY['Monitor for "post-exercise" headache'],
        ARRAY['Neck Disability Index < 15%'])
    RETURNING id INTO p3_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Maintenance & Ergonomics', 'Month 4+', 
        ARRAY['Independent posture management', 'Lifetime cervical health', 'Workplace ergonomics optimization'],
        ARRAY['Zero skipping of micro-breaks'],
        ARRAY['Zero recurring headaches'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Head Lifts (Supine)', '3 × 15 reps', 'Specific endurance for deep cervical flexors'),
    (p3_id, 'Overhead Shrugs', '3 × 15 reps', 'Maintenance of scapular support'),
    (p4_id, 'Ergonomic Desk Stretch Routine', 'Every 60 min', 'Prevent cumulative postural strain');
END IF;


-- 24. Medial Epicondylitis (Golfer''s Elbow) - Phase 2, 3 & 4
SELECT id INTO proto_id FROM protocols WHERE name = 'Medial Epicondylitis (Golfer''s Elbow)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Isotonic Loading & Grip Strength', 'Week 4–8', 
        ARRAY['Load the common flexor origin eccentrically', 'Improve grip power', 'Establishing neutral wrist mechanics'],
        ARRAY['Avoid repetitive throwing motions initially', 'Monitor for pain over medial elbow'],
        ARRAY['Pain-free grip > 70% other side'])
    RETURNING id INTO p2_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Functional Power & Return to Sport', 'Week 8–16', 
        ARRAY['Return to golf/tennis/manual work', 'Integrated upper limb power', 'Maximal grip resilience'],
        ARRAY['Monitor for "flare-ups" during high-velocity swings'],
        ARRAY['Full pain-free sport participation'])
    RETURNING id INTO p3_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Conditioning & Prevention', 'Month 4+', 
        ARRAY['Maintenance of tendon health', 'Prevention of recurrence through global arm strength', 'Independent care'],
        ARRAY['Pacing the load'],
        ARRAY['Zero activity restrictions'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Eccentric Wrist Flexion', '3 × 15 reps', 'Load the tendon to promote remodeling'),
    (p3_id, 'Hammer Rotations (Slow)', '3 × 12 reps', 'Integrated supinator/pronator loading'),
    (p4_id, 'Farmer''s Walk', '3 × 30 meters', 'Global grip and shoulder stability');
END IF;

END $$;
