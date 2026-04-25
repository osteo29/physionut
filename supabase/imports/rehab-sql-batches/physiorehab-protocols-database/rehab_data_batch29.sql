-- rehab_data_batch29.sql
-- إضافة المرحلة الثانية والثالثة للبروتوكولات ( Tennis Elbow, Hamstring, THA, ITB)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p2_id INTEGER;
    p3_id INTEGER;
BEGIN

-- 22. Total Hip Arthroplasty (THA) - Phase 2: Strengthening & Functional Balance
-- Timeline: Week 6–12
SELECT id INTO proto_id FROM protocols WHERE name = 'Total Hip Arthroplasty (THA)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Strengthening & Functional Balance', 'Week 6–12', 
        ARRAY['Full weight bearing with normal gait/no limp', 'Strengthen hip abductors and extensors', 'Improve balance on operative leg'],
        ARRAY['Maintain hip precautions (if applicable)', 'Avoid high-impact jumping', 'Ensure symmetrical movement'],
        ARRAY['No Trendelenburg gait', 'Single leg stance > 15 sec', 'Walk 20-30 min without aid'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Standing Hip Abduction', '3 × 15 reps', 'Lateral stability for the pelvis during gait'),
    (p2_id, 'Step-ups (Forward & Lateral)', '3 × 12 reps each', 'Functional eccentric/concentric control'),
    (p2_id, 'Tandem Standing', '3 × 30 sec', 'Static balance training for fall prevention');
END IF;


-- 23. Lateral Epicondylalgia (Tennis Elbow) - Phase 2: Isometric to Isotonic Loading
-- Timeline: Week 4–8
SELECT id INTO proto_id FROM protocols WHERE name = 'Lateral Epicondylalgia (Tennis Elbow)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Isotonic Loading', 'Week 4–8', 
        ARRAY['Increase load tolerance of the tendon', 'Address scapular/proximal weakness', 'Full pain-free extension'],
        ARRAY['Avoid large increases in load suddenly', 'Monitor for "latched" sensation'],
        ARRAY['Pain-free grip strength > 80% other side', 'Symmetrical wrist extension strength'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Eccentric Wrist Extension (Weighted)', '3 × 15 reps', 'Gradual tendon remodel through eccentric strain'),
    (p2_id, 'Hammer Curls (Forearm neutral)', '3 × 12 reps', 'Loads brachioradialis - offloads common extensor origin'),
    (p2_id, 'Towel twists', '3 × 15 reps', 'Combined rotation and grip strength');
END IF;


-- 25. Hamstring Strain (Grade II) - Phase 2: Eccentric Loading
-- Timeline: Week 2–6
SELECT id INTO proto_id FROM protocols WHERE name = 'Hamstring Strain (Grade II)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Eccentric Loading & Dynamic Movement', 'Week 2–6', 
        ARRAY['Restore eccentric strength', 'Normalize running mechanics', 'Full pain-free lengthening'],
        ARRAY['Limit end-range stretching if symptomatic', 'Avoid maximal sprints yet'],
        ARRAY['Symmetrical eccentric strength', 'Hop test symmetry > 85%', 'Pain-free jog'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Nordic Hamstring Curls (Assisted)', '3 × 5-8 reps', 'The gold standard for eccentric hamstring capacity'),
    (p2_id, 'Romanian Deadlift (B-stance)', '3 × 12-15 reps', 'Loaded lengthening of the hamstring fibers'),
    (p2_id, 'High-knee Marches', '3 × 20 reps', 'Dynamic neuromuscular control at high hip flexion');
END IF;


-- 27. Iliotibial Band Syndrome - Phase 2: Functional Loading
-- Timeline: Week 3–8
SELECT id INTO proto_id FROM protocols WHERE name = 'Iliotibial Band Syndrome' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Functional Hip Loading', 'Week 3–8', 
        ARRAY['Symmetrical hip strength', 'Dynamic knee alignment control', 'Re-introduction of running intervals'],
        ARRAY['Monitor for "snapping" during hill repeats', 'No sudden mileage jumps'],
        ARRAY['Pain-free single leg squat', 'Run 15 min without lateral knee pain'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Side-Lying Leg Lifts (Hip extension focus)', '3 × 15 reps', 'Target Gluteus Medius without TFL dominance'),
    (p2_id, 'Speed Skaters (Low impact)', '3 × 12 reps', 'Frontal plane control during lateral movement'),
    (p2_id, 'Step-downs (Mirror control)', '3 × 15 reps', 'Ensure no valgus or pelvic drop');
END IF;

END $$;
