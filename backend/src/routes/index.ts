import { Router } from 'express';
import authRoutes from './auth';
import aiRoutes from './ai';
import productRoutes from './products';
import orderRoutes from './orders';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

router.use('/auth', authRoutes);
router.use('/ai', aiRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);

export default router;
