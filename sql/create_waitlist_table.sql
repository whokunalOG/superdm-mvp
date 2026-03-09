-- Create waitlist table for SuperDM
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from service role
CREATE POLICY "Allow service role inserts" ON waitlist
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Create policy to allow service role to read
CREATE POLICY "Allow service role select" ON waitlist
  FOR SELECT
  TO service_role
  USING (true);
