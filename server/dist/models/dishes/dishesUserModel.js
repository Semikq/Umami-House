import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function fetchCategoryWithDishes({ uuid }) {
    try {
        return await prisma.categories.findUniqueOrThrow({
            where: { uuid },
            select: {
                title: true,
                sub_categories: {
                    select: {
                        uuid: true,
                        name: true,
                        dishes: {
                            include: {
                                dish_images: true,
                            }
                        }
                    }
                }
            }
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function fetchAllCategories() {
    try {
        return await prisma.categories.findMany({});
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function fetchAllDishes() {
    try {
        return await prisma.dishes.findMany({
            include: { dish_images: true }
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function fetchDishByUuid({ uuid }) {
    try {
        return await prisma.dishes.findUniqueOrThrow({
            where: { uuid },
            include: {
                sub_categories: {
                    include: {
                        categories: true
                    }
                },
                dish_comments: {
                    include: {
                        users: {
                            select: {
                                name: true,
                                surname: true
                            },
                        }
                    }
                },
                dish_images: true
            }
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function fetchDishCommentsByUuid({ uuid }) {
    try {
        return await prisma.dish_comments.findMany({
            where: { dish_uuid: uuid },
            include: { users: true }
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function addCommentByUuidDishes({ dish_uuid, user_uuid, comment, rating }) {
    try {
        return await prisma.dish_comments.create({
            data: { dish_uuid, user_uuid, comment, rating },
            include: { users: true }
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function deleteCommentByUuidDishes({ user_uuid, dish_uuid }) {
    try {
        await prisma.dish_comments.deleteMany({
            where: { user_uuid, dish_uuid }
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
