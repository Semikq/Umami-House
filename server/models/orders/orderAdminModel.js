import { pool } from "../../pool";

export async function fetchOrdersByFilter({ status }) {
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
            WHERE o.status = ?
            GROUP BY o.id
        `, [status])
        return rows
    } catch (error) {
        throw new Error(error.message)
    }
}

export async function updateStatusOrder({ status, id }) {
    try {
        const [rows] = await pool.execute("UPDATE orders SET status = ? WHERE id = ?", [status, id])
        return rows
    } catch (error) {
        throw new Error(error.message)
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