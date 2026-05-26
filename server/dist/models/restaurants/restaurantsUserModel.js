import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function fetchAllCities() {
    try {
        return prisma.cities.findMany();
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function fetchRestaurantsByCity({ city_uuid }) {
    try {
        return prisma.restaurants.findMany({
            where: { city_uuid }
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function fetchAllRestaurants() {
    try {
        return prisma.restaurants.findMany();
    }
    catch (error) {
        throw new Error(error.message);
    }
}
