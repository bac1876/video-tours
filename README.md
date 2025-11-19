# Sora Home Walkthrough Generator

A full-stack application that transforms 1-15 home photos into a cinematic virtual walkthrough video using OpenAI's Sora API.

## Features

- Upload up to 15 room photos with drag-and-drop interface
- GPT-5.1 powered room image analysis with spatial understanding
- Automatic AI-powered video generation for each room (5 second clips)
- Intelligent room-by-room video stitching with crossfades
- Multiple output formats:
  - 1080p horizontal (MLS-friendly)
  - Compressed MLS version
  - 9:16 vertical format (Instagram Reels, TikTok)
- Real-time generation status tracking
- Modern, Apple-style UI with dark/light mode

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **React DnD** - Drag-and-drop reordering
- **Axios** - API client

### Backend
- **Node.js + Express** - API server
- **TypeScript** - Type safety
- **KIE.ai Sora API** - Video generation (60%+ cheaper than OpenAI)
- **OpenAI GPT-5.1** - Room image analysis with native multimodal vision
- **FFmpeg** - Video stitching and processing
- **Sharp** - Image validation
- **Cloudflare R2** or **AWS S3** - File storage
- **Multer** - File uploads

## Prerequisites

- **Node.js** 18+ and npm
- **FFmpeg** installed on your system
  - macOS: `brew install ffmpeg`
  - Ubuntu: `sudo apt install ffmpeg`
  - Windows: Download from [ffmpeg.org](https://ffmpeg.org/download.html)
- **OpenAI API Key** - Get from [platform.openai.com](https://platform.openai.com) (for GPT-5.1 room analysis)
- **KIE.ai API Key** - Get from [kie.ai](https://kie.ai) (60%+ cheaper than OpenAI for Sora video generation)
- **Cloudflare R2** or **AWS S3** account and credentials

## Local Development Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd videotours

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment Variables

#### Backend (.env)

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with your credentials:

```env
PORT=3001
NODE_ENV=development

# OpenAI API (for GPT-5.1 room image analysis)
OPENAI_API_KEY=your_openai_api_key_here

# KIE.ai Sora API (for video generation)
KIE_API_KEY=your_kie_api_key_here
KIE_API_URL=https://api.kie.com/v1

# Storage (choose one)
# AWS S3
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
S3_BUCKET=your-bucket-name

# OR Cloudflare R2
R2_ACCOUNT_ID=your_r2_account_id
R2_ACCESS_KEY_ID=your_r2_access_key
R2_SECRET_ACCESS_KEY=your_r2_secret_key
R2_BUCKET=your-r2-bucket-name

# Storage type (s3 or r2)
STORAGE_TYPE=s3

# File Upload
MAX_FILE_SIZE=10485760
MAX_FILES=15

# Video Processing
FFMPEG_PATH=/usr/local/bin/ffmpeg
VIDEO_QUALITY=16
```

#### Frontend (.env.local)

```bash
cd ../frontend
cp .env.example .env.local
```

Edit `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Run Development Servers

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

Backend will run on `http://localhost:3001`

#### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:3000`

### 4. Generate Your First Tour

1. Open `http://localhost:3000` in your browser
2. Upload 1-15 room photos (JPG, PNG, WebP)
3. Drag to reorder rooms as desired
4. Click "Generate Walkthrough"
5. Wait for video generation (5-10 minutes for 15 rooms)
6. Download your videos in all formats

## API Endpoints

### POST /api/upload
Upload 1-15 photos

**Request:** multipart/form-data with `photos` field

**Response:**
```json
{
  "success": true,
  "photos": [
    {
      "id": "uuid-1",
      "url": "https://cdn.../room1.jpg",
      "filename": "living-room.jpg",
      "order": 0
    }
  ]
}
```

### POST /api/generate-room-video
Generate video for a single room

**Request:**
```json
{
  "imageUrl": "https://cdn.../room.jpg",
  "prompt": "Create a realistic video walkthrough...",
  "order": 1
}
```

**Response:**
```json
{
  "success": true,
  "videoUrl": "https://cdn.../room-clip.mp4",
  "duration": 5,
  "order": 1
}
```

### POST /api/generate-full-tour
Stitch all clips into final videos

**Request:**
```json
{
  "clips": [
    { "url": "https://cdn.../clip1.mp4", "order": 1 },
    { "url": "https://cdn.../clip2.mp4", "order": 2 }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "videos": {
    "horizontal": "https://cdn.../final_tour.mp4",
    "compressed": "https://cdn.../final_tour_compressed.mp4",
    "vertical": "https://cdn.../final_tour_vertical.mp4"
  }
}
```

## Production Deployment

**See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment instructions.**

Quick summary:
- **Backend:** Deploy to Railway (handles long-running video generation + FFmpeg)
- **Frontend:** Deploy to Vercel (optimized for Next.js)

Railway and Vercel both auto-deploy from GitHub on every push to `main`.

Configuration files included:
- `backend/railway.json` - Railway configuration
- `backend/nixpacks.toml` - Auto-installs FFmpeg and Node.js 20
- `frontend/vercel.json` - Vercel Next.js configuration

### Storage Setup

#### AWS S3
1. Create S3 bucket
2. Enable public access for read
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

#### Cloudflare R2
1. Create R2 bucket in Cloudflare dashboard
2. Create API token with R2 read/write permissions
3. Configure public access domain

## Project Structure

```
videotours/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── upload.ts          # Photo upload endpoint
│   │   │   ├── generate.ts        # Video generation endpoints
│   │   │   └── index.ts           # Route aggregator
│   │   ├── services/
│   │   │   ├── sora.service.ts    # Sora API integration
│   │   │   ├── vision.service.ts  # GPT-5.1 image analysis
│   │   │   ├── storage.service.ts # S3/R2 storage
│   │   │   ├── ffmpeg.service.ts  # Video stitching
│   │   │   └── prompt.service.ts  # Prompt generation
│   │   ├── utils/
│   │   │   ├── validation.ts      # Input validation
│   │   │   └── errors.ts          # Error handling
│   │   ├── types/
│   │   │   └── index.ts           # TypeScript types
│   │   └── index.ts               # Express app entry
│   ├── uploads/                   # Temporary file storage
│   ├── package.json
│   ├── tsconfig.json
│   ├── railway.json               # Railway deployment config
│   ├── nixpacks.toml              # Nixpacks build config (FFmpeg)
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx           # Main app page
│   │   │   ├── layout.tsx         # Root layout
│   │   │   └── globals.css        # Global styles
│   │   ├── components/
│   │   │   ├── Upload.tsx         # Photo upload UI
│   │   │   ├── Reorder.tsx        # Drag-drop reorder
│   │   │   ├── Status.tsx         # Generation status
│   │   │   └── Download.tsx       # Download links
│   │   ├── hooks/
│   │   │   └── useApi.ts          # API client hooks
│   │   ├── utils/
│   │   │   └── api.ts             # Axios config
│   │   └── types/
│   │       └── index.ts           # TypeScript types
│   ├── public/
│   ├── package.json
│   ├── tsconfig.json
│   ├── vercel.json                # Vercel deployment config
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── CLAUDE.md                      # Project context for Claude Code
├── DEPLOYMENT.md                  # Deployment guide
└── README.md
```

## Cost Estimates (Using KIE.ai)

KIE.ai provides 60%+ cost savings compared to OpenAI's direct Sora API:

### Per 5-Second Video Clip:
- **Standard Sora 2**: $0.015/s × 5s = **$0.075 per clip**
- **Sora 2 Pro (1080p)**: $0.10/s × 5s = **$0.50 per clip**

### Per 15-Room Tour:
- **Standard Quality**: 15 clips × $0.075 = **$1.13 total**
- **Pro Quality (1080p)**: 15 clips × $0.50 = **$7.50 total**

### Additional Costs:
- **Storage (R2/S3):** ~$0.02 per GB stored
- **Compute (Render/Fly):** Free tier or ~$7/month

### Comparison to OpenAI Direct:
- **KIE Standard**: $1.13 per tour
- **OpenAI Direct**: ~$7.50 per tour (same quality)
- **Savings**: **85% cheaper with KIE!**

## Troubleshooting

### FFmpeg Not Found
- Ensure FFmpeg is installed and in your PATH
- Set `FFMPEG_PATH` in backend `.env` to full path

### KIE Sora API Errors
- Check your KIE.ai API key is correct in `.env`
- Verify you have credits in your KIE.ai account
- Check API status at [kie.ai](https://kie.ai)
- Ensure image URLs are publicly accessible (KIE requires HTTP/HTTPS URLs)

### Upload Failures
- Check S3/R2 credentials
- Verify bucket permissions and CORS settings
- Ensure file size under 10MB limit

### Video Generation Timeout
- Increase timeout in backend/src/services/sora.service.ts
- Sora generation typically takes 1-2 minutes per clip

## Future Enhancements

- [ ] User accounts and authentication
- [ ] Credit-based billing system
- [ ] Custom intro/outro cards with branding
- [ ] Background music selection
- [ ] Captions and room labels
- [ ] Voice-over narration support
- [ ] Progress persistence (resume failed generations)
- [ ] Batch processing for multiple properties
- [ ] Mobile app (React Native)

## License

MIT

## Support

For issues and feature requests, please create an issue on GitHub.
