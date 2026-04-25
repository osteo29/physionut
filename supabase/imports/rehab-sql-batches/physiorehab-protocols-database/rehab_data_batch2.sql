-- rehab_data_batch2.sql
-- Batch 2: Protocols 3 to 8 (Knee Protocols)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER;
    p2_id INTEGER;
    p3_id INTEGER;
BEGIN

-- 3. Meniscus Repair (Post-operative)
INSERT INTO protocols (name, category) VALUES ('Meniscus Repair (Post-operative)', 'Knee') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Protection', 'Week 0–6', 
    ARRAY['Protect repair', 'Control effusion', 'Maintain quad activation', 'Toe-touch weight bearing'],
    ARRAY['NWB or TTWB only', 'No flexion beyond 90°', 'No squatting or pivoting', 'Crutches mandatory'],
    ARRAY['No effusion increase with activity', 'Full extension maintained', 'Week 6 surgeon clearance'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Quad Sets', '4 × 20 reps', 'Critical for preventing quad atrophy during NWB'),
(p1_id, 'SLR (4 planes)', '3 × 15 reps each', 'Flexion, abduction, adduction, extension'),
(p1_id, 'Ankle Pumps', '3 × 30 reps', 'DVT prevention'),
(p1_id, 'AAROM Flexion (to 90° only)', '3 × 15 reps', 'Heel slides, stop at 90° — respect repair'),
(p1_id, 'Stationary Bike (seat HIGH)', '15 min', 'Minimal knee flexion, low resistance — after week 4');

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Progressive Loading', 'Week 6–12', 
    ARRAY['Full ROM 0–130°', 'WBAT progressing to FWB', 'Functional strength', 'Normalise gait'],
    ARRAY['Avoid deep squat >90° until week 10', 'No running yet', 'Monitor for joint line pain'],
    ARRAY['Full ROM achieved', 'FWB without pain', 'Normal gait without assistive device'])
RETURNING id INTO p2_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p2_id, 'Mini Squats (0–60°)', '3 × 15 reps', 'Progress range weekly, bilateral first'),
(p2_id, 'Leg Press (bilateral)', '3 × 15 reps', '60–90° range, controlled'),
(p2_id, 'Step-ups (forward & lateral)', '3 × 15 each', '10 cm → 15 cm box progression'),
(p2_id, 'Single-leg Balance', '3 × 45 sec', 'Stable then unstable surface'),
(p2_id, 'Hip Strengthening', '3 × 15 each', 'Abductors and extensors — key for knee stability'),
(p2_id, 'Pool Walking', '20 min', 'Offload joint while gaining ROM and strength');

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Return to Function', 'Month 3–6', 
    ARRAY['Return to running (month 4)', 'Sport-specific training', 'Full symmetrical function'],
    ARRAY['No contact sport before month 6', 'Avoid deep pivoting positions until month 5'],
    ARRAY['LSI >90% strength & hop tests', 'No pain with sport activity', 'Surgeon clearance at 6 months'])
RETURNING id INTO p3_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p3_id, 'Single-leg Squat', '4 × 12 reps', 'Full depth, control valgus'),
(p3_id, 'Running Program', 'Walk-jog progression', 'Begin month 4 — even surface, build duration'),
(p3_id, 'Plyometrics', '3 × 10 reps', 'Bilateral jumps first, then unilateral hops'),
(p3_id, 'Agility Drills', '3 sets', 'Carioca, T-drill, shuttle runs'),
(p3_id, 'Sport-Specific Skills', 'Progressive', 'Full sport return month 6 with surgeon clearance');


-- 4. Patellofemoral Pain Syndrome (PFPS)
INSERT INTO protocols (name, category) VALUES ('Patellofemoral Pain Syndrome (PFPS)', 'Knee') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Pain Reduction', 'Week 0–3', 
    ARRAY['Reduce anterior knee pain', 'Restore pain-free ROM', 'Patient education on load management'],
    ARRAY['Avoid pain >4/10 with exercise', 'No deep squatting or stairs initially', 'Patellar taping as adjunct'],
    ARRAY['Pain ≤2/10 with ADLs', 'Full pain-free ROM', 'Ready for CKC loading'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Straight Leg Raise', '3 × 15 reps', 'VMO activation without PFJ stress'),
(p1_id, 'Hip Abduction (side-lying)', '3 × 20 reps', 'Key — hip weakness major driver of PFPS'),
(p1_id, 'Hip External Rotation (clamshell)', '3 × 20 reps', 'Band around knees, control movement'),
(p1_id, 'Quad Sets + Biofeedback', '3 × 20 reps', 'VMO focus, biofeedback if available'),
(p1_id, 'Stationary Bike (pain-free range)', '15–20 min', 'High seat to limit flexion load');

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Strengthening', 'Week 3–8', 
    ARRAY['Hip and quad strengthening', 'Neuromuscular control', 'Load tolerance for stairs & squatting'],
    ARRAY['Monitor for pain increase post-exercise', 'Avoid OKC exercises if painful'],
    ARRAY['Stairs pain-free', 'Single-leg squat controlled', 'Running 20 min pain-free'])
RETURNING id INTO p2_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p2_id, 'Wall Squat (0–60°)', '3 × 20 reps', 'Focus on hip-knee-foot alignment'),
(p2_id, 'Step-down (eccentric focus)', '3 × 15 reps', 'Slow 4-sec descent, control knee valgus'),
(p2_id, 'Hip Thrust', '3 × 15 reps', 'Glute activation and posterior chain loading'),
(p2_id, 'Lateral Band Walk', '3 × 15 steps each', 'Hip external rotator and abductor activation'),
(p2_id, 'TKE (band)', '3 × 20 reps', 'VMO activation in functional position'),
(p2_id, 'Running on flat surface', 'Start 10 min', 'Pain-free only — cadence focus');

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 3, 'Return to Sport', 'Week 8–16', 
    ARRAY['Sport-specific loading', 'Full return to running and sport', 'Long-term self-management'],
    ARRAY['Maintain hip strengthening long-term', 'Manage training load spikes'],
    ARRAY['Pain-free with all sport demands', 'Confident return to training', 'Self-managed home program'])
RETURNING id INTO p3_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p3_id, 'Single-leg Squat Progression', '4 × 12 reps', 'Add load, depth, and speed progressively'),
(p3_id, 'Plyometrics (bilateral → unilateral)', '3 × 10 reps', 'Ensure pain-free landing mechanics'),
(p3_id, 'Running Program', 'Progressive', '10% rule for weekly mileage increase'),
(p3_id, 'Sport-Specific Drills', 'Full sessions', 'Cutting, jumping, sport movement patterns');


-- 5. Patellar Tendinopathy
INSERT INTO protocols (name, category) VALUES ('Patellar Tendinopathy', 'Knee') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Load Reduction & Isometrics', 'Week 0–4', 
    ARRAY['Pain reduction', 'Tendon loading via isometrics', 'Reduce reactive tendinopathy'],
    ARRAY['Avoid stretching tendon', 'Avoid high load eccentric initially if reactive', 'Manage training load'],
    ARRAY['VISA-P score improvement', 'Pain ≤3/10 with isometrics', 'Morning stiffness reducing'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Isometric Leg Press (70° knee flexion)', '5 × 45 sec hold, 80% effort', 'Immediate analgesic effect — key exercise'),
(p1_id, 'Isometric Wall Squat', '5 × 45 sec hold', 'Same benefit as leg press if no machine available'),
(p1_id, 'Hip Strengthening', '3 × 15 reps', 'Glutes, hip abductors — reduce tendon load'),
(p1_id, 'Upper body & non-painful conditioning', 'As tolerated', 'Maintain fitness without tendon provocation');

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Heavy Slow Resistance', 'Week 4–8', 
    ARRAY['Tendon structural adaptation', 'Strength gains', 'Return to light sport-specific loading'],
    ARRAY['Avoid plyometrics', 'Monitor 24h pain response after loading'],
    ARRAY['VISA-P ≥60', 'Tolerating heavy loading without spike', 'Ready for plyometric introduction'])
RETURNING id INTO p2_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p2_id, 'Leg Press (heavy, slow)', '4 × 6 reps', 'Heavy slow resistance — gold standard'),
(p2_id, 'Hack Squat', '4 × 6 reps, slow tempo', 'Progressive load increase weekly'),
(p2_id, 'Spanish Squat (isometric)', '4 × 45 sec', 'Band around fixed point, hip hinge position'),
(p2_id, 'Step-ups (heavy)', '3 × 10 reps each', 'High box, controlled eccentric');


-- 6. MCL Sprain (Grade II)
INSERT INTO protocols (name, category) VALUES ('MCL Sprain (Grade II)', 'Knee') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Protection', 'Week 0–2', 
    ARRAY['Reduce pain and swelling', 'Protect healing ligament', 'Maintain quad activation'],
    ARRAY['Valgus stress brace recommended', 'Avoid valgus loading', 'Partial weight bearing'],
    ARRAY['Pain ≤3/10 at rest', 'Able to FWB with brace'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Quad Sets', '3 × 20 reps', 'Prevent quad atrophy'),
(p1_id, 'SLR (4 planes)', '3 × 15 reps', 'Maintain hip and quad strength'),
(p1_id, 'Stationary Bike (pain-free)', '15 min', 'High seat, low resistance, reduce swelling'),
(p1_id, 'Cryotherapy', '15 min × 3–4/day', 'Swelling management');

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Strengthening', 'Week 2–6', 
    ARRAY['Full ROM', 'Valgus control', 'FWB without brace', 'CKC strengthening'],
    ARRAY['Avoid valgus collapse in all exercises', 'Progress load gradually'],
    ARRAY['FWB pain-free', 'No valgus instability with ADL'])
RETURNING id INTO p2_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p2_id, 'Mini Squats', '3 × 15 reps', 'Knees straight, no valgus collapse'),
(p2_id, 'Step-ups (forward & lateral)', '3 × 15 reps', 'Control medial knee position'),
(p2_id, 'Hip Abductor Strengthening', '3 × 20 reps', 'Critical to reduce valgus stress on MCL'),
(p2_id, 'TKE (band)', '3 × 20 reps', 'Quad activation, controlled alignment'),
(p2_id, 'Single-leg Balance', '3 × 30 sec', 'Progress to unstable surface');


-- 7. Total Knee Arthroplasty (TKA)
INSERT INTO protocols (name, category) VALUES ('Total Knee Arthroplasty (TKA)', 'Knee') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Acute Hospital', 'Day 0–3', 
    ARRAY['Pain management', 'Achieve 0–90° ROM', 'Independent mobility', 'DVT prevention'],
    ARRAY['Monitor for signs of DVT', 'Weight bearing as tolerated (WBAT)', 'Follow surgeon precautions'],
    ARRAY['90° flexion', 'Independent ambulation with frame', 'Safe for discharge'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Ankle Pumps', '10 reps every hour', 'DVT prevention — start immediately post-op'),
(p1_id, 'Quad Sets', '3 × 20 reps', 'Begin day 1 post-op'),
(p1_id, 'Heel Slides (AAROM)', '3 × 15 reps', 'Work toward 90° flexion'),
(p1_id, 'SLR', '3 × 15 reps', 'When quad sets pain-free'),
(p1_id, 'Sit-to-Stand', '5 × per session', 'Use armrests, controlled movement');


-- 8. PCL Tear — Conservative
INSERT INTO protocols (name, category) VALUES ('PCL Tear — Conservative', 'Knee') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Acute', 'Week 0–4', 
    ARRAY['Reduce effusion', 'Quad activation', 'Protect posterior capsule', 'FWB with brace'],
    ARRAY['PCL brace with 0° extension stop', 'No posterior tibial stress', 'Avoid prone knee flexion'],
    ARRAY['Effusion resolved', 'Quad activation full', 'Pain ≤2/10 with activity'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Quad Sets', '4 × 20 reps', 'Quad dominance is protective for PCL — critical'),
(p1_id, 'SLR (flexion & extension)', '3 × 15 reps', 'No hamstring-loaded SLR'),
(p1_id, 'Leg Press (0–60° only)', '3 × 15 reps', 'Quad-dominant, avoid 90° — increases PCL stress'),
(p1_id, 'Stationary Bike (low resistance)', '20 min', 'High seat, low resistance, quad emphasis');

END $$;
