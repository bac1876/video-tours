# Video Tours Project - Session State
**Last Updated:** 2025-11-21

## Current Status
Working on Home Video Tours app - transforms 1-15 home photos into cinematic walkthrough videos using KIE.ai Sora API.

## Recent Session Work (2025-11-21)

### Issues Fixed Today
1. ✅ **Text Overlay Position** - Fixed box appearing at top-left instead of bottom-left
   - Root cause: FFmpeg `h` variable conflict between video height and box height parameter
   - Solution: Calculate absolute pixel positions in JavaScript using ffprobe
   - Final position: 200x55 box, 75px from bottom, solid black background

2. ✅ **Text Overlay Missing** - Font rendering issue in Docker
   - Added explicit font path: `/usr/share/fonts/ttf-dejavu/DejaVuSans.ttf`
   - All text now renders correctly with proper escaping

3. ✅ **Address Parsing** - Smart parsing to separate street from city/state/zip
   - Handles format: "123 Main ST Rogers, AR 72758"
   - Displays on separate lines in overlay

4. ✅ **Vision Model** - Fixed GPT-5 API compatibility
   - Changed from `gpt-5.1-instant` to `gpt-5-nano`
   - Updated parameter: `max_tokens` → `max_completion_tokens`

5. ✅ **Back Button** - Fixed data loss when navigating back from Reorder
   - Upload component now accepts `initialPhotos` and `initialPropertyInfo` props
   - Preserves all data when going back instead of clearing

6. ✅ **Unwanted Motion** - Reduced unrealistic fabric/wind movement
   - Added "STATIC SCENE" instructions to prevent curtains/towels from moving
   - Allows intentional motion: ceiling fans can spin (but no wind effect)

7. ✅ **Wind Effects from Fans** - Prevents towels blowing from spinning fans
   - Explicit: "only fan blades spin - no wind effect"
   - "Towels, curtains, and all fabrics remain completely still"

8. ✅ **Stuck Video Generation** - Fixed infinite retry loop
   - When KIE API returns explicit "fail" status, stop retrying immediately
   - Only retry network errors/timeouts, not explicit failures
   - Prevents 15-minute retry loop on KIE internal errors

9. ✅ **Ceiling Fan Hallucinations** - Prevents AI from adding non-existent ceiling fans
   - Explicit: "ONLY allow existing ceiling fans already visible in source image"
   - Exterior: "Do NOT add ceiling fans, light fixtures, or indoor elements to outdoor scenes"

### Outstanding Issues to Address

#### 1. Small Room Rotation Not Working (PRIORITY)
**Issue:** Bedrooms should use rotation-only camera movement, but they're still moving forward/zooming.

**What to Check:**
- Need Railway logs showing vision analysis for a bedroom video
- Look for these log lines:
  ```
  Room type: bedroom
  Small room: true/false
  Final prompt: ...
  ```

**Next Steps:**
1. Get Railway logs for bedroom video generation
2. Check if `Small room: false` for bedrooms
3. If false, GPT-5-nano vision detection isn't working - need to adjust logic
4. Possible fix: Hardcode room type keywords or improve vision prompt

**Files to Review:**
- `backend/src/services/vision.service.ts` - Room detection logic
- `backend/src/routes/generate.ts` - Where isSmallRoom is set
- `backend/src/services/prompt.service.ts` - Rotation vs movement prompts

## Recent Commits (Last 10)
```
53ecf49 - Prevent ceiling fan hallucinations
fb2ea96 - Prevent retry loop when KIE API returns explicit failure
5c4e891 - Prevent wind effects from ceiling fans
f032204 - Fix back button to preserve photos and property info
8ab6743 - Remove lighting effect and strengthen anti-hallucination constraints
ab919e7 - Allow intentional motion: ceiling fans spinning and lights brightening
91f48bf - Fix overlay position and prevent unwanted object motion in videos
653b499 - Adjust overlay: move up 10% and make box smaller
68c8428 - Final overlay fixes: smaller black box and improved address parsing
6ad1abf - Calculate box position in code instead of using FFmpeg variables
```

## Tech Stack
- **Backend:** Node.js + Express + TypeScript, Railway deployment
- **Frontend:** Next.js 14 + TypeScript, Vercel deployment
- **Video API:** KIE.ai Sora API (grok-imagine/image-to-video)
- **Vision API:** OpenAI GPT-5 Nano
- **Video Processing:** FFmpeg
- **Storage:** Cloudflare R2

## Key Files
- `backend/src/services/ffmpeg.service.ts` - Text overlay, video stitching
- `backend/src/services/prompt.service.ts` - Camera movement prompts
- `backend/src/services/vision.service.ts` - Room type detection
- `backend/src/services/grok.service.ts` - Video generation API
- `frontend/src/app/page.tsx` - Main app flow
- `frontend/src/components/Upload.tsx` - Photo upload + property info

## Environment Variables
- `OPENAI_API_KEY` - For GPT-5 Nano vision analysis
- `KIE_API_KEY` - For Sora video generation
- `NEXT_PUBLIC_API_URL` - Backend URL for frontend

## Known Behavior
- First image assumed to be exterior (uses forward movement)
- Small rooms (bedroom, bathroom) should use rotation only
- Large rooms (living, kitchen) use forward movement + panning
- Each video ~6 seconds long
- Text overlay shows for first 3 seconds
- Backend timeout: 5 minutes per video (8 minutes planned)
- Frontend timeout: 10 minutes

## User Preferences
- Likes ceiling fans spinning (shows it's a video, not static photo)
- No wind effects, no curtain movement, no unrealistic motion
- Clean, professional real estate feel
- Text overlay: compact, bottom-left, non-intrusive

## Deployment
- **Backend:** Railway (auto-deploy from GitHub main branch)
- **Frontend:** Likely Vercel (auto-deploy from GitHub)
- GitHub repo: `bac1876/video-tours`

## Next Session - Start Here
1. **FIRST:** Ask user for Railway logs showing bedroom video generation
   - Need to see if small room detection is working
   - Look for `Small room: true/false` in logs
2. **IF small room detection broken:** Fix vision service room classification
3. **Test:** Generate videos with bedrooms and verify rotation-only movement
4. **Monitor:** Check for any new hallucination issues (ceiling fans, curtains, etc.)
