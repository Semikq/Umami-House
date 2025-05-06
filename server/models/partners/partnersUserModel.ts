import { RowDataPacket } from "mysql2"
import { pool } from "../../pool.js"

interface AllPartners extends RowDataPacket{
    id: number,
    name: string,
    logo: string,
    link_website?: string,
    active: boolean,
    created_at: string
}

export async function fetchAllPartners():Promise<AllPartners[]> {
    try {
        const [partners] = await pool.execute<AllPartners[]>("SELECT * FROM partners")
        return partners
    } catch (error) {
        throw new Error((error as Error).message)
    }
}