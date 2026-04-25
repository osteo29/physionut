-- rehab_data_batch45.sql
-- استكمال البيانات للمراحل الاحترافية (Youth conditions: Osgood, SLJ, Perthes, and Baker's Cyst, Tibial Plateau)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER;
    p2_id INTEGER;
BEGIN

-- 95. Juvenile Osgood-Schlatter - Phase 1 & 2
SELECT id INTO proto_id FROM protocols WHERE name = 'Juvenile Osgood-Schlatter' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 1, 'Symptom Inhibition & Load Management', 'Week 0–4', 
        ARRAY['Reduce traction on the tibial tubercle', 'Address quad/hamstring tightness', 'Load management for sport'],
        ARRAY['Limit high-impact jumping and explosive sprinting', 'No deep weighted squats if painful'],
        ARRAY['Reduced tibial tubercle tenderness', 'Pain-free daily activities'])
    RETURNING id INTO p1_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p1_id, 'Quadriceps Stretch (Gentle)', '3 × 30 sec', 'Decrease the "pull" on the growth plate'),
    (p1_id, 'Hamstring Stretch', '3 × 45 sec', 'Address global tightness in the growth phase'),
    (p1_id, 'Static Quad Sets', '3 × 15 reps', 'Safe maintenance of quad activation');

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Resilience & Sport Return', 'Week 4–12', 
        ARRAY['Build load tolerance in the quad tendon', 'Correct biomechanical landing deficits', 'Safe return to full sport'],
        ARRAY['Monitor for "growth flare-ups"', 'Ensure footwear is appropriate and cushioned'],
        ARRAY['Full pain-free sport participation', 'Symmetrical lower limb strength'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Step-downs (Focus on knee alignment)', '3 × 15 reps', 'Neuromuscular control of the patellar axis'),
    (p2_id, 'Wall Squats with Stability Ball', '3 × 12 reps', 'Lower impact quad strengthening'),
    (p2_id, 'Single-leg Balance (Dynamic)', '3 × 45 sec', 'Proprioceptive support for the joint capitals');
END IF;


-- 70. Baker's Cyst (Symptomatic) - Phase 1 & 2
SELECT id INTO proto_id FROM protocols WHERE name = 'Baker''s Cyst (Symptomatic)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 1, 'Effusion Control & Mobility', 'Week 0–3', 
        ARRAY['Reduce posterior knee pressure', 'Address primary knee pathology (Meniscus/OA)', 'Improve ROM'],
        ARRAY['Avoid extreme end-range flexion (knee-to-chest)', 'No aggressive posterior compression'],
        ARRAY['Reduced swelling/cyst size', 'Improved flexion AROM'])
    RETURNING id INTO p1_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p1_id, 'Ankle Pumps', '20 reps every hour', 'Fluid drainage and circulatory health'),
    (p1_id, 'Quad Sets (Towel roll)', '10 × 10 sec', 'Promote joint pumping without high flexion'),
    (p1_id, 'Gentle Heel Slides (Pain-free range)', '3 × 15 reps', 'Restore ROM without compressing the cyst');

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Strengthening & Underlying Pathology', 'Week 3–8', 
        ARRAY['Strengthen quads and glutes to offload the knee joint', 'Functional ROM restoration', 'Improve gait'],
        ARRAY['Avoid sudden heavy impact', 'Ensure no clicking/locking if meniscus is involved'],
        ARRAY['Normal gait mechanics', 'No recurring swelling with activity', 'Symmetrical strength'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Straight Leg Raises', '3 × 15 reps', 'Quad strength without joint compression'),
    (p2_id, 'Glute Bridges', '3 × 15 reps', 'Proximal support for the knee joint'),
    (p2_id, 'Calf Stretching (Gentle)', '3 × 30 sec', 'Reduce tightness contributing to posterior pressure');
END IF;

END $$;
