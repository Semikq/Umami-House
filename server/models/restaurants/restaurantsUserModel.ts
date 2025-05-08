import { pool } from "../../pool"
import { AllCities, RestaurantByCity } from "../TypesModel/restaurantsTypes"

export async function fetchAllCities(): Promise<AllCities[]> {
    try {
        const [allCities] = await pool.query<AllCities[]>("SELECT * FROM cities")
        return allCities
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function fetchRestaurantByCity({ city }: RestaurantByCity ): Promise<AllCities[]> {
    try {
        const [restaurantByCity] = await pool.query<AllCities[]>("SELECT r.* FROM restaurants r JOIN cities c ON r.city_id = c.id WHERE c.name = ?", [city])
        return restaurantByCity
    } catch (error) {
        throw new Error((error as Error).message)
    }
}