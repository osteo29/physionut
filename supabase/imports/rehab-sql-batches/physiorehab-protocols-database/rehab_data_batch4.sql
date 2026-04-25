-- rehab_data_batch4.sql
-- Batch 4: Protocols 16 to 22 (Ankle, Spine & Hip)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER;
    p2_id INTEGER;
    p3_id INTEGER;
BEGIN

-- 16. Ankle Fracture (Post-immobilisation)
INSERT INTO protocols (name, category) VALUES ('Ankle Fracture (Post-immobilisation)', 'Ankle & Foot') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Post-Cast Restoration', 'Week 0–4 post-cast', 
    ARRAY['Restore ankle ROM', 'Reduce oedema', 'Begin WB progression', 'Gait retraining'],
    ARRAY['Follow surgeon WB status', 'Monitor wound if ORIF', 'No inversion loading if fibula fracture'],
    ARRAY['FWB pain-free', 'Dorsiflexion improving', 'No significant oedema'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Ankle ROM (AROM all planes)', '3 × 20 reps each direction', 'Alphabet tracing — restore dorsiflexion priority'),
(p1_id, 'Ankle Pumps', 'Every hour, 20 reps', 'Oedema management — elevation between sessions'),
(p1_id, 'Calf Raises (bilateral, seated)', '3 × 20 reps', 'Begin gravity-eliminated, progress'),
(p1_id, 'Pool Walking', '20 min', 'Offloaded WB — excellent early rehabilitation');


-- 17. Non-specific Low Back Pain (Acute)
INSERT INTO protocols (name, category) VALUES ('Non-specific Low Back Pain (Acute)', 'Spine') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Acute Pain Management', 'Week 0–2', 
    ARRAY['Reduce pain and muscle guarding', 'Maintain mobility and avoid deconditioning', 'Patient education — reassurance and self-management'],
    ARRAY['Screen for red flags: cauda equina, fracture, malignancy', 'Avoid prolonged bed rest', 'No heavy lifting or sustained flexion loading'],
    ARRAY['Pain ≤4/10 with daily activities', 'Able to walk 20 min without significant pain increase', 'Red flags excluded'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Walking (paced, flat surface)', '10–20 min × 2/day', 'Best evidence for acute LBP — maintain normal spinal loading'),
(p1_id, 'Knee-to-Chest Stretch (lumbar flexion)', '3 × 30 sec each', 'Gentle lumbar flexion mobilisation — symptom-guide'),
(p1_id, 'Cat-Camel (lumbar flexion/extension)', '3 × 10 reps', 'Segmental lumbar mobility — promotes synovial fluid circulation'),
(p1_id, 'Prone Lying (extension bias if centralising)', '3 × 5 min', 'McKenzie extension if pain peripheralises with flexion'),
(p1_id, 'Diaphragmatic Breathing', '5 min × 3/day', 'Reduce sympathetic nervous system activation — pain modulation');


-- 18. Lumbar Disc Herniation with Radiculopathy
INSERT INTO protocols (name, category) VALUES ('Lumbar Disc Herniation with Radiculopathy', 'Spine') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Acute Radicular Pain Management', 'Week 0–4', 
    ARRAY['Reduce radicular pain and neurological symptoms', 'Centralisation of symptoms', 'Patient education', 'Maintain mobility'],
    ARRAY['URGENT: Cauda equina signs — emergency referral', 'Progressive neurological deficit requires urgent review', 'Avoid sustained lumbar flexion'],
    ARRAY['Symptoms centralising', 'Pain ≤4/10 with walking', 'No progressive neurological deficit'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Prone Lying / Press-ups (extension)', '3 × 10 reps / 3 × 5 min', 'McKenzie extension — centralise leg symptoms'),
(p1_id, 'Walking (short, frequent bouts)', '10 min × 3–4/day', 'Avoid sustained sitting — intermittent loading best'),
(p1_id, 'Neural Mobilisation (sciatic nerve slider)', '3 × 10 reps each', 'Ankle DF/PF with straight leg — gentle nerve gliding'),
(p1_id, 'Sleeping Posture Education', 'Daily cue', 'Side-lying with pillow between knees — reduce disc pressure');


-- 21. Hip Labral Tear (Conservative)
INSERT INTO protocols (name, category) VALUES ('Hip Labral Tear (Conservative)', 'Hip') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Pain Reduction & Activity Modification', 'Week 0–6', 
    ARRAY['Reduce intra-articular pain and inflammation', 'Identify provocative loading positions', 'Restore pain-free ROM within safe arcs'],
    ARRAY['Avoid deep hip flexion beyond 90°', 'No pivoting or cutting', 'Avoid hip ER combined with extension (prone)'],
    ARRAY['Pain ≤3/10 with daily activities', 'No clicking, locking, or giving way with walking', 'Hip AROM improving'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Supine Hip AROM (pain-free arcs)', '3 × 20 reps each direction', 'Maintain synovial fluid circulation — avoid impingement zone'),
(p1_id, 'Isometric Hip Abduction (side-lying)', '3 × 10 reps, 10 sec hold', 'Activate gluteus medius without joint compression'),
(p1_id, 'Isometric Hip Extension (prone, neutral)', '3 × 10 reps, 10 sec hold', 'Gluteus maximus activation — avoid extension past neutral'),
(p1_id, 'Stationary Bike (seat height high)', '20–30 min', 'Low hip flexion arc — cardiovascular maintenance without provocation');


-- 22. Total Hip Arthroplasty (THA)
INSERT INTO protocols (name, category) VALUES ('Total Hip Arthroplasty (THA)', 'Hip') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Acute Post-operative', 'Week 0–6', 
    ARRAY['Safe mobilisation with assistive device', 'Wound healing and oedema management', 'DVT prevention', 'Patient education — THA precautions'],
    ARRAY['POSTERIOR APPROACH: No hip flexion >90°, no IR, no adduction past midline', 'ANTERIOR APPROACH: No hip extension past neutral, no ER in extended position', 'No pivoting on operative leg'],
    ARRAY['FWB with single assistive device', 'Wound healed — sutures removed', 'Hip ROM improving within limits'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Ankle Pumps', '10 reps every hour', 'DVT prevention — begin immediately post-op'),
(p1_id, 'Quad Sets (isometric)', '3 × 20 reps', 'Maintain quadriceps activation while NWB or PWB'),
(p1_id, 'Heel Slides (supine)', '3 × 20 reps', 'Restore hip and knee flexion within precaution limits'),
(p1_id, 'Hip Abduction (supine, within limits)', '3 × 20 reps', 'Gluteus medius activation — avoid adduction past midline'),
(p1_id, 'Stair Training (one step at a time)', 'Supervised daily', 'Good leg up first, bad leg down first — patient must know this rule');

END $$;
