import { pool } from "../../config/dbConfig.js"
import { AllFavorites, Favorites, Dish } from "../TypesModel/favoritesTypes.js"

export async function fetchAllFavorites({ user_id }: AllFavorites): Promise<Dish[]> {
    try {
        const [dishFavorites] = await pool.query<Dish[]>(`
            SELECT d.*,
                JSON_ARRAYAGG(
                    IF(di.id IS NOT NULL, JSON_OBJECT('title', di.title, 'image_url', di.image_url), NULL)
                ) AS images
            FROM favorites f
            JOIN dishes d ON f.dish_id = d.id
            LEFT JOIN dish_image di ON di.dish_id = d.id
            WHERE f.user_id = ?
            GROUP BY d.id
        `, [user_id])
        
        return dishFavorites
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function addFavorite({ user_id, dish_id }: Favorites): Promise<void> {
    try {
        await pool.execute(`INSERT INTO favorites (user_id, dish_id) VALUES(?, ?)`, [user_id, dish_id])
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function deleteFavorite({ user_id, dish_id }: Favorites): Promise<void> {
    try {
        await pool.execute("DELETE FROM favorites WHERE user_id = ? AND dish_id = ?", [user_id, dish_id])
    } catch (error) {
        throw new Error((error as Error).message)
    }
}