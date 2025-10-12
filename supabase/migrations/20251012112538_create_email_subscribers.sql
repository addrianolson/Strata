/*
  # Email Subscribers Table

  1. New Tables
    - `email_subscribers`
      - `id` (uuid, primary key) - Unique identifier for each subscriber
      - `name` (text) - Subscriber's name
      - `email` (text, unique) - Subscriber's email address
      - `subscribed_at` (timestamptz) - When they subscribed
      - `source` (text) - Which form/section they subscribed from
      - `created_at` (timestamptz) - Record creation timestamp

  2. Security
    - Enable RLS on `email_subscribers` table
    - Add policy for inserting new subscribers (public access for form submissions)
    - Restrict read access to authenticated users only

  3. Indexes
    - Add unique index on email to prevent duplicate subscriptions
    - Add index on created_at for sorting
*/

CREATE TABLE IF NOT EXISTS email_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subscribed_at timestamptz DEFAULT now(),
  source text DEFAULT 'main_form',
  created_at timestamptz DEFAULT now()
);

-- Create unique index on email to prevent duplicates
CREATE UNIQUE INDEX IF NOT EXISTS email_subscribers_email_idx ON email_subscribers(email);

-- Create index on created_at for performance
CREATE INDEX IF NOT EXISTS email_subscribers_created_at_idx ON email_subscribers(created_at DESC);

-- Enable RLS
ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (for public form submissions)
CREATE POLICY "Anyone can subscribe"
  ON email_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Only authenticated users can view subscribers
CREATE POLICY "Authenticated users can view subscribers"
  ON email_subscribers
  FOR SELECT
  TO authenticated
  USING (true);