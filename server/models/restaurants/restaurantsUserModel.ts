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
        const [rows]: any = await pool.execute("SELECT * FROM cities")
        return rows
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function fetchRestaurantByCity({ city }:RestaurantByCity ):Promise<AllCities[]> {
    try {
        const [rows]: any = await pool.execute("SELECT r.*, c.name AS city FROM restaurants r JOIN cities c ON r.city_id = c.id WHERE c.name = ?", [city])
        return rows
    } catch (error) {
        throw new Error((error as Error).message)
    }
}