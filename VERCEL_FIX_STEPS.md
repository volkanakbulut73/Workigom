# 🔧 Quick Fix: Vercel Environment Variable Update

**Problem**: Frontend cannot connect to backend (ERR_NETWORK error)

**Solution**: Update the `VITE_BACKEND_URL` environment variable in Vercel

---

## 📋 Step-by-Step Instructions

### Step 1: Access Vercel Dashboard

1. Go to: https://vercel.com/dashboard
2. Login if needed
3. Find and click on your **workigom** project

### Step 2: Navigate to Environment Variables

1. Click on **Settings** (in the top menu)
2. Click on **Environment Variables** (in the left sidebar)

### Step 3: Update VITE_BACKEND_URL

Look for an existing `VITE_BACKEND_URL` variable:

#### If it EXISTS:
1. Click the **three dots (...)** next to the variable
2. Click **Edit**
3. Change the value from:
   ```
   https://workigom.onrender.com
   ```
   to:
   ```
   https://workigom-backend.onrender.com
   ```
4. Make sure these are checked:
   - ✅ Production
   - ✅ Preview
   - ✅ Development (optional)
5. Click **Save**

#### If it DOESN'T EXIST:
1. Click **Add New** button
2. Set **Name**: `VITE_BACKEND_URL`
3. Set **Value**: `https://workigom-backend.onrender.com`
4. Select environments:
   - ✅ Production
   - ✅ Preview
   - ✅ Development (optional)
5. Click **Save**

### Step 4: Redeploy the Application

1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the **three dots (...)** menu
4. Click **Redeploy**
5. Confirm the redeployment

### Step 5: Wait for Deployment to Complete

- Wait 1-2 minutes for the build to complete
- You'll see a "✓ Ready" status when done

### Step 6: Test the Fix

1. Open: https://workigom.vercel.app
2. Open Browser DevTools (F12)
3. Go to **Console** tab
4. Refresh the page (Ctrl+R or Cmd+R)
5. Look for the debug message:
   ```
   🔧 API Configuration: {
     VITE_BACKEND_URL: "https://workigom-backend.onrender.com",
     finalApiUrl: "https://workigom-backend.onrender.com/api",
     mode: "production"
   }
   ```
6. Try using the app (login, browse jobs, etc.)
7. Check the **Network** tab - API calls should now succeed!

---

## ✅ Success Indicators

You'll know it's working when:

1. ✅ No more ERR_NETWORK errors in console
2. ✅ API calls in Network tab show successful responses (200 OK)
3. ✅ The app loads data correctly (jobs, user info, etc.)
4. ✅ Login and other features work properly

---

## 🚨 Troubleshooting

### If it still doesn't work:

1. **Hard refresh the page**: Ctrl+Shift+R (or Cmd+Shift+R on Mac)
2. **Clear browser cache**:
   - Chrome: Ctrl+Shift+Delete → Clear cache
3. **Check the environment variable** in Vercel Dashboard again
4. **Check deployment logs** in Vercel for any build errors
5. **Verify backend is running**: Visit https://workigom-backend.onrender.com/api/health

### Expected backend response:
```json
{
  "success": true,
  "message": "Workigom API is running",
  "timestamp": "2025-10-25T...",
  "database": "connected"
}
```

---

## 📸 Screenshots Reference

Based on your uploaded screenshots, I can see:

1. **konsol.jpg**: Shows the browser console with network errors
2. **list.jpg**: Shows the Vercel environment variables list with `VITE_BACKEND_URL`
3. The errors indicate the frontend is trying to connect to localhost or wrong URL

After following these steps, these errors should be resolved!

---

## ⏱️ Estimated Time

- **Total time**: 5-10 minutes
- **Actual deployment**: 1-2 minutes
- Most time is waiting for Vercel to rebuild

---

## 💡 Why This Fixes It

The frontend code at `src-frontend/lib/api.ts` reads the `VITE_BACKEND_URL` environment variable to know where the backend is located. Currently, it's pointing to the wrong URL:

- **Wrong**: `https://workigom.onrender.com` ❌
- **Correct**: `https://workigom-backend.onrender.com` ✅

By updating the environment variable and redeploying, Vite will bake the correct URL into the frontend bundle during the build process.

---

## 🎯 Alternative: Fix via Code (Not Recommended)

If you prefer to fix it in the code instead:

```bash
cd /home/ubuntu/workigom
echo "VITE_BACKEND_URL=https://workigom-backend.onrender.com" > src-frontend/.env.production
git add src-frontend/.env.production
git commit -m "fix: Update backend URL"
git push origin master
```

Vercel will auto-deploy. **But the environment variable method above is preferred!**

---

## 📞 Need More Help?

If you're still having issues after following ALL these steps:

1. Share the Vercel deployment logs
2. Share the browser console output
3. Share the Network tab showing the failed request
4. Verify the exact URL being called in the Network tab

The issue should be 100% resolved after correctly setting the environment variable and redeploying. Good luck! 🚀
