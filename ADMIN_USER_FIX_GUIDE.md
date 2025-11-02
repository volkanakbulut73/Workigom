# Admin User Fix Guide

## Problem Summary

The application was experiencing 403 Forbidden errors when trying to:
1. Fetch users from `/api/users` endpoint
2. Send notifications from `/api/admin/send-notification` endpoint

**Root Cause**: The logged-in user did not have the ADMIN role. The authorization middleware (`requireAdmin`) checks if `req.user.role === UserRole.ADMIN` and returns 403 if the user is not an admin.

## Solution Overview

We've created multiple tools to solve this issue:

1. **Database Seeding Script** - Creates default admin user and test data
2. **Admin Creation Script** - Creates a default admin user
3. **Admin Promotion Script** - Promotes existing users to ADMIN role

---

## 🔐 Default Admin Credentials

### Primary Admin Account

```
Email: admin@workigom.com
Password: Admin123!
Role: ADMIN
```

⚠️ **IMPORTANT**: Please change the password after first login!

---

## 📋 Available Scripts

All scripts are located in `/backend/scripts/` and can be run using npm commands.

### 1. Create Admin User

Creates a default admin user if it doesn't exist.

```bash
cd backend
npm run admin:create
```

**What it does:**
- Checks if admin@workigom.com exists
- If exists and is already ADMIN: Shows info
- If exists but not ADMIN: Promotes to ADMIN
- If doesn't exist: Creates new admin user

### 2. Promote User to Admin

Promotes any existing user to ADMIN role.

```bash
cd backend

# Interactive mode (lists all users and prompts for email)
npm run admin:promote

# Direct mode (provide email as argument)
npx ts-node scripts/promote-to-admin.ts user@example.com
```

**What it does:**
- Lists all users in the database
- Prompts for email address
- Promotes the specified user to ADMIN role

### 3. Full Database Seeding

Seeds the database with admin, test users, jobs, donations, etc.

```bash
cd backend
npm run prisma:seed
```

**What it creates:**
- 1 Admin user (admin@workigom.com)
- 2 Corporate users (employers/donors)
- 3 Individual users (job seekers)
- Sample jobs
- Sample donations
- Sample applications
- Sample messages
- Sample notifications

---

## 🚀 Step-by-Step Fix Instructions

### Option 1: Create Admin User (Recommended for Production)

If you just need an admin user without seeding test data:

```bash
cd backend
npm run admin:create
```

Then login with:
- Email: `admin@workigom.com`
- Password: `Admin123!`

### Option 2: Promote Existing User

If you already have a user account and want to promote it to admin:

```bash
cd backend
npm run admin:promote
```

Follow the interactive prompts to select and promote your user.

### Option 3: Full Database Seeding (Development/Testing)

If you want to reset and seed the entire database:

```bash
cd backend
npm run prisma:seed
```

This will create all test users including the admin account.

---

## 🔧 Technical Details

### User Roles in the System

The application has three user roles defined in the Prisma schema:

```typescript
enum UserRole {
  INDIVIDUAL  // Job seeker / Donation receiver
  CORPORATE   // Employer / Donor provider
  ADMIN       // System administrator
}
```

### Authorization Middleware

The `requireAdmin` middleware in `/backend/src/middleware/adminAuth.middleware.ts` checks:

```typescript
if (req.user.role !== UserRole.ADMIN) {
  return sendError(res, 'Bu işlem için yönetici yetkisi gerekli', 403);
}
```

### Protected Admin Endpoints

The following endpoints require ADMIN role:

1. `GET /api/users` - Fetch all users
2. `POST /api/admin/send-notification` - Send notifications to users
3. Any other endpoint using the `requireAdmin` middleware

---

## 📝 Test Users Created by Seeding

If you run the full seed script, these users will be created:

| Email | Password | Role | Purpose |
|-------|----------|------|---------|
| admin@workigom.com | Admin123! | ADMIN | System administrator |
| company1@workigom.com | company123 | CORPORATE | Employer/Donor |
| company2@workigom.com | company123 | CORPORATE | Restaurant/Donor |
| mehmet@example.com | user123 | INDIVIDUAL | Job seeker |
| ayse@example.com | user123 | INDIVIDUAL | Job seeker |
| test@example.com | Test123! | INDIVIDUAL | Test user |
| donor@example.com | Donor123! | CORPORATE | Donor user |
| seeker@example.com | Seeker123! | INDIVIDUAL | Job seeker |

---

## 🔍 Verification Steps

After creating/promoting an admin user:

### 1. Login as Admin

```bash
POST https://workigom-backend.onrender.com/api/auth/login
Content-Type: application/json

{
  "email": "admin@workigom.com",
  "password": "Admin123!"
}
```

### 2. Test Fetching Users

```bash
GET https://workigom-backend.onrender.com/api/users
Authorization: Bearer YOUR_TOKEN_HERE
```

Should return 200 OK with list of all users.

### 3. Test Sending Notifications

```bash
POST https://workigom-backend.onrender.com/api/admin/send-notification
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "userId": "USER_ID_HERE",
  "type": "SYSTEM",
  "title": "Test Notification",
  "content": "This is a test notification"
}
```

Should return 200 OK.

---

## 🎯 Production Deployment Instructions

### On Render (Your Current Setup)

Since your database is hosted on Render, you need to run these scripts with the production DATABASE_URL:

#### Method 1: Using Render Shell

1. Go to your backend service on Render Dashboard
2. Open the Shell tab
3. Run the command:
   ```bash
   npm run admin:create
   ```

#### Method 2: Using Local Environment with Production Database

1. Get your production DATABASE_URL from Render environment variables
2. Create a `.env` file in the backend directory:
   ```bash
   DATABASE_URL="your_production_database_url_here"
   ```
3. Run the script locally:
   ```bash
   cd backend
   npm run admin:create
   ```
4. Remove the `.env` file after running (for security)

#### Method 3: Add as Build/Start Command (One-time)

You can temporarily add the admin creation to your Render build command:

1. Go to Render Dashboard > Your Backend Service > Settings
2. Find "Build Command"
3. Add to the end: `&& npm run admin:create`
4. Save and redeploy
5. Remove it after deployment succeeds

---

## ⚠️ Important Notes

1. **Password Security**: The default admin password is `Admin123!`. Change it immediately after first login.

2. **Role Assignment on Registration**: By default, new users are created with INDIVIDUAL role. Users can optionally specify their role during registration.

3. **Database URL**: The scripts require DATABASE_URL environment variable. On Render, this is automatically set. For local development, you need to set it in your `.env` file.

4. **Script Idempotency**: All scripts are idempotent (safe to run multiple times). They use `upsert` operations to avoid creating duplicates.

5. **Authorization Chain**: Make sure to use both `authenticate` and `requireAdmin` middleware on admin endpoints:
   ```typescript
   router.get('/admin/endpoint', authenticate, requireAdmin, handler);
   ```

---

## 🐛 Troubleshooting

### "User not found" Error

**Solution**: Run the admin creation script:
```bash
npm run admin:create
```

### "Database connection failed"

**Solution**: Check your DATABASE_URL environment variable is set correctly.

### Still Getting 403 After Login

**Possible causes:**
1. Token not being sent in Authorization header
2. User role is not ADMIN in database
3. Using old token (login again to get new token with ADMIN role)

**Solution**: 
- Check the token in browser DevTools > Application > Local Storage
- The token should be stored under key `authToken` (not `token`)
- Login again after promoting user to admin

### Script "ts-node: command not found"

**Solution**: Install dependencies:
```bash
cd backend
npm install
```

---

## 📚 Related Files

- `/backend/scripts/create-admin.ts` - Admin creation script
- `/backend/scripts/promote-to-admin.ts` - User promotion script
- `/backend/prisma/seed.ts` - Full database seeding script
- `/backend/src/middleware/adminAuth.middleware.ts` - Admin authorization middleware
- `/backend/src/controllers/auth.controller.ts` - Authentication controller
- `/backend/prisma/schema.prisma` - Database schema with UserRole enum

---

## 🎉 Success Checklist

- [ ] Admin user created/exists in database
- [ ] Can login with admin credentials
- [ ] Can fetch users from `/api/users` (200 OK, not 403)
- [ ] Can send notifications from `/api/admin/send-notification` (200 OK, not 403)
- [ ] Admin password changed from default
- [ ] Scripts documented and available for team

---

## 📞 Need Help?

If you're still experiencing issues:

1. Check the backend logs on Render Dashboard
2. Verify the user's role in the database using Prisma Studio: `npm run prisma:studio`
3. Test the endpoints using Postman or curl with proper Authorization header
4. Ensure you're using the latest token after role change

---

*Last Updated: November 2, 2025*
*Version: 1.0.0*
