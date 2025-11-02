# Admin User - Quick Reference Guide

## 🔐 Default Admin Credentials

```
Email: admin@workigom.com
Password: Admin123!
```

⚠️ Change password after first login!

---

## 🚀 Quick Commands

### Create Admin User (Recommended)
```bash
cd backend
npm run admin:create
```

### Promote Existing User to Admin
```bash
cd backend
npm run admin:promote
```

### Full Database Seeding
```bash
cd backend
npm run prisma:seed
```

---

## 🌐 On Render (Production)

### Option 1: Render Shell
1. Open Render Dashboard
2. Go to your backend service
3. Click "Shell" tab
4. Run: `npm run admin:create`

### Option 2: Temporary Build Command
Add to Build Command: `&& npm run admin:create`

---

## ✅ Test Admin Access

### 1. Login
```bash
POST /api/auth/login
{
  "email": "admin@workigom.com",
  "password": "Admin123!"
}
```

### 2. Get Users (Admin Only)
```bash
GET /api/users
Authorization: Bearer YOUR_TOKEN
```

### 3. Send Notification (Admin Only)
```bash
POST /api/admin/send-notification
Authorization: Bearer YOUR_TOKEN
{
  "userId": "USER_ID",
  "type": "SYSTEM",
  "title": "Test",
  "content": "Test notification"
}
```

---

## 🐛 Common Issues

**403 Forbidden?**
- User doesn't have ADMIN role
- Run: `npm run admin:create` or `npm run admin:promote`
- Login again to get new token

**Token not working?**
- Make sure token is stored as `authToken` (not `token`)
- Check: DevTools > Application > Local Storage

**Script fails?**
- Check DATABASE_URL is set
- Run: `npm install` if dependencies missing

---

## 📋 User Roles

- **INDIVIDUAL** - Job seeker / Donation receiver (default)
- **CORPORATE** - Employer / Donor provider
- **ADMIN** - System administrator (required for admin endpoints)

---

## 🎯 Protected Admin Endpoints

- `GET /api/users` - List all users
- `POST /api/admin/send-notification` - Send notifications

---

*For detailed instructions, see ADMIN_USER_FIX_GUIDE.md*
