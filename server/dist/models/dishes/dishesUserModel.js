import { pool } from "../../config/dbConfig.js";
export async function fetchAllCategories() {
    try {
        const result = await pool.query(`
      SELECT
        c.*,
        COALESCE(
          json_agg(
            json_build_object(
              'id', s.id,
              'name', s.name,
              'category_id', s.category_id
            )
          ) FILTER (WHERE s.id IS NOT NULL),
          '[]'
        ) AS subcategories
      FROM umamihouse.categories c
      LEFT JOIN umamihouse.subcategories s ON s.category_id = c.id
      GROUP BY c.id
    `);
        return result.rows;
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function fetchAllDishesByCategory({ id }) {
    try {
        const result = await pool.query(`
      SELECT 
        d.*,
        COALESCE(
          json_agg(
            json_build_object('title', di.title, 'image_url', di.image_url)
          ) FILTER (WHERE di.id IS NOT NULL),
          '[]'
        ) AS images
      FROM umamihouse.dishes d
      LEFT JOIN umamihouse.dish_image di ON d.id = di.dish_id
      JOIN umamihouse.subcategories s ON d.subcategories_id = s.id
      WHERE s.category_id = $1
      GROUP BY d.id
    `, [id]);
        return result.rows;
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function fetchDishById({ id }) {
    try {
        const result = await pool.query(`
      SELECT d.*,
        COALESCE(
          json_agg(
            json_build_object('title', di.title, 'image_url', di.image_url)
          ) FILTER (WHERE di.id IS NOT NULL),
          '[]'
        ) AS images
      FROM umamihouse.dishes d
      LEFT JOIN umamihouse.dish_image di ON d.id = di.dish_id
      WHERE d.id = $1
      GROUP BY d.id
    `, [id]);
        return result.rows[0];
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function fetchDishCommentsById({ id }) {
    try {
        const result = await pool.query(`
      SELECT 
        dc.comment, 
        dc.rating, 
        dc.created_at, 
        u.name AS name
      FROM umamihouse.dish_comments dc
      JOIN umamihouse.users u ON dc.user_id = u.id
      WHERE dc.dish_id = $1
    `, [id]);
        return result.rows;
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function addCommentByIdDishes({ dish_id, user_id, comment, rating, }) {
    try {
        await pool.query("INSERT INTO umamihouse.dish_comments (dish_id, user_id, comment, rating) VALUES ($1, $2, $3, $4)", [dish_id, user_id, comment, rating]);
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function deleteCommentByIdDishes({ user_id, dish_id, }) {
    try {
        await pool.query("DELETE FROM umamihouse.dish_comments WHERE user_id = $1 AND dish_id = $2", [user_id, dish_id]);
    }
    catch (error) {
        throw new Error(error.message);
    }
}
//# sourceMappingURL=dishesUserModel.js.map