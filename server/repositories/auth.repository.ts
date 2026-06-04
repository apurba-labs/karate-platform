import prisma from "@/lib/prisma.client";
import { RegisterWithDojo } from '@/types/auth.types'; 
export class AuthRepository {
    async getUserById(userId: number) {
        if (!userId) {
            throw new Error('User ID is required');
        }
        return prisma.user.findUnique({
            where: { id: userId },
        });
    }
    async getUserByUsername(username: string) {
        if (!username) {
            throw new Error('Username is required');
        }
        return prisma.user.findUnique({ 
            where: { username } 
        });
    }

    async getUserByEmail(email: string) {
        if (!email) {
            throw new Error('Email is required');
        }
        return prisma.user.findUnique({ 
            where: { email } 
        });
    }
    async getUserByPhone(phone: string) {
        if (!phone) {
            throw new Error('Phone is required');
        }
        return prisma.user.findUnique({ 
            where: { phone } 
        });
    }

async buildDojoRelation(data: RegisterWithDojo) {
    if (!data.dojoId) return undefined;

    return {
      create: {
        dojoId: data.dojoId,
        role: 'STUDENT',
        since: data.since ? new Date(data.since) : new Date(),
        dateOfJoining: data.dateOfJoining ? new Date(data.dateOfJoining) : new Date(),
        isPrimary: true,
        internalBeltRank: data.internalBeltRank ?? null,
        emergencyContact: data.emergencyContact ?? null,
        notes: data.notes ?? null,
        parentId: data.parentId ?? null,
      },
    };
  }

async createUser(data: RegisterWithDojo) {
    const dojos = Array.isArray(data.dojos) ? data.dojos : [];

    if (dojos.length > 0) {
        return prisma.user.create({
            data: {
                username: data.username,
                email: data.email ?? null,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone ?? null,
                dob: data.dob ?? null,
                role: data.role as any,
                country: data.country ?? null,
                bio: data.bio ?? null,
                dojos: {
                    create: dojos.map((dojo: any) => ({
                        dojoId: dojo.dojoId,
                        role: dojo.role || 'STUDENT',
                        since: dojo.since ? new Date(dojo.since) : new Date(),
                        isPrimary: dojo.isPrimary || false,
                        internalBeltRank: dojo.internalBeltRank ?? null,
                        dateOfJoining: dojo.dateOfJoining ? new Date(dojo.dateOfJoining) : null,
                        emergencyContact: dojo.emergencyContact ?? null,
                        notes: dojo.notes ?? null,
                        parentId: dojo.parentId ?? null,
                    }))
                }
            }
        });
    }

    // If no dojos are present, create user without dojos
    return prisma.user.create({
        data: {
            username: data.username,
            email: data.email ?? null,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone ?? null,
            dob: data.dob ?? null,
            role: data.role as any,
            country: data.country ?? null,
            bio: data.bio ?? null,
        },
    });
}

}