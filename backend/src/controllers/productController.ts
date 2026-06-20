import { Request, Response } from 'express';
import { Product } from '../models';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, status } = req.body;
    const product = await Product.create({ name, price, status });
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error });
  }
};
