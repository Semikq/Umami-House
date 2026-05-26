import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();
export async function fetchAllSale() {
    try {
        return await client.sale.findMany();
    }
    catch (error) {
        throw new Error(error.message);
    }
}
