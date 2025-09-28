import { dojoRepository } from '@/repositories/dojo.repository';
import { DojoSettingsRepository } from '@/repositories/dojoSettings.repository';

const dojoSettings = new DojoSettingsRepository();
export const dojoService = {
  getAllApproved: () => dojoRepository.findAllApproved(),
  findOwnerDojo: (headCoachId: number) => dojoRepository.findOwnerDojo(headCoachId),
  getById: (dojoId: number) => dojoRepository.findById(dojoId),
  getByHeadCoachId: (dojoId: number) => dojoRepository.findByHeadCoachId(dojoId),
  createDojo: (data: any) => dojoRepository.createDojo(data),
  joinDojo: (data: any) => dojoRepository.joinDojo(data),
  getMembers: (dojoId: number) => dojoRepository.findMembers(dojoId),
  findMember: (dojoId: number, userId: number) => dojoRepository.findMember(dojoId, userId),
  updateMemberRole: (id: number, role: string) => dojoRepository.updateMemberRole(id, role),
  getStatus: async (dojoId: number) => {
    const [
      totalStudents,
      totalAttendanceSessions,
      activeAttendanceSessions,
      upcomingTests,
      pendingPromotions
    ] = await Promise.all([
      dojoRepository.getTotalStudents(dojoId),
      dojoRepository.getTotalAttendanceSessions(dojoId),
      dojoRepository.getActiveAttendanceSessions(dojoId),
      dojoRepository.getUpcomingdojoInternalEvent(dojoId),
      dojoRepository.getPendingPromotions(dojoId)
    ]);

    return {
      totalStudents,
      totalSessions: totalAttendanceSessions,
      activeSessions: activeAttendanceSessions,
      upcomingTests,
      pendingPromotions
    };
  },

  getSettingsByDojoId: (dojoId: number) => dojoSettings.getByDojoId(dojoId),

  findDojoByCoach:(coachId: number) => dojoRepository.findDojoByCoach(coachId),
  findMemberInCurrentDojo:(userId: number, coachId: number) => dojoRepository.findMemberInCurrentDojo(userId, coachId),
};
