import { pool } from "../../pool.js"
import { AllFavorites, Favorites, Dish } from "./favoritesTypes.js"

export async function fetchAllFavorites({ user_id }:AllFavorites):Promise<Dish[]> {
    try {
        const [dishFavorites] = await pool.execute<Dish[]>("SELECT d.* FROM favorites f JOIN dishes d ON f.dish_id = d.id WHERE f.user_id = ?", [user_id])
        return dishFavorites
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function addFavorites({ user_id, dish_id }:Favorites):Promise<void> {
    try {
        await pool.execute(`INSERT INTO favorites (user_id, dish_id) VALUES(?, ?)`, [user_id, dish_id])
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function deleteFavorites({ user_id, dish_id }:Favorites):Promise<void> {
    try {
        await pool.execute("DELETE FROM favorites WHERE user_id = ? AND dish_id = ?", [user_id, dish_id])
    } catch (error) {
        throw new Error((error as Error).message)
    }
}