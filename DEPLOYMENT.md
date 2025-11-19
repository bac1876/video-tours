# Deployment Guide

This guide walks you through deploying the Video Tours application with Railway (backend) and Vercel (frontend).

## Prerequisites

- GitHub account (for both Railway and Vercel)
- Railway account: [railway.app](https://railway.app)
- Vercel account: [vercel.com](https://vercel.com)
- OpenAI API key
- KIE.ai API key
- Cloudflare R2 or AWS S3 credentials

---

## Part 1: Deploy Backend to Railway

### Step 1: Create Railway Project

1. Go to [railway.app](https://railway.app) and sign in with GitHub
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your `video-tours` repository
5. Select the **main** branch

### Step 2: Configure Backend Service

1. Railway will detect your Node.js app automatically
2. Click on the service that was created
3. Go to **Settings** tab
4. Set **Root Directory** to: `backend`
5. Railway will automatically use the `railway.json` and `nixpacks.toml` configs

### Step 3: Add Environment Variables

In the Railway dashboard, go to **Variables** tab and add:

```
NODE_ENV=production
PORT=3001

# OpenAI API (for GPT-5.1 room analysis)
OPENAI_API_KEY=your_openai_api_key_here

# KIE.ai Sora API (for video generation)
KIE_API_KEY=your_kie_api_key_here
KIE_API_URL=https://api.kie.com/v1

# Storage - Option 1: AWS S3
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
S3_BUCKET=your-bucket-name
STORAGE_TYPE=s3

# OR Storage - Option 2: Cloudflare R2
R2_ACCOUNT_ID=your_r2_account_id
R2_ACCESS_KEY_ID=your_r2_access_key
R2_SECRET_ACCESS_KEY=your_r2_secret_key
R2_BUCKET=your-r2-bucket-name
STORAGE_TYPE=r2

# File Upload Limits
MAX_FILE_SIZE=10485760
MAX_FILES=15

# Video Processing
FFMPEG_PATH=/nix/store/*/bin/ffmpeg
VIDEO_QUALITY=16
```

**Important Notes:**
- Railway installs FFmpeg via Nix, so `FFMPEG_PATH` will be auto-detected
- You can leave `FFMPEG_PATH` blank and the app will find it automatically
- For `STORAGE_TYPE`, choose either `s3` or `r2` (not both)

### Step 4: Deploy

1. Railway will automatically deploy after you add environment variables
2. Wait for the build to complete (2-3 minutes)
3. Click **"Settings"** → **"Generate Domain"** to get your backend URL
4. Copy this URL - you'll need it for the frontend (e.g., `https://your-app.railway.app`)

### Step 5: Verify Backend

Test your backend is working:
```bash
curl https://your-app.railway.app/health
```

You should see a success response.

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Create Vercel Project

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New..."** → **"Project"**
3. Import your `video-tours` repository
4. Vercel will auto-detect Next.js

### Step 2: Configure Build Settings

1. **Framework Preset:** Next.js (auto-detected)
2. **Root Directory:** `frontend`
3. **Build Command:** `npm run build` (default)
4. **Output Directory:** `.next` (default)
5. **Install Command:** `npm install` (default)

### Step 3: Add Environment Variables

In the Vercel project settings, add:

```
NEXT_PUBLIC_API_URL=https://your-app.railway.app
```

Replace `https://your-app.railway.app` with your actual Railway backend URL from Part 1, Step 4.

**Important:** Do NOT include a trailing slash!

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (1-2 minutes)
3. Vercel will provide your frontend URL (e.g., `https://video-tours.vercel.app`)

### Step 5: Verify Frontend

1. Visit your Vercel URL
2. You should see the upload interface
3. Try uploading a test image to verify the backend connection

---

## Part 3: Configure CORS (Important!)

Your backend needs to allow requests from your Vercel frontend.

### Update Backend CORS Settings

1. In Railway, add this environment variable:

```
CORS_ORIGIN=https://video-tours.vercel.app
```

Replace with your actual Vercel URL (you can add multiple URLs separated by commas if needed).

2. Railway will automatically redeploy

---

## Part 4: Set Up Storage (S3 or R2)

### Option A: AWS S3

1. Create an S3 bucket in AWS Console
2. Enable public read access for uploaded files
3. Configure CORS:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": []
  }
]
```

4. Add the S3 credentials to Railway environment variables (see Part 1, Step 3)

### Option B: Cloudflare R2

1. Create an R2 bucket in Cloudflare dashboard
2. Create an API token with R2 read/write permissions
3. Configure public access domain (optional)
4. Add the R2 credentials to Railway environment variables (see Part 1, Step 3)

---

## Troubleshooting

### Backend Issues

**Build fails:**
- Check Railway logs in the **Deployments** tab
- Verify `railway.json` and `nixpacks.toml` are in the `backend/` directory
- Ensure all dependencies are in `package.json`

**FFmpeg not found:**
- Railway should auto-install FFmpeg via nixpacks
- Check the build logs to verify FFmpeg installation
- The path is usually auto-detected; you don't need to set `FFMPEG_PATH`

**API timeouts:**
- Sora video generation can take 1-2 minutes per clip
- Railway has no timeout limits (unlike Vercel serverless functions)
- Check your KIE.ai API key and credits

### Frontend Issues

**"Network Error" or CORS errors:**
- Verify `NEXT_PUBLIC_API_URL` is set correctly in Vercel
- Add your Vercel URL to `CORS_ORIGIN` in Railway backend
- Make sure there's no trailing slash in the API URL

**Environment variables not working:**
- Environment variables starting with `NEXT_PUBLIC_` are exposed to the browser
- After adding variables, redeploy in Vercel
- Clear your browser cache

**Build fails:**
- Check Vercel build logs
- Verify all frontend dependencies are in `package.json`
- Ensure TypeScript has no errors (`npm run type-check`)

### Storage Issues

**Upload fails:**
- Check S3/R2 credentials in Railway
- Verify bucket permissions and CORS settings
- Check Railway logs for detailed error messages

**Videos not accessible:**
- Ensure your S3/R2 bucket allows public read access
- Verify the public URL format matches your storage service
- Check that files are actually being uploaded (check S3/R2 console)

---

## Monitoring & Logs

### Railway Logs
- Go to your project → **Deployments** → Click on latest deployment
- View real-time logs
- Useful for debugging video generation and API calls

### Vercel Logs
- Go to your project → **Deployments** → Click on deployment
- View build logs and runtime logs
- Useful for debugging frontend issues

---

## Updating Your Deployment

### Backend Updates
1. Push changes to GitHub `main` branch
2. Railway auto-deploys from GitHub
3. Monitor the deployment in Railway dashboard

### Frontend Updates
1. Push changes to GitHub `main` branch
2. Vercel auto-deploys from GitHub
3. Monitor the deployment in Vercel dashboard

---

## Cost Estimates

### Railway (Backend)
- **Free tier:** $5/month credit
- **Pro plan:** $5/month + usage
- Expected cost: ~$5-20/month depending on video generation volume

### Vercel (Frontend)
- **Hobby tier:** Free for personal projects
- **Pro plan:** $20/month (for commercial use)
- Expected cost: Free (unless high traffic)

### APIs & Storage
- **OpenAI GPT-5.1:** Pay-per-use (~$0.01-0.05 per room analysis)
- **KIE.ai Sora:** ~$0.075-0.50 per 5-second clip
- **S3/R2 Storage:** ~$0.02 per GB stored + transfer costs

**Total estimated cost for 100 tours/month:**
- Railway: $10
- Vercel: $0 (hobby) or $20 (pro)
- OpenAI: ~$5
- Sora: ~$100-750 (depending on quality)
- Storage: ~$5
- **Total: ~$120-790/month**

---

## Next Steps

1. Set up custom domain (optional)
   - Railway: Settings → Domains
   - Vercel: Settings → Domains
2. Enable analytics
3. Set up error monitoring (Sentry, LogRocket, etc.)
4. Configure CI/CD with GitHub Actions (optional)

---

## Support

For issues:
- Railway: https://railway.app/help
- Vercel: https://vercel.com/support
- Project issues: https://github.com/bac1876/video-tours/issues
