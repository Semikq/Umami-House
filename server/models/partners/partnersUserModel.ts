import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient()

export async function fetchAllPartners(): Promise<Prisma.partnersGetPayload<{}>[]> {
    try {
        return await prisma.partners.findMany()
    } catch (error) {
        throw new Error((error as Error).message)
    }
}