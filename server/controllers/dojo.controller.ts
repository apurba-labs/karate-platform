// src/controllers/dojo.controller.ts
import { Request, Response } from 'express';
import { dojoService } from '@/services/dojo.service';
interface AuthenticatedRequest extends Request {
  user: {
    userId: number;
    username: string;
    role: string;
  };
  currentDojo?: any;
  dojoMember?: any;
}

export interface DojoStatus {
  totalStudents: number;
  attendanceRate: number;
  upcomingTests: number;
  pendingPromotions: number;
  activeClasses: number;
  totalClasses: number;
}

export interface DojoActivity {
  id: number;
  type: 'attendance' | 'promotion' | 'test' | 'other';
  message: string;
  timestamp: string;
  icon: string;
}

export const dojoController = {
    getAllDojos: async (req: Request, res: Response) => {
        try {
        const dojos = await dojoService.getAllApproved();
        res.json(dojos);
        } catch (err) {
        console.error('Get all dojos error:', err);
        res.status(500).json({ error: 'Internal server error' });
        }
    },

    getOwnerDojos: async (req: Request, res: Response) => {
        try {
            const headCoachId = parseInt(req.params.headCoachId);
            const dojos = await dojoService.findOwnerDojo(headCoachId);
            res.json(dojos);
        } catch (err) {
            console.error('Get all dojos error:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    myDojo: async (req: Request, res: Response) => {
        try {
            const authenticatedReq = req as AuthenticatedRequest;
            res.json(authenticatedReq.currentDojo);
        } catch (err) {
            console.error('Get dojo error:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    getDojoById: async (req: Request, res: Response) => {
        try {
        const dojoId = parseInt(req.params.dojoId);
        const dojo = await dojoService.getById(dojoId);
        if (!dojo) return res.status(404).json({ error: 'Dojo not found' });
        res.json(dojo);
        } catch (err) {
        console.error('Get dojo error:', err);
        res.status(500).json({ error: 'Internal server error' });
        }
    },

    createDojo: async (req: Request, res: Response) => {
        try {
            const { name, description, country, city, website, headCoachId } = req.body;
            const dojo = await dojoService.createDojo({
                name, description, country, city, website,
                headCoachId: headCoachId,
                members: {
                    create: {
                        userId: headCoachId,
                        role: 'OWNER',
                        since: new Date(),
                        isPrimary: true,
                        dateOfJoining: new Date()
                    }
                }
            });
        res.status(201).json(dojo);
        } catch (err) {
        console.error('Create dojo error:', err);
        res.status(500).json({ error: 'Internal server error' });
        }
    },

    joinDojo: async (req: Request, res: Response) => {
        try {
            const { 
                userId, 
                dojoId, 
                role, 
                since, 
                dateOfJoining, 
                isPrimary,
                internalBeltRank,
                emergencyContact,
                notes,
                parentId 
            } = req.body;
            const membership = await dojoService.joinDojo({
                userId, dojoId, role, since, dateOfJoining,
                    isPrimary, internalBeltRank,emergencyContact,
                    notes, parentId
            });
            res.status(201).json(membership);
        } catch (err) {
            console.error('Join dojo error:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    findMember: async (req: Request, res: Response) => {
        try {
            const dojoId = parseInt(req.params.dojoId);
            const userId = parseInt(req.params.memberId);
            const members = await dojoService.findMember(dojoId, userId);
            res.json(members);
        } catch (err) {
            console.error('Get members error:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    getMembers: async (req: Request, res: Response) => {
        try {
        const dojoId = parseInt(req.params.dojoId);
        const members = await dojoService.getMembers(dojoId);
        res.json(members);
        } catch (err) {
        console.error('Get members error:', err);
        res.status(500).json({ error: 'Internal server error' });
        }
    },

    updateMemberRole: async (req: Request, res: Response) => {
        try {
        const memberId = parseInt(req.params.memberId);
        const { role } = req.body;
        const updated = await dojoService.updateMemberRole(memberId, role);
        res.json(updated);
        } catch (err) {
        console.error('Update member role error:', err);
        res.status(500).json({ error: 'Internal server error' });
        }
    },

    /**
     * GET /api/dojos/:dojoId/status
     */
    getDojoStatus : async (req: Request, res: Response) => {
        try {
            const dojoId = parseInt(req.params.dojoId);
            const status = await dojoService.getStatus(dojoId);
            return res.json(status);
        } catch (error) {
            console.error('Dojo status error:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    /**
     * GET /api/dojos/:dojoId/activity
     */
    getDojoActivity : async (req: Request, res: Response) => {
        try {
            const dojoId = parseInt(req.params.dojoId);

            // Example: fetch recent 10 activities
            const activities: DojoActivity[] = [
            {
                id: 1,
                type: 'attendance',
                message: 'Attendance recorded for Monday class',
                timestamp: new Date('2023-10-15T10:30:00Z').toISOString(),
                icon: '📊',
            },
            {
                id: 2,
                type: 'promotion',
                message: 'Belt test scheduled for Sarah Johnson',
                timestamp: new Date('2023-10-14T14:20:00Z').toISOString(),
                icon: '⭐',
            },
            ];

            // In real app, you would query a `dojoActivities` table with Prisma:
            // const activities = await prisma.dojoActivities.findMany({ where: { dojoId }, orderBy: { timestamp: 'desc' }, take: 10 });

            return res.json(activities);
        } catch (error) {
            console.error('Dojo activity error:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
    settings : async (req: Request, res: Response) => {
        try {
            const authenticatedReq = req as AuthenticatedRequest;
            const dojoId = parseInt(authenticatedReq.currentDojo.id);
            const status = await dojoService.getSettingsByDojoId(dojoId);
            return res.json(status);
        } catch (error) {
            console.error('Dojo status error:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

};
