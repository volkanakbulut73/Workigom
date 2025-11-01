
# 🚀 Render Deployment - Quick Reference

This is a condensed reference guide for deploying Workigom on Render.com. For detailed instructions, see [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md).

## 📋 Prerequisites

- Render.com account (free tier)
- GitHub repository: `volkanakbulut73/workigom`
- Git push access to the repository

---

## ⚡ Quick Deploy (Using Blueprint)

### 1. Deploy with Blueprint

```
1. Go to: https://dashboard.render.com/
2. Click: "New +" → "Blueprint"
3. Select: volkanakbulut73/workigom
4. Click: "Apply"
5. Wait 5-10 minutes for deployment
```

### 2. Run Migrations

After backend is deployed:

```bash
# Open backend shell in Render dashboard
npx prisma migrate deploy
```

### 3. Update Environment Variables

**Backend (`workigom-backend`):**
- Update `CORS_ORIGIN` with your actual frontend URL
- Verify all other env vars are set

**Frontend (`workigom-frontend`):**
- Update `VITE_BACKEND_URL` with your actual backend URL

### 4. Redeploy Services

After updating env vars, services will auto-redeploy.

---

## 🔧 Manual Deploy Steps

If not using Blueprint:

### Backend
```
1. New + → Web Service
2. Repo: volkanakbulut73/workigom
3. Root Dir: backend
4. Build: npm install && npx prisma generate && npm run build
5. Start: npm run start
6. Add environment variables (see below)
```

### Frontend
```
1. New + → Static Site
2. Repo: volkanakbulut73/workigom
3. Root Dir: src-frontend
4. Build: npm install && npm run build
5. Publish Dir: dist
6. Add environment variables (see below)
```

### Database
```
1. New + → PostgreSQL
2. Name: workigom-db
3. Plan: Free
4. Copy connection string to backend DATABASE_URL
```

---

## 🔐 Required Environment Variables

### Backend

```bash
NODE_ENV=production
PORT=10000
DATABASE_URL=<from_database>
JWT_SECRET=<auto_generate>
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=<auto_generate>
JWT_REFRESH_EXPIRES_IN=30d
CORS_ORIGIN=https://workigom-frontend.onrender.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/jpg,application/pdf
```

### Frontend

```bash
VITE_BACKEND_URL=https://workigom-backend.onrender.com
```

---

## ✅ Post-Deployment Checklist

- [ ] Backend deployed successfully
- [ ] Frontend deployed successfully
- [ ] Database provisioned
- [ ] Migrations run (`npx prisma migrate deploy`)
- [ ] Backend health check works: `/api/health`
- [ ] Frontend loads in browser
- [ ] CORS configured correctly
- [ ] Environment variables updated with actual URLs

---

## 🔍 Quick Troubleshooting

### Backend Won't Start
```bash
# Check:
1. DATABASE_URL is set correctly
2. Migrations have been run
3. Backend logs for errors
```

### Frontend Can't Connect
```bash
# Check:
1. VITE_BACKEND_URL is correct
2. CORS_ORIGIN includes frontend URL
3. Backend health endpoint responds
```

### Database Connection Failed
```bash
# Check:
1. Wait a few minutes (provisioning can be slow)
2. Verify DATABASE_URL format
3. Check database status in dashboard
```

---

## 📊 Service URLs

After deployment, your services will be at:

- **Backend:** `https://workigom-backend.onrender.com`
- **Frontend:** `https://workigom-frontend.onrender.com`
- **Database:** Internal connection string provided by Render

---

## 🛠️ Useful Commands

### Backend Shell Commands
```bash
# Run migrations
npx prisma migrate deploy

# Seed database
npm run prisma:seed

# Check Prisma status
npx prisma studio

# View logs
tail -f /var/log/render.log
```

### Check Deployment Status
```bash
# Backend health
curl https://workigom-backend.onrender.com/api/health

# Frontend
curl -I https://workigom-frontend.onrender.com
```

---

## 📚 Additional Resources

- **Full Guide:** [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md)
- **Render Docs:** https://render.com/docs
- **Prisma Deployment:** https://www.prisma.io/docs/guides/deployment

---

## 🎯 Important Notes

1. **Free Tier Limitations:**
   - Services spin down after 15 min inactivity
   - Cold starts take ~30 seconds
   - Limited build minutes per month

2. **Always Update CORS:**
   - After deployment, update `CORS_ORIGIN` with actual URLs
   - Otherwise frontend won't connect

3. **Run Migrations:**
   - Don't forget to run `npx prisma migrate deploy`
   - Required after every schema change

4. **Monitor Logs:**
   - Check logs regularly for errors
   - Dashboard → Service → Logs

---

**Last Updated:** November 1, 2024  
**Quick Reference Version:** 1.0.0
