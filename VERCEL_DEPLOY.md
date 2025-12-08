# Vercel Deployment - Quick Start

## 🚀 Quick Deploy

### Backend (Deploy First)

```bash
cd server
vercel --prod
```

Copy the deployment URL (e.g., `https://avni-portfolio-api.vercel.app`)

**Add Environment Variables in Vercel Dashboard:**
```
DATABASE_URL=postgresql://neondb_owner:npg_shRBPYr7Dg5i@ep-orange-union-a10zrj4l-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
WEB3FORMS_ACCESS_KEY=66d4a5d1-9092-459b-abbd-a138ca626eaa
WEB3FORMS_TO_EMAIL=avnisixc13@gmail.com
FRONTEND_URL=https://avni-portfolio.vercel.app
```

### Frontend (Deploy Second)

```bash
cd ..
vercel --prod
```

**Add Environment Variable in Vercel Dashboard:**
```
VITE_API_URL=https://your-backend-url.vercel.app
```

Redeploy after adding env vars:
```bash
vercel --prod
```

## ✅ Done!

Your portfolio is now live at:
- Frontend: `https://your-project.vercel.app`
- Backend: `https://your-backend.vercel.app`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.
