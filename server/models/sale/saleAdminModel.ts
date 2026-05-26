import { Uuid, AddSale, UpdateSale } from "../TypesModel/saleTypes.js";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient()

export async function addSale({ title, image_url, active}: AddSale): Promise<Prisma.saleGetPayload<{}>> {
    try {
        return await prisma.sale.create({ data: { title, image_url, active } })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function updateSale({ uuid }: Uuid, { active }: UpdateSale): Promise<Prisma.saleGetPayload<{}>> {
    try {
        return await prisma.sale.update({ where: { uuid }, data: { active } })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function deleteSale({ uuid }: Uuid): Promise<void> {
    try {
        await prisma.sale.delete({ where: { uuid } })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}
