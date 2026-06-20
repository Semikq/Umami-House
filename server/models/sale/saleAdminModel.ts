import { Uuid, AddSale, UpdateSale } from "../TypesModel/saleTypes.js";
import { uploadImageToStorage } from "../../services/storageUpload.js";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient()

export async function uploadSaleImage({
    data,
    mimeType,
    title,
}: {
    data: string,
    mimeType: string,
    title?: string,
}): Promise<{ image_url: string, title: string }> {
    return uploadImageToStorage({ data, mimeType, title, folder: "sales" });
}

export async function addSale({ title, image_url, active}: AddSale): Promise<Prisma.saleGetPayload<{}>> {
    try {
        return await prisma.sale.create({ data: { title, image_url, active } })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function updateSale(
    { uuid }: Uuid,
    { title, image_url, active }: UpdateSale,
): Promise<Prisma.saleGetPayload<{}>> {
    try {
        return await prisma.sale.update({
            where: { uuid },
            data: { title: title.trim(), image_url, active },
        })
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
