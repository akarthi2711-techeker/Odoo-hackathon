import { Request, Response } from 'express';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { items, total } = req.body;
    
    // In a real app we'd save to DB here
    const orderId = Math.floor(Math.random() * 10000);
    const newOrder = { id: orderId, items, total, status: 'To Cook' };

    // Emit event to all connected clients (specifically the KDS)
    const io = req.app.get('io');
    if (io) {
      io.emit('new_order', newOrder);
    }

    res.status(201).json({ success: true, data: newOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error });
  }
};
