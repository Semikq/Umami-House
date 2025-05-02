import { pool } from "../../pool.js"

export async function fetchAllPartners() {
    try {
        const [rows] = await pool.execute("SELECT * FROM partners")
        return rows
    } catch (err) {
        throw new Error(err.message)
    }
}