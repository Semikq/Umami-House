import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function addSale({ title, image_url, active }) {
    try {
        return await prisma.sale.create({ data: { title, image_url, active } });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function updateSale({ uuid }, { active }) {
    try {
        return await prisma.sale.update({ where: { uuid }, data: { active } });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function deleteSale({ uuid }) {
    try {
        await prisma.sale.delete({ where: { uuid } });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
