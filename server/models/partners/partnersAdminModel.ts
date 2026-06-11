import { randomUUID } from "crypto";
import fs from "fs/promises";
import path from "path";
import { Uuid, AddPartners, UpdatePartners } from "../TypesModel/partnersTypes.js";
import { Prisma, PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const MIME_TO_EXT: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
};

export async function uploadPartnerLogo({
    data,
    mimeType,
    title,
}: {
    data: string,
    mimeType: string,
    title?: string,
}): Promise<{ logo_img: string, title: string }> {
    const ext = MIME_TO_EXT[mimeType] ?? "png";
    const filename = `${randomUUID()}.${ext}`;
    const uploadsDir = path.join("uploads", "partners");

    await fs.mkdir(uploadsDir, { recursive: true });
    await fs.writeFile(path.join(uploadsDir, filename), Buffer.from(data, "base64"));

    return {
        logo_img: `/uploads/partners/${filename}`,
        title: title?.trim() || filename,
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
