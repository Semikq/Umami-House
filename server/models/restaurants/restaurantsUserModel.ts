import { pool } from "../../config/dbConfig"
import { AllCities, RestaurantsByCity } from "../TypesModel/restaurantsTypes"

export async function fetchAllCities(): Promise<AllCities[]> {
    try {
        const [allCities] = await pool.query<AllCities[]>("SELECT * FROM cities")
        return allCities
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function fetchRestaurantsByCity({ city }: RestaurantsByCity ): Promise<AllCities[]> {
    try {
        const [restaurantsByCity] = await pool.query<AllCities[]>("SELECT r.* FROM restaurants r JOIN cities c ON r.city_id = c.id WHERE c.name = ?", [city])
        return restaurantsByCity
    } catch (error) {
        throw new Error((error as Error).message)
    }
}