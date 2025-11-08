# 🔗 BAĞLANTI YAPILANDIRMASI

## 🏗️ MİMARİ YAPISI

```
┌─────────────────────────────────────────────────────────────┐
│                        KULLANICI                             │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ FRONTEND (React)                                            │
│ URL: https://workigom-frontend.onrender.com                 │
│                                                              │
│ Environment Variables:                                       │
│ - VITE_SUPABASE_URL          (Supabase project URL)        │
│ - VITE_SUPABASE_ANON_KEY     (Public key)                  │
│ - VITE_BACKEND_URL           (Backend API URL)             │
└─────────────────────────────────────────────────────────────┘
         ↓                                    ↓
    [Auth]                              [API Calls]
         ↓                                    ↓
┌──────────────────────┐        ┌──────────────────────────┐
│   SUPABASE           │        │   BACKEND (Deno+Hono)    │
│   (Database + Auth)  │←───────│   URL: workigom-backend  │
│                      │        │   .onrender.com          │
│   Environment:       │        │                          │
│   - PostgreSQL DB    │        │   Environment Variables: │
│   - Auth Service     │        │   - SUPABASE_URL         │
│   - Storage          │        │   - SUPABASE_ANON_KEY    │
│   - Edge Functions   │        │   - SUPABASE_SERVICE_    │
└──────────────────────┘        │     ROLE_KEY             │
                                │   - SUPABASE_DB_URL      │
                                │   - PORT=10000           │
                                └──────────────────────────┘
```

---

## 🔌 BAĞLANTI NOKTALARI

### **1. Frontend → Supabase (Direct)**

**Kullanım:** Authentication, Real-time subscriptions

```typescript
// /utils/supabase/client.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

**Özellikler:**
- ✅ User authentication (signUp, signIn, signOut)
- ✅ Real-time data subscriptions
- ✅ Row Level Security (RLS) ile güvenli erişim
- ✅ Direct database queries (with RLS)

**Environment Variables:**
```env
VITE_SUPABASE_URL=https://[project-id].supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### **2. Frontend → Backend (API Calls)**

**Kullanım:** Business logic, Protected operations

```typescript
// /contexts/AuthContext.tsx veya API calls
const backendUrl = import.meta.env.VITE_BACKEND_URL

const response = await fetch(
  `${backendUrl}/make-server-018e1998/endpoint`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(data)
  }
)
```

**Özellikler:**
- ✅ Complex business logic
- ✅ Server-side validation
- ✅ Third-party API integrations
- ✅ Admin operations

**Environment Variables:**
```env
VITE_BACKEND_URL=https://workigom-backend.onrender.com
```

---

### **3. Backend → Supabase (Server-side)**

**Kullanım:** Admin operations, Server-side database access

```typescript
// /supabase/functions/server/index.tsx
import { createClient } from 'npm:@supabase/supabase-js'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')! // ⚠️ ADMIN KEY!
)
```

**Özellikler:**
- ✅ Bypass RLS policies
- ✅ Admin user management
- ✅ Bulk operations
- ✅ System-level tasks

**Environment Variables:**
```env
SUPABASE_URL=https://[project-id].supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (⚠️ SECRET!)
SUPABASE_DB_URL=postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres
```

---

## 🔐 GÜVENLİK MODELİ

### **Katman 1: Frontend (Public)**
```typescript
// ✅ KULLANILIR: Anon Key
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY  // ✅ Public - güvenli
)

// ❌ ASLA KULLANILMAZ: Service Role Key
// VITE_SUPABASE_SERVICE_ROLE_KEY  // ❌ SECURITY BREACH!
```

### **Katman 2: Backend (Private)**
```typescript
// ✅ KULLANILIR: Service Role Key
const supabase = createClient(
  Deno.env.get('SUPABASE_URL'),
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')  // ✅ Server-only
)
```

### **Katman 3: Database (RLS Policies)**
```sql
-- Users can only see their own data
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Admin bypass all policies
CREATE POLICY "Admin full access"
  ON users FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND user_type = 'admin'
    )
  );
```

---

## 📊 VERI AKIŞI ÖRNEKLERİ

### **Örnek 1: Kullanıcı Kayıt (Frontend → Supabase)**

```typescript
// Frontend: /contexts/AuthContext.tsx

const signUp = async (data: SignUpData) => {
  // 1. Create auth user (Supabase Auth)
  const { data: authData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password
  })

  // 2. Create user profile (Supabase Database with RLS)
  const { error: profileError } = await supabase
    .from('users')
    .insert({
      id: authData.user.id,
      email: data.email,
      full_name: data.fullName,
      user_type: data.userType
    })

  return { success: true }
}
```

**Akış:**
```
User clicks "Kayıt Ol"
  ↓
Frontend validates input
  ↓
Frontend → Supabase Auth API
  ↓
Supabase creates auth user
  ↓
Frontend → Supabase Database (with anon key + RLS)
  ↓
RLS policy checks (auth.uid() = id)
  ↓
User profile created
  ↓
User logged in automatically
```

---

### **Örnek 2: İş İlanı Oluşturma (Frontend → Backend → Supabase)**

```typescript
// Frontend: Button click
const createJob = async (jobData) => {
  const response = await fetch(
    `${VITE_BACKEND_URL}/make-server-018e1998/jobs/create`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jobData)
    }
  )
}

// Backend: /supabase/functions/server/index.tsx
app.post('/make-server-018e1998/jobs/create', async (c) => {
  // Verify user token
  const token = c.req.header('Authorization')?.split(' ')[1]
  const { data: { user } } = await supabase.auth.getUser(token)
  
  if (!user) return c.json({ error: 'Unauthorized' }, 401)

  // Create job (with service role key - bypasses RLS)
  const { data, error } = await supabase
    .from('jobs')
    .insert({
      corporate_id: user.id,
      title: jobData.title,
      description: jobData.description,
      // ...
    })

  return c.json({ success: true, data })
})
```

**Akış:**
```
User clicks "İlan Oluştur"
  ↓
Frontend validates input
  ↓
Frontend → Backend API (with access token)
  ↓
Backend verifies token with Supabase Auth
  ↓
Backend validates business logic
  ↓
Backend → Supabase Database (with service role key)
  ↓
Job created (bypasses RLS)
  ↓
Backend → Frontend (response)
  ↓
UI updated
```

---

## 🌐 URL YAPILANDIRMASI

### **Production (Render.com):**

```env
# Frontend (.env)
VITE_SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
VITE_BACKEND_URL=https://workigom-backend.onrender.com

# Backend (Render.com Environment Variables)
SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... (SECRET!)
SUPABASE_DB_URL=postgresql://postgres:...
PORT=10000
```

### **Development (Local):**

```env
# Frontend (.env.local)
VITE_SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
VITE_BACKEND_URL=http://localhost:8000

# Backend (Local Deno)
SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
SUPABASE_DB_URL=postgresql://postgres:...
PORT=8000
```

---

## 🧪 BAĞLANTI TESTİ

### **1. Supabase Bağlantısı:**

```typescript
// Test.tsx
import { supabase } from './utils/supabase/client'

const testConnection = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('count')
    .single()
  
  console.log('Supabase connection:', error ? '❌ Failed' : '✅ Success')
}
```

### **2. Backend Bağlantısı:**

```typescript
// Test.tsx
const testBackend = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/make-server-018e1998/health`
  )
  const data = await response.json()
  
  console.log('Backend connection:', data.status === 'ok' ? '✅ Success' : '❌ Failed')
}
```

### **3. Full Stack Test:**

```bash
# Terminal'de:

# 1. Backend health check
curl https://workigom-backend.onrender.com/make-server-018e1998/health

# Beklenen: {"status":"ok","timestamp":"..."}

# 2. Frontend health
curl https://workigom-frontend.onrender.com

# Beklenen: HTML content

# 3. Supabase health
curl https://[project-id].supabase.co/rest/v1/

# Beklenen: {"message":"The server is running"}
```

---

## 🚨 SIRA DIŞI DURUMLAR

### **1. Backend Sleep Mode (Render.com Free Tier):**

**Problem:**
```
Frontend → Backend: 503 Service Unavailable
Backend cold start: 30-60 saniye
```

**Çözüm 1: Uptime Robot (Ücretsiz)**
```
https://uptimerobot.com/
→ New Monitor
→ URL: https://workigom-backend.onrender.com/make-server-018e1998/health
→ Interval: 5 dakika
→ Backend her 5 dakikada ping alır, sleep olmaz
```

**Çözüm 2: Paid Plan ($7/month)**
```
Render.com Dashboard → Backend Service
→ Upgrade to Starter Plan
→ Always-on, no sleep
```

---

### **2. CORS Errors:**

**Problem:**
```
Access to fetch at 'https://backend...' from origin 'https://frontend...'
has been blocked by CORS policy
```

**Çözüm:**
```typescript
// /supabase/functions/server/index.tsx
app.use('/*', cors({
  origin: [
    'https://workigom-frontend.onrender.com',
    'http://localhost:5173'  // Local development
  ],
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}))
```

---

### **3. Environment Variables Not Working:**

**Frontend Problem:**
```
import.meta.env.VITE_SUPABASE_URL === undefined
```

**Çözüm:**
```
1. Render.com Dashboard → Frontend Service
2. Environment → Add Variable
3. Key: VITE_SUPABASE_URL (VITE_ prefix zorunlu!)
4. Value: https://xxx.supabase.co
5. Manual Deploy → Deploy latest commit
```

**Backend Problem:**
```
Deno.env.get('SUPABASE_URL') === undefined
```

**Çözüm:**
```
1. Render.com Dashboard → Backend Service
2. Environment → Add Variable
3. Key: SUPABASE_URL (prefix yok)
4. Value: https://xxx.supabase.co
5. Manual Deploy → Deploy latest commit
```

---

## 📞 YARDIM

**Detaylı kurulum:** `RENDER_COM_DEPLOYMENT_REHBERI.md`

**Hızlı başlangıç:** `RENDER_HIZLI_KURULUM.md`

**Supabase setup:** `SIGNUP_HATA_COZUMU.md`

---

**Başarılar!** 🚀
