# Deployment Guide: Vercel

This guide covers deploying both the frontend and backend to Vercel.

## Prerequisites

1. Vercel account (sign up at https://vercel.com)
2. Vercel CLI installed: `npm i -g vercel`
3. PostgreSQL database (Neon already configured)

## Deployment Strategy

### Option 1: Two Separate Deployments (Recommended)

Deploy frontend and backend as separate Vercel projects.

#### Deploy Frontend

```bash
# From project root
vercel

# Follow prompts:
# - Project name: avni-portfolio
# - Framework: Vite
# - Root directory: ./
# - Build command: npm run build
# - Output directory: dist
```

**Environment Variables (Vercel Dashboard):**
- `VITE_API_URL` = Your backend URL (e.g., `https://avni-portfolio-api.vercel.app`)

#### Deploy Backend

```bash
# From server directory
cd server
vercel

# Follow prompts:
# - Project name: avni-portfolio-backend
# - Framework: Other
# - Root directory: ./
```

**Environment Variables (Vercel Dashboard):**
Required:
- `DATABASE_URL` = Your Neon PostgreSQL connection string
- `WEB3FORMS_ACCESS_KEY` = `66d4a5d1-9092-459b-abbd-a138ca626eaa`
- `WEB3FORMS_TO_EMAIL` = `avnisixc13@gmail.com`
- `FRONTEND_URL` = Your frontend URL (e.g., `https://avni-portfolio.vercel.app`)
- `NODE_ENV` = `production`

### Option 2: Monorepo Deployment

Use Vercel's monorepo support to deploy both from one repository.

## Step-by-Step Deployment

### 1. Install Vercel CLI

```bash
npm i -g vercel
vercel login
```

### 2. Deploy Backend First

```bash
cd server
vercel --prod

# Note the deployment URL (e.g., https://your-backend.vercel.app)
```

### 3. Configure Backend Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables:

```
DATABASE_URL=postgresql://neondb_owner:npg_shRBPYr7Dg5i@ep-orange-union-a10zrj4l-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
WEB3FORMS_ACCESS_KEY=66d4a5d1-9092-459b-abbd-a138ca626eaa
WEB3FORMS_TO_EMAIL=avnisixc13@gmail.com
FRONTEND_URL=https://avni-portfolio.vercel.app
NODE_ENV=production
```

### 4. Deploy Frontend

```bash
cd ..  # Back to root
vercel --prod
```

### 5. Configure Frontend Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables:

```
VITE_API_URL=https://your-backend.vercel.app
```

**Important:** After adding environment variables, redeploy:
```bash
vercel --prod
```

## Post-Deployment Checklist

- [ ] Frontend loads at your-domain.vercel.app
- [ ] Contact form submits successfully
- [ ] Email arrives at avnisixc13@gmail.com
- [ ] Database records are saved
- [ ] All API endpoints respond correctly
- [ ] Three.js animations work
- [ ] Mobile responsiveness verified

## Troubleshooting

### CORS Errors
Update `FRONTEND_URL` in backend environment variables to match your actual frontend URL.

### Database Connection Issues
Verify `DATABASE_URL` is correct and Neon database allows connections from Vercel IPs.

### Build Failures
Check build logs in Vercel dashboard. Common issues:
- Missing dependencies in package.json
- Environment variables not set
- Node version mismatch

## Custom Domain (Optional)

1. In Vercel Dashboard → Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `FRONTEND_URL` in backend env vars

## Continuous Deployment

Vercel automatically deploys when you push to your Git repository:

1. Connect your GitHub/GitLab repository
2. Set production branch (e.g., `main`)
3. Configure environment variables
4. Push changes → Auto-deploy

## Commands Reference

```bash
# Preview deployment
vercel

# Production deployment
vercel --prod

# Check deployment logs
vercel logs [deployment-url]

# List deployments
vercel ls

# Remove deployment
vercel rm [deployment-name]
```

## Production URLs

After deployment, update these in your code:

**Frontend:** `https://avni-portfolio.vercel.app` (your-project-name)  
**Backend:** `https://avni-portfolio-backend.vercel.app` (your-backend-name)

## Security Notes

- ✅ Never commit `.env` files
- ✅ Use Vercel Environment Variables for secrets
- ✅ Enable CORS only for your frontend domain
- ✅ Keep database credentials secure
- ✅ Regenerate Web3Forms key if exposed

## Support

For issues:
- Vercel Docs: https://vercel.com/docs
- Neon Docs: https://neon.tech/docs
- Web3Forms: https://web3forms.com/docs
