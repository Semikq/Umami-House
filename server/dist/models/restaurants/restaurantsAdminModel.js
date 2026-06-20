import { randomUUID } from "crypto";
import fs from "fs/promises";
import path from "path";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const MIME_TO_EXT = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
};
export async function uploadRestaurantImage({ data, mimeType, title, }) {
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
export async function addRestaurant({ city_uuid, name, address, phone, description, active, latitude, longitude, time_work, restaurant_image }) {
    try {
        return await prisma.restaurants.create({ data: { city_uuid, name, address, phone, description, active, latitude, longitude, time_work, restaurant_image } });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function updateRestaurant({ uuid }, { city_uuid, name, address, phone, description, active, latitude, longitude, time_work, restaurant_image }) {
    try {
        return await prisma.restaurants.update({
            where: { uuid },
            data: { city_uuid, name, address, phone, description, active, latitude, longitude, time_work, restaurant_image }
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function deleteRestaurant({ uuid }) {
    try {
        await prisma.restaurants.delete({ where: { uuid } });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function addCity({ name }) {
    try {
        return await prisma.cities.create({ data: { name: name.trim() } });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function deleteCity({ uuid }) {
    try {
        await prisma.$transaction(async (tx) => {
            await tx.restaurants.deleteMany({ where: { city_uuid: uuid } });
            await tx.cities.delete({ where: { uuid } });
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
