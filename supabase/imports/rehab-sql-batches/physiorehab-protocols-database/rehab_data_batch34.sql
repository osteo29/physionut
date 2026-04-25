-- rehab_data_batch34.sql
-- استكمال البيانات للمراحل المتوسطة (Meniscectomy, Peroneal, PTTD, Ankle ORIF, Hallux Valgus)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p2_id INTEGER;
BEGIN

-- 53. Knee Meniscectomy (Partial) - Phase 2: Strengthening & Impact Loading Preparation
-- Timeline: Week 2–6
SELECT id INTO proto_id FROM protocols WHERE name = 'Knee Meniscectomy (Partial)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Strengthening & Functional Loading', 'Week 2–6', 
        ARRAY['Full ROM', 'Normal gait without assistive device', 'Symmetrical quadriceps activation'],
        ARRAY['Avoid deep impact jumping initially', 'Monitor for swelling after loading sessions'],
        ARRAY['Full flexion/extension', 'Able to perform 20 bodyweight squats', 'No joint line tenderness'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Mini-Squats with Stability', '3 × 15 reps', 'Closed chain muscle work with proprioceptive focus'),
    (p2_id, 'Single-leg Balance (Level 2)', '3 × 45 sec', 'Dynamic terminal knee stability'),
    (p2_id, 'Step-ups (Mirror feedback)', '3 × 15 reps', 'Functional control for stairs');
END IF;


-- 54. Peroneal Tendinopathy - Phase 2: Strength & Load Progressive
-- Timeline: Week 4–12
SELECT id INTO proto_id FROM protocols WHERE name = 'Peroneal Tendinopathy' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Isotonic Loading & Stability', 'Week 4–12', 
        ARRAY['Increase tendon load tolerance', 'Improve lateral ankle stability', 'Address biomechanical factors'],
        ARRAY['No sudden lateral changes of direction', 'Avoid excessive inversion on uneven ground'],
        ARRAY['Pain-free resisted eversion', 'Stable single leg stance'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Eccentric Eversion (Band)', '3 × 15 reps', 'The gold standard for peroneal remodeling'),
    (p2_id, 'Lateral Skaters (Low impact)', '3 × 12 reps', 'Frontal plane control during lateral movement'),
    (p2_id, 'Single Leg Stance on Airex Pad', '3 × 45 sec', 'Challenge the eversors for reactive stabilization');
END IF;


-- 58. Ankle ORIF (Post-operative) - Phase 2: Mobilisation & Loading
-- Timeline: Week 6–12 (Post-clearance for WB)
SELECT id INTO proto_id FROM protocols WHERE name = 'Ankle ORIF (Post-operative)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Progressive Loading & Mobilisation', 'Week 6–12', 
        ARRAY['Full weight bearing pain-free', 'Restore dorsiflexion ROM', 'Normalization of gait'],
        ARRAY['Follow official weight-bearing restrictions religiously', 'Avoid impact until bony union confirmed by X-ray'],
        ARRAY['Full pain-free WB with no limp', 'Dorsiflexion > 15°'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Weight-bearing Dorsiflexion Stretch (Knee to wall)', '3 × 15 reps', 'Improve functional ankle mobility for gait'),
    (p2_id, 'Calf Raises (Bilateral to Unilateral)', '3 × 15 reps', 'Restore push-off power post immobilization'),
    (p2_id, 'Tandem Walking', '3 × 10 meters', 'Dynamic balance on a narrow base of support');
END IF;


-- 59. Hallux Valgus (Bunions) - Phase 2: Functional Walking & Strength
-- Timeline: Week 6–12
SELECT id INTO proto_id FROM protocols WHERE name = 'Hallux Valgus (Bunions)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Functional Strength & Foot Control', 'Week 6–12', 
        ARRAY['Normalize gait cycle (Big toe push-off)', 'Strengthen intrinsic foot muscles', 'Full ROM of the MTP joint'],
        ARRAY['Ensure surgical site is fully healed', 'Avoid narrow footwear during rehab'],
        ARRAY['Pain-free big toe flexion', 'Stable gait without compensation'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Short Foot Exercises (Arch lift)', '3 × 15 reps', 'Strengthen intrinsic muscles to support the medial arch'),
    (p2_id, 'Big Toe Isolations (Lifting toe alone)', '3 × 15 reps', 'Neuromuscular control of the hallux'),
    (p2_id, 'Towel Curls', '3 × 20 reps', 'Global foot intrinsic and extrinsic flexibility');
END IF;

END $$;
