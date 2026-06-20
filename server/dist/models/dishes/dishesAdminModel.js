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
export async function uploadDishImage({ data, mimeType, title, }) {
    const ext = MIME_TO_EXT[mimeType] ?? "jpg";
    const filename = `${randomUUID()}.${ext}`;
    const uploadsDir = path.join("uploads", "dishes");
    await fs.mkdir(uploadsDir, { recursive: true });
    await fs.writeFile(path.join(uploadsDir, filename), Buffer.from(data, "base64"));
    return {
        image_url: `/uploads/dishes/${filename}`,
        title: title?.trim() || filename,
    };
}
function parseDishNumber(value) {
    return typeof value === "string" ? parseInt(value, 10) : value;
}
export async function addDish({ name, weight, price, frozen, spicy, ingredients, sub_category_uuid, active, corporate_type, wholesale_min_qty, wholesale_price, images }) {
    try {
        return await prisma.$transaction(async (tx) => {
            const dish = await tx.dishes.create({
                data: {
                    name,
                    weight: parseDishNumber(weight),
                    price: parseDishNumber(price),
                    frozen,
                    spicy,
                    ingredients,
                    sub_category_uuid,
                    active,
                    corporate_type: corporate_type || null,
                    wholesale_min_qty: corporate_type ? wholesale_min_qty ?? null : null,
                    wholesale_price: corporate_type ? wholesale_price ?? null : null,
                }
            });
            if (images.length > 0) {
                const dishImagesData = images.map((image) => ({
                    title: image.title,
                    image_url: image.image_url,
                    dish_uuid: dish.uuid
                }));
                await tx.dish_images.createMany({ data: dishImagesData });
            }
            return tx.dishes.findUniqueOrThrow({
                where: { uuid: dish.uuid },
                include: { dish_images: true }
            });
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function updateDish({ uuid }, { name, weight, price, frozen, spicy, ingredients, sub_category_uuid, active, corporate_type, wholesale_min_qty, wholesale_price, images }) {
    try {
        return await prisma.$transaction(async (tx) => {
            await tx.dishes.update({
                where: { uuid },
                data: {
                    name,
                    weight: parseDishNumber(weight),
                    price: parseDishNumber(price),
                    frozen,
                    spicy,
                    ingredients,
                    sub_category_uuid,
                    active,
                    corporate_type: corporate_type || null,
                    wholesale_min_qty: corporate_type ? wholesale_min_qty ?? null : null,
                    wholesale_price: corporate_type ? wholesale_price ?? null : null,
                }
            });
            await tx.dish_images.deleteMany({ where: { dish_uuid: uuid } });
            if (images.length > 0) {
                const updateDishImages = images.map((image) => ({
                    title: image.title,
                    image_url: image.image_url,
                    dish_uuid: uuid
                }));
                await tx.dish_images.createMany({ data: updateDishImages });
            }
            return tx.dishes.findUniqueOrThrow({
                where: { uuid },
                include: { dish_images: true }
            });
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function deleteDish({ uuid }) {
    try {
        await prisma.dishes.delete({
            where: { uuid }
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function addSubCategory({ name, category_uuid, }) {
    try {
        return await prisma.sub_categories.create({
            data: { name: name.trim(), category_uuid },
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function updateSubCategory({ uuid }, { name }) {
    try {
        return await prisma.sub_categories.update({
            where: { uuid },
            data: { name: name.trim() },
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function deleteSubCategory({ uuid }) {
    try {
        await prisma.sub_categories.delete({ where: { uuid } });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function deleteCommentUserByUuid({ uuid }) {
    try {
        await prisma.dish_comments.delete({
            where: { uuid }
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
