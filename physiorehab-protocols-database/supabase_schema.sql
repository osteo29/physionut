-- schema.sql
-- Run this in your Supabase SQL Editor to create the necessary tables.

DROP TABLE IF EXISTS exercises;
DROP TABLE IF EXISTS phases;
DROP TABLE IF EXISTS protocols;

-- Table for main protocols
CREATE TABLE protocols (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table for rehab phases
CREATE TABLE phases (
    id SERIAL PRIMARY KEY,
    protocol_id INTEGER REFERENCES protocols(id) ON DELETE CASCADE,
    phase_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    timeline TEXT,
    goals TEXT[] DEFAULT '{}',
    precautions TEXT[] DEFAULT '{}',
    criteria_to_progress TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table for exercises within each phase
CREATE TABLE exercises (
    id SERIAL PRIMARY KEY,
    phase_id INTEGER REFERENCES phases(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    parameters TEXT, -- e.g., '3 x 15 reps'
    clinical_cue_rationale TEXT, -- The logic or cue for the exercise
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE protocols ENABLE ROW LEVEL SECURITY;
ALTER TABLE phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read" ON protocols FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON phases FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON exercises FOR SELECT USING (true);
