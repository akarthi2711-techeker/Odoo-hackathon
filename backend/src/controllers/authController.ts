import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role_id } = req.body;
    
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password_hash,
      role_id: role_id || 2
    });

    res.status(201).json({ message: 'User created successfully', user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        role_id: user.role_id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: { id: user.id, name: user.name, role_id: user.role_id } });
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
