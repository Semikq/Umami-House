import { PrismaClient, Prisma } from "@prisma/client";
const client = new PrismaClient();

export async function fetchAllSale(): Promise<Prisma.saleGetPayload<{}>[]> {
    try {
        return await client.sale.findMany()
    } catch (error) {
        throw new Error((error as Error).message)
    }
}