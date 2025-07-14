import { Id, AddSale, UpdateSale } from "../TypesModel/saleTypes";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient()

export async function addSale({ title, image_url, active}: AddSale): Promise<Prisma.saleGetPayload<{}>> {
    try {
        return await prisma.sale.create({ data: { title, image_url, active } })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function updateSale({ id }: Id, { active }: UpdateSale): Promise<Prisma.saleGetPayload<{}>> {
    try {
        return await prisma.sale.update({ where: { id }, data: { active } })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function deleteSale({ id }: Id): Promise<void> {
    try {
        await prisma.sale.delete({ where: { id } })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}