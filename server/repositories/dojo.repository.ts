import prisma from "@/lib/prisma.client";

export const dojoRepository = {
  findAllApproved: () => prisma.dojo.findMany({
    where: { isApproved: true },
    include: {
      headCoach: { select: { firstName: true, lastName: true } },
      members: { where: { isActiveInternal: true }, select: { id: true } }
    }
  }),

  findByHeadCoachId: (headCoachId: number) =>  prisma.dojo.findFirst({
    where: { headCoachId: headCoachId },
    include: { members: true, settings: true }
  }),

  findOwnerDojo: (headCoachId: number) => prisma.dojo.findMany({
    where: { headCoachId: headCoachId },
    include: {
      headCoach: { select: { firstName: true, lastName: true } },
      members: { where: { isActiveInternal: true }, select: { id: true } }
    }
  }),

  findById: (dojoId: number) => prisma.dojo.findUnique({
    where: { id: dojoId },
    include: {
      headCoach: { select: { firstName: true, lastName: true, avatarUrl: true } },
      members: {
        where: { isActiveInternal: true },
        include: { user: { select: { firstName: true, lastName: true, avatarUrl: true } } }
      }
    }
  }),

  createDojo: (data: any) => prisma.dojo.create({ data }),
  joinDojo: (data: any) => prisma.dojoMembers.create({ data }),
  findMember: (dojoId: number, userId: number) =>
  prisma.dojoMembers.findFirst({
    where: { dojoId, userId, isActiveInternal: true }
  }),
  findMembers: (dojoId: number) => prisma.dojoMembers.findMany({
    where: { dojoId, isActiveInternal: true },
    include: { user: { select: { id: true, firstName: true, lastName: true, email: true, avatarUrl: true } } },
    orderBy: [{ role: 'asc' }, { user: { firstName: 'asc' } }]
  }),
  updateMemberRole: (id: number, role: string) => prisma.dojoMembers.update({
    where: { id },
    data: { role },
    include: { user: { select: { firstName: true, lastName: true } } }
  }),

  getTotalStudents: async (dojoId: number) => {
    return prisma.dojoMembers.count({
      where: { dojoId, role: 'STUDENT', isActiveInternal: true }
    });
  },

  getTotalAttendanceSessions: async (dojoId: number) => {
    // Replace 'attendance_sessions' with your actual table name
    return prisma.attendanceSession.count({
      where: { dojoId }
    });
  },

  getActiveAttendanceSessions: async (dojoId: number) => {
    return prisma.attendanceSession.count({ where: { dojoId } });
  },

  getUpcomingdojoInternalEvent: async (dojoId: number) => {
    return prisma.dojoInternalEvent.count({
      where: { dojoId, date: { gte: new Date() } }
    });
  },

  getPendingPromotions: async (dojoMemberId: number) => {
    return prisma.promotion.count({
      where: { dojoMemberId}
    });
  },
  async findDojoByCoach(coachId: number): Promise<any> {
    return await prisma.dojo.findFirst({
      where: { 
        headCoachId: coachId 
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
              }
            }
          }
        },
        settings: true,
        beltRanks: true
      }
    });
  },
  async findMemberInCurrentDojo(userId: number, coachId: number): Promise<any> {
    const dojo = await this.findDojoByCoach(coachId);
    
    if (!dojo) {
      return null;
    }

    return await prisma.dojoMembers.findFirst({
      where: {
        dojoId: dojo.id,
        userId: userId
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        dojo: true
      }
    });
  }
};
