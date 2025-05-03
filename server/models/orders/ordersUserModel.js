import { pool } from "../../pool";

export async function fetchOrdersByUser({ user_id }) {
    try {
        const [rows] = await pool.execute(`
            SELECT o.*, 
                   JSON_ARRAYAGG(
                       JSON_OBJECT(
                           'id', d.id,
                           'name', d.name,
                           'weight', d.weight,
                           'price', d.price,
                           'spicy', d.spicy,
                           'frozen', d.frozen
                       )
                   ) AS dishes
            FROM orders o
            JOIN order_dish od ON o.id = od.order_id
            JOIN dishes d ON od.dish_id = d.id
            WHERE o.user_id = ?
            GROUP BY o.id
        `, [user_id])
        return rows
    } catch (error) {
        throw new Error(error.message)
    }
}

export async function addOrder({ user_id, status, delivery_address, payment_method, dishes }) {
    const conn = await pool.getConnection()
    try {
        await conn.beginTransaction()
        const [orderResult] = await conn.execute(`
            INSERT INTO orders (user_id, status, delivery_address, payment_method) VALUES(?, ?, ?, ?)`, [user_id, status, delivery_address, payment_method])

        const orderId = orderResult.insertId

        for(const dish of dishes){
            const { dish_id, count } = dish
            await conn.execute("INSERT INTO order_dish (order_id, dish_id, count) VALUES(?, ?, ?)", [orderId, dish_id, count])
        }
        await conn.commit()
        return { orderId }
    } catch (error) {
        await conn.rollback()
        throw new Error(error.message)
    } finally{
        conn.release()
    }
}

export async function deleteOrder({ id }) {
    try {
        const [rows] = await pool.execute("DELETE FROM orders WHERE id = ?", [id])
        return rows
    } catch (error) {
        throw new Error(error.message)
    }
}