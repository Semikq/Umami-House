import { pool } from "../../pool.js"

export async function fetchAllFavorites({ user_id }){
    try {
        const [rows] = await pool.execute("SELECT d.* FROM favorites f JOIN dishes d ON f.dish_id = d.id WHERE f.user_id = ?", [user_id])
        return rows
    } catch (error) {
        throw new Error(error.message)
    }
}

export async function addFavorites({ user_id, dish_id }){
    try {
        const [rows] = await pool.execute(`INSERT INTO favorites (user_id, dish_id) VALUES(?, ?)`, [user_id, dish_id])
        return rows
    } catch (error) {
        throw new Error(error.message)
    }
}

export async function deleteFavorites({ user_id, dish_id }) {
    try {
        const [rows] = await pool.execute("DELETE FROM favorites WHERE user_id = ? AND dish_id = ?", [user_id, dish_id])
        return rows
    } catch (error) {
        throw new Error(error.message)
    }
}