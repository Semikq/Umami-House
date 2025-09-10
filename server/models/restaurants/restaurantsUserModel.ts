import { RestaurantsByCity } from "../TypesModel/restaurantsTypes.js"
import { PrismaClient, Prisma } from "@prisma/client"
const prisma = new PrismaClient()

export async function fetchAllCities(): Promise<Prisma.citiesGetPayload<{}>[]> {
    try {
        return prisma.cities.findMany()
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function fetchRestaurantsByCity({ city_id }: RestaurantsByCity ): Promise<Prisma.restaurantsGetPayload<{}>[]> {
    try {
        return prisma.restaurants.findMany({
            where: { city_id }
        })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function fetchAllRestaurants(): Promise<Prisma.restaurantsGetPayload<{}>[]> {
    try {
        return prisma.restaurants.findMany()
    } catch (error){
        throw new Error((error as Error).message)
    }
}