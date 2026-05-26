import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function fetchAllFavorites({ user_uuid }) {
    try {
        return await prisma.favorites.findMany({
            where: { user_uuid },
            include: { users: true, dishes: true }
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function addFavorite({ user_uuid, dish_uuid }) {
    try {
        return await prisma.favorites.create({
            data: { user_uuid, dish_uuid },
            include: { users: true, dishes: true }
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function deleteFavorite({ user_uuid, dish_uuid }) {
    try {
        await prisma.favorites.deleteMany({
            where: { user_uuid, dish_uuid }
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
