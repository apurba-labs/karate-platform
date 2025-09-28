import jwt from 'jsonwebtoken';
import { env } from "@/config/env";
import { TokenPayload } from '@/types/auth.types';

export const generateToken = (id: number, username: string, role: string, email?: string): string => {
  const jwtSecret: string = env.JWT_SECRET;
  const expiresIn: string | number = env.JWT_EXPIRES_IN || '1h';

  const payload: TokenPayload = {
    id,
    username,
    email,
    role,
    iss: 'karate-platform',
    aud: 'karate-platform-users'
  };
  
  try {
    return jwt.sign(payload, jwtSecret, { expiresIn });
  } catch (error) {
    throw new Error(`Error generating JWT`);
  }
};

export const verifyToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}
