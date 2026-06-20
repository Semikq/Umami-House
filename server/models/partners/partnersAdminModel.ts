import { Uuid, AddPartners, UpdatePartners } from "../TypesModel/partnersTypes.js";
import { uploadImageToStorage } from "../../services/storageUpload.js";
import { Prisma, PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export async function uploadPartnerLogo({
    data,
    mimeType,
    title,
}: {
    data: string,
    mimeType: string,
    title?: string,
}): Promise<{ logo_img: string, title: string }> {
    const uploaded = await uploadImageToStorage({ data, mimeType, title, folder: "partners" });
    return {
        logo_img: uploaded.image_url,
        title: uploaded.title,
    };
}

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
