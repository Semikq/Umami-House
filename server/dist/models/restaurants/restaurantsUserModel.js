import { pool } from "../../config/dbConfig.js";
export async function fetchAllCities() {
    try {
        const { rows: allCities } = await pool.query("SELECT * FROM umamihouse.cities");
        return allCities;
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function fetchRestaurantsByCity({ city }) {
    try {
        const { rows: restaurantsByCity } = await pool.query(`SELECT r.* 
             FROM umamihouse.restaurants r 
             JOIN umamihouse.cities c ON r.city_id = c.id 
             WHERE c.name = $1`, [city]);
        return restaurantsByCity;
    }
    catch (error) {
        throw new Error(error.message);
    }
}
//# sourceMappingURL=restaurantsUserModel.js.map