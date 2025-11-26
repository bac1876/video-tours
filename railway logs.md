2025-11-25T20:23:59.000000000Z [inf]  Starting Container
2025-11-25T20:24:00.351830181Z [inf]  
2025-11-25T20:24:00.351835429Z [inf]  > sora-walkthrough-backend@1.0.0 start
2025-11-25T20:24:00.351840208Z [inf]  > node dist/index.js
2025-11-25T20:24:00.351847876Z [inf]  
2025-11-25T20:24:00.759335365Z [inf]  Uploads directory is writable: /app/uploads
2025-11-25T20:24:01.323676117Z [inf]  Video generation worker started.
2025-11-25T20:24:01.323679916Z [inf]  
2025-11-25T20:24:01.323687790Z [inf]  ╔═══════════════════════════════════════════════════════════╗
2025-11-25T20:24:01.323691405Z [inf]  ║                                                           ║
2025-11-25T20:24:01.323694903Z [inf]  ║   Home Video Tours API v1.2.1                            ║
2025-11-25T20:24:01.323698770Z [inf]  ║                                                           ║
2025-11-25T20:24:01.323706031Z [inf]  ║   Server running on: http://localhost:3001              ║
2025-11-25T20:24:01.323711641Z [inf]  ║   Environment: production                                   ║
2025-11-25T20:24:01.323717444Z [inf]  ║                                                           ║
2025-11-25T20:24:01.323723246Z [inf]  ║   Endpoints:                                             ║
2025-11-25T20:24:01.323729458Z [inf]  ║   - POST /api/upload                                     ║
2025-11-25T20:24:01.323737065Z [inf]  ║   - POST /api/generate/room-video                        ║
2025-11-25T20:24:01.323742259Z [inf]  ║   - POST /api/generate/full-tour                         ║
2025-11-25T20:24:01.323747530Z [inf]  ║                                                           ║
2025-11-25T20:24:01.323755042Z [inf]  ╚═══════════════════════════════════════════════════════════╝
2025-11-25T20:24:01.323763166Z [inf]    
2025-11-25T20:25:41.577738346Z [inf]  Uploading 11 photos to storage...
2025-11-25T20:25:42.538641240Z [inf]  Successfully uploaded 11 photos
2025-11-25T20:26:12.592386877Z [inf]  Generating video for room 0...
2025-11-25T20:26:12.592392891Z [inf]  Image URL: https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/photos/01231dd0-cca6-40e1-bf5b-14d3d6b2b42a.png
2025-11-25T20:26:12.592398650Z [inf]  Analyzing image with GPT Vision...
2025-11-25T20:26:12.592404144Z [inf]  Analyzing room image with GPT-5 Nano...
2025-11-25T20:26:12.592409728Z [inf]  Image URL: https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/photos/01231dd0-cca6-40e1-bf5b-14d3d6b2b42a.png
2025-11-25T20:26:21.375889557Z [inf]  Vision analysis complete:
2025-11-25T20:26:21.375896533Z [inf]  
2025-11-25T20:26:21.375903166Z [inf]  Room type: room, Exterior: true, Small room: false
2025-11-25T20:26:21.375909125Z [inf]  Vision-enhanced description: This is a room. Keep all these objects in their exact positions throughout the video. 
2025-11-25T20:26:21.375915438Z [inf]  Final prompt: This scene contains: This is a room. Keep all these objects in their exact positions throughout the video. . Keep all these elements in their exact positions. EXTERIOR SHOT - This is an OUTDOOR scene. Very gentle, subtle camera movement showcasing the exterior of the building. Camera can drift forward slightly, but maintain distance from the house. Slow, steady shot taking the full 6 seconds. CRITICAL: Maintain CONSTANT speed throughout - no speeding up or slowing down. CRITICAL: Do NOT zoom into windows or glass surfaces. Do NOT reveal or create interior details visible through windows. Trees, plants, grass, and foliage remain still - no wind effect. ABSOLUTE PROHIBITION - DO NOT ADD: ceiling fans, indoor light fixtures, chandeliers, pendant lights, indoor furniture, curtains, drapes, window treatments, or ANY indoor elements. This is OUTSIDE - there are NO ceiling fans outdoors. There are NO indoor fixtures outdoors. If you see sky, grass, trees, or building exterior - this is OUTDOOR and must have ZERO indoor elements. STRICT RULES - DO NOT VIOLATE: 1. NEVER add ceiling fans that are not already in the source image. 2. NEVER add curtains, drapes, or window treatments that are not in the source image. 3. NEVER add windows or doors that are not in the source image. 4. NEVER add furniture, fixtures, or decorations not in the source image. 5. NEVER add light fixtures, chandeliers, or pendant lights not in the source image. 6. If a ceiling fan EXISTS in the source image, it may spin slowly. Otherwise NO ceiling fans. 7. All curtains, towels, and fabrics must remain COMPLETELY STILL - no movement, no wind. 8. Stop motion BEFORE revealing any area not visible in the source image. 9. Preserve EXACT positions of all objects from the source image. OUTPUT ONLY what exists in the input image - add NOTHING new.
2025-11-25T20:26:21.377686705Z [inf]  Generating video (attempt 1/3)
2025-11-25T20:26:21.377717463Z [inf]  Image URL: https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/photos/01231dd0-cca6-40e1-bf5b-14d3d6b2b42a.png
2025-11-25T20:26:21.377723159Z [inf]  Prompt: This scene contains: This is a room. Keep all these objects in their exact positions throughout the video. . Keep all these elements in their exact positions. EXTERIOR SHOT - This is an OUTDOOR scene. Very gentle, subtle camera movement showcasing the exterior of the building. Camera can drift forward slightly, but maintain distance from the house. Slow, steady shot taking the full 6 seconds. CRITICAL: Maintain CONSTANT speed throughout - no speeding up or slowing down. CRITICAL: Do NOT zoom into windows or glass surfaces. Do NOT reveal or create interior details visible through windows. Trees, plants, grass, and foliage remain still - no wind effect. ABSOLUTE PROHIBITION - DO NOT ADD: ceiling fans, indoor light fixtures, chandeliers, pendant lights, indoor furniture, curtains, drapes, window treatments, or ANY indoor elements. This is OUTSIDE - there are NO ceiling fans outdoors. There are NO indoor fixtures outdoors. If you see sky, grass, trees, or building exterior - this is OUTDOOR and must have ZERO indoor elements. STRICT RULES - DO NOT VIOLATE: 1. NEVER add ceiling fans that are not already in the source image. 2. NEVER add curtains, drapes, or window treatments that are not in the source image. 3. NEVER add windows or doors that are not in the source image. 4. NEVER add furniture, fixtures, or decorations not in the source image. 5. NEVER add light fixtures, chandeliers, or pendant lights not in the source image. 6. If a ceiling fan EXISTS in the source image, it may spin slowly. Otherwise NO ceiling fans. 7. All curtains, towels, and fabrics must remain COMPLETELY STILL - no movement, no wind. 8. Stop motion BEFORE revealing any area not visible in the source image. 9. Preserve EXACT positions of all objects from the source image. OUTPUT ONLY what exists in the input image - add NOTHING new.
2025-11-25T20:26:21.711394291Z [inf]  === VIDEO API REQUEST ===
2025-11-25T20:26:21.711400575Z [inf]  Endpoint: https://api.kie.ai/api/v1/jobs/createTask
2025-11-25T20:26:21.711407015Z [inf]  Payload: {
2025-11-25T20:26:21.711412527Z [inf]    "model": "grok-imagine/image-to-video",
2025-11-25T20:26:21.711416794Z [inf]    "input": {
2025-11-25T20:26:21.711421599Z [inf]      "prompt": "This scene contains: This is a room. Keep all these objects in their exact positions throughout the video. . Keep all these elements in their exact positions. EXTERIOR SHOT - This is an OUTDOOR scene. Very gentle, subtle camera movement showcasing the exterior of the building. Camera can drift forward slightly, but maintain distance from the house. Slow, steady shot taking the full 6 seconds. CRITICAL: Maintain CONSTANT speed throughout - no speeding up or slowing down. CRITICAL: Do NOT zoom into windows or glass surfaces. Do NOT reveal or create interior details visible through windows. Trees, plants, grass, and foliage remain still - no wind effect. ABSOLUTE PROHIBITION - DO NOT ADD: ceiling fans, indoor light fixtures, chandeliers, pendant lights, indoor furniture, curtains, drapes, window treatments, or ANY indoor elements. This is OUTSIDE - there are NO ceiling fans outdoors. There are NO indoor fixtures outdoors. If you see sky, grass, trees, or building exterior - this is OUTDOOR and must have ZERO indoor elements. STRICT RULES - DO NOT VIOLATE: 1. NEVER add ceiling fans that are not already in the source image. 2. NEVER add curtains, drapes, or window treatments that are not in the source image. 3. NEVER add windows or doors that are not in the source image. 4. NEVER add furniture, fixtures, or decorations not in the source image. 5. NEVER add light fixtures, chandeliers, or pendant lights not in the source image. 6. If a ceiling fan EXISTS in the source image, it may spin slowly. Otherwise NO ceiling fans. 7. All curtains, towels, and fabrics must remain COMPLETELY STILL - no movement, no wind. 8. Stop motion BEFORE revealing any area not visible in the source image. 9. Preserve EXACT positions of all objects from the source image. OUTPUT ONLY what exists in the input image - add NOTHING new.",
2025-11-25T20:26:21.712645417Z [inf]    "msg": "success",
2025-11-25T20:26:21.712654961Z [inf]    "data": {
2025-11-25T20:26:21.712661382Z [inf]      "taskId": "9cebe9f4732d56bfc0711a31df47b99e",
2025-11-25T20:26:21.712667792Z [inf]      "recordId": "9cebe9f4732d56bfc0711a31df47b99e"
2025-11-25T20:26:21.712673696Z [inf]    }
2025-11-25T20:26:21.712679734Z [inf]  }
2025-11-25T20:26:21.712685367Z [inf]  Task created with ID: 9cebe9f4732d56bfc0711a31df47b99e
2025-11-25T20:26:21.712690801Z [inf]  Task 9cebe9f4732d56bfc0711a31df47b99e status: waiting
2025-11-25T20:26:21.712696344Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:26:21.713013316Z [inf]      "image_urls": [
2025-11-25T20:26:21.713017117Z [inf]        "https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/photos/01231dd0-cca6-40e1-bf5b-14d3d6b2b42a.png"
2025-11-25T20:26:21.713021375Z [inf]      ],
2025-11-25T20:26:21.713025074Z [inf]      "mode": "normal"
2025-11-25T20:26:21.713028846Z [inf]    }
2025-11-25T20:26:21.713034213Z [inf]  }
2025-11-25T20:26:21.713039415Z [inf]  === VIDEO API RESPONSE ===
2025-11-25T20:26:21.713044440Z [inf]  Status: 200
2025-11-25T20:26:21.713049447Z [inf]  Data: {
2025-11-25T20:26:21.713055432Z [inf]    "code": 200,
2025-11-25T20:26:31.683979543Z [inf]  Task 9cebe9f4732d56bfc0711a31df47b99e status: waiting
2025-11-25T20:26:31.683988477Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:26:51.719783915Z [inf]  Task 9cebe9f4732d56bfc0711a31df47b99e status: waiting
2025-11-25T20:26:51.719790925Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:26:51.747013608Z [inf]  Task 9cebe9f4732d56bfc0711a31df47b99e status: waiting
2025-11-25T20:26:51.747040330Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:27:11.462404878Z [inf]  Task 9cebe9f4732d56bfc0711a31df47b99e status: waiting
2025-11-25T20:27:11.462411337Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:27:11.808814104Z [inf]  Task 9cebe9f4732d56bfc0711a31df47b99e status: waiting
2025-11-25T20:27:11.808819777Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:27:31.815802890Z [inf]  Task 9cebe9f4732d56bfc0711a31df47b99e status: waiting
2025-11-25T20:27:31.815807645Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:27:31.870738446Z [inf]  Task 9cebe9f4732d56bfc0711a31df47b99e status: success
2025-11-25T20:27:31.870747437Z [inf]  Video generated successfully: https://tempfile.aiquickdraw.com/r/users/d1859a8a-621c-40ff-bcf1-0b0c6c0d0faf/generated/78c9b7f1-49c9-4b75-b26c-a1ef46b76f06/generated_video.mp4
2025-11-25T20:27:31.870753730Z [inf]  Downloading video from: https://tempfile.aiquickdraw.com/r/users/d1859a8a-621c-40ff-bcf1-0b0c6c0d0faf/generated/78c9b7f1-49c9-4b75-b26c-a1ef46b76f06/generated_video.mp4
2025-11-25T20:27:32.166946968Z [inf]  Video downloaded successfully to: /app/uploads/room-e588341c-28c2-4ec6-921d-20cf4e883bf9.mp4
2025-11-25T20:27:33.299131854Z [inf]  Cleaned up: /app/uploads/room-e588341c-28c2-4ec6-921d-20cf4e883bf9.mp4
2025-11-25T20:27:33.299138160Z [inf]  Successfully generated video for room 0
2025-11-25T20:27:33.409509361Z [inf]  Generating video for room 1...
2025-11-25T20:27:33.409518525Z [inf]  Image URL: https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/photos/c42d2f6b-bca5-468f-ba5f-2f028640d066.png
2025-11-25T20:27:33.409524902Z [inf]  Analyzing image with GPT Vision...
2025-11-25T20:27:33.409530579Z [inf]  Analyzing room image with GPT-5 Nano...
2025-11-25T20:27:33.409536591Z [inf]  Image URL: https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/photos/c42d2f6b-bca5-468f-ba5f-2f028640d066.png
2025-11-25T20:27:43.350083818Z [inf]  Vision analysis complete:
2025-11-25T20:27:43.350087745Z [inf]  
2025-11-25T20:27:43.351945939Z [inf]  Prompt: This scene contains: This is a room. Keep all these objects in their exact positions throughout the video. . Keep all these elements in their exact positions. INTERIOR ROOM - Smooth, constant-speed camera movement through the space. Camera can gently move forward or pan across the room to showcase the space. CRITICAL: Maintain CONSTANT speed throughout - no speeding up, no slowing down, no acceleration. Slow, cinematic movement taking the full 6 seconds. Professional real estate walkthrough feel. STRICT RULES - DO NOT VIOLATE: 1. NEVER add ceiling fans that are not already in the source image. 2. NEVER add curtains, drapes, or window treatments that are not in the source image. 3. NEVER add windows or doors that are not in the source image. 4. NEVER add furniture, fixtures, or decorations not in the source image. 5. NEVER add light fixtures, chandeliers, or pendant lights not in the source image. 6. If a ceiling fan EXISTS in the source image, it may spin slowly. Otherwise NO ceiling fans. 7. All curtains, towels, and fabrics must remain COMPLETELY STILL - no movement, no wind. 8. Stop motion BEFORE revealing any area not visible in the source image. 9. Preserve EXACT positions of all objects from the source image. OUTPUT ONLY what exists in the input image - add NOTHING new.
2025-11-25T20:27:43.351949512Z [inf]  Room type: room, Exterior: false, Small room: false
2025-11-25T20:27:43.351958402Z [inf]  Vision-enhanced description: This is a room. Keep all these objects in their exact positions throughout the video. 
2025-11-25T20:27:43.351965385Z [inf]  Final prompt: This scene contains: This is a room. Keep all these objects in their exact positions throughout the video. . Keep all these elements in their exact positions. INTERIOR ROOM - Smooth, constant-speed camera movement through the space. Camera can gently move forward or pan across the room to showcase the space. CRITICAL: Maintain CONSTANT speed throughout - no speeding up, no slowing down, no acceleration. Slow, cinematic movement taking the full 6 seconds. Professional real estate walkthrough feel. STRICT RULES - DO NOT VIOLATE: 1. NEVER add ceiling fans that are not already in the source image. 2. NEVER add curtains, drapes, or window treatments that are not in the source image. 3. NEVER add windows or doors that are not in the source image. 4. NEVER add furniture, fixtures, or decorations not in the source image. 5. NEVER add light fixtures, chandeliers, or pendant lights not in the source image. 6. If a ceiling fan EXISTS in the source image, it may spin slowly. Otherwise NO ceiling fans. 7. All curtains, towels, and fabrics must remain COMPLETELY STILL - no movement, no wind. 8. Stop motion BEFORE revealing any area not visible in the source image. 9. Preserve EXACT positions of all objects from the source image. OUTPUT ONLY what exists in the input image - add NOTHING new.
2025-11-25T20:27:43.351970471Z [inf]  Generating video (attempt 1/3)
2025-11-25T20:27:43.351975047Z [inf]  Image URL: https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/photos/c42d2f6b-bca5-468f-ba5f-2f028640d066.png
2025-11-25T20:27:43.353158263Z [inf]  === VIDEO API REQUEST ===
2025-11-25T20:27:43.353166696Z [inf]  Endpoint: https://api.kie.ai/api/v1/jobs/createTask
2025-11-25T20:27:43.353172880Z [inf]  Payload: {
2025-11-25T20:27:43.353178894Z [inf]    "model": "grok-imagine/image-to-video",
2025-11-25T20:27:43.353184166Z [inf]    "input": {
2025-11-25T20:27:43.353191168Z [inf]      "prompt": "This scene contains: This is a room. Keep all these objects in their exact positions throughout the video. . Keep all these elements in their exact positions. INTERIOR ROOM - Smooth, constant-speed camera movement through the space. Camera can gently move forward or pan across the room to showcase the space. CRITICAL: Maintain CONSTANT speed throughout - no speeding up, no slowing down, no acceleration. Slow, cinematic movement taking the full 6 seconds. Professional real estate walkthrough feel. STRICT RULES - DO NOT VIOLATE: 1. NEVER add ceiling fans that are not already in the source image. 2. NEVER add curtains, drapes, or window treatments that are not in the source image. 3. NEVER add windows or doors that are not in the source image. 4. NEVER add furniture, fixtures, or decorations not in the source image. 5. NEVER add light fixtures, chandeliers, or pendant lights not in the source image. 6. If a ceiling fan EXISTS in the source image, it may spin slowly. Otherwise NO ceiling fans. 7. All curtains, towels, and fabrics must remain COMPLETELY STILL - no movement, no wind. 8. Stop motion BEFORE revealing any area not visible in the source image. 9. Preserve EXACT positions of all objects from the source image. OUTPUT ONLY what exists in the input image - add NOTHING new.",
2025-11-25T20:27:43.353199926Z [inf]      "image_urls": [
2025-11-25T20:27:43.353206478Z [inf]        "https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/photos/c42d2f6b-bca5-468f-ba5f-2f028640d066.png"
2025-11-25T20:27:43.353211766Z [inf]      ],
2025-11-25T20:27:43.353215990Z [inf]      "mode": "normal"
2025-11-25T20:27:43.355230028Z [inf]    }
2025-11-25T20:27:43.355241097Z [inf]  }
2025-11-25T20:27:43.561841890Z [inf]  === VIDEO API RESPONSE ===
2025-11-25T20:27:43.561852093Z [inf]  Status: 200
2025-11-25T20:27:43.561861351Z [inf]  Data: {
2025-11-25T20:27:43.561871031Z [inf]    "code": 200,
2025-11-25T20:27:43.561877100Z [inf]    "msg": "success",
2025-11-25T20:27:43.561883070Z [inf]    "data": {
2025-11-25T20:27:43.561888898Z [inf]      "taskId": "38cede19589a6243481599790c20a370",
2025-11-25T20:27:43.561895607Z [inf]      "recordId": "38cede19589a6243481599790c20a370"
2025-11-25T20:27:43.561901556Z [inf]    }
2025-11-25T20:27:43.561907667Z [inf]  }
2025-11-25T20:27:43.561913337Z [inf]  Task created with ID: 38cede19589a6243481599790c20a370
2025-11-25T20:27:43.878821506Z [inf]  Task 38cede19589a6243481599790c20a370 status: waiting
2025-11-25T20:27:43.878827043Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:27:53.860795653Z [inf]  Task 38cede19589a6243481599790c20a370 status: waiting
2025-11-25T20:27:53.860803231Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:28:13.610499804Z [inf]  Task 38cede19589a6243481599790c20a370 status: waiting
2025-11-25T20:28:13.610504196Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:28:13.903135040Z [inf]  Task 38cede19589a6243481599790c20a370 status: success
2025-11-25T20:28:13.903139557Z [inf]  Video generated successfully: https://tempfile.aiquickdraw.com/r/users/a3c28116-1f6a-4265-bf4e-958a19aeb392/generated/62b4f1d9-fabc-42e5-bc21-8145867522af/generated_video.mp4
2025-11-25T20:28:13.903144030Z [inf]  Downloading video from: https://tempfile.aiquickdraw.com/r/users/a3c28116-1f6a-4265-bf4e-958a19aeb392/generated/62b4f1d9-fabc-42e5-bc21-8145867522af/generated_video.mp4
2025-11-25T20:28:13.912008567Z [inf]  Video downloaded successfully to: /app/uploads/room-61ea2949-f3db-4ee4-9e7a-5218ec54bc81.mp4
2025-11-25T20:28:14.565540838Z [inf]  Cleaned up: /app/uploads/room-61ea2949-f3db-4ee4-9e7a-5218ec54bc81.mp4
2025-11-25T20:28:14.565546499Z [inf]  Successfully generated video for room 1
2025-11-25T20:28:14.900165259Z [inf]  Generating video for room 2...
2025-11-25T20:28:14.900170083Z [inf]  Image URL: https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/photos/357d6086-bfdf-456f-be91-60fd31d32701.png
2025-11-25T20:28:14.900175494Z [inf]  Analyzing image with GPT Vision...
2025-11-25T20:28:14.900180385Z [inf]  Analyzing room image with GPT-5 Nano...
2025-11-25T20:28:14.900206382Z [inf]  Image URL: https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/photos/357d6086-bfdf-456f-be91-60fd31d32701.png
2025-11-25T20:28:21.908124275Z [inf]  Vision analysis complete:
2025-11-25T20:28:21.908133785Z [inf]  Final prompt: This scene contains: This is a room. Keep all these objects in their exact positions throughout the video. . Keep all these elements in their exact positions. INTERIOR ROOM - Smooth, constant-speed camera movement through the space. Camera can gently move forward or pan across the room to showcase the space. CRITICAL: Maintain CONSTANT speed throughout - no speeding up, no slowing down, no acceleration. Slow, cinematic movement taking the full 6 seconds. Professional real estate walkthrough feel. STRICT RULES - DO NOT VIOLATE: 1. NEVER add ceiling fans that are not already in the source image. 2. NEVER add curtains, drapes, or window treatments that are not in the source image. 3. NEVER add windows or doors that are not in the source image. 4. NEVER add furniture, fixtures, or decorations not in the source image. 5. NEVER add light fixtures, chandeliers, or pendant lights not in the source image. 6. If a ceiling fan EXISTS in the source image, it may spin slowly. Otherwise NO ceiling fans. 7. All curtains, towels, and fabrics must remain COMPLETELY STILL - no movement, no wind. 8. Stop motion BEFORE revealing any area not visible in the source image. 9. Preserve EXACT positions of all objects from the source image. OUTPUT ONLY what exists in the input image - add NOTHING new.
2025-11-25T20:28:21.908135946Z [inf]  
2025-11-25T20:28:21.908143183Z [inf]  Generating video (attempt 1/3)
2025-11-25T20:28:21.908146959Z [inf]  Room type: room, Exterior: false, Small room: false
2025-11-25T20:28:21.908154133Z [inf]  Vision-enhanced description: This is a room. Keep all these objects in their exact positions throughout the video. 
2025-11-25T20:28:21.908164908Z [inf]  Image URL: https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/photos/357d6086-bfdf-456f-be91-60fd31d32701.png
2025-11-25T20:28:21.908171753Z [inf]  Prompt: This scene contains: This is a room. Keep all these objects in their exact positions throughout the video. . Keep all these elements in their exact positions. INTERIOR ROOM - Smooth, constant-speed camera movement through the space. Camera can gently move forward or pan across the room to showcase the space. CRITICAL: Maintain CONSTANT speed throughout - no speeding up, no slowing down, no acceleration. Slow, cinematic movement taking the full 6 seconds. Professional real estate walkthrough feel. STRICT RULES - DO NOT VIOLATE: 1. NEVER add ceiling fans that are not already in the source image. 2. NEVER add curtains, drapes, or window treatments that are not in the source image. 3. NEVER add windows or doors that are not in the source image. 4. NEVER add furniture, fixtures, or decorations not in the source image. 5. NEVER add light fixtures, chandeliers, or pendant lights not in the source image. 6. If a ceiling fan EXISTS in the source image, it may spin slowly. Otherwise NO ceiling fans. 7. All curtains, towels, and fabrics must remain COMPLETELY STILL - no movement, no wind. 8. Stop motion BEFORE revealing any area not visible in the source image. 9. Preserve EXACT positions of all objects from the source image. OUTPUT ONLY what exists in the input image - add NOTHING new.
2025-11-25T20:28:21.909205411Z [inf]  === VIDEO API REQUEST ===
2025-11-25T20:28:21.909210005Z [inf]  Endpoint: https://api.kie.ai/api/v1/jobs/createTask
2025-11-25T20:28:21.909214176Z [inf]  Payload: {
2025-11-25T20:28:21.909218927Z [inf]    "model": "grok-imagine/image-to-video",
2025-11-25T20:28:21.909223983Z [inf]    "input": {
2025-11-25T20:28:21.909231640Z [inf]      "prompt": "This scene contains: This is a room. Keep all these objects in their exact positions throughout the video. . Keep all these elements in their exact positions. INTERIOR ROOM - Smooth, constant-speed camera movement through the space. Camera can gently move forward or pan across the room to showcase the space. CRITICAL: Maintain CONSTANT speed throughout - no speeding up, no slowing down, no acceleration. Slow, cinematic movement taking the full 6 seconds. Professional real estate walkthrough feel. STRICT RULES - DO NOT VIOLATE: 1. NEVER add ceiling fans that are not already in the source image. 2. NEVER add curtains, drapes, or window treatments that are not in the source image. 3. NEVER add windows or doors that are not in the source image. 4. NEVER add furniture, fixtures, or decorations not in the source image. 5. NEVER add light fixtures, chandeliers, or pendant lights not in the source image. 6. If a ceiling fan EXISTS in the source image, it may spin slowly. Otherwise NO ceiling fans. 7. All curtains, towels, and fabrics must remain COMPLETELY STILL - no movement, no wind. 8. Stop motion BEFORE revealing any area not visible in the source image. 9. Preserve EXACT positions of all objects from the source image. OUTPUT ONLY what exists in the input image - add NOTHING new.",
2025-11-25T20:28:21.909237092Z [inf]      "image_urls": [
2025-11-25T20:28:21.909241910Z [inf]        "https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/photos/357d6086-bfdf-456f-be91-60fd31d32701.png"
2025-11-25T20:28:21.909246768Z [inf]      ],
2025-11-25T20:28:21.909264418Z [inf]      "mode": "normal"
2025-11-25T20:28:21.910290899Z [inf]    }
2025-11-25T20:28:21.910297693Z [inf]  }
2025-11-25T20:28:22.007545904Z [inf]      "recordId": "4e40ac76e94b208f6a98a3eaf45adfbe"
2025-11-25T20:28:22.007555247Z [inf]    }
2025-11-25T20:28:22.007561616Z [inf]  }
2025-11-25T20:28:22.007562436Z [inf]  === VIDEO API RESPONSE ===
2025-11-25T20:28:22.007570422Z [inf]  Status: 200
2025-11-25T20:28:22.007570677Z [inf]  Task created with ID: 4e40ac76e94b208f6a98a3eaf45adfbe
2025-11-25T20:28:22.007576566Z [inf]  Data: {
2025-11-25T20:28:22.007580810Z [inf]    "code": 200,
2025-11-25T20:28:22.007585139Z [inf]    "msg": "success",
2025-11-25T20:28:22.007588871Z [inf]    "data": {
2025-11-25T20:28:22.007597279Z [inf]      "taskId": "4e40ac76e94b208f6a98a3eaf45adfbe",
2025-11-25T20:28:22.038223498Z [inf]  Task 4e40ac76e94b208f6a98a3eaf45adfbe status: waiting
2025-11-25T20:28:22.038233509Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:28:42.033153767Z [inf]  Task 4e40ac76e94b208f6a98a3eaf45adfbe status: waiting
2025-11-25T20:28:42.033159010Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:28:42.101326887Z [inf]  Task 4e40ac76e94b208f6a98a3eaf45adfbe status: waiting
2025-11-25T20:28:42.101332821Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:29:02.103034076Z [inf]  Task 4e40ac76e94b208f6a98a3eaf45adfbe status: waiting
2025-11-25T20:29:02.103040913Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:29:02.163508738Z [inf]  Task 4e40ac76e94b208f6a98a3eaf45adfbe status: success
2025-11-25T20:29:02.163517617Z [inf]  Video generated successfully: https://tempfile.aiquickdraw.com/r/users/e4930778-7f88-4bf7-9d28-fdd348b7786c/generated/4edd320f-f03d-43fc-8d3f-2cadc4c9f867/generated_video.mp4
2025-11-25T20:29:02.163523842Z [inf]  Downloading video from: https://tempfile.aiquickdraw.com/r/users/e4930778-7f88-4bf7-9d28-fdd348b7786c/generated/4edd320f-f03d-43fc-8d3f-2cadc4c9f867/generated_video.mp4
2025-11-25T20:29:02.380624793Z [inf]  Video downloaded successfully to: /app/uploads/room-74024f2f-a7a0-453f-baad-89d4522f3de8.mp4
2025-11-25T20:29:03.093784087Z [inf]  Cleaned up: /app/uploads/room-74024f2f-a7a0-453f-baad-89d4522f3de8.mp4
2025-11-25T20:29:03.093789876Z [inf]  Successfully generated video for room 2
2025-11-25T20:29:03.190430068Z [inf]  Generating video for room 3...
2025-11-25T20:29:03.190437636Z [inf]  Image URL: https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/photos/471b9f8b-ffd6-435b-8fcc-00467d454c90.png
2025-11-25T20:29:03.190443628Z [inf]  Analyzing image with GPT Vision...
2025-11-25T20:29:03.190449352Z [inf]  Analyzing room image with GPT-5 Nano...
2025-11-25T20:29:03.190457390Z [inf]  Image URL: https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/photos/471b9f8b-ffd6-435b-8fcc-00467d454c90.png
2025-11-25T20:29:23.190092505Z [inf]  Vision analysis complete:
2025-11-25T20:29:23.190098174Z [inf]  
2025-11-25T20:29:23.190104067Z [inf]  Room type: room, Exterior: false, Small room: false
2025-11-25T20:29:23.190110097Z [inf]  Vision-enhanced description: This is a room. Keep all these objects in their exact positions throughout the video. 
2025-11-25T20:29:23.190116593Z [inf]  Final prompt: This scene contains: This is a room. Keep all these objects in their exact positions throughout the video. . Keep all these elements in their exact positions. INTERIOR ROOM - Smooth, constant-speed camera movement through the space. Camera can gently move forward or pan across the room to showcase the space. CRITICAL: Maintain CONSTANT speed throughout - no speeding up, no slowing down, no acceleration. Slow, cinematic movement taking the full 6 seconds. Professional real estate walkthrough feel. STRICT RULES - DO NOT VIOLATE: 1. NEVER add ceiling fans that are not already in the source image. 2. NEVER add curtains, drapes, or window treatments that are not in the source image. 3. NEVER add windows or doors that are not in the source image. 4. NEVER add furniture, fixtures, or decorations not in the source image. 5. NEVER add light fixtures, chandeliers, or pendant lights not in the source image. 6. If a ceiling fan EXISTS in the source image, it may spin slowly. Otherwise NO ceiling fans. 7. All curtains, towels, and fabrics must remain COMPLETELY STILL - no movement, no wind. 8. Stop motion BEFORE revealing any area not visible in the source image. 9. Preserve EXACT positions of all objects from the source image. OUTPUT ONLY what exists in the input image - add NOTHING new.
2025-11-25T20:29:23.190123363Z [inf]  Generating video (attempt 1/3)
2025-11-25T20:29:23.190129562Z [inf]  Image URL: https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/photos/471b9f8b-ffd6-435b-8fcc-00467d454c90.png
2025-11-25T20:29:23.190135553Z [inf]  Prompt: This scene contains: This is a room. Keep all these objects in their exact positions throughout the video. . Keep all these elements in their exact positions. INTERIOR ROOM - Smooth, constant-speed camera movement through the space. Camera can gently move forward or pan across the room to showcase the space. CRITICAL: Maintain CONSTANT speed throughout - no speeding up, no slowing down, no acceleration. Slow, cinematic movement taking the full 6 seconds. Professional real estate walkthrough feel. STRICT RULES - DO NOT VIOLATE: 1. NEVER add ceiling fans that are not already in the source image. 2. NEVER add curtains, drapes, or window treatments that are not in the source image. 3. NEVER add windows or doors that are not in the source image. 4. NEVER add furniture, fixtures, or decorations not in the source image. 5. NEVER add light fixtures, chandeliers, or pendant lights not in the source image. 6. If a ceiling fan EXISTS in the source image, it may spin slowly. Otherwise NO ceiling fans. 7. All curtains, towels, and fabrics must remain COMPLETELY STILL - no movement, no wind. 8. Stop motion BEFORE revealing any area not visible in the source image. 9. Preserve EXACT positions of all objects from the source image. OUTPUT ONLY what exists in the input image - add NOTHING new.
2025-11-25T20:29:23.192357533Z [inf]      "mode": "normal"
2025-11-25T20:29:23.192360365Z [inf]  Endpoint: https://api.kie.ai/api/v1/jobs/createTask
2025-11-25T20:29:23.192361758Z [inf]      "image_urls": [
2025-11-25T20:29:23.192371320Z [inf]        "https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/photos/471b9f8b-ffd6-435b-8fcc-00467d454c90.png"
2025-11-25T20:29:23.192372660Z [inf]  Payload: {
2025-11-25T20:29:23.192379009Z [inf]    "input": {
2025-11-25T20:29:23.192379567Z [inf]      ],
2025-11-25T20:29:23.192383931Z [inf]    "model": "grok-imagine/image-to-video",
2025-11-25T20:29:23.192385539Z [inf]  === VIDEO API REQUEST ===
2025-11-25T20:29:23.192389178Z [inf]      "prompt": "This scene contains: This is a room. Keep all these objects in their exact positions throughout the video. . Keep all these elements in their exact positions. INTERIOR ROOM - Smooth, constant-speed camera movement through the space. Camera can gently move forward or pan across the room to showcase the space. CRITICAL: Maintain CONSTANT speed throughout - no speeding up, no slowing down, no acceleration. Slow, cinematic movement taking the full 6 seconds. Professional real estate walkthrough feel. STRICT RULES - DO NOT VIOLATE: 1. NEVER add ceiling fans that are not already in the source image. 2. NEVER add curtains, drapes, or window treatments that are not in the source image. 3. NEVER add windows or doors that are not in the source image. 4. NEVER add furniture, fixtures, or decorations not in the source image. 5. NEVER add light fixtures, chandeliers, or pendant lights not in the source image. 6. If a ceiling fan EXISTS in the source image, it may spin slowly. Otherwise NO ceiling fans. 7. All curtains, towels, and fabrics must remain COMPLETELY STILL - no movement, no wind. 8. Stop motion BEFORE revealing any area not visible in the source image. 9. Preserve EXACT positions of all objects from the source image. OUTPUT ONLY what exists in the input image - add NOTHING new.",
2025-11-25T20:29:23.194710075Z [inf]    }
2025-11-25T20:29:23.194714593Z [inf]  }
2025-11-25T20:29:23.194718599Z [inf]  === VIDEO API RESPONSE ===
2025-11-25T20:29:23.194722346Z [inf]  Status: 200
2025-11-25T20:29:23.194726250Z [inf]  Data: {
2025-11-25T20:29:23.194730280Z [inf]    "code": 200,
2025-11-25T20:29:23.194734864Z [inf]    "msg": "success",
2025-11-25T20:29:23.194740131Z [inf]    "data": {
2025-11-25T20:29:23.194744322Z [inf]      "taskId": "792bdac772113c32a6145e790f84a0aa",
2025-11-25T20:29:23.194748893Z [inf]      "recordId": "792bdac772113c32a6145e790f84a0aa"
2025-11-25T20:29:23.194753890Z [inf]    }
2025-11-25T20:29:23.194760906Z [inf]  }
2025-11-25T20:29:23.194766341Z [inf]  Task created with ID: 792bdac772113c32a6145e790f84a0aa
2025-11-25T20:29:23.194771922Z [inf]  Task 792bdac772113c32a6145e790f84a0aa status: waiting
2025-11-25T20:29:23.194777045Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:29:24.324717025Z [inf]  Task 792bdac772113c32a6145e790f84a0aa status: waiting
2025-11-25T20:29:24.324732523Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:29:44.325450242Z [inf]  Task 792bdac772113c32a6145e790f84a0aa status: waiting
2025-11-25T20:29:44.325455063Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:29:44.368311655Z [inf]  Task 792bdac772113c32a6145e790f84a0aa status: fail
2025-11-25T20:29:44.368317051Z [err]  Error polling for video: Video API error: Video generation failed: Internal Error: 
2025-11-25T20:30:04.367355741Z [inf]  Task 792bdac772113c32a6145e790f84a0aa status: fail
2025-11-25T20:30:04.367364816Z [err]  Error polling for video: Video API error: Video generation failed: Internal Error: 
2025-11-25T20:30:04.432331571Z [inf]  Task 792bdac772113c32a6145e790f84a0aa status: fail
2025-11-25T20:30:04.432337682Z [err]  Error polling for video: Video API error: Video generation failed: Internal Error: 
2025-11-25T20:30:24.434041597Z [err]  Error polling for video: Video API error: Video generation failed: Internal Error: 
2025-11-25T20:30:24.434196964Z [inf]  Task 792bdac772113c32a6145e790f84a0aa status: fail
2025-11-25T20:30:24.486552898Z [inf]  Task 792bdac772113c32a6145e790f84a0aa status: fail
2025-11-25T20:30:24.486558625Z [err]  Error polling for video: Video API error: Video generation failed: Internal Error: 
2025-11-25T20:30:44.484290747Z [inf]  Task 792bdac772113c32a6145e790f84a0aa status: fail
2025-11-25T20:30:44.484295959Z [err]  Error polling for video: Video API error: Video generation failed: Internal Error: 
2025-11-25T20:30:44.555836405Z [inf]  Task 792bdac772113c32a6145e790f84a0aa status: fail
2025-11-25T20:30:44.555844566Z [err]  Error polling for video: Video API error: Video generation failed: Internal Error: 
2025-11-25T20:31:04.557077960Z [inf]  Task 792bdac772113c32a6145e790f84a0aa status: fail
2025-11-25T20:31:04.557083269Z [err]  Error polling for video: Video API error: Video generation failed: Internal Error: 
2025-11-25T20:31:04.608957825Z [inf]  Task 792bdac772113c32a6145e790f84a0aa status: fail
2025-11-25T20:31:04.608962749Z [err]  Error polling for video: Video API error: Video generation failed: Internal Error: 
2025-11-25T20:31:24.603383324Z [inf]  Task 792bdac772113c32a6145e790f84a0aa status: fail
2025-11-25T20:31:24.603388797Z [err]  Error polling for video: Video API error: Video generation failed: Internal Error: 
2025-11-25T20:31:24.675818527Z [inf]  Task 792bdac772113c32a6145e790f84a0aa status: fail
2025-11-25T20:31:24.675825487Z [err]  Error polling for video: Video API error: Video generation failed: Internal Error: 
2025-11-25T20:31:44.672565075Z [inf]  Task 792bdac772113c32a6145e790f84a0aa status: fail
2025-11-25T20:31:44.672572532Z [err]  Error polling for video: Video API error: Video generation failed: Internal Error: 
2025-11-25T20:31:44.731569103Z [inf]  Task 792bdac772113c32a6145e790f84a0aa status: fail
2025-11-25T20:31:44.731575286Z [err]  Error polling for video: Video API error: Video generation failed: Internal Error: 
2025-11-25T20:32:04.735494174Z [inf]  Task 792bdac772113c32a6145e790f84a0aa status: fail
2025-11-25T20:32:04.735500250Z [err]  Error polling for video: Video API error: Video generation failed: Internal Error: 
2025-11-25T20:32:04.791773319Z [inf]  Task 792bdac772113c32a6145e790f84a0aa status: fail
2025-11-25T20:32:04.791778745Z [err]  Error polling for video: Video API error: Video generation failed: Internal Error: 
2025-11-25T20:32:24.792216901Z [inf]  Task 792bdac772113c32a6145e790f84a0aa status: fail
2025-11-25T20:32:24.792226111Z [err]  Error polling for video: Video API error: Video generation failed: Internal Error: 
2025-11-25T20:32:24.847617951Z [inf]  Task 792bdac772113c32a6145e790f84a0aa status: fail
2025-11-25T20:32:24.847630093Z [err]  Error polling for video: Video API error: Video generation failed: Internal Error: 
2025-11-25T20:32:44.848142067Z [inf]  Task 792bdac772113c32a6145e790f84a0aa status: fail
2025-11-25T20:32:44.848151051Z [err]  Error polling for video: Video API error: Video generation failed: Internal Error: 
2025-11-25T20:32:44.899215096Z [inf]  Task 792bdac772113c32a6145e790f84a0aa status: fail
2025-11-25T20:32:44.899223404Z [err]  Error polling for video: Video API error: Video generation failed: Internal Error: 
2025-11-25T20:33:04.900658322Z [inf]  Task 792bdac772113c32a6145e790f84a0aa status: fail
2025-11-25T20:33:04.900663922Z [err]  Error polling for video: Video API error: Video generation failed: Internal Error: 
2025-11-25T20:33:04.952926487Z [inf]  Task 792bdac772113c32a6145e790f84a0aa status: fail
2025-11-25T20:33:04.952934943Z [err]  Error polling for video: Video API error: Video generation failed: Internal Error: 
2025-11-25T20:33:24.955353070Z [inf]  Task 792bdac772113c32a6145e790f84a0aa status: fail
2025-11-25T20:33:24.955364856Z [err]  Error polling for video: Video API error: Video generation failed: Internal Error: 
2025-11-25T20:33:25.011437783Z [inf]  Task 792bdac772113c32a6145e790f84a0aa status: fail
2025-11-25T20:33:25.011442028Z [err]  Error polling for video: Video API error: Video generation failed: Internal Error: 
2025-11-25T20:33:45.008506660Z [inf]  Task 792bdac772113c32a6145e790f84a0aa status: fail
2025-11-25T20:33:45.008516356Z [err]  Error polling for video: Video API error: Video generation failed: Internal Error: 
2025-11-25T20:33:45.068496451Z [inf]  Task 792bdac772113c32a6145e790f84a0aa status: fail
2025-11-25T20:33:45.068503148Z [err]  Error polling for video: Video API error: Video generation failed: Internal Error: 
2025-11-25T20:34:05.069159788Z [inf]  Task 792bdac772113c32a6145e790f84a0aa status: fail
2025-11-25T20:34:05.069164983Z [err]  Error polling for video: Video API error: Video generation failed: Internal Error: 
2025-11-25T20:34:05.137975453Z [inf]  Task 792bdac772113c32a6145e790f84a0aa status: fail
2025-11-25T20:34:05.137981512Z [err]  Error polling for video: Video API error: Video generation failed: Internal Error: 
2025-11-25T20:34:15.136176782Z [err]  Video API error (attempt 1): Video API error: Video generation timed out after 5 minutes
2025-11-25T20:34:15.136189128Z [inf]  Retrying in 5 seconds...
2025-11-25T20:34:20.140020969Z [inf]  Generating video (attempt 2/3)
2025-11-25T20:34:20.140029378Z [inf]  Image URL: https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/photos/471b9f8b-ffd6-435b-8fcc-00467d454c90.png
2025-11-25T20:34:20.140034986Z [inf]  Prompt: This scene contains: This is a room. Keep all these objects in their exact positions throughout the video. . Keep all these elements in their exact positions. INTERIOR ROOM - Smooth, constant-speed camera movement through the space. Camera can gently move forward or pan across the room to showcase the space. CRITICAL: Maintain CONSTANT speed throughout - no speeding up, no slowing down, no acceleration. Slow, cinematic movement taking the full 6 seconds. Professional real estate walkthrough feel. STRICT RULES - DO NOT VIOLATE: 1. NEVER add ceiling fans that are not already in the source image. 2. NEVER add curtains, drapes, or window treatments that are not in the source image. 3. NEVER add windows or doors that are not in the source image. 4. NEVER add furniture, fixtures, or decorations not in the source image. 5. NEVER add light fixtures, chandeliers, or pendant lights not in the source image. 6. If a ceiling fan EXISTS in the source image, it may spin slowly. Otherwise NO ceiling fans. 7. All curtains, towels, and fabrics must remain COMPLETELY STILL - no movement, no wind. 8. Stop motion BEFORE revealing any area not visible in the source image. 9. Preserve EXACT positions of all objects from the source image. OUTPUT ONLY what exists in the input image - add NOTHING new.
2025-11-25T20:34:20.140042664Z [inf]  === VIDEO API REQUEST ===
2025-11-25T20:34:20.140048480Z [inf]  Endpoint: https://api.kie.ai/api/v1/jobs/createTask
2025-11-25T20:34:20.140060509Z [inf]  Payload: {
2025-11-25T20:34:20.140066076Z [inf]    "model": "grok-imagine/image-to-video",
2025-11-25T20:34:20.140072231Z [inf]    "input": {
2025-11-25T20:34:20.140078151Z [inf]      "prompt": "This scene contains: This is a room. Keep all these objects in their exact positions throughout the video. . Keep all these elements in their exact positions. INTERIOR ROOM - Smooth, constant-speed camera movement through the space. Camera can gently move forward or pan across the room to showcase the space. CRITICAL: Maintain CONSTANT speed throughout - no speeding up, no slowing down, no acceleration. Slow, cinematic movement taking the full 6 seconds. Professional real estate walkthrough feel. STRICT RULES - DO NOT VIOLATE: 1. NEVER add ceiling fans that are not already in the source image. 2. NEVER add curtains, drapes, or window treatments that are not in the source image. 3. NEVER add windows or doors that are not in the source image. 4. NEVER add furniture, fixtures, or decorations not in the source image. 5. NEVER add light fixtures, chandeliers, or pendant lights not in the source image. 6. If a ceiling fan EXISTS in the source image, it may spin slowly. Otherwise NO ceiling fans. 7. All curtains, towels, and fabrics must remain COMPLETELY STILL - no movement, no wind. 8. Stop motion BEFORE revealing any area not visible in the source image. 9. Preserve EXACT positions of all objects from the source image. OUTPUT ONLY what exists in the input image - add NOTHING new.",
2025-11-25T20:34:20.141811471Z [inf]      "image_urls": [
2025-11-25T20:34:20.141818754Z [inf]        "https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/photos/471b9f8b-ffd6-435b-8fcc-00467d454c90.png"
2025-11-25T20:34:20.141824209Z [inf]      ],
2025-11-25T20:34:20.141830063Z [inf]      "mode": "normal"
2025-11-25T20:34:20.141835540Z [inf]    }
2025-11-25T20:34:20.141840913Z [inf]  }
2025-11-25T20:34:20.363602674Z [inf]  === VIDEO API RESPONSE ===
2025-11-25T20:34:20.363608784Z [inf]  Status: 200
2025-11-25T20:34:20.363614840Z [inf]  Data: {
2025-11-25T20:34:20.363620468Z [inf]    "code": 200,
2025-11-25T20:34:20.363627969Z [inf]    "msg": "success",
2025-11-25T20:34:20.363633490Z [inf]    "data": {
2025-11-25T20:34:20.363638418Z [inf]      "taskId": "7a7630957d15b493e7ebd1158a6764a1",
2025-11-25T20:34:20.363643882Z [inf]      "recordId": "7a7630957d15b493e7ebd1158a6764a1"
2025-11-25T20:34:20.363649403Z [inf]    }
2025-11-25T20:34:20.363659173Z [inf]  }
2025-11-25T20:34:20.363664460Z [inf]  Task created with ID: 7a7630957d15b493e7ebd1158a6764a1
2025-11-25T20:34:20.704373092Z [inf]  Task 7a7630957d15b493e7ebd1158a6764a1 status: waiting
2025-11-25T20:34:20.704394487Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:34:40.407314038Z [inf]  Task 7a7630957d15b493e7ebd1158a6764a1 status: waiting
2025-11-25T20:34:40.407322912Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:34:40.740621386Z [inf]  Task 7a7630957d15b493e7ebd1158a6764a1 status: waiting
2025-11-25T20:34:40.740627617Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:34:50.732304135Z [inf]  Task 7a7630957d15b493e7ebd1158a6764a1 status: waiting
2025-11-25T20:34:50.732311486Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:35:10.471568421Z [inf]  Task 7a7630957d15b493e7ebd1158a6764a1 status: success
2025-11-25T20:35:10.471576119Z [inf]  Video generated successfully: https://tempfile.aiquickdraw.com/r/users/37347101-fd61-4c14-8ffa-a580504bd8a5/generated/0e6ef81a-b525-4f56-bfec-bac969148c32/generated_video.mp4
2025-11-25T20:35:10.471582014Z [inf]  Downloading video from: https://tempfile.aiquickdraw.com/r/users/37347101-fd61-4c14-8ffa-a580504bd8a5/generated/0e6ef81a-b525-4f56-bfec-bac969148c32/generated_video.mp4
2025-11-25T20:35:10.471587382Z [inf]  Video downloaded successfully to: /app/uploads/room-bd4f2604-9cc0-4f85-ba6e-1b38059fe945.mp4
2025-11-25T20:35:10.471593052Z [inf]  Cleaned up: /app/uploads/room-bd4f2604-9cc0-4f85-ba6e-1b38059fe945.mp4
2025-11-25T20:35:10.471598887Z [inf]  Successfully generated video for room 3
2025-11-25T20:35:10.471604600Z [inf]  Generating video for room 4...
2025-11-25T20:35:10.471610199Z [inf]  Image URL: https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/photos/6dd663d5-fda2-436e-ba43-361c53da0eeb.png
2025-11-25T20:35:10.471615514Z [inf]  Analyzing image with GPT Vision...
2025-11-25T20:35:10.471622168Z [inf]  Analyzing room image with GPT-5 Nano...
2025-11-25T20:35:10.471628239Z [inf]  Image URL: https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/photos/6dd663d5-fda2-436e-ba43-361c53da0eeb.png
2025-11-25T20:35:14.818751884Z [inf]  Final prompt: This scene contains: This is a room. Keep all these objects in their exact positions throughout the video. . Keep all these elements in their exact positions. INTERIOR ROOM - Smooth, constant-speed camera movement through the space. Camera can gently move forward or pan across the room to showcase the space. CRITICAL: Maintain CONSTANT speed throughout - no speeding up, no slowing down, no acceleration. Slow, cinematic movement taking the full 6 seconds. Professional real estate walkthrough feel. STRICT RULES - DO NOT VIOLATE: 1. NEVER add ceiling fans that are not already in the source image. 2. NEVER add curtains, drapes, or window treatments that are not in the source image. 3. NEVER add windows or doors that are not in the source image. 4. NEVER add furniture, fixtures, or decorations not in the source image. 5. NEVER add light fixtures, chandeliers, or pendant lights not in the source image. 6. If a ceiling fan EXISTS in the source image, it may spin slowly. Otherwise NO ceiling fans. 7. All curtains, towels, and fabrics must remain COMPLETELY STILL - no movement, no wind. 8. Stop motion BEFORE revealing any area not visible in the source image. 9. Preserve EXACT positions of all objects from the source image. OUTPUT ONLY what exists in the input image - add NOTHING new.
2025-11-25T20:35:14.818761830Z [inf]  Generating video (attempt 1/3)
2025-11-25T20:35:14.818769357Z [inf]  Image URL: https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/photos/6dd663d5-fda2-436e-ba43-361c53da0eeb.png
2025-11-25T20:35:14.818777579Z [inf]  Prompt: This scene contains: This is a room. Keep all these objects in their exact positions throughout the video. . Keep all these elements in their exact positions. INTERIOR ROOM - Smooth, constant-speed camera movement through the space. Camera can gently move forward or pan across the room to showcase the space. CRITICAL: Maintain CONSTANT speed throughout - no speeding up, no slowing down, no acceleration. Slow, cinematic movement taking the full 6 seconds. Professional real estate walkthrough feel. STRICT RULES - DO NOT VIOLATE: 1. NEVER add ceiling fans that are not already in the source image. 2. NEVER add curtains, drapes, or window treatments that are not in the source image. 3. NEVER add windows or doors that are not in the source image. 4. NEVER add furniture, fixtures, or decorations not in the source image. 5. NEVER add light fixtures, chandeliers, or pendant lights not in the source image. 6. If a ceiling fan EXISTS in the source image, it may spin slowly. Otherwise NO ceiling fans. 7. All curtains, towels, and fabrics must remain COMPLETELY STILL - no movement, no wind. 8. Stop motion BEFORE revealing any area not visible in the source image. 9. Preserve EXACT positions of all objects from the source image. OUTPUT ONLY what exists in the input image - add NOTHING new.
2025-11-25T20:35:14.818800908Z [inf]  Vision analysis complete:
2025-11-25T20:35:14.818807684Z [inf]  
2025-11-25T20:35:14.818814168Z [inf]  Room type: room, Exterior: false, Small room: false
2025-11-25T20:35:14.818822904Z [inf]  Vision-enhanced description: This is a room. Keep all these objects in their exact positions throughout the video. 
2025-11-25T20:35:14.820583661Z [inf]      "mode": "normal"
2025-11-25T20:35:14.820626215Z [inf]  === VIDEO API REQUEST ===
2025-11-25T20:35:14.820633498Z [inf]  Endpoint: https://api.kie.ai/api/v1/jobs/createTask
2025-11-25T20:35:14.820639623Z [inf]  Payload: {
2025-11-25T20:35:14.820645606Z [inf]    "model": "grok-imagine/image-to-video",
2025-11-25T20:35:14.820652941Z [inf]    "input": {
2025-11-25T20:35:14.820659544Z [inf]      "prompt": "This scene contains: This is a room. Keep all these objects in their exact positions throughout the video. . Keep all these elements in their exact positions. INTERIOR ROOM - Smooth, constant-speed camera movement through the space. Camera can gently move forward or pan across the room to showcase the space. CRITICAL: Maintain CONSTANT speed throughout - no speeding up, no slowing down, no acceleration. Slow, cinematic movement taking the full 6 seconds. Professional real estate walkthrough feel. STRICT RULES - DO NOT VIOLATE: 1. NEVER add ceiling fans that are not already in the source image. 2. NEVER add curtains, drapes, or window treatments that are not in the source image. 3. NEVER add windows or doors that are not in the source image. 4. NEVER add furniture, fixtures, or decorations not in the source image. 5. NEVER add light fixtures, chandeliers, or pendant lights not in the source image. 6. If a ceiling fan EXISTS in the source image, it may spin slowly. Otherwise NO ceiling fans. 7. All curtains, towels, and fabrics must remain COMPLETELY STILL - no movement, no wind. 8. Stop motion BEFORE revealing any area not visible in the source image. 9. Preserve EXACT positions of all objects from the source image. OUTPUT ONLY what exists in the input image - add NOTHING new.",
2025-11-25T20:35:14.820665860Z [inf]      "image_urls": [
2025-11-25T20:35:14.820672087Z [inf]        "https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/photos/6dd663d5-fda2-436e-ba43-361c53da0eeb.png"
2025-11-25T20:35:14.820678174Z [inf]      ],
2025-11-25T20:35:14.822668061Z [inf]    }
2025-11-25T20:35:14.822674959Z [inf]  }
2025-11-25T20:35:14.822680771Z [inf]  === VIDEO API RESPONSE ===
2025-11-25T20:35:14.822687098Z [inf]  Status: 200
2025-11-25T20:35:14.822698215Z [inf]  Data: {
2025-11-25T20:35:14.822704561Z [inf]    "code": 200,
2025-11-25T20:35:14.822710583Z [inf]    "msg": "success",
2025-11-25T20:35:14.822716444Z [inf]    "data": {
2025-11-25T20:35:14.822722091Z [inf]      "taskId": "8c678482a34213b26efda33f69b4402f",
2025-11-25T20:35:14.822727270Z [inf]      "recordId": "8c678482a34213b26efda33f69b4402f"
2025-11-25T20:35:14.822732186Z [inf]    }
2025-11-25T20:35:14.822737289Z [inf]  }
2025-11-25T20:35:14.822742996Z [inf]  Task created with ID: 8c678482a34213b26efda33f69b4402f
2025-11-25T20:35:14.822748083Z [inf]  Task 8c678482a34213b26efda33f69b4402f status: waiting
2025-11-25T20:35:14.822754305Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:35:34.539979476Z [inf]  Task 8c678482a34213b26efda33f69b4402f status: waiting
2025-11-25T20:35:34.539985751Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:35:34.860201760Z [inf]  Task 8c678482a34213b26efda33f69b4402f status: waiting
2025-11-25T20:35:34.860208033Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:35:54.590397562Z [inf]  Task 8c678482a34213b26efda33f69b4402f status: waiting
2025-11-25T20:35:54.590406248Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:35:55.001486645Z [inf]  Task 8c678482a34213b26efda33f69b4402f status: success
2025-11-25T20:35:55.001497589Z [inf]  Video generated successfully: https://tempfile.aiquickdraw.com/r/users/01688e42-d30d-40ac-ad38-1f5096bb7d58/generated/19085ab2-9b96-4ab7-840c-f647e148d7f6/generated_video.mp4
2025-11-25T20:35:55.001506575Z [inf]  Downloading video from: https://tempfile.aiquickdraw.com/r/users/01688e42-d30d-40ac-ad38-1f5096bb7d58/generated/19085ab2-9b96-4ab7-840c-f647e148d7f6/generated_video.mp4
2025-11-25T20:35:55.098977998Z [inf]  Video downloaded successfully to: /app/uploads/room-5e536fa7-e059-4fce-8ef2-c06a12ee8c09.mp4
2025-11-25T20:35:55.964798332Z [inf]  Generating video for room 5...
2025-11-25T20:35:55.964810348Z [inf]  Image URL: https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/photos/3a788927-962c-434c-96ad-b3c626be3ddf.png
2025-11-25T20:35:55.964818468Z [inf]  Analyzing image with GPT Vision...
2025-11-25T20:35:55.964826323Z [inf]  Analyzing room image with GPT-5 Nano...
2025-11-25T20:35:55.964838334Z [inf]  Image URL: https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/photos/3a788927-962c-434c-96ad-b3c626be3ddf.png
2025-11-25T20:35:55.964861192Z [inf]  Cleaned up: /app/uploads/room-5e536fa7-e059-4fce-8ef2-c06a12ee8c09.mp4
2025-11-25T20:35:55.964867375Z [inf]  Successfully generated video for room 4
2025-11-25T20:36:15.971662254Z [inf]  Vision analysis complete:
2025-11-25T20:36:15.971669426Z [inf]  
2025-11-25T20:36:15.971677184Z [inf]  Room type: room, Exterior: false, Small room: false
2025-11-25T20:36:15.971683390Z [inf]  Vision-enhanced description: This is a room. Keep all these objects in their exact positions throughout the video. 
2025-11-25T20:36:15.971688715Z [inf]  Final prompt: This scene contains: This is a room. Keep all these objects in their exact positions throughout the video. . Keep all these elements in their exact positions. INTERIOR ROOM - Smooth, constant-speed camera movement through the space. Camera can gently move forward or pan across the room to showcase the space. CRITICAL: Maintain CONSTANT speed throughout - no speeding up, no slowing down, no acceleration. Slow, cinematic movement taking the full 6 seconds. Professional real estate walkthrough feel. STRICT RULES - DO NOT VIOLATE: 1. NEVER add ceiling fans that are not already in the source image. 2. NEVER add curtains, drapes, or window treatments that are not in the source image. 3. NEVER add windows or doors that are not in the source image. 4. NEVER add furniture, fixtures, or decorations not in the source image. 5. NEVER add light fixtures, chandeliers, or pendant lights not in the source image. 6. If a ceiling fan EXISTS in the source image, it may spin slowly. Otherwise NO ceiling fans. 7. All curtains, towels, and fabrics must remain COMPLETELY STILL - no movement, no wind. 8. Stop motion BEFORE revealing any area not visible in the source image. 9. Preserve EXACT positions of all objects from the source image. OUTPUT ONLY what exists in the input image - add NOTHING new.
2025-11-25T20:36:15.971693952Z [inf]  Generating video (attempt 1/3)
2025-11-25T20:36:15.971699634Z [inf]  Image URL: https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/photos/3a788927-962c-434c-96ad-b3c626be3ddf.png
2025-11-25T20:36:15.971705363Z [inf]  Prompt: This scene contains: This is a room. Keep all these objects in their exact positions throughout the video. . Keep all these elements in their exact positions. INTERIOR ROOM - Smooth, constant-speed camera movement through the space. Camera can gently move forward or pan across the room to showcase the space. CRITICAL: Maintain CONSTANT speed throughout - no speeding up, no slowing down, no acceleration. Slow, cinematic movement taking the full 6 seconds. Professional real estate walkthrough feel. STRICT RULES - DO NOT VIOLATE: 1. NEVER add ceiling fans that are not already in the source image. 2. NEVER add curtains, drapes, or window treatments that are not in the source image. 3. NEVER add windows or doors that are not in the source image. 4. NEVER add furniture, fixtures, or decorations not in the source image. 5. NEVER add light fixtures, chandeliers, or pendant lights not in the source image. 6. If a ceiling fan EXISTS in the source image, it may spin slowly. Otherwise NO ceiling fans. 7. All curtains, towels, and fabrics must remain COMPLETELY STILL - no movement, no wind. 8. Stop motion BEFORE revealing any area not visible in the source image. 9. Preserve EXACT positions of all objects from the source image. OUTPUT ONLY what exists in the input image - add NOTHING new.
2025-11-25T20:36:15.974087692Z [inf]  === VIDEO API REQUEST ===
2025-11-25T20:36:15.974096228Z [inf]  Endpoint: https://api.kie.ai/api/v1/jobs/createTask
2025-11-25T20:36:15.974103579Z [inf]  Payload: {
2025-11-25T20:36:15.974111776Z [inf]    "model": "grok-imagine/image-to-video",
2025-11-25T20:36:15.974118444Z [inf]    "input": {
2025-11-25T20:36:15.974126117Z [inf]      "prompt": "This scene contains: This is a room. Keep all these objects in their exact positions throughout the video. . Keep all these elements in their exact positions. INTERIOR ROOM - Smooth, constant-speed camera movement through the space. Camera can gently move forward or pan across the room to showcase the space. CRITICAL: Maintain CONSTANT speed throughout - no speeding up, no slowing down, no acceleration. Slow, cinematic movement taking the full 6 seconds. Professional real estate walkthrough feel. STRICT RULES - DO NOT VIOLATE: 1. NEVER add ceiling fans that are not already in the source image. 2. NEVER add curtains, drapes, or window treatments that are not in the source image. 3. NEVER add windows or doors that are not in the source image. 4. NEVER add furniture, fixtures, or decorations not in the source image. 5. NEVER add light fixtures, chandeliers, or pendant lights not in the source image. 6. If a ceiling fan EXISTS in the source image, it may spin slowly. Otherwise NO ceiling fans. 7. All curtains, towels, and fabrics must remain COMPLETELY STILL - no movement, no wind. 8. Stop motion BEFORE revealing any area not visible in the source image. 9. Preserve EXACT positions of all objects from the source image. OUTPUT ONLY what exists in the input image - add NOTHING new.",
2025-11-25T20:36:15.974133944Z [inf]      "image_urls": [
2025-11-25T20:36:15.974140449Z [inf]        "https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/photos/3a788927-962c-434c-96ad-b3c626be3ddf.png"
2025-11-25T20:36:15.974147102Z [inf]      ],
2025-11-25T20:36:15.974170782Z [inf]      "mode": "normal"
2025-11-25T20:36:15.977161015Z [inf]    }
2025-11-25T20:36:15.977169000Z [inf]  }
2025-11-25T20:36:15.977175277Z [inf]  === VIDEO API RESPONSE ===
2025-11-25T20:36:15.977181141Z [inf]  Status: 200
2025-11-25T20:36:15.977186948Z [inf]  Data: {
2025-11-25T20:36:15.977192528Z [inf]    "code": 200,
2025-11-25T20:36:15.977197757Z [inf]    "msg": "success",
2025-11-25T20:36:15.977203654Z [inf]    "data": {
2025-11-25T20:36:15.977208895Z [inf]      "taskId": "70928e8f5e9ef7b00092263f6b6e5afe",
2025-11-25T20:36:15.977223034Z [inf]      "recordId": "70928e8f5e9ef7b00092263f6b6e5afe"
2025-11-25T20:36:15.977234726Z [inf]    }
2025-11-25T20:36:15.977240326Z [inf]  }
2025-11-25T20:36:15.977245523Z [inf]  Task created with ID: 70928e8f5e9ef7b00092263f6b6e5afe
2025-11-25T20:36:15.977252116Z [inf]  Task 70928e8f5e9ef7b00092263f6b6e5afe status: waiting
2025-11-25T20:36:15.977257894Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:36:18.124994420Z [inf]  Task 70928e8f5e9ef7b00092263f6b6e5afe status: waiting
2025-11-25T20:36:18.125000723Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:36:38.106691498Z [inf]  Task 70928e8f5e9ef7b00092263f6b6e5afe status: waiting
2025-11-25T20:36:38.106702767Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:36:38.165467888Z [inf]  Task 70928e8f5e9ef7b00092263f6b6e5afe status: waiting
2025-11-25T20:36:38.165477889Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:36:58.163450771Z [inf]  Task 70928e8f5e9ef7b00092263f6b6e5afe status: waiting
2025-11-25T20:36:58.163460543Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:36:58.231216618Z [inf]  Video generated successfully: https://tempfile.aiquickdraw.com/r/users/32e5ceae-d6c5-44be-bdbe-877d66b6cbcc/generated/771b2a50-97f4-4a2a-beb3-539cfb241d78/generated_video.mp4
2025-11-25T20:36:58.231226766Z [inf]  Downloading video from: https://tempfile.aiquickdraw.com/r/users/32e5ceae-d6c5-44be-bdbe-877d66b6cbcc/generated/771b2a50-97f4-4a2a-beb3-539cfb241d78/generated_video.mp4
2025-11-25T20:36:58.231250106Z [inf]  Task 70928e8f5e9ef7b00092263f6b6e5afe status: success
2025-11-25T20:36:58.414460581Z [inf]  Video downloaded successfully to: /app/uploads/room-a1cb68e0-42c3-44cf-8975-d6ef6e90f8ab.mp4
2025-11-25T20:36:59.127564680Z [inf]  Cleaned up: /app/uploads/room-a1cb68e0-42c3-44cf-8975-d6ef6e90f8ab.mp4
2025-11-25T20:36:59.127593706Z [inf]  Successfully generated video for room 5
2025-11-25T20:36:59.221510459Z [inf]  Generating video for room 6...
2025-11-25T20:36:59.221519540Z [inf]  Image URL: https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/photos/78e90b05-0a35-4ca7-b218-4ea4800c93cd.png
2025-11-25T20:36:59.221525913Z [inf]  Analyzing image with GPT Vision...
2025-11-25T20:36:59.221531815Z [inf]  Analyzing room image with GPT-5 Nano...
2025-11-25T20:36:59.221537906Z [inf]  Image URL: https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/photos/78e90b05-0a35-4ca7-b218-4ea4800c93cd.png
2025-11-25T20:37:19.238024222Z [inf]  === VIDEO API RESPONSE ===
2025-11-25T20:37:19.238110325Z [inf]  Vision analysis complete:
2025-11-25T20:37:19.238117467Z [inf]  
2025-11-25T20:37:19.238124083Z [inf]  Room type: room, Exterior: false, Small room: false
2025-11-25T20:37:19.238130194Z [inf]  Vision-enhanced description: This is a room. Keep all these objects in their exact positions throughout the video. 
2025-11-25T20:37:19.238135420Z [inf]  Final prompt: This scene contains: This is a room. Keep all these objects in their exact positions throughout the video. . Keep all these elements in their exact positions. INTERIOR ROOM - Smooth, constant-speed camera movement through the space. Camera can gently move forward or pan across the room to showcase the space. CRITICAL: Maintain CONSTANT speed throughout - no speeding up, no slowing down, no acceleration. Slow, cinematic movement taking the full 6 seconds. Professional real estate walkthrough feel. STRICT RULES - DO NOT VIOLATE: 1. NEVER add ceiling fans that are not already in the source image. 2. NEVER add curtains, drapes, or window treatments that are not in the source image. 3. NEVER add windows or doors that are not in the source image. 4. NEVER add furniture, fixtures, or decorations not in the source image. 5. NEVER add light fixtures, chandeliers, or pendant lights not in the source image. 6. If a ceiling fan EXISTS in the source image, it may spin slowly. Otherwise NO ceiling fans. 7. All curtains, towels, and fabrics must remain COMPLETELY STILL - no movement, no wind. 8. Stop motion BEFORE revealing any area not visible in the source image. 9. Preserve EXACT positions of all objects from the source image. OUTPUT ONLY what exists in the input image - add NOTHING new.
2025-11-25T20:37:19.238140836Z [inf]  Generating video (attempt 1/3)
2025-11-25T20:37:19.238146884Z [inf]  Image URL: https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/photos/78e90b05-0a35-4ca7-b218-4ea4800c93cd.png
2025-11-25T20:37:19.238147472Z [inf]    }
2025-11-25T20:37:19.238155187Z [inf]  }
2025-11-25T20:37:19.238158103Z [inf]  Prompt: This scene contains: This is a room. Keep all these objects in their exact positions throughout the video. . Keep all these elements in their exact positions. INTERIOR ROOM - Smooth, constant-speed camera movement through the space. Camera can gently move forward or pan across the room to showcase the space. CRITICAL: Maintain CONSTANT speed throughout - no speeding up, no slowing down, no acceleration. Slow, cinematic movement taking the full 6 seconds. Professional real estate walkthrough feel. STRICT RULES - DO NOT VIOLATE: 1. NEVER add ceiling fans that are not already in the source image. 2. NEVER add curtains, drapes, or window treatments that are not in the source image. 3. NEVER add windows or doors that are not in the source image. 4. NEVER add furniture, fixtures, or decorations not in the source image. 5. NEVER add light fixtures, chandeliers, or pendant lights not in the source image. 6. If a ceiling fan EXISTS in the source image, it may spin slowly. Otherwise NO ceiling fans. 7. All curtains, towels, and fabrics must remain COMPLETELY STILL - no movement, no wind. 8. Stop motion BEFORE revealing any area not visible in the source image. 9. Preserve EXACT positions of all objects from the source image. OUTPUT ONLY what exists in the input image - add NOTHING new.
2025-11-25T20:37:19.238221496Z [inf]  Status: 200
2025-11-25T20:37:19.238228391Z [inf]  Data: {
2025-11-25T20:37:19.238234759Z [inf]    "code": 200,
2025-11-25T20:37:19.238240569Z [inf]    "msg": "success",
2025-11-25T20:37:19.238246443Z [inf]    "data": {
2025-11-25T20:37:19.238252005Z [inf]      "taskId": "4117ca94132fa9e656226267901d39c4",
2025-11-25T20:37:19.238257706Z [inf]      "recordId": "4117ca94132fa9e656226267901d39c4"
2025-11-25T20:37:19.238264731Z [inf]    }
2025-11-25T20:37:19.238281471Z [inf]  }
2025-11-25T20:37:19.238289289Z [inf]  Task created with ID: 4117ca94132fa9e656226267901d39c4
2025-11-25T20:37:19.238295565Z [inf]  Task 4117ca94132fa9e656226267901d39c4 status: waiting
2025-11-25T20:37:19.238302069Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:37:19.238796439Z [inf]  === VIDEO API REQUEST ===
2025-11-25T20:37:19.238802191Z [inf]  Endpoint: https://api.kie.ai/api/v1/jobs/createTask
2025-11-25T20:37:19.238807737Z [inf]  Payload: {
2025-11-25T20:37:19.238813861Z [inf]    "model": "grok-imagine/image-to-video",
2025-11-25T20:37:19.238819191Z [inf]    "input": {
2025-11-25T20:37:19.238825315Z [inf]      "prompt": "This scene contains: This is a room. Keep all these objects in their exact positions throughout the video. . Keep all these elements in their exact positions. INTERIOR ROOM - Smooth, constant-speed camera movement through the space. Camera can gently move forward or pan across the room to showcase the space. CRITICAL: Maintain CONSTANT speed throughout - no speeding up, no slowing down, no acceleration. Slow, cinematic movement taking the full 6 seconds. Professional real estate walkthrough feel. STRICT RULES - DO NOT VIOLATE: 1. NEVER add ceiling fans that are not already in the source image. 2. NEVER add curtains, drapes, or window treatments that are not in the source image. 3. NEVER add windows or doors that are not in the source image. 4. NEVER add furniture, fixtures, or decorations not in the source image. 5. NEVER add light fixtures, chandeliers, or pendant lights not in the source image. 6. If a ceiling fan EXISTS in the source image, it may spin slowly. Otherwise NO ceiling fans. 7. All curtains, towels, and fabrics must remain COMPLETELY STILL - no movement, no wind. 8. Stop motion BEFORE revealing any area not visible in the source image. 9. Preserve EXACT positions of all objects from the source image. OUTPUT ONLY what exists in the input image - add NOTHING new.",
2025-11-25T20:37:19.238831190Z [inf]      "image_urls": [
2025-11-25T20:37:19.238836458Z [inf]        "https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/photos/78e90b05-0a35-4ca7-b218-4ea4800c93cd.png"
2025-11-25T20:37:19.238841888Z [inf]      ],
2025-11-25T20:37:19.238846807Z [inf]      "mode": "normal"
2025-11-25T20:37:19.624897944Z [inf]  Task 4117ca94132fa9e656226267901d39c4 status: waiting
2025-11-25T20:37:19.624921231Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:37:39.622257685Z [inf]  Task 4117ca94132fa9e656226267901d39c4 status: waiting
2025-11-25T20:37:39.622271899Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:37:39.687063022Z [inf]  Task 4117ca94132fa9e656226267901d39c4 status: success
2025-11-25T20:37:39.687071784Z [inf]  Video generated successfully: https://tempfile.aiquickdraw.com/r/users/ef282a77-c36d-4c22-b32a-24abd55dc2a6/generated/5912e804-f82f-4e8d-b845-546a93256daa/generated_video.mp4
2025-11-25T20:37:39.687077901Z [inf]  Downloading video from: https://tempfile.aiquickdraw.com/r/users/ef282a77-c36d-4c22-b32a-24abd55dc2a6/generated/5912e804-f82f-4e8d-b845-546a93256daa/generated_video.mp4
2025-11-25T20:37:39.846789015Z [inf]  Video downloaded successfully to: /app/uploads/room-6be688c4-a937-4936-b5b1-373aa3dc4dd5.mp4
2025-11-25T20:37:40.527611149Z [inf]  Cleaned up: /app/uploads/room-6be688c4-a937-4936-b5b1-373aa3dc4dd5.mp4
2025-11-25T20:37:40.527618683Z [inf]  Successfully generated video for room 6
2025-11-25T20:37:40.624670430Z [inf]  Generating video for room 7...
2025-11-25T20:37:40.624679646Z [inf]  Image URL: https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/photos/6b465ee7-3a11-4f01-964d-a4cb24305a8e.png
2025-11-25T20:37:40.624685671Z [inf]  Analyzing image with GPT Vision...
2025-11-25T20:37:40.624947840Z [inf]  Analyzing room image with GPT-5 Nano...
2025-11-25T20:37:40.624968030Z [inf]  Image URL: https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/photos/6b465ee7-3a11-4f01-964d-a4cb24305a8e.png
2025-11-25T20:38:00.624857990Z [inf]  Vision analysis complete:
2025-11-25T20:38:00.624894448Z [inf]  
2025-11-25T20:38:00.624901135Z [inf]  Room type: room, Exterior: false, Small room: false
2025-11-25T20:38:00.624907251Z [inf]  Vision-enhanced description: This is a room. Keep all these objects in their exact positions throughout the video. 
2025-11-25T20:38:00.624913985Z [inf]  Final prompt: This scene contains: This is a room. Keep all these objects in their exact positions throughout the video. . Keep all these elements in their exact positions. INTERIOR ROOM - Smooth, constant-speed camera movement through the space. Camera can gently move forward or pan across the room to showcase the space. CRITICAL: Maintain CONSTANT speed throughout - no speeding up, no slowing down, no acceleration. Slow, cinematic movement taking the full 6 seconds. Professional real estate walkthrough feel. STRICT RULES - DO NOT VIOLATE: 1. NEVER add ceiling fans that are not already in the source image. 2. NEVER add curtains, drapes, or window treatments that are not in the source image. 3. NEVER add windows or doors that are not in the source image. 4. NEVER add furniture, fixtures, or decorations not in the source image. 5. NEVER add light fixtures, chandeliers, or pendant lights not in the source image. 6. If a ceiling fan EXISTS in the source image, it may spin slowly. Otherwise NO ceiling fans. 7. All curtains, towels, and fabrics must remain COMPLETELY STILL - no movement, no wind. 8. Stop motion BEFORE revealing any area not visible in the source image. 9. Preserve EXACT positions of all objects from the source image. OUTPUT ONLY what exists in the input image - add NOTHING new.
2025-11-25T20:38:00.624919364Z [inf]  Generating video (attempt 1/3)
2025-11-25T20:38:00.624924896Z [inf]  Image URL: https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/photos/6b465ee7-3a11-4f01-964d-a4cb24305a8e.png
2025-11-25T20:38:00.624929736Z [inf]  Prompt: This scene contains: This is a room. Keep all these objects in their exact positions throughout the video. . Keep all these elements in their exact positions. INTERIOR ROOM - Smooth, constant-speed camera movement through the space. Camera can gently move forward or pan across the room to showcase the space. CRITICAL: Maintain CONSTANT speed throughout - no speeding up, no slowing down, no acceleration. Slow, cinematic movement taking the full 6 seconds. Professional real estate walkthrough feel. STRICT RULES - DO NOT VIOLATE: 1. NEVER add ceiling fans that are not already in the source image. 2. NEVER add curtains, drapes, or window treatments that are not in the source image. 3. NEVER add windows or doors that are not in the source image. 4. NEVER add furniture, fixtures, or decorations not in the source image. 5. NEVER add light fixtures, chandeliers, or pendant lights not in the source image. 6. If a ceiling fan EXISTS in the source image, it may spin slowly. Otherwise NO ceiling fans. 7. All curtains, towels, and fabrics must remain COMPLETELY STILL - no movement, no wind. 8. Stop motion BEFORE revealing any area not visible in the source image. 9. Preserve EXACT positions of all objects from the source image. OUTPUT ONLY what exists in the input image - add NOTHING new.
2025-11-25T20:38:00.626544769Z [inf]      "mode": "normal"
2025-11-25T20:38:00.626575742Z [inf]  === VIDEO API REQUEST ===
2025-11-25T20:38:00.626582184Z [inf]  Endpoint: https://api.kie.ai/api/v1/jobs/createTask
2025-11-25T20:38:00.626588058Z [inf]  Payload: {
2025-11-25T20:38:00.626594204Z [inf]    "model": "grok-imagine/image-to-video",
2025-11-25T20:38:00.626600140Z [inf]    "input": {
2025-11-25T20:38:00.626606009Z [inf]      "prompt": "This scene contains: This is a room. Keep all these objects in their exact positions throughout the video. . Keep all these elements in their exact positions. INTERIOR ROOM - Smooth, constant-speed camera movement through the space. Camera can gently move forward or pan across the room to showcase the space. CRITICAL: Maintain CONSTANT speed throughout - no speeding up, no slowing down, no acceleration. Slow, cinematic movement taking the full 6 seconds. Professional real estate walkthrough feel. STRICT RULES - DO NOT VIOLATE: 1. NEVER add ceiling fans that are not already in the source image. 2. NEVER add curtains, drapes, or window treatments that are not in the source image. 3. NEVER add windows or doors that are not in the source image. 4. NEVER add furniture, fixtures, or decorations not in the source image. 5. NEVER add light fixtures, chandeliers, or pendant lights not in the source image. 6. If a ceiling fan EXISTS in the source image, it may spin slowly. Otherwise NO ceiling fans. 7. All curtains, towels, and fabrics must remain COMPLETELY STILL - no movement, no wind. 8. Stop motion BEFORE revealing any area not visible in the source image. 9. Preserve EXACT positions of all objects from the source image. OUTPUT ONLY what exists in the input image - add NOTHING new.",
2025-11-25T20:38:00.626611308Z [inf]      "image_urls": [
2025-11-25T20:38:00.626617452Z [inf]        "https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/photos/6b465ee7-3a11-4f01-964d-a4cb24305a8e.png"
2025-11-25T20:38:00.626623125Z [inf]      ],
2025-11-25T20:38:00.627806225Z [inf]    }
2025-11-25T20:38:00.627814446Z [inf]  }
2025-11-25T20:38:00.627819946Z [inf]  === VIDEO API RESPONSE ===
2025-11-25T20:38:00.627825094Z [inf]  Status: 200
2025-11-25T20:38:00.627830598Z [inf]  Data: {
2025-11-25T20:38:00.627837785Z [inf]    "code": 200,
2025-11-25T20:38:00.627845658Z [inf]    "msg": "success",
2025-11-25T20:38:00.627851024Z [inf]    "data": {
2025-11-25T20:38:00.627856101Z [inf]      "taskId": "847fa08c1677da64f69208779cd6d659",
2025-11-25T20:38:00.627861680Z [inf]      "recordId": "847fa08c1677da64f69208779cd6d659"
2025-11-25T20:38:00.627867086Z [inf]    }
2025-11-25T20:38:00.627872337Z [inf]  }
2025-11-25T20:38:00.627877438Z [inf]  Task created with ID: 847fa08c1677da64f69208779cd6d659
2025-11-25T20:38:00.627882614Z [inf]  Task 847fa08c1677da64f69208779cd6d659 status: waiting
2025-11-25T20:38:00.627889091Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:38:01.211131563Z [inf]  Task 847fa08c1677da64f69208779cd6d659 status: waiting
2025-11-25T20:38:01.211136774Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:38:20.961339101Z [inf]  Task 847fa08c1677da64f69208779cd6d659 status: waiting
2025-11-25T20:38:20.961345815Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:38:21.238882286Z [inf]  Task 847fa08c1677da64f69208779cd6d659 status: waiting
2025-11-25T20:38:21.238886467Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:38:40.987780909Z [inf]  Task 847fa08c1677da64f69208779cd6d659 status: success
2025-11-25T20:38:40.987793042Z [inf]  Video generated successfully: https://tempfile.aiquickdraw.com/r/users/bd5d017e-c57a-4390-810d-4cd31d41b062/generated/c267b070-4c73-4d0a-ba1a-8319d7e47004/generated_video.mp4
2025-11-25T20:38:40.987799916Z [inf]  Downloading video from: https://tempfile.aiquickdraw.com/r/users/bd5d017e-c57a-4390-810d-4cd31d41b062/generated/c267b070-4c73-4d0a-ba1a-8319d7e47004/generated_video.mp4
2025-11-25T20:38:40.987806399Z [inf]  Video downloaded successfully to: /app/uploads/room-2c38cd3a-9e28-4c52-94d8-27034438091d.mp4
2025-11-25T20:38:40.987816283Z [inf]  Cleaned up: /app/uploads/room-2c38cd3a-9e28-4c52-94d8-27034438091d.mp4
2025-11-25T20:38:40.987823390Z [inf]  Successfully generated video for room 7
2025-11-25T20:38:40.987829668Z [inf]  Generating video for room 8...
2025-11-25T20:38:40.987836982Z [inf]  Image URL: https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/photos/888cb9b5-a12e-451c-b377-edf1f305986f.png
2025-11-25T20:38:40.987843210Z [inf]  Analyzing image with GPT Vision...
2025-11-25T20:38:40.987851012Z [inf]  Analyzing room image with GPT-5 Nano...
2025-11-25T20:38:40.987857544Z [inf]  Image URL: https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/photos/888cb9b5-a12e-451c-b377-edf1f305986f.png
2025-11-25T20:38:43.319236902Z [inf]  Vision analysis complete:
2025-11-25T20:38:43.319247132Z [inf]  
2025-11-25T20:38:43.319253143Z [inf]  Room type: room, Exterior: false, Small room: false
2025-11-25T20:38:43.319258059Z [inf]  Vision-enhanced description: This is a room. Keep all these objects in their exact positions throughout the video. 
2025-11-25T20:38:43.319262860Z [inf]  Final prompt: This scene contains: This is a room. Keep all these objects in their exact positions throughout the video. . Keep all these elements in their exact positions. INTERIOR ROOM - Smooth, constant-speed camera movement through the space. Camera can gently move forward or pan across the room to showcase the space. CRITICAL: Maintain CONSTANT speed throughout - no speeding up, no slowing down, no acceleration. Slow, cinematic movement taking the full 6 seconds. Professional real estate walkthrough feel. STRICT RULES - DO NOT VIOLATE: 1. NEVER add ceiling fans that are not already in the source image. 2. NEVER add curtains, drapes, or window treatments that are not in the source image. 3. NEVER add windows or doors that are not in the source image. 4. NEVER add furniture, fixtures, or decorations not in the source image. 5. NEVER add light fixtures, chandeliers, or pendant lights not in the source image. 6. If a ceiling fan EXISTS in the source image, it may spin slowly. Otherwise NO ceiling fans. 7. All curtains, towels, and fabrics must remain COMPLETELY STILL - no movement, no wind. 8. Stop motion BEFORE revealing any area not visible in the source image. 9. Preserve EXACT positions of all objects from the source image. OUTPUT ONLY what exists in the input image - add NOTHING new.
2025-11-25T20:38:43.319267828Z [inf]  Generating video (attempt 1/3)
2025-11-25T20:38:43.319273158Z [inf]  Image URL: https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/photos/888cb9b5-a12e-451c-b377-edf1f305986f.png
2025-11-25T20:38:43.319277845Z [inf]  Prompt: This scene contains: This is a room. Keep all these objects in their exact positions throughout the video. . Keep all these elements in their exact positions. INTERIOR ROOM - Smooth, constant-speed camera movement through the space. Camera can gently move forward or pan across the room to showcase the space. CRITICAL: Maintain CONSTANT speed throughout - no speeding up, no slowing down, no acceleration. Slow, cinematic movement taking the full 6 seconds. Professional real estate walkthrough feel. STRICT RULES - DO NOT VIOLATE: 1. NEVER add ceiling fans that are not already in the source image. 2. NEVER add curtains, drapes, or window treatments that are not in the source image. 3. NEVER add windows or doors that are not in the source image. 4. NEVER add furniture, fixtures, or decorations not in the source image. 5. NEVER add light fixtures, chandeliers, or pendant lights not in the source image. 6. If a ceiling fan EXISTS in the source image, it may spin slowly. Otherwise NO ceiling fans. 7. All curtains, towels, and fabrics must remain COMPLETELY STILL - no movement, no wind. 8. Stop motion BEFORE revealing any area not visible in the source image. 9. Preserve EXACT positions of all objects from the source image. OUTPUT ONLY what exists in the input image - add NOTHING new.
2025-11-25T20:38:43.320861856Z [inf]      "mode": "normal"
2025-11-25T20:38:43.320883680Z [inf]  === VIDEO API REQUEST ===
2025-11-25T20:38:43.320888585Z [inf]  Endpoint: https://api.kie.ai/api/v1/jobs/createTask
2025-11-25T20:38:43.320893044Z [inf]  Payload: {
2025-11-25T20:38:43.320899204Z [inf]    "model": "grok-imagine/image-to-video",
2025-11-25T20:38:43.320903664Z [inf]    "input": {
2025-11-25T20:38:43.320907620Z [inf]      "prompt": "This scene contains: This is a room. Keep all these objects in their exact positions throughout the video. . Keep all these elements in their exact positions. INTERIOR ROOM - Smooth, constant-speed camera movement through the space. Camera can gently move forward or pan across the room to showcase the space. CRITICAL: Maintain CONSTANT speed throughout - no speeding up, no slowing down, no acceleration. Slow, cinematic movement taking the full 6 seconds. Professional real estate walkthrough feel. STRICT RULES - DO NOT VIOLATE: 1. NEVER add ceiling fans that are not already in the source image. 2. NEVER add curtains, drapes, or window treatments that are not in the source image. 3. NEVER add windows or doors that are not in the source image. 4. NEVER add furniture, fixtures, or decorations not in the source image. 5. NEVER add light fixtures, chandeliers, or pendant lights not in the source image. 6. If a ceiling fan EXISTS in the source image, it may spin slowly. Otherwise NO ceiling fans. 7. All curtains, towels, and fabrics must remain COMPLETELY STILL - no movement, no wind. 8. Stop motion BEFORE revealing any area not visible in the source image. 9. Preserve EXACT positions of all objects from the source image. OUTPUT ONLY what exists in the input image - add NOTHING new.",
2025-11-25T20:38:43.320911943Z [inf]      "image_urls": [
2025-11-25T20:38:43.320916542Z [inf]        "https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/photos/888cb9b5-a12e-451c-b377-edf1f305986f.png"
2025-11-25T20:38:43.320920854Z [inf]      ],
2025-11-25T20:38:43.321812568Z [inf]    }
2025-11-25T20:38:43.321818785Z [inf]  }
2025-11-25T20:38:43.527552331Z [inf]  === VIDEO API RESPONSE ===
2025-11-25T20:38:43.527559408Z [inf]    }
2025-11-25T20:38:43.527562096Z [inf]  Status: 200
2025-11-25T20:38:43.527569400Z [inf]  Data: {
2025-11-25T20:38:43.527571707Z [inf]  }
2025-11-25T20:38:43.527577050Z [inf]    "code": 200,
2025-11-25T20:38:43.527579903Z [inf]  Task created with ID: c56ff75f0cc1ff99bca8ac3afce80bcb
2025-11-25T20:38:43.527584340Z [inf]    "msg": "success",
2025-11-25T20:38:43.527590210Z [inf]    "data": {
2025-11-25T20:38:43.527596101Z [inf]      "taskId": "c56ff75f0cc1ff99bca8ac3afce80bcb",
2025-11-25T20:38:43.527601658Z [inf]      "recordId": "c56ff75f0cc1ff99bca8ac3afce80bcb"
2025-11-25T20:38:43.555038950Z [inf]  Task c56ff75f0cc1ff99bca8ac3afce80bcb status: waiting
2025-11-25T20:38:43.555045649Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:39:03.556290577Z [inf]  Task c56ff75f0cc1ff99bca8ac3afce80bcb status: waiting
2025-11-25T20:39:03.556300387Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:39:03.615569797Z [inf]  Task c56ff75f0cc1ff99bca8ac3afce80bcb status: waiting
2025-11-25T20:39:03.615581938Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:39:23.618591463Z [inf]  Task c56ff75f0cc1ff99bca8ac3afce80bcb status: waiting
2025-11-25T20:39:23.618597133Z [inf]  Video generation in progress (waiting)... polling again in 10s
2025-11-25T20:39:23.678302314Z [inf]  Task c56ff75f0cc1ff99bca8ac3afce80bcb status: success
2025-11-25T20:39:23.678310735Z [inf]  Video generated successfully: https://tempfile.aiquickdraw.com/r/users/22023302-1941-47ea-91c6-2fbbbcb962f8/generated/0d1afc6d-a4a9-4dd6-814d-e40a5b40aef2/generated_video.mp4
2025-11-25T20:39:23.678316331Z [inf]  Downloading video from: https://tempfile.aiquickdraw.com/r/users/22023302-1941-47ea-91c6-2fbbbcb962f8/generated/0d1afc6d-a4a9-4dd6-814d-e40a5b40aef2/generated_video.mp4
2025-11-25T20:39:23.932260669Z [inf]  Video downloaded successfully to: /app/uploads/room-675c3c5c-8072-4770-bde7-f1a466f0cb77.mp4
2025-11-25T20:39:24.590428865Z [inf]  Cleaned up: /app/uploads/room-675c3c5c-8072-4770-bde7-f1a466f0cb77.mp4
2025-11-25T20:39:24.590442048Z [inf]  Successfully generated video for room 8
2025-11-25T20:39:24.689821297Z [inf]  Job f0f52c73-c63b-4b2d-8027-eacdc841c09e added to the queue for property: 27 NW Aveton Ln Bella Vista, Arkansas 72714 
2025-11-25T20:39:24.689829308Z [inf]  Processing job f0f52c73-c63b-4b2d-8027-eacdc841c09e for property: 27 NW Aveton Ln Bella Vista, Arkansas 72714 
2025-11-25T20:39:24.689836574Z [inf]  Downloading all clips for job...
2025-11-25T20:39:24.689842459Z [inf]  Downloading clip from: https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/videos/clips/5ed0d15d-ea76-4567-8974-ae50af968b49.mp4
2025-11-25T20:39:24.690776181Z [inf]  Downloading clip from: https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/videos/clips/09f92f13-d96a-4e23-a85d-4408929dff50.mp4
2025-11-25T20:39:24.692373678Z [inf]  Downloading clip from: https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/videos/clips/c3570d36-81d9-4666-a0b5-edd27acb8c38.mp4
2025-11-25T20:39:24.693821643Z [inf]  Downloading clip from: https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/videos/clips/a4513a1b-f0d5-4225-8c7d-c20b52120005.mp4
2025-11-25T20:39:24.695067440Z [inf]  Downloading clip from: https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/videos/clips/cc46c2f0-4302-4393-aaea-39f19ab639cb.mp4
2025-11-25T20:39:24.696172396Z [inf]  Downloading clip from: https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/videos/clips/50084fbb-6ef3-4ba9-820c-038cd518ece2.mp4
2025-11-25T20:39:24.697457332Z [inf]  Downloading clip from: https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/videos/clips/a59c8bfc-2337-4dc7-aaa6-63f1e95f6d34.mp4
2025-11-25T20:39:24.698795649Z [inf]  Downloading clip from: https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/videos/clips/fd58816b-b1ad-4af9-baa3-61199e923f32.mp4
2025-11-25T20:39:24.699968007Z [inf]  Downloading clip from: https://pub-eac40878791a42a0bece7a1974efe607.r2.dev/videos/clips/eaec376d-a41f-4c7b-8298-5a108c2267cc.mp4
2025-11-25T20:39:44.699403935Z [inf]  Processing: 1700.00% done
2025-11-25T20:39:44.699412381Z [inf]  Creating horizontal version (1080p)...
2025-11-25T20:39:44.699417812Z [inf]  Processing: 2666.67% done
2025-11-25T20:39:44.699421089Z [inf]  Concatenating 9 videos...
2025-11-25T20:39:44.699427917Z [inf]  Processing: 3750.00% done
2025-11-25T20:39:44.699430665Z [inf]  FFmpeg command: ffmpeg -f concat -safe 0 -i /app/uploads/concat-22ec8bbd-36dd-4fe6-be95-234d70e5183d.txt -y -c:v libx264 -preset slow -crf 16 -an -vf format=yuv420p /app/uploads/tour-f0f52c73-c63b-4b2d-8027-eacdc841c09e.mp4
2025-11-25T20:39:44.699437662Z [inf]  Processing: 4716.67% done
2025-11-25T20:39:44.699444834Z [inf]  Processing: 6591.67% done
2025-11-25T20:39:44.699445278Z [inf]  Processing: NaN% done
2025-11-25T20:39:44.699451561Z [inf]  Processing: 8258.33% done
2025-11-25T20:39:44.699454477Z [inf]  Processing: 33.33% done
2025-11-25T20:39:44.699461040Z [inf]  Processing: 833.33% done
2025-11-25T20:39:45.535043042Z [inf]  Processing: 10066.67% done
2025-11-25T20:39:45.701479536Z [inf]  Processing: 11941.67% done
2025-11-25T20:39:46.503433337Z [inf]  Processing: 13991.67% done
2025-11-25T20:39:46.776127850Z [inf]  Processing: 15550.00% done
2025-11-25T20:39:47.489081846Z [inf]  Processing: 17425.00% done
2025-11-25T20:39:47.836041946Z [inf]  Processing: 19300.00% done
2025-11-25T20:39:48.536959432Z [inf]  Processing: 21458.33% done
2025-11-25T20:39:48.873381447Z [inf]  Processing: 23708.33% done
2025-11-25T20:39:49.504453240Z [inf]  Processing: 26041.67% done
2025-11-25T20:39:49.914381663Z [inf]  Processing: 28225.00% done
2025-11-25T20:39:50.480814688Z [inf]  Processing: 30516.67% done
2025-11-25T20:39:50.905802597Z [inf]  Processing: 32666.67% done
2025-11-25T20:39:51.513520727Z [inf]  Processing: 34716.67% done
2025-11-25T20:39:51.937537676Z [inf]  Processing: 37250.00% done
2025-11-25T20:39:52.521163119Z [inf]  Processing: 39716.67% done
2025-11-25T20:39:52.992548195Z [inf]  Processing: 40866.67% done
2025-11-25T20:39:53.578221245Z [inf]  Processing: 42875.00% done
2025-11-25T20:39:54.072521833Z [inf]  Processing: 45241.67% done
2025-11-25T20:39:54.107779966Z [inf]  Concatenation complete: /app/uploads/tour-f0f52c73-c63b-4b2d-8027-eacdc841c09e.mp4
2025-11-25T20:39:54.107784689Z [inf]  Adding property info overlay...
2025-11-25T20:39:54.107788194Z [inf]  Uploads directory is writable: /app/uploads
2025-11-25T20:39:54.109022333Z [inf]  Adding text overlay (3s): 27 NW Aveton Ln Bella Vista, Arkansas 72714 , $365,000
2025-11-25T20:39:54.109029456Z [inf]  Input: /app/uploads/tour-f0f52c73-c63b-4b2d-8027-eacdc841c09e.mp4
2025-11-25T20:39:54.109034762Z [inf]  Output: /app/uploads/text-overlay-e661990f-2f8d-4fa7-a4d1-c5b553199768.mp4
2025-11-25T20:39:54.457900828Z [inf]  Video height: 464
2025-11-25T20:39:54.457907103Z [inf]  Filter complex: drawbox=x=10:y=389:w=220:h=60:color=black:t=fill:enable='lt(t,3)',drawtext=fontfile=/app/fonts/BebasNeue-Regular.ttf:text='27 NW Aveton Ln Bella Vista':fontsize=16:fontcolor=white:x=18:y=397:enable='lt(t,3)',drawtext=fontfile=/app/fonts/BebasNeue-Regular.ttf:text='Arkansas 72714':fontsize=12:fontcolor=white:x=18:y=414:enable='lt(t,3)',drawtext=fontfile=/app/fonts/BebasNeue-Regular.ttf:text='$365,000':fontsize=14:fontcolor=white:x=18:y=431:enable='lt(t,3)',format=yuv420p
2025-11-25T20:39:54.457915243Z [inf]  FFmpeg command: ffmpeg -i /app/uploads/tour-f0f52c73-c63b-4b2d-8027-eacdc841c09e.mp4 -y -filter:v drawbox=x=10:y=389:w=220:h=60:color=black:t=fill:enable='lt(t,3)',drawtext=fontfile=/app/fonts/BebasNeue-Regular.ttf:text='27 NW Aveton Ln Bella Vista':fontsize=16:fontcolor=white:x=18:y=397:enable='lt(t,3)',drawtext=fontfile=/app/fonts/BebasNeue-Regular.ttf:text='Arkansas 72714':fontsize=12:fontcolor=white:x=18:y=414:enable='lt(t,3)',drawtext=fontfile=/app/fonts/BebasNeue-Regular.ttf:text='$365,000':fontsize=14:fontcolor=white:x=18:y=431:enable='lt(t,3)',format=yuv420p -c:v libx264 -preset slow -crf 16 -an /app/uploads/text-overlay-e661990f-2f8d-4fa7-a4d1-c5b553199768.mp4
2025-11-25T20:39:54.457921387Z [inf]  Adding text overlay: NaN% done
2025-11-25T20:39:54.845656759Z [inf]  Adding text overlay: 0.07% done
2025-11-25T20:39:55.552383420Z [inf]  Adding text overlay: 2.52% done
2025-11-25T20:39:55.866301462Z [inf]  Adding text overlay: 4.96% done
2025-11-25T20:39:56.518097815Z [inf]  Adding text overlay: 7.26% done
2025-11-25T20:39:56.884315532Z [inf]  Adding text overlay: 9.87% done
2025-11-25T20:39:57.501705235Z [inf]  Adding text overlay: 13.54% done
2025-11-25T20:39:57.897676029Z [inf]  Adding text overlay: 17.92% done
2025-11-25T20:39:58.555302221Z [inf]  Adding text overlay: 21.89% done
2025-11-25T20:39:58.903959689Z [inf]  Adding text overlay: 25.64% done
2025-11-25T20:39:59.496127348Z [inf]  Adding text overlay: 30.23% done
2025-11-25T20:39:59.917442332Z [inf]  Adding text overlay: 34.07% done
2025-11-25T20:40:00.502033438Z [inf]  Adding text overlay: 38.04% done
2025-11-25T20:40:00.932162113Z [inf]  Adding text overlay: 42.56% done
2025-11-25T20:40:01.552964185Z [inf]  Adding text overlay: 47.08% done
2025-11-25T20:40:01.937333665Z [inf]  Adding text overlay: 51.36% done
2025-11-25T20:40:02.628233604Z [inf]  Adding text overlay: 55.50% done
2025-11-25T20:40:02.975580902Z [inf]  Adding text overlay: 60.48% done
2025-11-25T20:40:03.601076390Z [inf]  Adding text overlay: 64.78% done
2025-11-25T20:40:03.986947834Z [inf]  Adding text overlay: 68.60% done
2025-11-25T20:40:04.571198081Z [inf]  Adding text overlay: 73.58% done
2025-11-25T20:40:04.996701276Z [inf]  Adding text overlay: 78.40% done
2025-11-25T20:40:05.535007915Z [inf]  Adding text overlay: 83.45% done
2025-11-25T20:40:06.141010363Z [inf]  Adding text overlay: 88.81% done
2025-11-25T20:40:06.643157030Z [inf]  Adding text overlay: 90.80% done
2025-11-25T20:40:07.612119263Z [inf]  Adding text overlay: 99.77% done
2025-11-25T20:40:07.651200643Z [inf]  Text overlay complete: /app/uploads/text-overlay-e661990f-2f8d-4fa7-a4d1-c5b553199768.mp4
2025-11-25T20:40:07.657590615Z [inf]  Cleaned up input file: /app/uploads/tour-f0f52c73-c63b-4b2d-8027-eacdc841c09e.mp4
2025-11-25T20:40:07.657597766Z [inf]  Adding agent info end screen...
2025-11-25T20:40:07.657603117Z [inf]  Uploads directory is writable: /app/uploads
2025-11-25T20:40:07.657607722Z [inf]  Creating end screen with agent info (3s display, 1s fade)
2025-11-25T20:40:07.657612443Z [inf]  Input: /app/uploads/text-overlay-e661990f-2f8d-4fa7-a4d1-c5b553199768.mp4
2025-11-25T20:40:07.657617222Z [inf]  Output: /app/uploads/end-screen-ee344d1f-b6af-4e41-bd85-6df1552452a6.mp4
2025-11-25T20:40:07.745328214Z [inf]  End screen filter: drawtext=fontfile=/app/fonts/BebasNeue-Regular.ttf:text='The Duley Group':fontsize=72:fontcolor=white:x=(w-text_w)/2:y=h/3,drawtext=fontfile=/app/fonts/BebasNeue-Regular.ttf:text='Keller Williams Market Pro Realty - Rogers Branch':fontsize=56:fontcolor=white:x=(w-text_w)/2:y=h/2,drawtext=fontfile=/app/fonts/BebasNeue-Regular.ttf:text='(479) 616-4663':fontsize=56:fontcolor=white:x=(w-text_w)/2:y=2*h/3,format=yuv420p
2025-11-25T20:40:07.745335005Z [inf]  Creating end screen - FFmpeg command: ffmpeg -f lavfi -i color=c=black:s=1920x1080:d=3 -y -c:v libx264 -preset slow -crf 16 -vf drawtext=fontfile=/app/fonts/BebasNeue-Regular.ttf:text='The Duley Group':fontsize=72:fontcolor=white:x=(w-text_w)/2:y=h/3,drawtext=fontfile=/app/fonts/BebasNeue-Regular.ttf:text='Keller Williams Market Pro Realty - Rogers Branch':fontsize=56:fontcolor=white:x=(w-text_w)/2:y=h/2,drawtext=fontfile=/app/fonts/BebasNeue-Regular.ttf:text='(479) 616-4663':fontsize=56:fontcolor=white:x=(w-text_w)/2:y=2*h/3,format=yuv420p -an /app/uploads/end-temp-c63fdd69-5f25-4c8e-bd4e-ef7ad8f8aee5.mp4
2025-11-25T20:40:12.136515245Z [inf]  End screen created: /app/uploads/end-temp-c63fdd69-5f25-4c8e-bd4e-ef7ad8f8aee5.mp4
2025-11-25T20:40:12.145364686Z [inf]  Concatenating with fade - FFmpeg command: ffmpeg -f concat -safe 0 -i /app/uploads/concat-end-7e2054de-cd06-47ac-bb33-0bdc93658b13.txt -y -c:v libx264 -preset slow -crf 16 -an -vf format=yuv420p /app/uploads/end-screen-ee344d1f-b6af-4e41-bd85-6df1552452a6.mp4
2025-11-25T20:40:12.509993058Z [inf]  Adding end screen with fade: undefined% done
2025-11-25T20:40:12.771041367Z [inf]  Adding end screen with fade: undefined% done
2025-11-25T20:40:13.577242079Z [inf]  Adding end screen with fade: undefined% done
2025-11-25T20:40:13.817839083Z [inf]  Adding end screen with fade: undefined% done
2025-11-25T20:40:14.537845117Z [inf]  Adding end screen with fade: undefined% done
2025-11-25T20:40:14.843839008Z [inf]  Adding end screen with fade: undefined% done
2025-11-25T20:40:15.557642488Z [inf]  Adding end screen with fade: undefined% done
2025-11-25T20:40:15.922365339Z [inf]  Adding end screen with fade: undefined% done
2025-11-25T20:40:16.594734736Z [inf]  Adding end screen with fade: undefined% done
2025-11-25T20:40:16.919778337Z [inf]  Adding end screen with fade: undefined% done
2025-11-25T20:40:17.611751579Z [inf]  Adding end screen with fade: undefined% done
2025-11-25T20:40:17.945270225Z [inf]  Adding end screen with fade: undefined% done
2025-11-25T20:40:18.692703636Z [inf]  Adding end screen with fade: undefined% done
2025-11-25T20:40:18.977684649Z [inf]  Adding end screen with fade: undefined% done
2025-11-25T20:40:19.619254512Z [inf]  Adding end screen with fade: undefined% done
2025-11-25T20:40:19.989463169Z [inf]  Adding end screen with fade: undefined% done
2025-11-25T20:40:20.636361117Z [inf]  Adding end screen with fade: undefined% done
2025-11-25T20:40:21.050402602Z [inf]  Adding end screen with fade: undefined% done
2025-11-25T20:40:21.554320439Z [inf]  Adding end screen with fade: undefined% done
2025-11-25T20:40:22.036133657Z [inf]  Adding end screen with fade: undefined% done
2025-11-25T20:40:22.642868692Z [inf]  Adding end screen with fade: undefined% done
2025-11-25T20:40:23.051422396Z [inf]  Adding end screen with fade: undefined% done
2025-11-25T20:40:23.658910156Z [inf]  Adding end screen with fade: undefined% done
2025-11-25T20:40:24.132001210Z [inf]  Adding end screen with fade: undefined% done
2025-11-25T20:40:25.032181722Z [inf]  Adding end screen with fade: undefined% done
2025-11-25T20:40:25.573069057Z [inf]  Adding end screen with fade: undefined% done
2025-11-25T20:40:25.573075477Z [inf]  End screen added: /app/uploads/end-screen-ee344d1f-b6af-4e41-bd85-6df1552452a6.mp4
2025-11-25T20:40:25.573081549Z [inf]  Cleaned up temp end screen: /app/uploads/end-temp-c63fdd69-5f25-4c8e-bd4e-ef7ad8f8aee5.mp4
2025-11-25T20:40:25.573087483Z [inf]  Cleaned up input file: /app/uploads/text-overlay-e661990f-2f8d-4fa7-a4d1-c5b553199768.mp4
2025-11-25T20:40:25.573095245Z [inf]  Creating compressed MLS version...
2025-11-25T20:40:25.573101712Z [inf]  Creating compressed version...
2025-11-25T20:40:25.573109168Z [inf]  FFmpeg command: ffmpeg -i /app/uploads/end-screen-ee344d1f-b6af-4e41-bd85-6df1552452a6.mp4 -y -c:v libx264 -b:v 3M -maxrate 3M -bufsize 6M -an -vf format=yuv420p /app/uploads/end-screen-ee344d1f-b6af-4e41-bd85-6df1552452a6_compressed.mp4
2025-11-25T20:40:25.573115905Z [inf]  Compressing: NaN% done
2025-11-25T20:40:25.991793693Z [inf]  Compressing: 2.22% done
2025-11-25T20:40:26.669314685Z [inf]  Compressing: 9.11% done
2025-11-25T20:40:27.034434894Z [inf]  Compressing: 16.02% done
2025-11-25T20:40:27.605168544Z [inf]  Compressing: 21.94% done
2025-11-25T20:40:28.043332109Z [inf]  Compressing: 27.80% done
2025-11-25T20:40:28.618479374Z [inf]  Compressing: 34.55% done
2025-11-25T20:40:29.045667768Z [inf]  Compressing: 42.30% done
2025-11-25T20:40:29.835652206Z [inf]  Compressing: 48.28% done
2025-11-25T20:40:30.067880836Z [inf]  Compressing: 54.77% done
2025-11-25T20:40:30.671683012Z [inf]  Compressing: 62.08% done
2025-11-25T20:40:31.092138179Z [inf]  Compressing: 70.31% done
2025-11-25T20:40:31.671852247Z [inf]  Compressing: 78.32% done
2025-11-25T20:40:32.098316223Z [inf]  Compressing: 84.24% done
2025-11-25T20:40:32.672433277Z [inf]  Compressing: 92.25% done
2025-11-25T20:40:32.713036467Z [inf]  Compressing: 99.78% done
2025-11-25T20:40:32.760746679Z [inf]  Compression complete: /app/uploads/end-screen-ee344d1f-b6af-4e41-bd85-6df1552452a6_compressed.mp4
2025-11-25T20:40:32.760754610Z [inf]  Creating vertical version (9:16)...
2025-11-25T20:40:32.760767191Z [inf]  Creating vertical version (9:16)...
2025-11-25T20:40:32.775472864Z [inf]  FFmpeg command: ffmpeg -i /app/uploads/end-screen-ee344d1f-b6af-4e41-bd85-6df1552452a6.mp4 -y -c:v libx264 -preset slow -crf 16 -an -vf scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:black,format=yuv420p /app/uploads/end-screen-ee344d1f-b6af-4e41-bd85-6df1552452a6_vertical.mp4
2025-11-25T20:40:33.599872787Z [inf]  Creating vertical: NaN% done
2025-11-25T20:40:33.635412097Z [inf]  Creating vertical: NaN% done
2025-11-25T20:40:34.214996598Z [inf]  Creating vertical: NaN% done
2025-11-25T20:40:34.743582543Z [inf]  Creating vertical: NaN% done
2025-11-25T20:40:35.557948135Z [inf]  Creating vertical: NaN% done
2025-11-25T20:40:35.846117224Z [inf]  Creating vertical: NaN% done
2025-11-25T20:40:36.600460906Z [inf]  Creating vertical: NaN% done
2025-11-25T20:40:36.920311171Z [inf]  Creating vertical: NaN% done
2025-11-25T20:40:37.593255155Z [inf]  Creating vertical: NaN% done
2025-11-25T20:40:37.922307153Z [inf]  Creating vertical: NaN% done
2025-11-25T20:40:38.567027008Z [inf]  Creating vertical: NaN% done
2025-11-25T20:40:39.054119625Z [inf]  Creating vertical: 3.41% done
2025-11-25T20:40:39.677271264Z [inf]  Creating vertical: 4.38% done
2025-11-25T20:40:40.190073324Z [inf]  Creating vertical: 5.85% done
2025-11-25T20:40:40.627098215Z [inf]  Creating vertical: 6.96% done
2025-11-25T20:40:41.169000936Z [inf]  Creating vertical: 8.21% done
2025-11-25T20:40:41.702555556Z [inf]  Creating vertical: 9.75% done
2025-11-25T20:40:42.239090012Z [inf]  Creating vertical: 14.07% done
2025-11-25T20:40:42.899425707Z [inf]  Creating vertical: 15.80% done
2025-11-25T20:40:43.683238873Z [inf]  Creating vertical: 17.98% done
2025-11-25T20:40:43.963147412Z [inf]  Creating vertical: 19.92% done
2025-11-25T20:40:44.677560056Z [inf]  Creating vertical: 23.75% done
2025-11-25T20:40:44.951367502Z [inf]  Creating vertical: 25.92% done
2025-11-25T20:40:45.629552405Z [inf]  Creating vertical: 27.93% done
2025-11-25T20:40:45.971490638Z [inf]  Creating vertical: 29.75% done
2025-11-25T20:40:46.697786040Z [inf]  Creating vertical: 33.23% done
2025-11-25T20:40:46.981437893Z [inf]  Creating vertical: 35.12% done
2025-11-25T20:40:47.608682309Z [inf]  Creating vertical: 37.06% done
2025-11-25T20:40:48.090434164Z [inf]  Creating vertical: 38.47% done
2025-11-25T20:40:48.593518347Z [inf]  Creating vertical: 40.14% done
2025-11-25T20:40:49.077138138Z [inf]  Creating vertical: 45.16% done
2025-11-25T20:40:49.643541031Z [inf]  Creating vertical: 47.16% done
2025-11-25T20:40:50.092190665Z [inf]  Creating vertical: 49.40% done
2025-11-25T20:40:50.622216603Z [inf]  Creating vertical: 53.10% done
2025-11-25T20:40:51.140426095Z [inf]  Creating vertical: 55.39% done
2025-11-25T20:40:51.709708389Z [inf]  Creating vertical: 57.20% done
2025-11-25T20:40:52.152287388Z [inf]  Creating vertical: 59.71% done
2025-11-25T20:40:52.671594327Z [inf]  Creating vertical: 63.47% done
2025-11-25T20:40:53.191854724Z [inf]  Creating vertical: 65.56% done
2025-11-25T20:40:53.790460530Z [inf]  Creating vertical: 67.80% done
2025-11-25T20:40:54.654943723Z [inf]  Creating vertical: 69.47% done
2025-11-25T20:40:54.813085467Z [inf]  Creating vertical: 73.72% done
2025-11-25T20:40:55.722463794Z [inf]  Creating vertical: 75.75% done
2025-11-25T20:40:55.890857166Z [inf]  Creating vertical: 77.35% done
2025-11-25T20:40:56.679479185Z [inf]  Creating vertical: 79.36% done
2025-11-25T20:40:56.944679651Z [inf]  Creating vertical: 81.53% done
2025-11-25T20:40:57.632296906Z [inf]  Creating vertical: 82.64% done
2025-11-25T20:40:57.962796469Z [inf]  Creating vertical: 84.66% done
2025-11-25T20:40:58.785012904Z [inf]  Creating vertical: 86.62% done
2025-11-25T20:40:58.993612763Z [inf]  Creating vertical: 88.42% done
2025-11-25T20:40:59.650347256Z [inf]  Creating vertical: 90.65% done
2025-11-25T20:40:59.732880327Z [inf]  Creating vertical: 99.78% done
2025-11-25T20:40:59.877113473Z [inf]  Vertical version complete: /app/uploads/end-screen-ee344d1f-b6af-4e41-bd85-6df1552452a6_vertical.mp4
2025-11-25T20:40:59.877120225Z [inf]  Uploading final videos to storage...
2025-11-25T20:41:02.562718695Z [inf]  Cleaned up: /app/uploads/clip-bd394ba7-25e3-496c-a6c6-d6dcfc2f732c.mp4
2025-11-25T20:41:02.562728769Z [inf]  Cleaned up: /app/uploads/clip-aa6cdd49-fc47-4a5b-bdcc-f8d43f6e869b.mp4
2025-11-25T20:41:02.562736068Z [inf]  Cleaned up: /app/uploads/clip-ff937241-9d4b-46be-91eb-ef0d3894addc.mp4
2025-11-25T20:41:02.562742553Z [inf]  Cleaned up: /app/uploads/clip-34a85af8-eacb-4c8e-bf66-7a0c89b24676.mp4
2025-11-25T20:41:02.562749551Z [inf]  Cleaned up: /app/uploads/clip-955734ee-2a8b-4727-a03e-4d0014016a29.mp4
2025-11-25T20:41:02.562756742Z [inf]  Cleaned up: /app/uploads/clip-53fc8440-c37b-46c1-b123-0a28cee1127b.mp4
2025-11-25T20:41:02.562764581Z [inf]  Cleaned up: /app/uploads/clip-168fee7c-1963-4096-8d60-13a226eacade.mp4
2025-11-25T20:41:02.562772450Z [inf]  Cleaned up: /app/uploads/clip-e0459ab7-1f33-49b6-bb6c-ed06e7c3cd98.mp4
2025-11-25T20:41:02.562779365Z [inf]  Cleaned up: /app/uploads/clip-b2612a18-7958-44c1-a2d6-e8a32603be99.mp4
2025-11-25T20:41:02.562787115Z [inf]  Cleaned up: /app/uploads/end-screen-ee344d1f-b6af-4e41-bd85-6df1552452a6.mp4
2025-11-25T20:41:02.562793542Z [inf]  Cleaned up: /app/uploads/end-screen-ee344d1f-b6af-4e41-bd85-6df1552452a6_compressed.mp4
2025-11-25T20:41:02.562800307Z [inf]  Cleaned up: /app/uploads/end-screen-ee344d1f-b6af-4e41-bd85-6df1552452a6_vertical.mp4
2025-11-25T20:41:02.562806781Z [inf]  Finished job f0f52c73-c63b-4b2d-8027-eacdc841c09e
2025-11-25T20:41:02.562816466Z [inf]  Job f0f52c73-c63b-4b2d-8027-eacdc841c09e has completed!