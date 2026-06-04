import { Request, Response } from "express";
import validator from "validator";

import { AuthService } from '@/services/auth.service';
import { AuthRepository } from '@/repositories/auth.repository';

interface AuthenticatedRequest extends Request {
    user?: {
        id: number;
        username: string;
        email: string;
        role: string;
    };
}

const authService = new AuthService(new AuthRepository());

export const register = async (req: Request, res: Response) => {
    try {
        const {
          username,
          email,
          password,
          firstName,
          lastName,
          dob,
          role,
          phone,
          country,
          bio,
          dojoId, 
          since,
          inviteCode,
          internalBeltRank,
          dateOfJoining,
          emergencyContact,
          notes,
        } = req.body;

        const usernameStr = String(username ?? '').trim();
        const passwordStr = String(password ?? '');
        const phoneStr = String(phone ?? '');

        if (!usernameStr) {
            return res.status(400).json({ error: 'Username is required' });
        }
        if (passwordStr.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }

        let emailStr: string | undefined;
        if (typeof email === 'string' && email.trim() !== '') {
            const candidate = email.trim().toLowerCase();
            if (!validator.isEmail(candidate)) {
              return res.status(400).json({ error: 'Invalid email format' });
            }
            emailStr = candidate;
        }

        const existingByUsername = await authService.getUserByUsername(usernameStr);
        if (existingByUsername) {
          return res.status(400).json({ message: 'Username already taken' });
        }

        if (emailStr) {
          const existingByEmail = await authService.getUserByEmail(emailStr);
          if (existingByEmail) {
            return res.status(400).json({ message: 'Email already in use' });
          }
        }

        if (phoneStr) {
          const existingByPhone = await authService.getUserByPhone(phoneStr);
          if (existingByPhone) {
            return res.status(400).json({ message: 'Phone already in use' });
          }
        }

        const userData: any = {
          username: usernameStr,
          password: passwordStr,
          firstName,
          lastName,
          dob,
          role,
          phone:phoneStr,
          country,
          bio,
          dojoId, 
          since,
          inviteCode,
          internalBeltRank,
          dateOfJoining,
          emergencyContact,
          notes,
        };

        if (emailStr) userData.email = emailStr;

        const { user, token } = await authService.registerUser(userData);

        res.status(200).json({
            message: 'User created successfully',
            user,
            token,
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { identifier, username, email, password } = req.body;
    
    const result = await authService.loginUser({
      identifier,
      username,
      email,
      password
    });

    res.status(200).json(result);
  } catch (error: any) {
    const status = error.message === 'INVALID_CREDENTIALS' ? 401 : 400;
    res.status(status).json({ error: error.message });
  }
};

export const me = async (req: AuthenticatedRequest, res: Response) => {
    try {
        // Check if user is authenticated
        if (!req.user?.id) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const userId = req.user.id;
        
        // Validate user ID is a positive number
        if (userId <= 0 || !Number.isInteger(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        const profile = await authService.me(userId);
        return res.status(200).json(profile);
    } catch (e: any) {
        console.error('Me controller error:', e);
        
        const status = e.message === 'NOT_FOUND' ? 404 : 
                      e.message === 'USER_ID_REQUIRED' ? 400 : 500;
        
        return res.status(status).json({ 
            error: e.message ?? 'Internal Server Error' 
        });
    }

};
