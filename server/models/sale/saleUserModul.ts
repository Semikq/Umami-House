import { RowDataPacket } from "mysql2/promise"
import { pool } from "../../pool"

interface AllSale extends RowDataPacket {
    id: number
    title: string
    image_url: string
    active: boolean
    created_at: string
}

export async function fetchAllSale(): Promise<AllSale[]> {
    try {
        const [rows] = await pool.execute<AllSale[]>("SELECT * FROM sale");
        return rows
    } catch (error) {
        throw new Error((error as Error).message)
    }
}