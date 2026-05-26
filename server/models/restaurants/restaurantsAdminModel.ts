import { Uuid, AddRestaurant, UpdateRestaurant, addCity } from "../TypesModel/restaurantsTypes.js";
import { PrismaClient, Prisma } from "@prisma/client"
const prisma = new PrismaClient()

export async function addRestaurant({ city_uuid, name, address, phone, description, active, latitude, longitude, time_work, restaurant_image }: AddRestaurant): Promise<Prisma.restaurantsGetPayload<{}>> {
    try {
        return await prisma.restaurants.create({ data: { city_uuid, name, address, phone, description, active, latitude, longitude, time_work, restaurant_image }})
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function updateRestaurant({ uuid }: Uuid, { city_uuid, name, address, phone, description, active, latitude, longitude, time_work, restaurant_image }: UpdateRestaurant): Promise<Prisma.restaurantsGetPayload<{}>> {
    try {
        return await prisma.restaurants.update({
            where: { uuid },
            data: { city_uuid, name, address, phone, description, active, latitude, longitude, time_work, restaurant_image }
        })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function deleteRestaurant({ uuid }: Uuid): Promise<void> {
    try {
        await prisma.restaurants.delete({ where: { uuid } })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function addCity({ city_name }: addCity): Promise<Prisma.citiesGetPayload<{}>> {
    try {
        return await prisma.cities.create({ data: { name: city_name } })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function deleteCity({ uuid }: Uuid): Promise<void> {
    try {
        await prisma.cities.delete({ where: { uuid } })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}
