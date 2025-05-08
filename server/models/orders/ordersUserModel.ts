import { ResultSetHeader } from "mysql2";
import { pool } from "../../pool";
import { OrdersByUser, Order, AddOrder, DeleteOrder } from "../TypesModel/ordersTypes";

export async function fetchOrdersByUser({ user_id }: OrdersByUser): Promise<Order[]> {
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
            WHERE o.user_id = ?
            GROUP BY o.id
        `, [user_id])
        
        return rows.map(order =>({
            ...order,
            dishes: JSON.parse(order.dishes as unknown as string)
        }))
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function addOrder({ user_id, status, delivery_address, payment_method, dishes }: AddOrder): Promise<void> {
    const conn = await pool.getConnection()
    try {
        await conn.beginTransaction()
        const [orderResult] = await conn.execute<ResultSetHeader>(`INSERT INTO orders (user_id, status, delivery_address, payment_method) VALUES(?, ?, ?, ?)`, [user_id, status, delivery_address, payment_method])

        for(const dish of dishes){
            const { dish_id, count } = dish
            await conn.execute("INSERT INTO order_dish (order_id, dish_id, count) VALUES(?, ?, ?)", [orderResult.insertId, dish_id, count])
        }
        
        await conn.commit()
    } catch (error) {
        await conn.rollback()
        throw new Error((error as Error).message)
    } finally{
        conn.release()
    }
}

export async function deleteOrder({ id }: DeleteOrder): Promise<void> {
    try {
        await pool.execute("DELETE FROM orders WHERE id = ?", [id])
    } catch (error) {
        throw new Error((error as Error).message)
    }
}