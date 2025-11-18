import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import { errorHandler } from './utils/errors';
import * as path from 'path';
import * as fs from 'fs';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;

const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Sora Home Walkthrough Generator API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      upload: 'POST /api/upload',
      generateRoomVideo: 'POST /api/generate/room-video',
      generateFullTour: 'POST /api/generate/full-tour',
    },
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   Sora Home Walkthrough Generator API                    ║
║                                                           ║
║   Server running on: http://localhost:${PORT}              ║
║   Environment: ${process.env.NODE_ENV || 'development'}                                   ║
║                                                           ║
║   Endpoints:                                             ║
║   - POST /api/upload                                     ║
║   - POST /api/generate/room-video                        ║
║   - POST /api/generate/full-tour                         ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

export default app;
