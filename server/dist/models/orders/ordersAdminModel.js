import { pool } from "../../config/dbConfig.js";
export async function fetchOrdersByFilter({ status }) {
    try {
        const result = await pool.query(`
      SELECT o.*, 
        json_agg(
          json_build_object(
            'id', d.id,
            'name', d.name,
            'weight', d.weight,
            'price', d.price,
            'frozen', d.frozen,
            'spicy', d.spicy,
            'images', COALESCE((
              SELECT json_agg(json_build_object('title', di.title, 'image_url', di.image_url))
              FROM umamihouse.dish_image di
              WHERE di.dish_id = d.id
            ), '[]'::json)
          )
        ) AS umamihouse.dishes
      FROM umamihouse.orders o
      JOIN umamihouse.order_dish od ON o.id = od.order_id
      JOIN umamihouse.dishes d ON od.dish_id = d.id
      WHERE o.status = $1
      GROUP BY o.id
    `, [status]);
        return result.rows.map(order => ({
            ...order,
            dishes: order.dishes || []
        }));
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function updateStatusOrder({ id }, { status }) {
    try {
        await pool.query("UPDATE umamihouse.orders SET status = $1 WHERE id = $2", [status, id]);
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function deleteOrder({ id }) {
    try {
        await pool.query("DELETE FROM umamihouse.orders WHERE id = $1", [id]);
    }
    catch (error) {
        throw new Error(error.message);
    }
}
//# sourceMappingURL=ordersAdminModel.js.map