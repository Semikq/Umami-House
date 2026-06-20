import { randomUUID } from "crypto";
import fs from "fs/promises";
import path from "path";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const MIME_TO_EXT = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
};
export async function uploadPartnerLogo({ data, mimeType, title, }) {
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
