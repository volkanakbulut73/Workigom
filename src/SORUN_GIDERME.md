# 🔧 Workigom - Sorun Giderme Rehberi

## ❓ Sık Karşılaşılan Sorunlar

### 1. "Supabase bağlantısı başarılı" görüyorum ama login çalışmıyor

**Neden:** Database schema kurulmamış.

**Çözüm:**
1. Supabase Dashboard > SQL Editor'e gidin
2. `/supabase/migrations/001_initial_schema.sql` dosyasını çalıştırın
3. Test kullanıcılarını oluşturun (`HIZLI_BASLANGIC.md`'de SQL kodu var)
4. Dev server'ı yeniden başlatın

---

### 2. "relation 'users' does not exist" hatası

**Neden:** Database tabloları oluşturulmamış.

**Çözüm:**
1. Supabase Dashboard > Table Editor'e gidin
2. `users`, `jobs`, `applications`, `donations`, `notifications`, `transactions` tablolarının var olduğunu kontrol edin
3. Yoksa: SQL Editor'de `001_initial_schema.sql`'i çalıştırın

---

### 3. "Invalid login credentials" hatası

**Neden:** Test kullanıcıları oluşturulmamış.

**Çözüm:**

SQL Editor'de şu komutu çalıştırın:

```sql
-- Kullanıcıların var olup olmadığını kontrol edin
SELECT email FROM auth.users;
```

Eğer boş dönerse, test kullanıcılarını oluşturun:
```sql
-- Test kullanıcıları SQL kodu için HIZLI_BASLANGIC.md dosyasına bakın
```

---

### 4. "Row Level Security policy violation" hatası

**Neden:** RLS policies düzgün kurulmamış.

**Çözüm:**
1. SQL Editor'de şu komutu çalıştırın:
   ```sql
   SELECT schemaname, tablename, rowsecurity 
   FROM pg_tables 
   WHERE schemaname = 'public';
   ```
2. Tüm tablolarda `rowsecurity` = `true` olmalı
3. Değilse: `001_initial_schema.sql`'i tekrar çalıştırın

---

### 5. Profil fotoğrafı yüklenmiyor

**Neden:** Storage bucket kurulmamış.

**Çözüm:**
1. Supabase Dashboard > Storage'a gidin
2. `workigom-files` bucket'ının var olduğunu kontrol edin
3. Yoksa SQL Editor'de şu komutu çalıştırın:
   ```sql
   INSERT INTO storage.buckets (id, name, public) 
   VALUES ('workigom-files', 'workigom-files', false);
   ```

---

### 6. "SUPABASE YAPILANDIRILMADI" uyarısı görüyorum

**Neden:** `projectId` veya `publicAnonKey` tanımlı değil.

**Çözüm:**
1. `/utils/supabase/info.tsx` dosyasını açın
2. `projectId` ve `publicAnonKey` değerlerini kontrol edin
3. Boşsa veya "placeholder" ise:
   - Supabase Dashboard > Settings > API'den değerleri alın
   - `info.tsx` dosyasını güncelleyin

---

### 7. Bildirimler gerçek zamanlı çalışmıyor

**Neden:** Replication aktif değil.

**Çözüm:**
1. Supabase Dashboard > Database > Replication'a gidin
2. Şu tablolar için replication'ı aktifleştirin:
   - ✅ notifications
   - ✅ applications
   - ✅ jobs

---

### 8. Login sonrası sayfa boş kalıyor

**Neden:** Kullanıcı profili oluşturulmamış.

**Çözüm:**
1. SQL Editor'de şu komutu çalıştırın:
   ```sql
   SELECT * FROM users WHERE email = 'test@example.com';
   ```
2. Kullanıcı yoksa:
   ```sql
   INSERT INTO users (id, email, user_type, full_name, phone)
   VALUES (
     '[auth.users tablosundaki user id]',
     'test@example.com',
     'individual',
     'Test User',
     '+90 555 000 0000'
   );
   ```

---

### 9. Dev server başlamıyor / Port hatası

**Hata:**
```
Error: Port 5173 is already in use
```

**Çözüm:**
```bash
# Port'u değiştirin
npm run dev -- --port 3000

# Veya çalışan process'i durdurun
# Mac/Linux:
lsof -ti:5173 | xargs kill -9

# Windows:
netstat -ano | findstr :5173
taskkill /PID [PID_NUMBER] /F
```

---

### 10. Production'da çalışmıyor (Render.com)

**Neden:** Environment variables eksik.

**Çözüm:**
1. Render Dashboard > Your Service > Environment'e gidin
2. Şu değişkenleri ekleyin:
   ```
   VITE_SUPABASE_URL=https://[project-id].supabase.co
   VITE_SUPABASE_ANON_KEY=[your-anon-key]
   ```
3. Manual Deploy yapın

**Not:** Figma Make ortamında credentials otomatik yüklenir, bu sadece kendi deployment'ınız için gerekir.

---

## 🐛 Debug Araçları

### 1. Console Logs

Browser'da F12 > Console:
```javascript
// Supabase bağlantısını kontrol et
console.log('Supabase configured:', isSupabaseConfigured());

// Mevcut kullanıcıyı kontrol et
supabase.auth.getUser().then(console.log);

// Database'i test et
supabase.from('users').select('count').then(console.log);
```

### 2. Supabase Logs

Dashboard > Logs > Logs Explorer:
- Error logs'u filtreleyin
- Real-time olarak hatları görün
- Query performance'ı analiz edin

### 3. Network Tab

Browser F12 > Network:
- Supabase API çağrılarını izleyin
- Response'ları kontrol edin
- Error detaylarını görün

---

## 📞 Yardım Alma

Sorun devam ediyorsa:

1. **Console logs'u kontrol edin**
2. **Supabase Dashboard > Logs'a bakın**
3. **Database tablolarını doğrulayın**
4. **Test kullanıcılarını kontrol edin**

Detaylı rehberler:
- `HIZLI_BASLANGIC.md` - Temel kurulum
- `SUPABASE_ADIM_ADIM_REHBER.md` - Detaylı kurulum
- `TEST_KULLANICI_BILGILERI.md` - Test kullanıcıları

---

## ✅ Kurulum Kontrol Listesi

Eğer hala sorun yaşıyorsanız, şunları kontrol edin:

### Database
- [ ] 6 tablo oluşturuldu (users, jobs, applications, donations, notifications, transactions)
- [ ] RLS enabled (tüm tablolarda)
- [ ] Policies tanımlı (her tablo için)
- [ ] Indexes oluşturuldu

### Storage
- [ ] `workigom-files` bucket var
- [ ] Bucket private (public değil)
- [ ] Storage policies tanımlı

### Authentication
- [ ] Test kullanıcıları oluşturuldu
- [ ] auth.users tablosunda kayıtlar var
- [ ] public.users tablosunda profiller var
- [ ] Email confirmed

### Real-time
- [ ] Replication aktif (notifications, applications, jobs)
- [ ] Real-time subscriptions çalışıyor

### Frontend
- [ ] Dependencies yüklendi (`npm install`)
- [ ] Dev server çalışıyor (`npm run dev`)
- [ ] Console'da hata yok
- [ ] "Supabase bağlantısı başarılı" mesajı var

---

**Son Güncelleme:** 2 Kasım 2025
