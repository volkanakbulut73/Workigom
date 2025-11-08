-- Workigom Database Schema
-- Created: 2025-11-02

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  user_type TEXT NOT NULL CHECK (user_type IN ('individual', 'corporate', 'admin')),
  full_name TEXT NOT NULL,
  phone TEXT,
  company_name TEXT,
  tax_number TEXT,
  address TEXT,
  iban TEXT,
  golden_heart_count INTEGER DEFAULT 0,
  balance DECIMAL(10, 2) DEFAULT 0.00,
  profile_photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Jobs table
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  corporate_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  hourly_rate DECIMAL(10, 2) NOT NULL,
  positions INTEGER NOT NULL,
  filled_positions INTEGER DEFAULT 0,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Applications table
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  individual_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  corporate_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'completed')),
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  accepted_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review TEXT
);

-- Menu Shares table
CREATE TABLE menu_shares (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  supporter_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  beneficiary_id UUID REFERENCES users(id) ON DELETE SET NULL,
  amount DECIMAL(10, 2) NOT NULL,
  share_type TEXT NOT NULL CHECK (share_type IN ('partial', 'full')),
  qr_code_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'expired')),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  confirmed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions table
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('credit', 'debit')),
  category TEXT NOT NULL CHECK (category IN ('job_payment', 'donation', 'withdrawal', 'admin_adjustment')),
  description TEXT NOT NULL,
  reference_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX idx_jobs_corporate_id ON jobs(corporate_id);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_date ON jobs(date);
CREATE INDEX idx_applications_job_id ON applications(job_id);
CREATE INDEX idx_applications_individual_id ON applications(individual_id);
CREATE INDEX idx_applications_corporate_id ON applications(corporate_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_menu_shares_supporter_id ON menu_shares(supporter_id);
CREATE INDEX idx_menu_shares_beneficiary_id ON menu_shares(beneficiary_id);
CREATE INDEX idx_menu_shares_status ON menu_shares(status);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile during signup"
  ON users FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admin can view all users"
  ON users FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- Jobs policies
CREATE POLICY "Anyone can view open jobs"
  ON jobs FOR SELECT
  USING (status = 'open');

CREATE POLICY "Corporate users can create jobs"
  ON jobs FOR INSERT
  WITH CHECK (
    auth.uid() = corporate_id AND
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND user_type = 'corporate'
    )
  );

CREATE POLICY "Corporate users can update their own jobs"
  ON jobs FOR UPDATE
  USING (auth.uid() = corporate_id);

CREATE POLICY "Corporate users can view their own jobs"
  ON jobs FOR SELECT
  USING (auth.uid() = corporate_id);

-- Applications policies
CREATE POLICY "Individuals can view their own applications"
  ON applications FOR SELECT
  USING (auth.uid() = individual_id);

CREATE POLICY "Corporate users can view applications for their jobs"
  ON applications FOR SELECT
  USING (auth.uid() = corporate_id);

CREATE POLICY "Individuals can create applications"
  ON applications FOR INSERT
  WITH CHECK (
    auth.uid() = individual_id AND
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND user_type = 'individual'
    )
  );

CREATE POLICY "Corporate users can update applications for their jobs"
  ON applications FOR UPDATE
  USING (auth.uid() = corporate_id);

-- Menu Shares policies
CREATE POLICY "Users can view their own menu shares"
  ON menu_shares FOR SELECT
  USING (auth.uid() = supporter_id OR auth.uid() = beneficiary_id);

CREATE POLICY "Users can create menu shares"
  ON menu_shares FOR INSERT
  WITH CHECK (auth.uid() = supporter_id);

CREATE POLICY "Beneficiaries can update menu shares"
  ON menu_shares FOR UPDATE
  USING (auth.uid() = beneficiary_id);

-- Notifications policies
CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admin can create notifications"
  ON notifications FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- Transactions policies
CREATE POLICY "Users can view their own transactions"
  ON transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admin can view all transactions"
  ON transactions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

CREATE POLICY "System can create transactions"
  ON transactions FOR INSERT
  WITH CHECK (true);

-- Create storage bucket for QR codes and profile photos
INSERT INTO storage.buckets (id, name, public) VALUES ('workigom-files', 'workigom-files', false);

-- Storage policies
CREATE POLICY "Users can upload their own files"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'workigom-files' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'workigom-files' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own files"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'workigom-files' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own files"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'workigom-files' AND auth.uid()::text = (storage.foldername(name))[1]);
