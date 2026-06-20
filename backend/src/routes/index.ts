import { Router } from 'express';
import authRoutes from './auth';
import aiRoutes from './ai';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

router.use('/auth', authRoutes);
router.use('/ai', aiRoutes);

export default router;
