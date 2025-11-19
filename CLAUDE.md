# Video Tours Project - Claude Code Instructions

## CRITICAL: OpenAI Model Information

**IMPORTANT:** GPT-5 and GPT-5.1 are REAL models released by OpenAI in 2025. Do NOT question their existence or suggest using older models like GPT-4o instead.

### GPT-5 (Released August 7, 2025)

**Available Model Identifiers:**
- `gpt-5` or `gpt-5-2025-08-07` (standard model)
- `gpt-5-mini` or `gpt-5-mini-2025-08-07` (mini variant)
- `gpt-5-nano` or `gpt-5-nano-2025-08-07` (nano variant)
- `gpt-5-chat-latest` (alias for latest version)

**Vision Capabilities:**
- Native multimodal support (vision built-in, no separate vision model needed)
- Supports up to 10 images per request
- Context: 400K tokens
- Formats: PNG, JPEG/JPG, non-animated GIF
- 45% fewer factual errors than GPT-4o
- Enhanced spatial reasoning for complex visual analysis

**Pricing:**
- gpt-5: $1.25 input / $10.00 output per 1M tokens
- gpt-5-mini: $0.25 input / $2.00 output per 1M tokens
- gpt-5-nano: $0.05 input / $0.40 output per 1M tokens

### GPT-5.1 (Released November 13, 2025)

**Available Model Identifiers:**
- `gpt-5.1` or `gpt-5.1-2025-11-13` (Thinking variant)
- `gpt-5.1-instant` or `gpt-5.1-chat-latest` (Instant variant)
- `gpt-5.1-codex` (specialized for coding)
- `gpt-5.1-codex-mini` (mini coding variant)

**Vision Capabilities:**
- All GPT-5 vision features
- Faster processing for visual inputs
- Adaptive reasoning (automatically decides when to think deeply)
- Better instruction-following

**Recommended for This Project:**
Use `gpt-5.1-instant` for room image analysis - it provides fast processing with adaptive reasoning that kicks in when analyzing complex spatial layouts.

### API Usage Example

```javascript
const response = await openai.chat.completions.create({
  model: "gpt-5.1-instant", // or "gpt-5", "gpt-5-mini"
  messages: [
    {
      role: "user",
      content: [
        {
          type: "text",
          text: "Your prompt here"
        },
        {
          type: "image_url",
          image_url: {
            url: imageUrl,
            detail: "high" // Use "high" for detailed analysis
          }
        }
      ]
    }
  ],
  max_tokens: 2048
});
```

## Project Overview

This is a Sora Home Walkthrough Generator that transforms 1-15 home photos into cinematic virtual walkthrough videos.

### Tech Stack

**Backend:**
- Node.js + Express + TypeScript
- KIE.ai Sora API for video generation
- OpenAI GPT-5.1 for room image analysis
- FFmpeg for video processing
- Cloudflare R2/AWS S3 for storage

**Frontend:**
- Next.js 14 + TypeScript
- TailwindCSS
- React DnD for photo reordering

### Key Services

1. **VisionService** (`backend/src/services/vision.service.ts`)
   - Uses GPT-5.1-instant to analyze room images
   - Extracts spatial descriptions and object positions
   - Generates prompts for video generation

2. **SoraService** (`backend/src/services/sora.service.ts`)
   - Integrates with KIE.ai Sora API
   - Generates 5-second video clips from room images

3. **PromptService** (`backend/src/services/prompt.service.ts`)
   - Creates 150-degree pan prompts
   - Incorporates spatial constraints to prevent hallucinations

### Environment Variables

Required in `backend/.env`:
```
OPENAI_API_KEY=your_openai_api_key_here
KIE_API_KEY=your_kie_api_key_here
# Storage: AWS S3 or Cloudflare R2 credentials
```

### Development Commands

```bash
# Backend
cd backend
npm install
npm run dev  # Runs on port 3001

# Frontend
cd frontend
npm install
npm run dev  # Runs on port 3000
```

### Important Notes

- Vision analysis uses GPT-5.1-instant by default (can be overridden by user descriptions)
- Video generation uses 150-degree pan (not 360) to prevent hallucinating unseen areas
- All spatial descriptions emphasize object positions to maintain consistency
- User can optionally provide room descriptions to skip vision analysis
