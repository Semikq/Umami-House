import { randomUUID } from "crypto";
import fs from "fs/promises";
import path from "path";
import { Uuid, AddRestaurant, UpdateRestaurant, addCity } from "../TypesModel/restaurantsTypes.js";
import { PrismaClient, Prisma } from "@prisma/client"
const prisma = new PrismaClient()

const MIME_TO_EXT: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
};

export async function uploadRestaurantImage({
    data,
    mimeType,
    title,
}: {
    data: string,
    mimeType: string,
    title?: string,
}): Promise<{ image_url: string, title: string }> {
    const ext = MIME_TO_EXT[mimeType] ?? "jpg";
    const filename = `${randomUUID()}.${ext}`;
    const uploadsDir = path.join("uploads", "restaurants");

    await fs.mkdir(uploadsDir, { recursive: true });
    await fs.writeFile(path.join(uploadsDir, filename), Buffer.from(data, "base64"));

    return {
        image_url: `/uploads/restaurants/${filename}`,
        title: title?.trim() || filename,
    };
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
