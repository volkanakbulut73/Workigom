# ⚡ 5 DAKİKA FIX - API KEY HATASI

## ❌ MEVCUT HATA

```json
{
  "message": "No API key found in request",
  "hint": "No `apikey` request header or url param was found."
}
```

---

## ✅ 4 ADIMDA ÇÖZÜM

### **1️⃣ SUPABASE BİLGİLERİNİ KOPYALA** (1 dak)

```
https://supabase.com/dashboard/project/wsmeyishhzsctnqnslmw/settings/api
```

**Kopyalanacaklar:**

| Ne | Nereden | Nasıl |
|---|---|---|
| **Project URL** | Settings > API > Project URL | Direkt kopyala |
| **anon key** | Settings > API > anon public | Show → Kopyala |
| **service_role** ⚠️ | Settings > API > service_role | Show → Kopyala |

---

### **2️⃣ RENDER'A EKLE** (2 dak)

```
https://dashboard.render.com/web/srv-d3u4tgppn3f5ibrl/env
```

**"Add Environment Variable" ile 3 kez ekle:**

```
Key:   SUPABASE_URL
Value: https://wsmeyishhzsctnqnslmw.supabase.co
→ Add

Key:   SUPABASE_ANON_KEY
Value: eyJhbGc... (uzun string)
→ Add

Key:   SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGc... (farklı key - GİZLİ!)
→ Add

→ Save Changes
```

---

### **3️⃣ REDEPLOY** (2 dak)

```
Render > workigom-backend

Manual Deploy > Deploy latest commit

Bekle (2-3 dakika)
```

---

### **4️⃣ TEST** (30 sn)

```bash
curl https://workigom-backend.onrender.com/api/health
```

**Beklenen:**
```json
{
  "success": true,
  "database": "connected",    ✅
  "supabase": "connected"     ✅
}
```

---

## 📋 QUICK CHECKLIST

- [ ] Supabase URL kopyalandı
- [ ] anon key kopyalandı (Show tıkla!)
- [ ] service_role key kopyalandı (Show tıkla!)
- [ ] Render'a 3 variable eklendi
- [ ] Save Changes yapıldı
- [ ] Redeploy edildi
- [ ] Test: "connected" ✅

---

## 🎯 SONUÇ

**ÖNCE:**
```
❌ "No API key found in request"
```

**SONRA:**
```
✅ "database": "connected"
✅ "supabase": "connected"
```

---

## 📞 DETAY GEREKİYORSA

```
ACIL_API_KEY_HATASI_COZUM.md → Detaylı rehber
HIZLI_DATABASE_FIX.md → Database fix
```

---

**TOPLAM SÜRE:** 5 dakika

**HEMEN BAŞLA!** 🚀
