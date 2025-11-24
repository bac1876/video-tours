import { Router, Request, Response } from 'express';
import { videoQueue } from '../services/queue.service';
import { asyncHandler } from '../utils/errors';

const router = Router();

router.get(
  '/:jobId',
  asyncHandler(async (req: Request, res: Response) => {
    const { jobId } = req.params;
    const job = await videoQueue.getJob(jobId);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    const state = await job.getState();
    const progress = job.progress;
    const returnValue = job.returnvalue;

    res.json({
      success: true,
      jobId,
      state,
      progress,
      result: returnValue,
    });
  })
);

export default router;
