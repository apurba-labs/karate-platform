// src/middleware/dojoAuth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { dojoService } from '@/services/dojo.service';
import { AuthRequest } from '@/types/auth.types';
interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    username: string;
    email?: string | null;
    role: string;
    iss: string;
    aud: string;
  };
  currentDojo?: any;
  dojoMember?: any;
}

export const authorizeDojoAccess = (requiredRole: 'owner' | 'coach' | 'member' | null = null) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {

      const authenticatedReq = req as AuthenticatedRequest;
      const userId = authenticatedReq.user.id;

      // Get coach's dojo (session-based)
      const dojo = await dojoService.findDojoByCoach(userId);

      if (!dojo) {
        return res.status(404).json({ error: 'Dojo not found. Please create a dojo first.' });
      }

      // Check membership in the coach's dojo
      const memberRecord = await dojoService.findMember(dojo.id, userId);

      if (!memberRecord) {
        return res.status(403).json({ error: 'Access denied. Not a member of this dojo.' });
      }

      // Role check
      if (requiredRole) {
        const requiredRoles = {
          owner: ['OWNER'],
          coach: ['OWNER', 'COACH'],
          member: ['OWNER', 'COACH', 'STUDENT'],
        };
        
        if (!requiredRoles[requiredRole]?.includes(memberRecord.role)) {
          return res.status(403).json({ error: `Access denied. ${requiredRole} role required.` });
        }
      }

      // Attach dojo and member info to request
      authenticatedReq.currentDojo = dojo;
      authenticatedReq.dojoMember = memberRecord;
      
      next();
    } catch (err) {
      console.error('Dojo middleware error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
};

// Simplified middleware for basic dojo access (no role requirement)
export const requireDojoAccess = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authenticatedReq = req as AuthenticatedRequest;
    const userId = authenticatedReq.user.id;

    // Get coach's dojo
    const dojo = await dojoService.findDojoByCoach(userId);

    if (!dojo) {
      return res.status(404).json({ error: 'Dojo not found' });
    }

    authenticatedReq.currentDojo = dojo;
    next();
  } catch (err) {
    console.error('Dojo access middleware error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};