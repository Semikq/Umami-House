import { Uuid, Image, Images, AddDish, UpdateDish } from "../TypesModel/dishesTypes.js"
import {Prisma, PrismaClient} from "@prisma/client";
const prisma = new PrismaClient()

export async function addDish({ name, weight, price, frozen, spicy, ingredients, sub_category_uuid, active, images }: AddDish): Promise<Prisma.dishesGetPayload<{include: { dish_images: true }}>> {
    try {
        return await prisma.$transaction(async (tx) => {
            const dish = await tx.dishes.create({
                    data: { name, weight, price, frozen, spicy, ingredients, sub_category_uuid, active }
            })

            const dishImagesData = images.map((image: Image): Images => ({
                title: image.title,
                image_url: image.image_url,
                dish_uuid: dish.uuid
            }));

            await tx.dish_images.createMany({ data: dishImagesData })

            return tx.dishes.findUniqueOrThrow({
                where: { uuid: dish.uuid },
                include: { dish_images: true }
            })
        })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function updateDish({ uuid }: Uuid, { name, weight, price, frozen, spicy, ingredients, sub_category_uuid, active, images }: UpdateDish): Promise<Prisma.dishesGetPayload<{include: { dish_images: true }}>> {
    try {
        return await prisma.$transaction(async (tx) => {
            await tx.dishes.update({
                where: { uuid },
                data: { name, weight, price, frozen, spicy, ingredients, sub_category_uuid, active }
            })

            await tx.dish_images.deleteMany({ where: { dish_uuid: uuid } })

            const updateDishImages = images.map((image: Image): Images => ({
                title: image.title,
                image_url: image.image_url,
                dish_uuid: uuid
            }))

            await tx.dish_images.createMany({ data: updateDishImages })

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

export async function deleteCommentUserByUuid({ uuid }: Uuid): Promise<void> {
    try {
        await prisma.dish_comments.delete({
            where: { uuid }
        })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}
