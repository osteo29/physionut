-- rehab_data_batch6.sql
-- Batch 6: Protocols 30 to 37 (Knee, Shoulder & Elbow)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER;
BEGIN

-- 30. Quadriceps Tendinopathy
INSERT INTO protocols (name, category) VALUES ('Quadriceps Tendinopathy', 'Knee') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Isometric Loading', 'Week 0–4', 
    ARRAY['Pain reduction', 'Tendon loading via isometrics', 'Load management'],
    ARRAY['Avoid jumping and plyometrics', 'Reduce training load', 'Avoid deep knee flexion'],
    ARRAY['Pain ≤3/10 during isometrics', 'VISA-P improving'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Isometric Leg Press (70° knee flexion)', '5 × 45 sec, 80% effort', 'Immediate analgesic effect for quadriceps tendon'),
(p1_id, 'Isometric Wall Squat (60°)', '5 × 45 sec', 'Alternative to leg press — same analgesic principle');


-- 31. Biceps Tendinopathy (Long Head)
INSERT INTO protocols (name, category) VALUES ('Biceps Tendinopathy (Long Head)', 'Shoulder') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Acute / Protection', 'Week 0-2 (varies)', 
    ARRAY['Reduce pain and inflammation', 'Protect injured structure', 'Maintain adjacent joint mobility'],
    ARRAY['Avoid aggravating movements', 'Respect tissue healing timeline', 'Monitor for red flags'],
    ARRAY['Pain ≤3/10 at rest', 'Swelling resolving', 'Ready for progressive loading'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Isometric Activation (primary muscles)', '3 × 10 reps, 5–10 sec hold', 'Sub-maximal — maintain activation without loading injury'),
(p1_id, 'Adjacent Joint ROM', '3 × 20 reps', 'Maintain mobility in joints proximal and distal to injury'),
(p1_id, 'Gentle Aerobic Conditioning', '20 min', 'Bike, pool, or arm ergometer — based on injury site'),
(p1_id, 'Cryotherapy / Compression', '15–20 min × 3–4/day', 'Oedema and pain management');


-- 36. Medial Epicondylalgia (Golfer''s Elbow)
INSERT INTO protocols (name, category) VALUES ('Medial Epicondylalgia (Golfer''s Elbow)', 'Elbow & Wrist') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Isometric Loading & Load Management', 'Week 0–4', 
    ARRAY['Reduce medial elbow pain at common flexor origin', 'Isometric wrist flexion for analgesia', 'Identify provocative activities'],
    ARRAY['Assess for ulnar nerve involvement', 'Reduce gripping and loading by 50%', 'Avoid stretching wrist extensors'],
    ARRAY['Pain ≤3/10 during isometrics', 'Morning stiffness <15 min', 'Ulnar nerve symptoms reducing'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Isometric Wrist Flexion (table edge)', '5 × 45 sec, 70–80% effort', 'Immediate analgesic effect — elbow at 90°, forearm supinated'),
(p1_id, 'Isometric Grip (ball/putty)', '5 × 45 sec', 'Flexor-pronator activation without provocative movement'),
(p1_id, 'Isometric Pronation (resistance)', '3 × 10 reps, 10 sec hold', 'Pronator teres component — important in throwing/golf'),
(p1_id, 'Ulnar Nerve Slider', '3 × 10 reps each', 'Elbow flex/ext with wrist and shoulder — neural mobility');


-- 37. UCL Sprain — Elbow (Ulnar Collateral Ligament)
INSERT INTO protocols (name, category) VALUES ('UCL Sprain — Elbow (Ulnar Collateral Ligament)', 'Elbow & Wrist') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Acute Protection & Early Mobilisation', 'Week 0–4', 
    ARRAY['Protect medial elbow from valgus stress', 'Reduce pain and inflammation', 'Maintain elbow ROM within safe range'],
    ARRAY['ABSOLUTE: No throwing or valgus loading', 'Monitor for ulnar nerve symptoms', 'Hinged elbow brace may be used'],
    ARRAY['Pain ≤3/10 at rest and with AROM', 'Full elbow AROM within brace limits', 'No ulnar nerve symptoms'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Elbow AROM (flex/ext, neutral forearm)', '3 × 20 reps', 'Restore elbow ROM — avoid valgus stress; no weight'),
(p1_id, 'Forearm Pronation/Supination', '3 × 20 reps each', 'Maintain forearm rotation — important for function'),
(p1_id, 'Isometric Elbow Flexion (submaximal)', '3 × 10 reps, 10 sec hold', 'Maintain muscle activation without valgus stress'),
(p1_id, 'Shoulder and Scapular Maintenance', '3 × 15 reps', 'Prevent proximal deconditioning — shoulder ER/Scapular');

END $$;
