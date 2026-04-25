-- rehab_data_batch39.sql
-- استكمال البيانات للمراحل النهائية (Patellar Tendon, MCL, TKA, PCL, Frozen Shoulder, Dislocation)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p2_id INTEGER;
    p3_id INTEGER;
BEGIN

-- 5. Patellar Tendinopathy - Phase 3: Energy Storage & Plyometrics
-- Timeline: Week 8–16
SELECT id INTO proto_id FROM protocols WHERE name = 'Patellar Tendinopathy' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Energy Storage & Plyometrics', 'Week 8–16', 
        ARRAY['Improve tendon power and acceleration', 'Symmetrical jump performance', 'Return to sport-specific drills'],
        ARRAY['Monitor for morning-after pain (Reactive response)', 'Ensure perfect landing mechanics (soft)'],
        ARRAY['Single leg hop symmetry > 90%', 'Pain-free full speed change of direction', 'VISA-P > 85'])
    RETURNING id INTO p3_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Split Jumps', '3 × 10 reps', 'High intensity eccentric to concentric switch - loads the tendon energy mechanism'),
    (p3_id, 'Box Jumps (Landing focus)', '3 × 12 reps', 'Vertical power and attenuation - soft landing is priority'),
    (p3_id, 'Agility Drills (T-test)', '3 sets', 'Sport-specific acceleration and deceleration');
END IF;


-- 6. MCL Sprain (Grade II) - Phase 3: Return to Sport
-- Timeline: Week 6–12
SELECT id INTO proto_id FROM protocols WHERE name = 'MCL Sprain (Grade II)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Return to Play / Competition', 'Week 6–12', 
        ARRAY['Full agility speed', 'Safe cutting and pivoting', 'Confident contact play'],
        ARRAY['Avoid non-contact pivoting during recovery spikes', 'Monitor for "medial opening" during contact'],
        ARRAY['Full symmetrical strength', 'Negative Valgus Stress Test at 30° flexion'])
    RETURNING id INTO p3_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, '45° Cutting Drills', '3 × 10 reps each side', 'Functional loading of the MCL in sport plane'),
    (p3_id, 'Single-leg Bounding', '3 × 15 meters', 'Explosive stability of the medial knee line'),
    (p3_id, 'Suicide Sprints (Change of direction)', '5 rounds', 'Endurance and reactive cutting');
END IF;


-- 11. Frozen Shoulder (Adhesive Capsulitis) - Phase 2 & 3: Thawing & Strength
SELECT id INTO proto_id FROM protocols WHERE name = 'Frozen Shoulder (Adhesive Capsulitis)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    -- Phase 2: Thawing & Progressive Mobility
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Thawing & Progressive ROM', 'Month 4–9', 
        ARRAY['Restore active shoulder ROM', 'Normalize scapular mechanics', 'Return to pain-free daily reaching'],
        ARRAY['Avoid aggressive passive stretching that causes long-lasting pain', 'Respect the inflammatory phase if still present'],
        ARRAY['Significant improvement in ROM (> 50%)', 'Low baseline pain'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Climbing Wall (Vertical)', '3 × 15 reps', 'Active-assisted elevation using gravity and target'),
    (p2_id, 'Internal Rotation Stretch (Behind back with towel)', '3 × 30 sec', 'Commonly most restricted range in Frozen Shoulder'),
    (p2_id, 'Serratus Wall Slides', '3 × 12 reps', 'Normalize scapulohumeral rhythm');
END IF;


-- 12. Anterior Shoulder Dislocation - Phase 2 & 3: Stability & Power
SELECT id INTO proto_id FROM protocols WHERE name = 'Anterior Shoulder Dislocation (First-time)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    -- Phase 2: Dynamic Stabilization
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Dynamic Stabilization', 'Week 4–12', 
        ARRAY['Address rotator cuff deficits', 'Improve proprioception in the "apprehension" position', 'Maintain scapular control'],
        ARRAY['Avoid end-range ER in abducted position (90/90)', 'No high-velocity pulling early'],
        ARRAY['Full symmetrical cuff strength', 'Negative Apprehension Test'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Active External Rotation at 45°', '3 × 15 reps', 'Progressive loading of the infraspinatus in functional ranges'),
    (p2_id, 'Wall Rhythmic Initialisations (Swaying on arm)', '3 × 45 sec', 'Neuromuscular reactive stability of the humeral head'),
    (p2_id, 'Bear Crawls (Modified)', '3 × 5 meters', 'Closed chain stability for the anterior capsule');
END IF;

END $$;
