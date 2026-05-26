import { PrismaClient, Prisma } from '@prisma/client'
import {AllFavorites, VariousEventsInTheFavorites} from "../TypesModel/favoritesTypes.js"
const prisma = new PrismaClient()

export async function fetchAllFavorites({ user_uuid }: AllFavorites): Promise<Prisma.favoritesGetPayload<{ include: { users: true, dishes: true }}>[]> {
    try {
        return await prisma.favorites.findMany({
            where: { user_uuid },
            include: { users: true, dishes: true }
        })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function addFavorite({ user_uuid, dish_uuid }: VariousEventsInTheFavorites): Promise<Prisma.favoritesGetPayload<{ include: {users: true, dishes: true }}>> {
    try {
        return await prisma.favorites.create({
            data: { user_uuid, dish_uuid },
            include: { users: true, dishes: true }
        })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function deleteFavorite({ user_uuid, dish_uuid }: VariousEventsInTheFavorites): Promise<void> {
    try {
        await prisma.favorites.deleteMany({
            where: { user_uuid, dish_uuid }
        })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}
