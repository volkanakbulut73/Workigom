# 🚀 SUPABASE HIZLI KURULUM - 3 DAKİKADA TAMAMLA!

## ⚡ EN HIZLI YÖNTEM: SUPABASE AI

### **Adım 1: Supabase Dashboard'a Git** ⏱️ 30 saniye
```
https://supabase.com/dashboard/project/nbtpolsxhhnpxsqyeduz
```

1. Sol menüden **"SQL Editor"** seç
2. Sağ alt köşede **"Ask Supabase AI"** butonuna tıkla 💬

---

### **Adım 2: Prompt'u Yapıştır** ⏱️ 30 saniye

**`SUPABASE_AI_PROMPT.md`** dosyasını aç ve **TÜM İÇERİĞİ** kopyala:

```
CTRL + A (hepsini seç)
CTRL + C (kopyala)
```

Supabase AI'ya yapıştır:
```
CTRL + V (yapıştır)
```

**Prompt başlangıcı:**
```
Merhaba Supabase AI! 👋

"Workigom" adında bir mobil iş pazarı uygulaması geliştiriyorum...
```

**Prompt bitişi:**
```
...5. Herhangi bir hata veya uyarı var mı?
```

---

### **Adım 3: "Generate" ve "Run" Bas** ⏱️ 2-3 dakika

1. Supabase AI prompt'u analiz edecek
2. SQL komutlarını otomatik oluşturacak
3. **"Run SQL"** veya **"Execute"** butonuna bas
4. 2-3 dakika bekle ⏳

**Oluşturulacaklar:**
```
✅ 6 database tablosu
✅ 20+ RLS policy
✅ 3 test kullanıcısı
✅ 2 trigger
✅ 10+ index
✅ 1 storage bucket + policies
```

---

### **Adım 4: Kontrol Et** ⏱️ 1 dakika

#### **Database Tabloları:**
```
Dashboard → Database → Tables
```

Görmeli gerekenler:
```
✅ users
✅ jobs
✅ applications
✅ donations
✅ notifications
✅ transactions
```

#### **Test Kullanıcıları:**
```
Dashboard → Authentication → Users
```

Görmeli gerekenler:
```
✅ admin@workigom.com (Admin)
✅ ahmet@test.com (Individual)
✅ sirket@test.com (Corporate)
```

#### **Storage Bucket:**
```
Dashboard → Storage → Buckets
```

Görmeli gerekenler:
```
✅ workigom-files (private)
```

#### **RLS Policies:**
```
Dashboard → Database → Tables → [herhangi bir tablo] → Policies
```

Her tabloda policies görünmeli:
```
✅ Users can view their own profile
✅ Users can update their own profile
✅ ...
```

---

## 🎯 BAŞARI TESTİ

### **Frontend'den Test Etme:**

Uygulamayı çalıştırın:
```bash
npm run dev
```

Tarayıcıda açın:
```
http://localhost:5173
```

#### **1. Console'u Aç** (F12)

Görmeli gerekenler:
```
✅ Supabase bağlantısı başarılı
📡 Supabase URL: https://nbtpolsxhhnpxsqyeduz.supabase.co
```

❌ Görmemeli gerekenler:
```
⚠️ SUPABASE YAPILANDIRILMADI
```

#### **2. Giriş Yapın**

**Email:** ahmet@test.com  
**Password:** Test123!

**Başarılı ise:**
```
✅ Giriş yapıldı
✅ Ana sayfa yüklendi
✅ Console'da hata yok
```

**Başarısız ise:**
```
❌ "Invalid login credentials" hatası
→ Test kullanıcıları oluşturulmamış
→ SUPABASE_AI_PROMPT.md'yi tekrar çalıştır
```

---

## 🔧 ALTERNATİF YÖNTEM: MANUEL SQL

Eğer Supabase AI çalışmazsa:

### **Yöntem 1: Migration Dosyalarını Kullan**

**Dosyalar:**
```
/supabase/migrations/001_initial_schema.sql
/supabase/migrations/002_additional_features.sql
```

**Nasıl çalıştırılır:**

1. **Supabase Dashboard** → **SQL Editor** → **New Query**
2. **001_initial_schema.sql** dosyasını aç
3. Tüm içeriği kopyala → SQL Editor'e yapıştır
4. **"Run"** bas ▶️
5. Aynı işlemi **002_additional_features.sql** için tekrarla

---

### **Yöntem 2: Supabase CLI**

```bash
# Supabase CLI kur (henüz yoksa)
npm install -g supabase

# Proje klasörüne git
cd workigom

# Supabase'e login ol
supabase login

# Projeyi bağla
supabase link --project-ref nbtpolsxhhnpxsqyeduz

# Migration'ları push et
supabase db push
```

---

## 🆘 SORUN GİDERME

### ❌ **Supabase AI bulunamıyor**

**Çözüm:**
1. Dashboard'ı yenile (F5)
2. Farklı tarayıcı dene (Chrome/Firefox)
3. Manuel SQL yöntemini kullan

---

### ❌ **"Extension uuid-ossp already exists" hatası**

**Çözüm:**
```
Bu NORMAL! UUID extension zaten kurulu.
Hatayı görmezden gelin, devam edin.
```

---

### ❌ **Test kullanıcıları oluşturulamadı**

**Çözüm: Manuel oluştur**

```
Dashboard → Authentication → Users → "Add User"
```

**User 1:**
- Email: admin@workigom.com
- Password: Admin123!
- Confirm: ✅
- Meta data: `{"user_type": "admin", "full_name": "Admin Kullanıcı"}`

**User 2:**
- Email: ahmet@test.com
- Password: Test123!
- Confirm: ✅
- Meta data: `{"user_type": "individual", "full_name": "Ahmet Yılmaz"}`

**User 3:**
- Email: sirket@test.com
- Password: Test123!
- Confirm: ✅
- Meta data: `{"user_type": "corporate", "full_name": "Mehmet Demir", "company_name": "ABC Restaurant"}`

---

### ❌ **"Permission denied for table users" hatası**

**Çözüm: RLS policies kontrol et**

```
Dashboard → Database → Tables → users → Policies
```

Görmeli gerekenler:
```
✅ Users can view their own profile (SELECT)
✅ Users can update their own profile (UPDATE)
```

Yoksa manuel ekle:
```sql
-- SELECT policy
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- UPDATE policy
CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);
```

---

### ❌ **Frontend'de "Supabase is not configured" hatası**

**Çözüm 1: info.tsx dosyası kontrol**

```typescript
// /utils/supabase/info.tsx
export const projectId = "nbtpolsxhhnpxsqyeduz"  // ✅ DOĞRU
export const publicAnonKey = "eyJhbGci..."      // ✅ DOĞRU

// ❌ YANLIŞ:
export const projectId = "placeholder"
export const publicAnonKey = ""
```

**Çözüm 2: Tarayıcı cache'i temizle**

```
CTRL + SHIFT + DELETE
→ Cached images and files
→ Clear data
```

**Çözüm 3: Hard reload**

```
CTRL + SHIFT + R (Windows)
CMD + SHIFT + R (Mac)
```

---

## 📊 KURULUM SONRASI KONTROL LİSTESİ

### ✅ **Database:**
- [ ] 6 tablo oluşturuldu
- [ ] Foreign keys çalışıyor
- [ ] Indexes var
- [ ] Triggers aktif

### ✅ **Security:**
- [ ] RLS enabled (tüm tablolarda)
- [ ] Policies çalışıyor
- [ ] Storage policies var

### ✅ **Authentication:**
- [ ] 3 test kullanıcısı var
- [ ] Giriş yapılabiliyor
- [ ] Session çalışıyor

### ✅ **Storage:**
- [ ] workigom-files bucket var
- [ ] Private olarak ayarlanmış
- [ ] Upload/view policies var

### ✅ **Frontend:**
- [ ] Supabase bağlantısı başarılı (console'da ✅)
- [ ] Test kullanıcı ile giriş yapılıyor
- [ ] Console'da hata yok

---

## 🎉 BAŞARILI KURULUM SONRASI

### **Frontend'de şunlar çalışır hale gelecek:**

✅ **Kullanıcı kaydı ve girişi**
```typescript
await supabase.auth.signUp({
  email: 'yeni@kullanici.com',
  password: 'Sifre123!',
});
```

✅ **Profil güncelleme**
```typescript
await supabase
  .from('users')
  .update({ full_name: 'Yeni İsim' })
  .eq('id', userId);
```

✅ **İş ilanı oluşturma**
```typescript
await supabase
  .from('jobs')
  .insert({
    title: 'Garson Aranıyor',
    hourly_rate: 150,
    ...
  });
```

✅ **Başvuru yapma**
```typescript
await supabase
  .from('applications')
  .insert({
    job_id: jobId,
    individual_id: userId,
  });
```

✅ **Bağış yapma**
```typescript
await supabase
  .from('donations')
  .insert({
    donor_id: userId,
    amount: 50,
    donation_type: 'partial',
  });
```

✅ **Bildirim okuma**
```typescript
const { data } = await supabase
  .from('notifications')
  .select('*')
  .eq('user_id', userId)
  .order('created_at', { ascending: false });
```

---

## 🔄 MOCK DATA'DAN SUPABASE'E GEÇİŞ

Şu an uygulama **localStorage** (mock data) kullanıyor.

Supabase kurulumundan sonra:

1. **`/lib/mockData.ts`** dosyasını gözden geçir
2. **`/utils/supabase/queries.ts`** dosyasını güncelle
3. Mock data çağrılarını Supabase çağrıları ile değiştir

**Örnek:**

**ÖNCE (Mock):**
```typescript
const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
```

**SONRA (Supabase):**
```typescript
const { data: jobs } = await supabase
  .from('jobs')
  .select('*')
  .eq('status', 'open');
```

Detay: **`MOCK_VS_SUPABASE.md`** dosyasına bakın

---

## 📚 FAYDALI KAYNAKLAR

### **Workigom Dökümanları:**
```
SUPABASE_AI_PROMPT.md              ← Prompt (bu dosya)
SUPABASE_ADIM_ADIM_REHBER.md       ← Detaylı kurulum
SUPABASE_TABLOLAR.md               ← Tablo şemaları
MOCK_VS_SUPABASE.md                ← Mock'tan Supabase'e geçiş
```

### **Supabase Resmi Dökümanları:**
```
https://supabase.com/docs/guides/auth    ← Authentication
https://supabase.com/docs/guides/database ← Database
https://supabase.com/docs/guides/storage  ← Storage
```

---

## 🎯 ÖZET

```
Yöntem: Supabase AI (önerilen)
Süre: 3-5 dakika
Zorluk: Çok kolay (kopyala-yapıştır)

Adımlar:
1. Dashboard aç (30 saniye)
2. Prompt yapıştır (30 saniye)
3. AI çalıştır (2-3 dakika)
4. Test et (1 dakika)

Sonuç:
✅ 6 tablo
✅ 20+ policy
✅ 3 test kullanıcısı
✅ Storage bucket
✅ Çalışır durumda!
```

---

## 🚀 ŞİMDİ BAŞLA!

### **1. Supabase Dashboard Aç:**
```
https://supabase.com/dashboard/project/nbtpolsxhhnpxsqyeduz
```

### **2. SQL Editor → Ask Supabase AI**

### **3. SUPABASE_AI_PROMPT.md İçeriğini Yapıştır**

### **4. "Generate" ve "Run" Bas**

### **5. 3 Dakika Bekle ⏳**

### **6. Test Et! ✅**

---

**TOPLAM SÜRE:** 5 dakika

**BAŞARILAR! 🎉**

Supabase AI ile database'iniz 3 dakikada hazır! 🚀
