import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
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
export async function addCity({ city_name }) {
    try {
        return await prisma.cities.create({ data: { name: city_name } });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function deleteCity({ uuid }) {
    try {
        await prisma.cities.delete({ where: { uuid } });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
