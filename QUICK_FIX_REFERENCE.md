# ⚡ Quick Fix Reference Card

## 🔴 THE PROBLEM

```
Frontend is trying to connect to: https://workigom.onrender.com/api
Backend is actually at:          https://workigom-backend.onrender.com/api
                                                    ^^^^^^^^
                                              Missing "-backend"!
```

---

## ✅ THE FIX

### Change This:
```
VITE_BACKEND_URL=https://workigom.onrender.com
```

### To This:
```
VITE_BACKEND_URL=https://workigom-backend.onrender.com
                                ^^^^^^^^
                          Add "-backend"
```

---

## 🎯 WHERE TO CHANGE IT

### Method 1: Vercel Dashboard (RECOMMENDED) ⭐

**Steps:**
1. Go to: https://vercel.com/dashboard
2. Click: **workigom** project
3. Click: **Settings** → **Environment Variables**
4. Edit: `VITE_BACKEND_URL`
5. Set to: `https://workigom-backend.onrender.com`
6. Click: **Save**
7. Go to: **Deployments**
8. Click: **Redeploy**
9. ✅ **Done!**

**Time:** 5 minutes

### Method 2: Update Code

**File:** `/home/ubuntu/workigom/src-frontend/.env.production`

**Current content:**
```bash
# Production environment variables
# Note: In Vercel, set VITE_BACKEND_URL in the dashboard under Settings > Environment Variables
VITE_BACKEND_URL=https://workigom.onrender.com
```

**Change to:**
```bash
# Production environment variables
# Note: In Vercel, set VITE_BACKEND_URL in the dashboard under Settings > Environment Variables
VITE_BACKEND_URL=https://workigom-backend.onrender.com
```

**Then commit and push:**
```bash
cd /home/ubuntu/workigom
git add src-frontend/.env.production
git commit -m "fix: Correct backend URL to include -backend"
git push origin master
```

**Time:** 2 minutes + auto-deploy

---

## 🔍 HOW TO VERIFY IT'S FIXED

### Test 1: Check Console
Open https://workigom.vercel.app and check console (F12):

**Should see:**
```javascript
🔧 API Configuration: {
  VITE_BACKEND_URL: "https://workigom-backend.onrender.com",
  finalApiUrl: "https://workigom-backend.onrender.com/api",
  mode: "production"
}
```

### Test 2: Check Network Tab
Open Network tab (F12), use the app:

**Should see:**
- ✅ Requests to `workigom-backend.onrender.com`
- ✅ Status: 200 OK
- ✅ No ERR_NETWORK errors

### Test 3: Backend Health Check
Visit: https://workigom-backend.onrender.com/api/health

**Should return:**
```json
{
  "success": true,
  "message": "Workigom API is running",
  "database": "connected"
}
```

---

## 📊 COMPARISON TABLE

| Item | Wrong (Current) | Correct (Fix) |
|------|----------------|---------------|
| **Env Variable** | `workigom.onrender.com` | `workigom-backend.onrender.com` |
| **API URL Called** | `workigom.onrender.com/api` | `workigom-backend.onrender.com/api` |
| **Result** | ❌ ERR_NETWORK | ✅ Success (200 OK) |
| **App Status** | ❌ Broken | ✅ Working |

---

## 🚨 TROUBLESHOOTING

### Still seeing errors?

1. **Hard refresh:** Ctrl+Shift+R (or Cmd+Shift+R)
2. **Clear cache:** Ctrl+Shift+Delete
3. **Check env var** in Vercel Dashboard
4. **Wait for redeploy** to complete (1-2 mins)
5. **Check deployment logs** for build errors

### Backend not responding?

Test directly:
```bash
curl https://workigom-backend.onrender.com/api/health
```

Should return JSON with `"success": true`

---

## 📱 COPY-PASTE VALUES

**For Vercel Dashboard:**
```
Name:  VITE_BACKEND_URL
Value: https://workigom-backend.onrender.com
```

**For .env.production file:**
```
VITE_BACKEND_URL=https://workigom-backend.onrender.com
```

---

## ✅ CHECKLIST

Before fix:
- [ ] Confirmed backend is at https://workigom-backend.onrender.com
- [ ] Confirmed env var currently has wrong value
- [ ] Confirmed frontend deployment is at https://workigom.vercel.app

After fix:
- [ ] Updated environment variable
- [ ] Redeployed application
- [ ] Tested in browser console
- [ ] Verified API calls work
- [ ] Confirmed no ERR_NETWORK errors
- [ ] All app features working

---

## 🎉 SUCCESS!

When you see this, you're done:

```
✅ No console errors
✅ API calls succeeding (200 OK)
✅ Jobs loading correctly
✅ Login working
✅ All features operational
```

---

## 📞 NEED MORE DETAILS?

See full documentation:
- **FRONTEND_NETWORK_ERROR_DIAGNOSIS.md** - Complete technical analysis
- **VERCEL_FIX_STEPS.md** - Detailed step-by-step guide
- **NETWORK_ERROR_SUMMARY.md** - Executive summary

---

**⏱️ Total Time to Fix: 5-10 minutes**

**🎯 Difficulty: Easy - Just update one environment variable!**

**💪 Impact: Complete restoration of frontend functionality**

---

**Ready? Let's fix it! 🚀**
