import { pool } from "../../pool";

export async function fetchAllSale() {
    try {
        const [rows] = await pool.execute("SELECT * FROM sale")
        return rows
    } catch (err) {
        throw new Error(err.message)
    }
}