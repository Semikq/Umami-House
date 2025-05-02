import { pool } from "../../pool.js"

export async function fetchAllfavorites(user_id){
    try {
        const [rows] = await pool.execute("SELECT d.* FROM favorites f JOIN dishes d ON f.dish_id = d.id WHERE f.user_id = ?", [user_id])
        return rows
    } catch (err) {
        throw new Error(err.message)
    }
}

export async function addFavorites(user_id, dish_id){
    try {
        const [rows] = await pool.execute(`INSERT INTO favorites (user_id, dish_id) VALUES(?, ?)`, [user_id, dish_id])
        return rows
    } catch (err) {
        throw new Error(err.message)
    }
}

export async function deleteFavorites(dish_id) {
    try {
        const [rows] = await pool.execute("DELETE FROM favorites WHERE dish_id = ?", [dish_id])
        return rows
    } catch (err) {
        throw new Error(err.message)
    }
}