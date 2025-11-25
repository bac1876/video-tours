import { Router } from 'express';
import uploadRoutes from './upload';
import generateRoutes from './generate';
import statusRoutes from './status';

const router = Router();

router.use('/upload', uploadRoutes);
router.use('/generate', generateRoutes);
router.use('/status', statusRoutes);

router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Video Tours API is running',
    timestamp: new Date().toISOString(),
  });
});

export default router;
