# Deployment Guide

## Repository

**GitHub:** https://github.com/eghaddad/profile-management-system  
**Status:** Public repository, master branch

## Code Status

✅ All backend files implemented (34 files created)  
✅ Prisma schema defined with 4 models (User, Profile, ProfileSettings, AvatarUpload)  
✅ Express server with JWT authentication  
✅ RESTful API endpoints for profile, avatar, and settings  
✅ Image processing with Sharp for avatar uploads  
✅ Next.js 14 frontend with React Query  
✅ Tailwind CSS styling configured  
✅ Railway configuration (railway.json) ready  
✅ TypeScript strict mode enabled  
✅ Git repository initialized and committed

## Railway Deployment

**Project ID:** 4dacd0b5-4239-4fb6-89c4-b47103e5d512  
**Project Name:** framework-reliability-test  
**Service ID:** 2fa1b3d0-be90-4164-acab-0ef878a9cbfd  
**Service Name:** profile-backend

### Manual Deployment Steps

1. **Connect GitHub to Railway:**
   - Go to Railway dashboard
   - Navigate to project 4dacd0b5-4239-4fb6-89c4-b47103e5d512
   - Click on "profile-backend" service
   - Connect to GitHub repository: eghaddad/profile-management-system
   - Select branch: master

2. **Configure Environment Variables:**
   ```
   DATABASE_URL=<Railway PostgreSQL connection string>
   JWT_SECRET=<generate-a-secure-random-key>
   JWT_EXPIRATION=7d
   PORT=3001
   NODE_ENV=production
   UPLOAD_PATH=/app/uploads
   MAX_FILE_SIZE=5242880
   ALLOWED_IMAGE_TYPES=image/jpeg,image/png,image/webp
   ```

3. **Database Migration:**
   ```bash
   cd backend
   npx prisma migrate deploy
   npx prisma generate
   ```

4. **Deploy Backend:**
   - Railway will auto-deploy on git push to master
   - Backend will be available at Railway-generated URL

5. **Deploy Frontend:**
   - Option A: Deploy to Vercel (recommended for Next.js)
   - Option B: Deploy as separate Railway service
   - Set `NEXT_PUBLIC_API_URL` to backend Railway URL

## Cloudflare Configuration

**Domain:** build-872.agentifai.io

### DNS Records

Add the following DNS records in Cloudflare:

```
Type: CNAME
Name: build-872
Content: <railway-backend-url>
Proxy: Enabled (Orange cloud)

Type: CNAME  
Name: www.build-872
Content: build-872.agentifai.io
Proxy: Enabled (Orange cloud)
```

### CDN Configuration

Enable the following Cloudflare settings:
- Auto Minify (HTML, CSS, JS)
- Brotli compression
- Image optimization
- Cache everything
- Edge Cache TTL: 1 month for /uploads/*

## Verification

After deployment, verify:

1. **Backend Health Check:**
   ```bash
   curl https://build-872.agentifai.io/health
   # Expected: {"status":"ok","timestamp":"..."}
   ```

2. **API Endpoints:**
   ```bash
   # Test profile endpoint (requires auth token)
   curl -H "Authorization: Bearer <token>" https://build-872.agentifai.io/api/profile
   ```

3. **Frontend:**
   - Visit https://build-872.agentifai.io
   - Should load Next.js application
   - Check browser console for API connection

## Next Steps

- [ ] Connect GitHub repository to Railway service
- [ ] Configure environment variables in Railway
- [ ] Run database migrations
- [ ] Deploy backend service
- [ ] Deploy frontend to Vercel or Railway
- [ ] Configure Cloudflare DNS
- [ ] Test full deployment
- [ ] Enable SSL/TLS (automatic with Railway + Cloudflare)
