-- rehab_data_batch3.sql
-- Batch 3: Protocols 9 to 15 (Shoulder & Ankle/Foot)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER;
    p2_id INTEGER;
    p3_id INTEGER;
    p4_id INTEGER;
BEGIN

-- 9. Rotator Cuff Repair (Post-operative)
INSERT INTO protocols (name, category) VALUES ('Rotator Cuff Repair (Post-operative)', 'Shoulder') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Passive Motion', 'Week 0–6', 
    ARRAY['Protect repair', 'Prevent stiffness', 'PROM: 140° flexion, 40° ER', 'Pain management'],
    ARRAY['Sling at all times except exercise', 'No AROM', 'No lifting or pushing', 'No internal rotation stress'],
    ARRAY['PROM: 140° flexion, 40° ER at neutral', 'Pain controlled at rest', 'Surgeon clearance at 6 weeks'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Pendulum (Codman''s) Exercises', '3 × 2 min all planes', 'Gravity-assisted distraction — no muscle activation'),
(p1_id, 'PROM Shoulder Flexion (supine)', '3 × 15 reps to tolerance', 'Therapist-assisted, pain-free range'),
(p1_id, 'PROM ER (0° abduction)', '3 × 15 reps', 'Elbow at side, cane-assisted to 40°'),
(p1_id, 'Elbow ROM & grip strength', '3 × 20 reps', 'Maintain distal function while in sling'),
(p1_id, 'Scapular Retraction (isometric)', '3 × 10 reps, 5 sec hold', 'Maintain scapular function');

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'Active Assisted & Early Active', 'Week 6–12', 
    ARRAY['AAROM → AROM', 'Rotator cuff activation', 'Scapular stabilisation', 'Progress to 150° flexion'],
    ARRAY['No lifting >1 kg', 'No reaching behind back', 'Avoid painful arcs'],
    ARRAY['AROM: 150° flexion', 'ER to 60°', 'No painful arc'])
RETURNING id INTO p2_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p2_id, 'Pulleys (AAROM flexion)', '3 × 20 reps', 'Good arm assists — gradual range increase'),
(p2_id, 'Supine Active Flexion', '3 × 15 reps', 'Gravity-eliminated initially, progress to against gravity'),
(p2_id, 'ER with band (light resistance)', '3 × 15 reps', 'Elbow at side, slow controlled — infraspinatus/teres minor'),
(p2_id, 'Scapular Push-up (wall)', '3 × 15 reps', 'Serratus anterior — critical for scapular upward rotation'),
(p2_id, 'Side-lying ER', '3 × 15 reps', 'Light weight, focus on external rotators'),
(p2_id, 'Prone Y/T/W', '3 × 12 reps', 'Scapular stabilisers — no weight initially');


-- 10. Shoulder Impingement Syndrome
INSERT INTO protocols (name, category) VALUES ('Shoulder Impingement Syndrome', 'Shoulder') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Pain Reduction', 'Week 0–3', 
    ARRAY['Reduce subacromial inflammation', 'Improve scapular positioning', 'Pain ≤3/10'],
    ARRAY['Avoid overhead reaching', 'No painful arc activities', 'Correct posture deficits'],
    ARRAY['Pain ≤3/10 with daily activities', 'Scapular resting position improved'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Pendulums', '3 × 2 min', 'Gentle distraction — reduce subacromial pressure'),
(p1_id, 'Scapular Retraction (sitting)', '3 × 20 reps, 5 sec hold', 'Pull shoulder blades together and down'),
(p1_id, 'Chin Tucks', '3 × 20 reps', 'Correct forward head — affects scapular position'),
(p1_id, 'ER with band (low resistance)', '3 × 20 reps', 'Elbow at side — infraspinatus and teres minor'),
(p1_id, 'Posture correction exercises', 'Hourly reminders', 'Thoracic extension — key modifiable factor');


-- 13. Lateral Ankle Sprain (Grade I-II)
INSERT INTO protocols (name, category) VALUES ('Lateral Ankle Sprain (Grade I-II)', 'Ankle & Foot') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'PEACE', 'Day 0–3', 
    ARRAY['Reduce swelling and pain', 'Protect injured ligaments', 'Begin early weight bearing'],
    ARRAY['PEACE protocol: Protect, Elevate, Avoid anti-inflammatories, Compress, Educate', 'No passive stretching in first 72h'],
    ARRAY['Swelling reducing', 'Pain ≤4/10 with WB', 'Ready for LOVE phase'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Ankle Pumps', '10 reps every hour', 'Reduce swelling — start immediately'),
(p1_id, 'Toe Curls / Marble pickups', '3 × 20 reps', 'Intrinsic foot muscle activation'),
(p1_id, 'RICE', '20 min every 2h', 'Elevate above heart level'),
(p1_id, 'Partial Weight Bearing (crutches if needed)', 'As tolerated', 'Pain-free loading is better than rest');

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 2, 'LOVE & Early Rehab', 'Day 3–Week 4', 
    ARRAY['FWB pain-free', 'Restore ROM', 'Begin proprioception training', 'Normal gait'],
    ARRAY['Brace or taping for support', 'Avoid inversion loading', 'Pain guide'],
    ARRAY['FWB pain-free', 'Normal gait', 'Good balance on involved side'])
RETURNING id INTO p2_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p2_id, 'Calf Raises (bilateral)', '3 × 20 reps', 'Full ROM, slow and controlled'),
(p2_id, 'Resistance Band Eversion', '3 × 20 reps', 'Peroneal strengthening — critical for lateral stability'),
(p2_id, 'Alphabet Tracing (AROM)', '2 × each letter', 'Full ankle ROM in all planes'),
(p2_id, 'Single-leg Balance', '3 × 30 sec', 'Proprioception — eyes open then closed');


-- 14. Achilles Tendinopathy
INSERT INTO protocols (name, category) VALUES ('Achilles Tendinopathy', 'Ankle & Foot') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Isometric Loading', 'Week 0–4', 
    ARRAY['Pain reduction', 'Tendon loading tolerance', 'Identify and modify contributing factors'],
    ARRAY['Avoid stretching Achilles in reactive phase', 'Modify training load', 'Heel raise in shoe'],
    ARRAY['Pain ≤4/10 during isometrics', 'Morning stiffness <10 min', 'VISA-A improving'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Isometric Calf Holds (knee straight)', '5 × 45 sec, 70–80% effort', 'Standing calf raise held — immediate analgesic effect'),
(p1_id, 'Isometric Calf Holds (knee bent 30°)', '5 × 45 sec', 'Loads soleus predominantly'),
(p1_id, 'Bike / Swimming', '30 min', 'Maintain cardiovascular fitness without Achilles load');

END $$;
