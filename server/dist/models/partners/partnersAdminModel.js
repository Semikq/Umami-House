import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function addPartners({ name, logo_img, link_website, active }) {
    try {
        return await prisma.partners.create({ data: { name, logo_img, link_website, active } });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function updatePartners({ uuid, name, logo_img, link_website, active }) {
    try {
        return await prisma.partners.update({
            where: { uuid },
            data: { name, logo_img, link_website, active }
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function deletePartners({ uuid }) {
    try {
        await prisma.partners.delete({ where: { uuid } });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
