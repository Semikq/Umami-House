import { Uuid, Image, Images, AddDish, UpdateDish } from "../TypesModel/dishesTypes.js"
import { uploadImageToStorage, StorageFolder } from "../../services/storageUpload.js";
import {Prisma, PrismaClient} from "@prisma/client";
const prisma = new PrismaClient()

export async function uploadDishImage({
    data,
    mimeType,
    title,
    folder = "dishes",
}: {
    data: string,
    mimeType: string,
    title?: string,
    folder?: StorageFolder,
}): Promise<Image> {
    return uploadImageToStorage({ data, mimeType, title, folder });
}

export async function updateCategory(
    { uuid }: Uuid,
    { title, image_url }: { title?: string, image_url?: string },
): Promise<Prisma.categoriesGetPayload<{}>> {
    try {
        const data: { title?: string, image_url?: string } = {};
        if (title !== undefined) data.title = title.trim();
        if (image_url !== undefined) data.image_url = image_url.trim();

        return await prisma.categories.update({
            where: { uuid },
            data,
        });
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

function parseDishNumber(value: number | string): number {
    return typeof value === "string" ? parseInt(value, 10) : value;
}

export async function addDish({ name, weight, price, frozen, spicy, ingredients, sub_category_uuid, active, corporate_type, wholesale_min_qty, wholesale_price, images }: AddDish): Promise<Prisma.dishesGetPayload<{include: { dish_images: true }}>> {
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
            })

            if (images.length > 0) {
                const dishImagesData = images.map((image: Image): Images => ({
                    title: image.title,
                    image_url: image.image_url,
                    dish_uuid: dish.uuid
                }));

                await tx.dish_images.createMany({ data: dishImagesData })
            }

            return tx.dishes.findUniqueOrThrow({
                where: { uuid: dish.uuid },
                include: { dish_images: true }
            })
        })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function updateDish({ uuid }: Uuid, { name, weight, price, frozen, spicy, ingredients, sub_category_uuid, active, corporate_type, wholesale_min_qty, wholesale_price, images }: UpdateDish): Promise<Prisma.dishesGetPayload<{include: { dish_images: true }}>> {
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
            })

            await tx.dish_images.deleteMany({ where: { dish_uuid: uuid } })

            if (images.length > 0) {
                const updateDishImages = images.map((image: Image): Images => ({
                    title: image.title,
                    image_url: image.image_url,
                    dish_uuid: uuid
                }))

                await tx.dish_images.createMany({ data: updateDishImages })
            }

            return tx.dishes.findUniqueOrThrow({
                where: { uuid },
                include: { dish_images: true }
            })
        })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function deleteDish({ uuid }: Uuid): Promise<void> {
    try {
        await prisma.dishes.delete({
            where: { uuid }
        })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function addSubCategory({
    name,
    category_uuid,
}: {
    name: string,
    category_uuid: string,
}): Promise<Prisma.sub_categoriesGetPayload<{}>> {
    try {
        return await prisma.sub_categories.create({
            data: { name: name.trim(), category_uuid },
        });
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export async function updateSubCategory(
    { uuid }: Uuid,
    { name }: { name: string },
): Promise<Prisma.sub_categoriesGetPayload<{}>> {
    try {
        return await prisma.sub_categories.update({
            where: { uuid },
            data: { name: name.trim() },
        });
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export async function deleteSubCategory({ uuid }: Uuid): Promise<void> {
    try {
        await prisma.sub_categories.delete({ where: { uuid } });
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export async function deleteCommentUserByUuid({ uuid }: Uuid): Promise<void> {
    try {
        await prisma.dish_comments.delete({
            where: { uuid }
        })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}
