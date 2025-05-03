import { pool } from "../../pool";

export async function fetchAllCities() {
    try {
        const [rows] = await pool.execute("SELECT * FROM cities")
        return rows
    } catch (error) {
        throw new Error(error.message)
    }
}

export async function fetchRestaurantByCity({ city }) {
    try {
        const [rows] = await pool.execute("SELECT r.*, c.name AS city FROM restaurants r JOIN cities c ON r.city_id = c.id WHERE c.name = ?", [city])
        return rows
    } catch (error) {
        throw new Error(error.message)
    }
}