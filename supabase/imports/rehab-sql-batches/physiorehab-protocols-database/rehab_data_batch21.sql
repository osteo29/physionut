-- rehab_data_batch21.sql
-- استكمال النواقص: البروتوكولات 72, 73, 75, 77, 78
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER;
BEGIN

-- 72. Radial Tunnel Syndrome
INSERT INTO protocols (name, category) VALUES ('Radial Tunnel Syndrome', 'Upper Limb') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Neural Unloading & Activity Modification', 'Week 0–6', 
    ARRAY['Reduce posterior interosseous nerve (PIN) irritation', 'Address forearm muscle tension (supinator)', 'Patient education on biomechanics'],
    ARRAY['Avoid forceful forearm supination + wrist extension', 'No heavy gripping or wringing clothes', 'Exclude lateral epicondylitis'],
    ARRAY['Lateral forearm pain reducing', 'Radial nerve tension test improving', 'Improved grip comfort'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Radial Nerve Slider', '3 × 10 reps', 'Gently glide the nerve — avoid tingling/numbness'),
(p1_id, 'Supinator Gentle Stretching', '3 × 30 sec', 'Elbow extended, forearm pronated — open the tunnel'),
(p1_id, 'Wrist Extension Isometrics (Painless)', '3 × 15 reps, 5 sec', 'Maintain tendon tone without aggressive nerve stimulation');


-- 73. Trigger Finger (Conservative)
INSERT INTO protocols (name, category) VALUES ('Trigger Finger (Conservative)', 'Upper Limb') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Inflammation Control & Tendon Protection', 'Week 0–4', 
    ARRAY['Reduce tendon sheath inflammation (A1 pulley)', 'Prevent snapping/locking episodes', 'Maintain joint mobility'],
    ARRAY['No forceful repetitive gripping', 'Splinting recommended for night or heavy activity', 'Avoid "testing" the snap'],
    ARRAY['Triggering frequency reduced', 'Reduced tenderness over A1 pulley', 'Ready for graduated loading'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Splinting (MCP joint block)', 'Nightly + heavy work', 'Prevents pulley irritation — allows tendon volume to reduce'),
(p1_id, 'Tendon Gliding Exercises (Blocking)', '3 × 15 reps', 'DIP/PIP isolate motion to move tendon within sheath without full snap'),
(p1_id, 'Passive Digital ROM', '3 × 20 reps', 'Maintain range without active pulley stress');


-- 75. Boutonniere Deformity (Acute/Conservative)
INSERT INTO protocols (name, category) VALUES ('Boutonniere Deformity', 'Upper Limb') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'PIP Immobilisation & Extension Restore', 'Week 0–6', 
    ARRAY['Restore central slip integrity', 'Achieve full passive PIP extension', 'Maintain DIP joint mobility'],
    ARRAY['PIP joint MUST be splinted in full extension 24/7', 'No PIP flexion allowed for 6 weeks', 'Monitor skin integrity'],
    ARRAY['6 weeks continuous immobilisation completed', 'Zero degree PIP extension achieved', 'DIP flexion full'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'PIP Neutral Splinting', 'Continuous (24/7)', 'Zero tolerance for flexion — allows central slip healing'),
(p1_id, 'DIP Joint Active Flexion', '5 × 10 reps hourly', 'Pull lateral bands distally — prevents fixed deformity'),
(p1_id, 'Hand/Wrist ROM (except PIP)', '3 × 20 reps', 'Maintain general hand function while PIP isolated');


-- 77. Extensor Tendon Repair (Zone IV-VI)
INSERT INTO protocols (name, category) VALUES ('Extensor Tendon Repair (Hand)', 'Upper Limb') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Early Protected Motion (EPM)', 'Week 0–4', 
    ARRAY['Tendon protection', 'Early controlled gliding', 'Edema management', 'Wound healing'],
    ARRAY['Strict follow of splint regime (SAM or Kleinert)', 'No active extension against resistance', 'No passive flexion beyond splint stop'],
    ARRAY['No signs of tendon rupture', 'Minimal adhesions', 'Wound closed'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Controlled Passive Flexion within Splint', '5 × 10 reps every 2h', 'Allows tendon excursion without high tension'),
(p1_id, 'Active Extension to Splint Stop', '5 × 10 reps every 2h', 'Low tension activation to prevent adhesions'),
(p1_id, 'Digital Edema Massage', '10 min', 'Proximal to distal — reduce bulk in tendon path');


-- 78. Dupuytren''s Contracture (Post-surgical Release)
INSERT INTO protocols (name, category) VALUES ('Dupuytren''s (Post-operative)', 'Upper Limb') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Wound Healing & Early Extension', 'Week 0–4', 
    ARRAY['Maintain surgical extension gains', 'Wound care', 'Edema management', 'Neural monitoring'],
    ARRAY['Night splint mandatory in full extension', 'Avoid aggressive forceful flexion early', 'Monitor for "flare reaction" (sudden pain/stiffness)'],
    ARRAY['Wound healed', 'Extension gains maintained', 'Active fist possible'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Digital Extension Splinting (Static)', 'Nightly (6 months)', 'Prevent scar contracture from returning'),
(p1_id, 'Tendon Gliding - Full Fist', '3 × 15 reps each position', 'Prevent adhesions to surgical scar'),
(p1_id, 'Scar Massage (after wound closure)', '5 min heavy pressure', 'Remodel fibrous tissue — key for long term mobility');

END $$;
