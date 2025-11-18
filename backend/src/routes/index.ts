import { Router } from 'express';
import uploadRoutes from './upload';
import generateRoutes from './generate';

const router = Router();

router.use('/upload', uploadRoutes);
router.use('/generate', generateRoutes);

router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Sora Walkthrough API is running',
    timestamp: new Date().toISOString(),
  });
});

export default router;
