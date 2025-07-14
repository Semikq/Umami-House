import { Id, AddPartners, UpdatePartners } from "../TypesModel/partnersTypes";
import { Prisma, PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export async function addPartners({ name, logo_img, link_website, active }: AddPartners): Promise<Prisma.partnersGetPayload<{}>> {
    try {
        return await prisma.partners.create({ data: { name, logo_img, link_website, active } })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function updatePartners({ id }: Id, { name, logo_img, link_website, active }: UpdatePartners): Promise<Prisma.partnersGetPayload<{}>> {
    try {
        return await prisma.partners.update({
            where: { id },
            data: { name, logo_img, link_website, active }
        })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function deletePartners({ id }: Id): Promise<void> {
    try {
        await prisma.partners.delete({ where: { id } })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}