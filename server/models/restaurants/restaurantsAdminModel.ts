import { Uuid, AddRestaurant, UpdateRestaurant, addCity } from "../TypesModel/restaurantsTypes.js";
import { uploadImageToStorage } from "../../services/storageUpload.js";
import { PrismaClient, Prisma } from "@prisma/client"
const prisma = new PrismaClient()

export async function uploadRestaurantImage({
    data,
    mimeType,
    title,
}: {
    data: string,
    mimeType: string,
    title?: string,
}): Promise<{ image_url: string, title: string }> {
    return uploadImageToStorage({ data, mimeType, title, folder: "restaurants" });
}

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

export async function addCity({ name }: addCity): Promise<Prisma.citiesGetPayload<{}>> {
    try {
        return await prisma.cities.create({ data: { name: name.trim() } })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function deleteCity({ uuid }: Uuid): Promise<void> {
    try {
        await prisma.$transaction(async (tx) => {
            await tx.restaurants.deleteMany({ where: { city_uuid: uuid } });
            await tx.cities.delete({ where: { uuid } });
        });
    } catch (error) {
        throw new Error((error as Error).message)
    }
}
