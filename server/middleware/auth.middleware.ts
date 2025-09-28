import { Response, NextFunction } from "express";
import {verifyToken} from "@/utils/jwt";
import { AuthRequest } from '@/types/auth.types';


//verify JWT
export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    res.status(401).json({ error: 'Access token required' });
    return;
  }

  try {
    const decoded = verifyToken(token);
    if (!decoded?.id || !decoded?.username || !decoded?.role) {
        res.status(403).json({ error: 'Invalid token payload' });
        return;
    }
    req.user = {
      id: decoded.id,
      username: decoded.username,
      email: decoded.email || null, 
      role: decoded.role,
      iss: decoded.iss,
      aud: decoded.aud,
    };
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};
