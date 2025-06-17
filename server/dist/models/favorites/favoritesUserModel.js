import { pool } from "../../config/dbConfig.js";
export async function fetchAllFavorites({ user_id }) {
    try {
        const result = await pool.query(`
      SELECT d.*,
        COALESCE(
          json_agg(
            json_build_object('title', di.title, 'image_url', di.image_url)
          ) FILTER (WHERE di.id IS NOT NULL),
          '[]'
        ) AS images
      FROM umamihouse.favorites f
      JOIN umamihouse.dishes d ON f.dish_id = d.id
      LEFT JOIN umamihouse.dish_image di ON di.dish_id = d.id
      WHERE f.user_id = $1
      GROUP BY d.id
    `, [user_id]);
        return result.rows;
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function addFavorite({ user_id, dish_id }) {
    try {
        await pool.query(`INSERT INTO umamihouse.favorites (user_id, dish_id) VALUES ($1, $2)`, [user_id, dish_id]);
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function deleteFavorite({ user_id, dish_id }) {
    try {
        await pool.query(`DELETE FROM umamihouse.favorites WHERE user_id = $1 AND dish_id = $2`, [user_id, dish_id]);
    }
    catch (error) {
        throw new Error(error.message);
    }
}
//# sourceMappingURL=favoritesUserModel.js.map