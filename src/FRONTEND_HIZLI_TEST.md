# ⚡ FRONTEND HIZLI TEST (3 DAKİKA)

## 📸 ENVIRONMENT VARIABLES DURUMU

**Render.com Frontend Environment:**
```
✅ VITE_BACKEND_URL = https://workigom-backend.onrender.com
✅ VITE_SUPABASE_ANON_KEY = eyJhbGc...
✅ VITE_SUPABASE_URL = https://wsmeyishhzsctnqnslmw.supabase.co

🎉 HEPSİ DOĞRU!
```

---

## 🚀 HEMEN YAPIN (3 ADIM)

### **ADIM 1: REDEPLOY (1 dakika)**

```
Render Dashboard:
https://dashboard.render.com/static/srv-xxxxx

workigom-frontend:

1. "Manual Deploy" dropdown (sağ üstte)
2. "Deploy latest commit" seç
3. Bekle (2-3 dakika)

Build Logs:
✓ npm install
✓ vite build
✓ Deploy successful! 🎉
```

---

### **ADIM 2: AÇILIYOR MU? (30 saniye)**

```
https://workigom-frontend1.onrender.com

Beklenen:
✅ Landing page görünüyor
✅ "Workigom" logosu var
✅ "Hemen Başla" butonu var

❌ Beyaz ekran → Logs kontrol et, F12 Console bak
```

---

### **ADIM 3: TEST ET (1 dakika)**

#### **Test 1: Kayıt Ol**

```
1. "Hemen Başla" tıkla
2. Form doldur:
   Email: test2@workigom.com
   Şifre: Test123456!
   Ad Soyad: Test Kullanıcı
   Telefon: 05551234567
   Tip: Bireysel
3. "Kayıt Ol" tıkla

✅ Başarılı: Dashboard açıldı
❌ Hatalı: F12 Console'da hatayı oku
```

#### **Test 2: Giriş Yap**

```
1. Logout (varsa)
2. "Giriş Yap" tıkla
3. Bilgileri gir (test2@workigom.com / Test123456!)
4. Giriş yap

✅ Başarılı: Dashboard açıldı
```

#### **Test 3: Navigation**

```
Desktop:
✅ Sol sidebar var
✅ "Ana Sayfa" var
✅ "İş İlanları" var
✅ "Menü Market" var ⭐
✅ "Mesajlar" var
✅ "Profil" var

Mobile:
✅ Alt bottom nav var
✅ 5 icon var
```

---

## 🧪 HIZLI KONTROLLER

### **F12 Console:**
```
Beklenen:
✅ No errors
✅ "User created successfully" (kayıt olurken)

Hatalı:
❌ "CORS error" → Backend CORS fix gerekli
❌ "Network error" → Backend çalışmıyor
❌ "Failed to fetch" → URL yanlış
```

### **Network Tab (F12):**
```
Beklenen:
✅ Supabase auth: 200
✅ Supabase database: 200
✅ Backend health: 200 (veya 503 → cold start)

Hatalı:
❌ 404 → URL yanlış
❌ 500 → Backend hatası
❌ CORS → Origin ayarı yanlış
```

---

## ✅ BAŞARI KRİTERLERİ

```
Frontend:
✅ Açılıyor
✅ Kayıt ol çalışıyor
✅ Giriş yap çalışıyor
✅ Dashboard görünüyor
✅ Navigation çalışıyor
✅ Console'da hata yok

Backend:
✅ Health check: {"status":"ok"}

Supabase:
✅ Users tablosunda yeni kullanıcı var
```

---

## 🐛 SORUN GİDERME HIZLI

### **❌ Beyaz Ekran**

```
Sebep: Build hatası
Çözüm: Render > Logs > Hatayı oku
```

### **❌ "Email not confirmed"**

```
Sebep: Supabase email confirmation açık
Çözüm: Supabase > Auth > Email confirm KAPAT
```

### **❌ CORS Error**

```
Sebep: Backend CORS ayarları
Çözüm: Backend /supabase/functions/server/index.tsx
       cors({ origin: "*" })
```

### **❌ Backend 503**

```
Sebep: Cold start
Çözüm: 30-60 saniye bekle
```

---

## 📋 HIZLI CHECKLIST

- [ ] ✅ Environment variables doğru
- [ ] ⏳ Frontend redeploy edildi
- [ ] ⏳ Build başarılı
- [ ] ⏳ Frontend açılıyor
- [ ] ⏳ Kayıt ol çalışıyor
- [ ] ⏳ Giriş yap çalışıyor
- [ ] ⏳ Dashboard görünüyor
- [ ] ⏳ Console temiz

---

## 🎉 TAMAMLANDI!

```
Frontend: https://workigom-frontend1.onrender.com
Backend:  https://workigom-backend.onrender.com
Database: https://wsmeyishhzsctnqnslmw.supabase.co

✅ Her şey çalışıyor!
```

**İyi çalışmalar!** 🚀

---

## 📞 ACİL YARDIM

**Environment variables ekle/düzenle:**
```
Render > workigom-frontend > Environment
→ Add/Edit
→ Save Changes
→ ⚠️ MUTLAKA REDEPLOY ET!
```

**Backend URL doğru mu?**
```
Render > workigom-backend > Settings > URL
→ Kopyala
→ Frontend VITE_BACKEND_URL ile karşılaştır
→ Eşleşmiyorsa düzelt
```

**Detaylı rehber:**
```
FRONTEND_YAPILANDIRMA_KONTROL.md oku
```
