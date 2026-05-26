import { Uuid, AddPartners, UpdatePartners } from "../TypesModel/partnersTypes.js";
import { Prisma, PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export async function addPartners({ name, logo_img, link_website, active }: AddPartners): Promise<Prisma.partnersGetPayload<{}>> {
    try {
        return await prisma.partners.create({ data: { name, logo_img, link_website, active } })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function updatePartners({ uuid, name, logo_img, link_website, active }: UpdatePartners): Promise<Prisma.partnersGetPayload<{}>> {
    try {
        return await prisma.partners.update({
            where: { uuid },
            data: { name, logo_img, link_website, active }
        })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function deletePartners({ uuid }: Uuid): Promise<void> {
    try {
        await prisma.partners.delete({ where: { uuid } })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}
