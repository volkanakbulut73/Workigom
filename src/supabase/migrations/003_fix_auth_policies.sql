-- Fix Authentication and RLS Policies
-- Created: 2025-11-08
-- Purpose: Fix user signup issues and email confirmation

-- 1. Add missing INSERT policy for users table (CRITICAL FIX!)
-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Users can insert their own profile during signup" ON users;

-- Create the correct INSERT policy
CREATE POLICY "Users can insert their own profile during signup"
  ON users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 2. Allow users to view other users (for corporate/individual matching)
DROP POLICY IF EXISTS "Users can view other users for matching" ON users;

CREATE POLICY "Users can view other users for matching"
  ON users FOR SELECT
  USING (
    -- Users can view their own profile
    auth.uid() = id
    OR
    -- Corporate users can view individual users
    (
      EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND user_type = 'corporate')
      AND user_type = 'individual'
    )
    OR
    -- Individual users can view corporate users
    (
      EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND user_type = 'individual')
      AND user_type = 'corporate'
    )
    OR
    -- Admins can view all users
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND user_type = 'admin')
  );

-- 3. Fix menu_shares policies to allow users to view available shares
DROP POLICY IF EXISTS "Users can view available menu shares" ON menu_shares;

CREATE POLICY "Users can view available menu shares"
  ON menu_shares FOR SELECT
  USING (
    -- Own shares (as supporter or beneficiary)
    auth.uid() = supporter_id 
    OR auth.uid() = beneficiary_id
    OR
    -- Available shares (no beneficiary yet)
    (beneficiary_id IS NULL AND status = 'pending')
  );

-- 4. Add policy to allow admins to insert users (for admin panel)
DROP POLICY IF EXISTS "Admin can insert users" ON users;

CREATE POLICY "Admin can insert users"
  ON users FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- 5. Add policy to allow admins to update any user
DROP POLICY IF EXISTS "Admin can update all users" ON users;

CREATE POLICY "Admin can update all users"
  ON users FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- NOTE: Email confirmation settings
-- To disable email confirmation in Supabase Dashboard:
-- 1. Go to Authentication > Settings
-- 2. Find "Enable email confirmations"
-- 3. Toggle it OFF
-- 
-- OR use Supabase CLI:
-- supabase settings update auth --enable-signup=true --disable-email-confirmations=true
