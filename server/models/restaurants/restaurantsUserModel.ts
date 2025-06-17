import { pool } from "../../config/dbConfig"
import { AllCities, RestaurantsByCity } from "../TypesModel/restaurantsTypes"

export async function fetchAllCities(): Promise<AllCities[]> {
    try {
        const { rows: allCities } = await pool.query<AllCities>("SELECT * FROM umamihouse.cities");
        return allCities;
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export async function fetchRestaurantsByCity({ city }: RestaurantsByCity): Promise<AllCities[]> {
    try {
        const { rows: restaurantsByCity } = await pool.query<AllCities>(
            `SELECT r.* 
             FROM umamihouse.restaurants r 
             JOIN umamihouse.cities c ON r.city_id = c.id 
             WHERE c.name = $1`,
            [city]
        );
        return restaurantsByCity;
    } catch (error) {
        throw new Error((error as Error).message);
    }
}
