-- rehab_data_complete.sql
-- Run this in your Supabase SQL Editor AFTER running schema.sql

-- 1. ACL Reconstruction (Hamstring Graft)
DO $$
DECLARE
    proto_id INTEGER;
    p1_id INTEGER;
    p2_id INTEGER;
    p3_id INTEGER;
    p4_id INTEGER;
BEGIN
    -- Insert Protocol
    INSERT INTO protocols (name, category) VALUES ('ACL Reconstruction (Hamstring Graft)', 'Knee') RETURNING id INTO proto_id;

    -- Phase 1
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 1, 'Immediate Post-op', 'Week 0–2', 
        ARRAY['Control pain & swelling', 'Achieve full passive knee extension', 'Quadriceps activation', 'Independent ambulation with crutches'],
        ARRAY['No active knee extension 0–90°', 'Avoid hamstring loading (graft protection)', 'PWB with crutches'],
        ARRAY['Full passive extension achieved', 'SLR without extension lag', 'Swelling <1+ on effusion scale'])
    RETURNING id INTO p1_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p1_id, 'Quadriceps Sets (Isometric)', '3 × 20 reps, 5-sec hold', 'Flatten back of knee to bed, feel VMO contract'),
    (p1_id, 'Ankle Pumps', '3 × 30 reps', 'Reduce DVT risk, improve circulation'),
    (p1_id, 'Straight Leg Raise (SLR)', '3 × 15 reps', 'Lock knee before lifting, no lag allowed'),
    (p1_id, 'Heel Slides (AAROM Flexion)', '3 × 15 reps', 'Slide heel toward buttocks, hold 2 sec at end range'),
    (p1_id, 'Passive Knee Extension (prone hang)', '3 × 5 min', 'Let gravity achieve full extension'),
    (p1_id, 'Patellar Mobilisation', '2 × 2 min', 'Medial, lateral, superior glides — pain free');

    -- Phase 2
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Early Strengthening', 'Week 2–6', 
        ARRAY['0–120° ROM', 'Normalise gait without crutches', 'Begin CKC loading', 'Neuromuscular re-education'],
        ARRAY['Avoid OKC knee extension 0–60°', 'No pivoting or cutting', 'Monitor effusion with activity'],
        ARRAY['Full ROM 0–120°', 'Single-leg stance ≥30 sec', 'Normal gait pattern without device'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Mini Squats (0–45°)', '3 × 15 reps', 'Knees track over 2nd toe, weight through heels'),
    (p2_id, 'Step-Ups (10 cm box)', '3 × 15 reps each leg', 'Lead with affected leg, control descent'),
    (p2_id, 'Leg Press (60–90°)', '3 × 15 reps, light load', 'Bilateral then unilateral, avoid locking out'),
    (p2_id, 'Terminal Knee Extension (band)', '3 × 20 reps', 'Focus on last 20° — VMO activation'),
    (p2_id, 'Hip Abduction — Side-lying', '3 × 20 reps', 'Maintain pelvic stability, control return'),
    (p2_id, 'Calf Raises (bilateral)', '3 × 20 reps', 'Full ROM, slow eccentric phase');

    -- Phase 3
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Advanced Strengthening', 'Week 6–12', 
        ARRAY['Limb Symmetry Index (LSI) >70%', 'Begin jogging', 'Develop strength & power', 'Proprioception training'],
        ARRAY['No change-of-direction sport', 'Monitor for effusion post-exercise', 'Gradual plyometric loading'],
        ARRAY['LSI ≥80% quad & hamstring strength', 'Hop test symmetry ≥80%', 'Jog pain-free 30 min'])
    RETURNING id INTO p3_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Bulgarian Split Squat', '4 × 10 reps each', 'Front foot flat, torso upright, 90° knee flexion'),
    (p3_id, 'Romanian Deadlift', '4 × 10 reps', 'Hip hinge pattern, neutral spine, feel hamstring load'),
    (p3_id, 'Lateral Band Walks', '3 × 15 steps each direction', 'Maintain squat position, band around ankles'),
    (p3_id, 'Single-Leg Press', '4 × 12 reps', 'Progressive loading, track limb symmetry'),
    (p3_id, 'Box Step-Down', '3 × 12 reps each', 'Slow 5-sec eccentric, control valgus collapse');

    -- Phase 4
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Return to Sport', 'Month 4–9', 
        ARRAY['LSI ≥90% all hop tests', 'Sport-specific agility', 'Psychological readiness', 'Full return to unrestricted sport'],
        ARRAY['Clear psychological readiness (ACL-RSI score)', 'Minimum 9 months post-op for contact sport', 'Gradual reintroduction to team training'],
        ARRAY['LSI ≥90% quad/hamstring/hop', 'ACL-RSI ≥65', 'Clearance from surgeon + physio'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p4_id, 'T-Agility Test Drills', '4–6 sets', 'Progressive speed increase over weeks'),
    (p4_id, 'Reactive Change-of-Direction', '3 × 10 reps', 'Controlled, then progress to reactive cues'),
    (p4_id, 'Plyometric Progression (single-leg)', '3 × 8 reps', 'Lateral hops, bounding, depth jumps — master each before progressing'),
    (p4_id, 'Sport-Specific Drills', '3 × 5 min blocks', 'Cutting, deceleration, sport movement patterns'),
    (p4_id, 'Strength Maintenance (Gym)', '3 × week', 'Maintain gains achieved in Phase 3');

END $$;


-- 2. ACL Tear — Conservative Management
DO $$
DECLARE
    proto_id INTEGER;
    p1_id INTEGER;
    p2_id INTEGER;
BEGIN
    INSERT INTO protocols (name, category) VALUES ('ACL Tear — Conservative Management', 'Knee') RETURNING id INTO proto_id;

    -- Phase 1
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 1, 'Acute', 'Week 0–2', 
        ARRAY['Reduce effusion & pain', 'Achieve full extension', 'Restore basic quad activation'],
        ARRAY['Avoid pivoting/cutting', 'Brace if instability present', 'No impact loading'],
        ARRAY['Full extension', 'Minimal effusion', 'SLR without lag'])
    RETURNING id INTO p1_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p1_id, 'Quad Sets', '3 × 20 reps', 'Isometric quad contraction, focus on VMO'),
    (p1_id, 'SLR (Flexion)', '3 × 15 reps', 'Maintain full knee extension throughout'),
    (p1_id, 'Ankle Pumps', '3 × 30 reps', 'Circulation and swelling control'),
    (p1_id, 'Prone Knee Hang (extension)', '3 × 5 min', 'Achieve neutral 0° extension'),
    (p1_id, 'Cryotherapy', '15–20 min every 2h', 'Post-exercise swelling management');

    -- Phase 2
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Strengthening', 'Week 2–8', 
        ARRAY['Full ROM', 'Symmetrical strength', 'Normalise gait', 'Functional stability'],
        ARRAY['Avoid high-risk pivot sports without brace', 'Monitor giving-way episodes'],
        ARRAY['Limb symmetry >80%', 'No giving way with daily activities', 'Single leg squat with good control'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Wall Squat (45–60°)', '3 × 20 reps', 'Isometric hold 5 sec at bottom'),
    (p2_id, 'Step-ups', '3 × 15 reps each', 'Step height progresses 10→15→20 cm'),
    (p2_id, 'Hip Strengthening Circuit', '3 × 15 reps each', 'Abductors, extensors, external rotators'),
    (p2_id, 'TKE (band)', '3 × 20 reps', 'Terminal knee extension focus on VMO'),
    (p2_id, 'Single-leg Balance', '3 × 30 sec', 'Eyes open then closed, unstable surface progression');

END $$;
