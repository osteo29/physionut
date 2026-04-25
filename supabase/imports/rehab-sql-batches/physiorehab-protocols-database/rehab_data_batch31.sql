-- rehab_data_batch31.sql
-- استكمال البيانات للمراحل المتوسطة (Biceps, SLAP, Shoulder Instability, Golfer's Elbow, UCL)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p2_id INTEGER;
BEGIN

-- 31. Biceps Tendinopathy (Long Head) - Phase 2: Moderate Loading & Scapular Stability
-- Timeline: Week 3–8
SELECT id INTO proto_id FROM protocols WHERE name = 'Biceps Tendinopathy (Long Head)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Moderate Loading & Scapular Stability', 'Week 3–8', 
        ARRAY['Address proximal mechanics', 'Improve biceps tendon load tolerance', 'Normalize shoulder rhythm'],
        ARRAY['Avoid heavy eccentric bicep work initially', 'Stop if sharp pain in bicipital groove'],
        ARRAY['Full AROM without shrug sign', 'Pain-free isometric bicep contraction at 90°'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Hammers Curls (Slow)', '3 × 15 reps', 'Load the distal/proximal bicep in a neutral, stable position'),
    (p2_id, 'Scapular Squeezes with Resistance', '3 × 15 reps', 'Provide a stable foundation for the humeral head'),
    (p2_id, 'Serratus Wall Slides', '3 × 12 reps', 'Ensure proper upward rotation of the scapula to offload the bicep');
END IF;


-- 32. SLAP Lesion (Conservative) - Phase 2: Strengthening & Labral Protection
-- Timeline: Week 6–12
SELECT id INTO proto_id FROM protocols WHERE name = 'SLAP Lesion (Conservative)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Strengthening & Labral Protection', 'Week 6–12', 
        ARRAY['Strengthen rotator cuff with arm in neutral', 'Improve dynamic humeral head stability', 'Gentle increase in biceps loading'],
        ARRAY['Avoid repetitive overhead reaching', 'No sudden pulling movements'],
        ARRAY['Pain-free AROM to 150°', 'Stable labrum during testing', 'Symmetrical strength in rotator cuff'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'PNF Patterns (Diagonals)', '3 × 12 reps', 'Neuromuscular coordination and integrated shoulder strength'),
    (p2_id, 'Internal Rotation at 0° (Band)', '3 × 20 reps', 'Subscapularis activation for anterior stabilization'),
    (p2_id, 'Bicep Isometric holds (Short lever)', '3 × 30 sec', 'Conditioning the labral attachment without high strain');
END IF;


-- 36. Medial Epicondylalgia (Golfer's Elbow) - Phase 2: Isotonic Loading
-- Timeline: Week 4–8
SELECT id INTO proto_id FROM protocols WHERE name = 'Medial Epicondylalgia (Golfer''s Elbow)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Isotonic Strengthening', 'Week 4–8', 
        ARRAY['Restore flexor-pronator strength', 'Increase tendon load tolerance', 'Return to functional activities'],
        ARRAY['Avoid heavy grip during acute flair-ups', 'Ensure proper grip mechanics during exercise'],
        ARRAY['Pain-free wrist flexion with 2kg', 'No morning stiffness > 10 min'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Wrist Flexion (Eccentric focus)', '3 × 15 reps', 'Load the common flexor origin - stimulate remodeling'),
    (p2_id, 'Forearm Pronation (Hammer or weighted bar)', '3 × 15 reps', 'Target pronator teres - key component of medial elbow pain'),
    (p2_id, 'Finger Squeezes (Elastic band around fingers)', '3 × 20 reps', 'Intrinsic muscle endurance supports the medial joint line');
END IF;


-- 37. UCL Sprain — Elbow - Phase 2: Functional Loading
-- Timeline: Week 4–12
SELECT id INTO proto_id FROM protocols WHERE name = 'UCL Sprain — Elbow (Ulnar Collateral Ligament)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Dynamic Loading & Stability', 'Week 4–12', 
        ARRAY['Full ROM restoration', 'Strengthen flexor-pronator mass for dynamic support', 'Progressive loading of the UCL'],
        ARRAY['STRICT: No valgus stress (no throwing)', 'Monitor for medial joint line opening'],
        ARRAY['Full pain-free extension and flexion', 'Strong flexor-pronator muscle group'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Wrist Flexion with resistance', '3 × 15 reps', 'Flexor muscles provide 30-40% of valgus stability'),
    (p2_id, 'Weighted Forearm Rotation', '3 × 15 reps', 'Rotatory stability of the ulnohumeral joint'),
    (p2_id, 'Bicep Curls (Neutral spine)', '3 × 12 reps', 'General upper limb stability');
END IF;

END $$;
