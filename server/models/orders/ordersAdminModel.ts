import { pool } from "../../config/dbConfig";
import { OrdersByFilter, Order, UpdateStatusOrder, OrderId } from "../TypesModel/ordersTypes";

export async function fetchOrdersByFilter({ status }: OrdersByFilter): Promise<Order[]> {
    try {
        const [rows] = await pool.query<Order[]>(`
            SELECT o.*, 
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', d.id,
                    'name', d.name,
                    'weight', d.weight,
                    'price', d.price,
                    'frozen', d.frozen,
                    'spicy', d.spicy,
                    'images', (
                        SELECT JSON_ARRAYAGG(
                           IF(di.id IS NOT NULL, JSON_OBJECT('title', di.title, 'image_url', di.image_url), NULL)
                        )
                        FROM dish_image di
                        WHERE di.dish_id = d.id
                    )
                )
            ) AS dishes
            FROM orders o
            JOIN order_dish od ON o.id = od.order_id
            JOIN dishes d ON od.dish_id = d.id
            WHERE o.status = ?
            GROUP BY o.id
        `, [status])
        
        return rows.map(order =>({
            ...order,
            dishes: JSON.parse(order.dishes as unknown as string)
        }))
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function updateStatusOrder({ id }: OrderId, { status }: UpdateStatusOrder): Promise<void> {
    try {
        await pool.execute("UPDATE orders SET status = ? WHERE id = ?", [status, id])
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function deleteOrder({ id }: OrderId): Promise<void> {
    try {
        await pool.execute("DELETE FROM orders WHERE id = ?", [id])
    } catch (error) {
        throw new Error((error as Error).message)
    }
}