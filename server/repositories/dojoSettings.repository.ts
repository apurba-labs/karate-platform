import prisma from "@/lib/prisma.client";

export class DojoSettingsRepository {

    async getByDojoId(dojoId: number) {
        if (!dojoId) {
            throw new Error('User ID is required');
        }
        return prisma.dojoSettings.findUnique({
            where: { dojoId: dojoId },
        });
    }

}