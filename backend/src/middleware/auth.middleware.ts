import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthTokenPayload } from '../types/user.types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      user?: AuthTokenPayload;
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: No token provided' });
    return;
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
    req.userId = decoded.userId;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
    return;
  }
};

export const validateProfileOwnership = (req: Request, res: Response, next: NextFunction): void => {
  const requestedUserId = req.params.id;

  if (requestedUserId && requestedUserId !== req.userId) {
    res.status(403).json({ error: 'Forbidden: Cannot access another user\'s profile' });
    return;
  }

  next();
};
