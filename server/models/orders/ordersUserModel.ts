import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../pool";

enum Status{
    PROCESSING = 'processing',
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled',
    DELIVERING = 'delivering',
    DELIVERED = 'delivered',
    PREPARING = 'preparing',
    PACKING = 'packing'
}

enum PaymentMethod {
    CARD = 'card',
    CASH = 'cash'
}

interface Order extends RowDataPacket{
    id: number,
    user_id: number,
    status: Status,
    delivery_address: string,
    payment_method: PaymentMethod,
    created_at: string
}

interface OrdersByUser{
    user_id: number
}

interface DishInOrder {
    dish_id: number;
    count: number;
  }

interface AddOrder extends OrdersByUser{
    status: Status,
    delivery_address: string,
    payment_method: PaymentMethod,
    dishes: DishInOrder[]
}

interface DeleteOrder extends RowDataPacket{
    id: number
}

export async function fetchOrdersByUser({ user_id }:OrdersByUser):Promise<Order[]> {
    try {
        const [rows] = await pool.execute<Order[]>(`
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
        throw new Error((error as Error).message)
    }
}

export async function addOrder({ user_id, status, delivery_address, payment_method, dishes }:AddOrder):Promise<void> {
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

export async function deleteOrder({ id }:DeleteOrder):Promise<void> {
    try {
        await pool.execute("DELETE FROM orders WHERE id = ?", [id])
    } catch (error) {
        throw new Error((error as Error).message)
    }
}