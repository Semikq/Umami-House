import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function fetchAllPartners() {
    try {
        return await prisma.partners.findMany();
    }
    catch (error) {
        throw new Error(error.message);
    }
}
