import { RowDataPacket } from "mysql2";
import { pool } from "../../pool";

interface AllCities extends RowDataPacket{
    id: number,
    name: string,
    address: string,
    city_id: number,
    phone: string,
    description: string,
    active: boolean,
    latitude: string,
    longitude: string,
    created_at: string
}

interface RestaurantByCity{
    city: string
}

export async function fetchAllCities():Promise<AllCities[]> {
    try {
        const [allCities] = await pool.execute<AllCities[]>("SELECT * FROM cities")
        return allCities
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function fetchRestaurantByCity({ city }:RestaurantByCity ):Promise<AllCities[]> {
    try {
        const [restaurantByCity] = await pool.execute<AllCities[]>("SELECT r.* FROM restaurants r JOIN cities c ON r.city_id = c.id WHERE c.name = ?", [city])
        return restaurantByCity
    } catch (error) {
        throw new Error((error as Error).message)
    }
}