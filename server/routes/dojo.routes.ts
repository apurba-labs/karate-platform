// src/routes/dojo.routes.ts
import express from 'express';
import { authenticateToken } from "@/middleware/auth.middleware";
import { requireDojoAccess  } from '@/middleware/dojo.middleware';
import { dojoController } from '@/controllers/dojo.controller';

const router = express.Router();

// All dojo routes require authentication
router.use(authenticateToken);


// Public
//router.get('/', dojoController.getAllDojos);
//router.get('/:headCoachId/owner', dojoController.getOwnerDojos);
//router.get('/:dojoId', dojoController.getDojoById);

// Protected
//router.post('/', requireDojoAccess, dojoController.createDojo);
router.get('/my-dojo', requireDojoAccess , dojoController.myDojo);
//router.post('/:dojoId/join', authenticateToken, dojoController.joinDojo);
//router.get('/:dojoId/members', authenticateToken, authorizeDojoAccess('member'), dojoController.getMembers);
//router.patch('/:dojoId/members/:memberId', authenticateToken, authorizeDojoAccess('coach'), dojoController.updateMemberRole);
//router.get('/status', authenticateToken, authorizeDojoAccess('coach'), dojoController.getDojoStatus);
router.get('/activity', requireDojoAccess, dojoController.getDojoActivity);

router.get('/:dojoId/settings', requireDojoAccess, dojoController.settings);

export default router;
