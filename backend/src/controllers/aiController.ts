import { Request, Response } from 'express';
import { getSalesForecast } from '../services/aiService';

export const generateForecast = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;
    const forecast = await getSalesForecast(prompt || "Predict tomorrow's revenue.");
    res.json({ success: true, data: forecast });
  } catch (error) {
    res.status(500).json({ success: false, message: 'AI Service Error' });
  }
};
