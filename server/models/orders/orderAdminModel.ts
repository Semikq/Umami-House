import { RowDataPacket } from "mysql2";
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

interface OrdersByFilter{
    status: Status
}

interface UpdateStatusOrder extends OrdersByFilter{
    id: number
}

interface DeleteOrder{
    id: number
}

interface Order extends RowDataPacket{
    id: number,
    user_id: number,
    status: Status,
    delivery_address: string,
    payment_method: PaymentMethod,
    created_at: string
}

export async function fetchOrdersByFilter({ status }:OrdersByFilter):Promise<Order[]> {
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
            WHERE o.status = ?
            GROUP BY o.id
        `, [status])
        return rows
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function updateStatusOrder({ status, id }:UpdateStatusOrder):Promise<void> {
    try {
        await pool.execute("UPDATE orders SET status = ? WHERE id = ?", [status, id])
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function deleteOrder({ id }:DeleteOrder):Promise<void> {
    try {
        await pool.execute("DELETE FROM orders WHERE id = ?", [id])
    } catch (error) {
        throw new Error((error as Error).message)
    }
}