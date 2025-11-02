
# Testing Guide - Admin Notification Fix

## Prerequisites

1. ✅ Backend deployed and running at: `https://workigom-backend.onrender.com`
2. ✅ Frontend deployed with environment variable: `VITE_BACKEND_URL=https://workigom-backend.onrender.com`
3. ✅ Admin user exists in database with role='ADMIN'

## Step 1: Create Admin User (if not exists)

### Option A: Via Database (Recommended)

Connect to your PostgreSQL database and run:

```sql
-- Create admin user
INSERT INTO "User" (id, email, password, name, phone, role, "isVerified", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  'admin@workigom.com',
  '$2b$10$YourHashedPasswordHere', -- Use bcrypt to hash your password
  'Admin User',
  '+905551234567',
  'ADMIN',
  true,
  NOW(),
  NOW()
);

-- Or update existing user to admin
UPDATE "User" 
SET role = 'ADMIN' 
WHERE email = 'your-email@example.com';
```

### Option B: Via API

1. Register a normal user via POST `/api/auth/register`
2. Then update the user's role in the database to 'ADMIN'

### Generate Hashed Password (Node.js)

```javascript
const bcrypt = require('bcrypt');
const password = 'YourSecurePassword123!';
const hash = await bcrypt.hash(password, 10);
console.log(hash); // Use this hash in the SQL above
```

## Step 2: Test Backend Authentication

### Test Login Endpoint

```bash
# Test admin login
curl -X POST https://workigom-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@workigom.com",
    "password": "YourSecurePassword123!"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-here",
      "email": "admin@workigom.com",
      "name": "Admin User",
      "role": "ADMIN",
      ...
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "..."
  },
  "message": "Login successful"
}
```

### Test Auth Token

```bash
# Get current user with token
curl -X GET https://workigom-backend.onrender.com/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "email": "admin@workigom.com",
    "role": "ADMIN",
    ...
  }
}
```

## Step 3: Test Frontend Login

1. **Open Frontend**: Navigate to your deployed frontend URL
2. **Open DevTools**: Press F12 or right-click → Inspect
3. **Go to Console Tab**
4. **Test API Configuration**:

```javascript
// Check if environment variable is set
console.log(import.meta.env.VITE_BACKEND_URL);
// Should show: https://workigom-backend.onrender.com

// Test API connectivity
fetch('https://workigom-backend.onrender.com/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@workigom.com',
    password: 'YourSecurePassword123!'
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

## Step 4: Login via UI

1. **Navigate to Admin Panel** or Admin Login page
2. **Enter Credentials**:
   - Email: `admin@workigom.com`
   - Password: `YourSecurePassword123!`
3. **Click "Sign In"**
4. **Verify Success**:
   - Should see success toast: "✅ Login successful!"
   - Token should be stored in localStorage

### Verify Token Storage

Open DevTools → Application → Local Storage → Your Domain:

```
authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
currentUser: {"id":"...","email":"admin@workigom.com","role":"ADMIN",...}
```

## Step 5: Test Send Notification

### Via Frontend UI

1. **Navigate to**: Admin Panel → Send Notification
2. **Fill in the form**:
   - Target Audience: "All Users"
   - Title: "Test Notification"
   - Message: "This is a test notification to verify the system is working."
3. **Click "Send Notification"**
4. **Verify Success**:
   - Should see toast: "✅ Notification sent! All users (X users)"

### Verify in Network Tab

1. Open DevTools → Network tab
2. Find the request to `send-notification`
3. Check **Request Headers**:
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   Content-Type: application/json
   ```
4. Check **Request Payload**:
   ```json
   {
     "targetType": "ALL",
     "title": "Test Notification",
     "message": "This is a test notification..."
   }
   ```
5. Check **Response**:
   ```json
   {
     "success": true,
     "data": {
       "count": 5,
       "targetType": "ALL"
     },
     "message": "Bildirim başarıyla 5 kullanıcıya gönderildi"
   }
   ```

### Via API (cURL)

```bash
# Get token first (from login response)
TOKEN="your-actual-token-here"

# Send notification
curl -X POST https://workigom-backend.onrender.com/api/admin/send-notification \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "targetType": "ALL",
    "title": "Test Notification",
    "message": "This is a test message"
  }'
```

## Step 6: Verify Notifications Were Created

### Via Database

```sql
-- Check created notifications
SELECT * FROM "Notification" 
ORDER BY "createdAt" DESC 
LIMIT 10;
```

### Via API

```bash
# Login as a regular user first to get their token
USER_TOKEN="regular-user-token-here"

# Get their notifications
curl -X GET https://workigom-backend.onrender.com/api/notifications \
  -H "Authorization: Bearer $USER_TOKEN"
```

## Common Issues & Solutions

### Issue: "Network error. Please check your connection"

**Diagnosis**:
```javascript
// In browser console
console.log(import.meta.env.VITE_BACKEND_URL);
```

**Solutions**:
1. Ensure `VITE_BACKEND_URL` is set in your hosting platform
2. Verify backend URL is accessible: `curl https://workigom-backend.onrender.com/api/health`
3. Check CORS settings on backend
4. Rebuild and redeploy frontend after setting environment variable

### Issue: "❌ Invalid or expired token"

**Diagnosis**:
```javascript
// In browser console
console.log(localStorage.getItem('authToken'));
```

**Solutions**:
1. Clear localStorage and login again:
   ```javascript
   localStorage.clear();
   location.reload();
   ```
2. Check token is being sent in request headers (Network tab)
3. Verify backend JWT_SECRET is set correctly
4. Check token hasn't expired (default is 7 days)

### Issue: "Admin access required"

**Solutions**:
1. Verify user role in database:
   ```sql
   SELECT email, role FROM "User" WHERE email = 'your@email.com';
   ```
2. Update role if needed:
   ```sql
   UPDATE "User" SET role = 'ADMIN' WHERE email = 'your@email.com';
   ```
3. Logout and login again to get updated role

### Issue: "User not found" during login

**Solutions**:
1. Verify user exists:
   ```sql
   SELECT * FROM "User" WHERE email = 'admin@workigom.com';
   ```
2. Create admin user (see Step 1)
3. Verify email is correct (case-sensitive)

## Testing Checklist

- [ ] Backend is accessible and healthy
- [ ] Admin user exists with correct password
- [ ] Environment variable `VITE_BACKEND_URL` is set correctly
- [ ] Frontend successfully connects to backend
- [ ] Login works and returns valid token
- [ ] Token is stored in localStorage as 'authToken'
- [ ] Token is automatically added to API requests
- [ ] Send notification endpoint accepts the request
- [ ] Notifications are created in database
- [ ] Users can see notifications in their account
- [ ] Error messages are clear and helpful

## Debug Mode

Enable detailed logging:

```javascript
// Add to src/lib/api.ts temporarily
api.interceptors.request.use(config => {
  console.log('📤 API Request:', {
    method: config.method,
    url: config.url,
    headers: config.headers,
    data: config.data
  });
  return config;
});

api.interceptors.response.use(
  response => {
    console.log('📥 API Response:', {
      status: response.status,
      data: response.data
    });
    return response;
  },
  error => {
    console.error('❌ API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    return Promise.reject(error);
  }
);
```

## Success Criteria

✅ **Authentication Working**: Can login and receive valid JWT token  
✅ **Token Persistence**: Token persists across page refreshes  
✅ **Authorization Working**: Admin-only endpoints are protected  
✅ **Notification Sending**: Can successfully send notifications  
✅ **Error Handling**: Clear error messages for all failure cases  
✅ **User Experience**: Smooth flow with loading states and success messages  

## Additional Tests

### Test Different Target Types

```bash
# All Individuals
curl -X POST https://workigom-backend.onrender.com/api/admin/send-notification \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "targetType": "ALL_INDIVIDUALS",
    "title": "For Job Seekers",
    "message": "New opportunities available!"
  }'

# All Companies
curl -X POST https://workigom-backend.onrender.com/api/admin/send-notification \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "targetType": "ALL_COMPANIES",
    "title": "For Employers",
    "message": "New features for your business"
  }'

# Single User
curl -X POST https://workigom-backend.onrender.com/api/admin/send-notification \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "targetType": "SINGLE_INDIVIDUAL",
    "targetId": "user-uuid-here",
    "title": "Personal Message",
    "message": "This is just for you"
  }'
```

---

**Last Updated**: November 2, 2025  
**Version**: 1.0
