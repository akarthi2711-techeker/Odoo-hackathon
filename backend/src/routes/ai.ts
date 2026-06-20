import { Router } from 'express';
import { generateForecast } from '../controllers/aiController';

const router = Router();

// @route   POST api/ai/forecast
// @desc    Get AI Sales Forecast via Amazon Bedrock
// @access  Private (Admin)
router.post('/forecast', generateForecast);

export default router;
