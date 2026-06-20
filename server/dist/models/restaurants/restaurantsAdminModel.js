import { uploadImageToStorage } from "../../services/storageUpload.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function uploadRestaurantImage({ data, mimeType, title, }) {
    return uploadImageToStorage({ data, mimeType, title, folder: "restaurants" });
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
