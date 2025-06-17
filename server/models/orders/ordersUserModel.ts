import { pool } from "../../config/dbConfig.js";
import { Order, AddOrder, OrderId } from "../TypesModel/ordersTypes.js";

export async function fetchOrdersByUser({ id }: OrderId): Promise<Order[]> {
  try {
    const result = await pool.query<Order>(`
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
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function addOrder({ id }: OrderId, { status, delivery_address, payment_method, dishes }: AddOrder): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const insertOrderText = `INSERT INTO umamihouse.orders (user_id, status, delivery_address, payment_method) VALUES ($1, $2, $3, $4) RETURNING id`;
    const orderResult = await client.query<{ id: number }>(insertOrderText, [id, status, delivery_address, payment_method]);

    const orderId = orderResult.rows[0].id;

    for (const dish of dishes) {
      const { dish_id, count } = dish;
      await client.query(
        "INSERT INTO umamihouse.order_dish (order_id, dish_id, count) VALUES ($1, $2, $3)",
        [orderId, dish_id, count]
      );
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw new Error((error as Error).message);
  } finally {
    client.release();
  }
}

export async function deleteOrder({ id }: OrderId): Promise<void> {
  try {
    await pool.query("DELETE FROM umamihouse.orders WHERE id = $1", [id]);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
