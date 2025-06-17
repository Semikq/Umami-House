import { pool } from "../../config/dbConfig.js";
export async function fetchOrdersByUser({ id }) {
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
        ) AS dishes
      FROM umamihouse.orders o
      JOIN umamihouse.order_dish od ON o.id = od.order_id
      JOIN umamihouse.dishes d ON od.dish_id = d.id
      WHERE o.user_id = $1
      GROUP BY o.id
    `, [id]);
        return result.rows.map(order => ({
            ...order,
            dishes: order.dishes || []
        }));
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function addOrder({ id }, { status, delivery_address, payment_method, dishes }) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const insertOrderText = `INSERT INTO umamihouse.orders (user_id, status, delivery_address, payment_method) VALUES ($1, $2, $3, $4) RETURNING id`;
        const orderResult = await client.query(insertOrderText, [id, status, delivery_address, payment_method]);
        const orderId = orderResult.rows[0].id;
        for (const dish of dishes) {
            const { dish_id, count } = dish;
            await client.query("INSERT INTO umamihouse.order_dish (order_id, dish_id, count) VALUES ($1, $2, $3)", [orderId, dish_id, count]);
        }
        await client.query('COMMIT');
    }
    catch (error) {
        await client.query('ROLLBACK');
        throw new Error(error.message);
    }
    finally {
        client.release();
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
//# sourceMappingURL=ordersUserModel.js.map