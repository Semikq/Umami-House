import { Id, Image, Images, AddDish, UpdateDish } from "../TypesModel/dishesTypes"
import {Prisma, PrismaClient} from "@prisma/client";
const prisma = new PrismaClient()

export async function addDish({ name, weight, price, frozen, spicy, ingredients, sub_category_id, active, images }: AddDish): Promise<Prisma.dishesGetPayload<{include: { dish_images: true }}>> {
    try {
        return await prisma.$transaction(async (tx) => {
            const dish = await tx.dishes.create({
                    data: { name, weight, price, frozen, spicy, ingredients, sub_category_id, active }
            })

            const dishImagesData = images.map((image: Image): Images => ({
                title: image.title,
                image_url: image.image_url,
                dish_id: dish.id
            }));

            await tx.dish_images.createMany({ data: dishImagesData })

            return tx.dishes.findUniqueOrThrow({
                where: { id: dish.id },
                include: { dish_images: true }
            })
        })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function updateDish({ id }: Id, { name, weight, price, frozen, spicy, ingredients, sub_category_id, active, images }: UpdateDish): Promise<Prisma.dishesGetPayload<{include: { dish_images: true }}>> {
    try {
        return await prisma.$transaction(async (tx) => {
            await tx.dishes.update({
                where: { id },
                data: { name, weight, price, frozen, spicy, ingredients, sub_category_id, active }
            })

            await tx.dish_images.deleteMany({ where: { dish_id: id } })

            const updateDishImages = images.map((image: Image): Images => ({
                title: image.title,
                image_url: image.image_url,
                dish_id: id
            }))

            await tx.dish_images.createMany({ data: updateDishImages })

            return tx.dishes.findUniqueOrThrow({
                where: { id },
                include: { dish_images: true }
            })
        })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function deleteDish({ id }: Id): Promise<void> {
    try {
        await prisma.dishes.delete({
            where: { id }
        })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function deleteCommentUserById({ id }: Id): Promise<void> {
    try {
        await prisma.dish_comments.delete({
            where: { id }
        })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}