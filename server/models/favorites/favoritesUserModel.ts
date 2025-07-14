import { PrismaClient, Prisma } from '@prisma/client'
import {AllFavorites, VariousEventsInTheFavorites} from "../TypesModel/favoritesTypes.js"
const prisma = new PrismaClient()

export async function fetchAllFavorites({ user_id }: AllFavorites): Promise<Prisma.favoritesGetPayload<{ include: { users: true, dishes: true }}>[]> {
    try {
        return await prisma.favorites.findMany({
            where: { user_id },
            include: { users: true, dishes: true }
        })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function addFavorite({ user_id, dish_id }: VariousEventsInTheFavorites): Promise<Prisma.favoritesGetPayload<{ include: {users: true, dishes: true }}>> {
    try {
        return await prisma.favorites.create({
            data: {user_id, dish_id},
            include: { users: true, dishes: true }
        })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function deleteFavorite({ user_id, dish_id }: VariousEventsInTheFavorites): Promise<void> {
    try {
        await prisma.favorites.deleteMany({
            where: { user_id, dish_id }
        })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}