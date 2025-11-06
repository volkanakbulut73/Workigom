-- Workigom Additional Features Schema
-- Created: 2025-11-05
-- Bu dosya opsiyonel ekstra özellikler içerir

-- ==========================================
-- USERS TABLOSU EK ALANLAR
-- ==========================================

-- Kullanıcı profil alanlarını genişlet
ALTER TABLE users ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS skills TEXT[]; -- Yetenekler (individual için)
ALTER TABLE users ADD COLUMN IF NOT EXISTS location TEXT; -- Konum/şehir
ALTER TABLE users ADD COLUMN IF NOT EXISTS rating DECIMAL(3,2) DEFAULT 0.00; -- Kullanıcı puanı (0-5)
ALTER TABLE users ADD COLUMN IF NOT EXISTS completed_jobs INTEGER DEFAULT 0; -- Tamamlanan iş sayısı
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE; -- Doğrulanmış hesap mı?
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_active_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(); -- Son aktiflik

-- ==========================================
-- JOBS TABLOSU EK ALANLAR
-- ==========================================

-- İş ilanı detaylarını genişlet
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS category TEXT; -- İş kategorisi (temizlik, güvenlik, vb.)
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS requirements TEXT[]; -- Gereksinimler
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS is_urgent BOOLEAN DEFAULT FALSE; -- Acil iş mi?
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS duration_hours INTEGER; -- İş süresi (saat)
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS application_deadline TIMESTAMP WITH TIME ZONE; -- Başvuru son tarihi
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS contact_name TEXT; -- İletişim kişisi
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS contact_phone TEXT; -- İletişim telefonu

-- ==========================================
-- MESSAGES TABLOSU (MESAJLAŞMA)
-- ==========================================

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  parent_message_id UUID REFERENCES messages(id) ON DELETE CASCADE, -- Yanıt mesajlar için
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_at TIMESTAMP WITH TIME ZONE
);

-- Messages tablosu indeksleri
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_recipient_id ON messages(recipient_id);
CREATE INDEX IF NOT EXISTS idx_messages_is_read ON messages(is_read);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);

-- ==========================================
-- JOB CATEGORIES TABLOSU (İŞ KATEGORİLERİ)
-- ==========================================

CREATE TABLE IF NOT EXISTS job_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  icon TEXT, -- Icon adı (lucide-react için)
  description TEXT,
  color TEXT, -- Renk kodu (#012840)
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Varsayılan kategoriler ekle
INSERT INTO job_categories (name, icon, description, color) VALUES
  ('Temizlik', 'Sparkles', 'Ev, ofis ve endüstriyel temizlik işleri', '#0367A6'),
  ('Güvenlik', 'Shield', 'Güvenlik görevlisi pozisyonları', '#012840'),
  ('Etkinlik', 'Calendar', 'Etkinlik ve organizasyon görevleri', '#3F9BBF'),
  ('Lojistik', 'Truck', 'Taşıma ve depolama işleri', '#C9E2F2'),
  ('Satış', 'ShoppingBag', 'Satış temsilcisi pozisyonları', '#10B981'),
  ('Hizmet', 'Utensils', 'Restoran ve servis işleri', '#F59E0B')
ON CONFLICT (name) DO NOTHING;

-- ==========================================
-- FAVORITES TABLOSU (FAVORİLER)
-- ==========================================

CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, job_id) -- Bir kullanıcı aynı işi bir kez favorilere ekleyebilir
);

-- Favorites indeksleri
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_job_id ON favorites(job_id);

-- ==========================================
-- REVIEWS TABLOSU (DEĞERLENDİRMELER)
-- ==========================================

CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE, -- Değerlendiren (şirket veya çalışan)
  reviewee_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE, -- Değerlendirilen
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(application_id, reviewer_id) -- Bir başvuru için bir değerlendirme
);

-- Reviews indeksleri
CREATE INDEX IF NOT EXISTS idx_reviews_application_id ON reviews(application_id);
CREATE INDEX IF NOT EXISTS idx_reviews_reviewee_id ON reviews(reviewee_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);

-- ==========================================
-- DONATION_REQUESTS TABLOSU (DESTEK TALEPLERİ)
-- ==========================================

CREATE TABLE IF NOT EXISTS donation_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  requester_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  restaurant_name TEXT NOT NULL,
  restaurant_location TEXT,
  reason TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'matched', 'expired', 'cancelled')),
  matched_donation_id UUID REFERENCES donations(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Donation requests indeksleri
CREATE INDEX IF NOT EXISTS idx_donation_requests_requester_id ON donation_requests(requester_id);
CREATE INDEX IF NOT EXISTS idx_donation_requests_status ON donation_requests(status);
CREATE INDEX IF NOT EXISTS idx_donation_requests_created_at ON donation_requests(created_at);

-- ==========================================
-- RLS POLİTİKALARI - YENİ TABLOLAR
-- ==========================================

-- Messages RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their messages"
  ON messages FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Recipients can update messages (mark as read)"
  ON messages FOR UPDATE
  USING (auth.uid() = recipient_id);

CREATE POLICY "Senders can delete their sent messages"
  ON messages FOR DELETE
  USING (auth.uid() = sender_id);

-- Job Categories RLS (herkes okuyabilir, sadece admin ekleyebilir)
ALTER TABLE job_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view job categories"
  ON job_categories FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin can manage job categories"
  ON job_categories FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- Favorites RLS
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their favorites"
  ON favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add favorites"
  ON favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their favorites"
  ON favorites FOR DELETE
  USING (auth.uid() = user_id);

-- Reviews RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view reviews about themselves"
  ON reviews FOR SELECT
  USING (auth.uid() = reviewee_id OR auth.uid() = reviewer_id);

CREATE POLICY "Users can view reviews for completed applications"
  ON reviews FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM applications 
      WHERE applications.id = reviews.application_id 
      AND (applications.individual_id = auth.uid() OR applications.corporate_id = auth.uid())
    )
  );

CREATE POLICY "Users can create reviews for completed applications"
  ON reviews FOR INSERT
  WITH CHECK (
    auth.uid() = reviewer_id AND
    EXISTS (
      SELECT 1 FROM applications 
      WHERE applications.id = application_id 
      AND applications.status = 'completed'
      AND (applications.individual_id = auth.uid() OR applications.corporate_id = auth.uid())
    )
  );

-- Donation Requests RLS
ALTER TABLE donation_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own donation requests"
  ON donation_requests FOR SELECT
  USING (auth.uid() = requester_id);

CREATE POLICY "Users can view active donation requests"
  ON donation_requests FOR SELECT
  USING (status = 'pending' AND expires_at > NOW());

CREATE POLICY "Users can create donation requests"
  ON donation_requests FOR INSERT
  WITH CHECK (auth.uid() = requester_id);

CREATE POLICY "Users can update their donation requests"
  ON donation_requests FOR UPDATE
  USING (auth.uid() = requester_id);

-- ==========================================
-- FONKSIYONLAR VE TRİGGERLAR
-- ==========================================

-- Kullanıcı puanını güncelleme fonksiyonu
CREATE OR REPLACE FUNCTION update_user_rating()
RETURNS TRIGGER AS $$
BEGIN
  -- Kullanıcının ortalama puanını hesapla ve güncelle
  UPDATE users
  SET rating = (
    SELECT COALESCE(AVG(rating), 0)
    FROM reviews
    WHERE reviewee_id = NEW.reviewee_id
  )
  WHERE id = NEW.reviewee_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Review eklendiğinde kullanıcı puanını güncelle
CREATE TRIGGER update_user_rating_on_review
  AFTER INSERT ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_user_rating();

-- İş tamamlandığında completed_jobs sayısını artır
CREATE OR REPLACE FUNCTION increment_completed_jobs()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    UPDATE users
    SET completed_jobs = completed_jobs + 1
    WHERE id = NEW.individual_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER increment_completed_jobs_on_application
  AFTER UPDATE ON applications
  FOR EACH ROW
  EXECUTE FUNCTION increment_completed_jobs();

-- Mesaj okunduğunda read_at güncellemesi
CREATE OR REPLACE FUNCTION update_message_read_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_read = true AND OLD.is_read = false THEN
    NEW.read_at = NOW();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_message_read_at_trigger
  BEFORE UPDATE ON messages
  FOR EACH ROW
  EXECUTE FUNCTION update_message_read_at();

-- ==========================================
-- VİEWS (GÖRÜNÜMLER)
-- ==========================================

-- Kullanıcı istatistikleri view
CREATE OR REPLACE VIEW user_stats AS
SELECT 
  u.id,
  u.full_name,
  u.user_type,
  u.rating,
  u.completed_jobs,
  u.golden_heart_count,
  u.balance,
  COALESCE(app_count.count, 0) as total_applications,
  COALESCE(donation_count.count, 0) as total_donations,
  COALESCE(donation_amount.amount, 0) as total_donation_amount
FROM users u
LEFT JOIN (
  SELECT individual_id, COUNT(*) as count
  FROM applications
  GROUP BY individual_id
) app_count ON u.id = app_count.individual_id
LEFT JOIN (
  SELECT donor_id, COUNT(*) as count
  FROM donations
  WHERE status = 'confirmed'
  GROUP BY donor_id
) donation_count ON u.id = donation_count.donor_id
LEFT JOIN (
  SELECT donor_id, SUM(amount) as amount
  FROM donations
  WHERE status = 'confirmed'
  GROUP BY donor_id
) donation_amount ON u.id = donation_amount.donor_id;

-- İş ilanı detay view (başvuru sayısı ile)
CREATE OR REPLACE VIEW job_details AS
SELECT 
  j.*,
  u.full_name as corporate_name,
  u.company_name,
  COALESCE(app_count.count, 0) as application_count,
  jc.name as category_name,
  jc.icon as category_icon,
  jc.color as category_color
FROM jobs j
LEFT JOIN users u ON j.corporate_id = u.id
LEFT JOIN (
  SELECT job_id, COUNT(*) as count
  FROM applications
  GROUP BY job_id
) app_count ON j.id = app_count.job_id
LEFT JOIN job_categories jc ON j.category = jc.name;

-- ==========================================
-- İNDEKS OPTİMİZASYONLARI
-- ==========================================

-- Composite indeksler (çoklu sütun sorguları için)
CREATE INDEX IF NOT EXISTS idx_applications_status_created 
  ON applications(status, applied_at DESC);

CREATE INDEX IF NOT EXISTS idx_jobs_status_date 
  ON jobs(status, date DESC);

CREATE INDEX IF NOT EXISTS idx_donations_status_created 
  ON donations(status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_notifications_user_read 
  ON notifications(user_id, is_read, created_at DESC);

-- ==========================================
-- PERFORMANS OPTİMİZASYONU
-- ==========================================

-- Analyze tables for query optimization
ANALYZE users;
ANALYZE jobs;
ANALYZE applications;
ANALYZE donations;
ANALYZE notifications;
ANALYZE transactions;

-- ==========================================
-- TAMAMLANDI
-- ==========================================

-- Migration tamamlandı mesajı
DO $$
BEGIN
  RAISE NOTICE 'Workigom ek özellikler migration tamamlandı!';
  RAISE NOTICE 'Eklenen tablolar: messages, job_categories, favorites, reviews, donation_requests';
  RAISE NOTICE 'Eklenen view''lar: user_stats, job_details';
  RAISE NOTICE 'Eklenen fonksiyonlar: update_user_rating, increment_completed_jobs, update_message_read_at';
END $$;
