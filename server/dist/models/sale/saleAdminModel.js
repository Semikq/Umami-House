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
export async function uploadSaleImage({ data, mimeType, title, }) {
    const ext = MIME_TO_EXT[mimeType] ?? "jpg";
    const filename = `${randomUUID()}.${ext}`;
    const uploadsDir = path.join("uploads", "action");
    await fs.mkdir(uploadsDir, { recursive: true });
    await fs.writeFile(path.join(uploadsDir, filename), Buffer.from(data, "base64"));
    return {
        image_url: `/uploads/action/${filename}`,
        title: title?.trim() || filename,
    };
}
export async function addSale({ title, image_url, active }) {
    try {
        return await prisma.sale.create({ data: { title, image_url, active } });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function updateSale({ uuid }, { title, image_url, active }) {
    try {
        return await prisma.sale.update({
            where: { uuid },
            data: { title: title.trim(), image_url, active },
        });
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
