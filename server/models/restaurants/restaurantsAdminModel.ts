import { Id, AddRestaurant, UpdateRestaurant, addCity } from "../TypesModel/restaurantsTypes";
import { PrismaClient, Prisma } from "@prisma/client"
const prisma = new PrismaClient()

export async function addRestaurant({ city_id, name, address, phone, description, active, latitude, longitude }: AddRestaurant): Promise<Prisma.restaurantsGetPayload<{}>> {
    try {
        return await prisma.restaurants.create({ data: { city_id, name, address, phone, description, active, latitude, longitude }})
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function updateRestaurant({ id }: Id, { city_id, name, address, phone, description, active, latitude, longitude }: UpdateRestaurant): Promise<Prisma.restaurantsGetPayload<{}>> {
    try {
        return await prisma.restaurants.update({
            where: { id },
            data: { city_id, name, address, phone, description, active, latitude, longitude }
        })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function deleteRestaurant({ id }: Id): Promise<void> {
    try {
        await prisma.restaurants.delete({ where: { id } })
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

export async function deleteCity({ id }: Id): Promise<void> {
    try {
        await prisma.cities.delete({ where: { id } })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}