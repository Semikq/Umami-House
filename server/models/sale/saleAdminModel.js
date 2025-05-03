import { pool } from "../../pool";

export async function addSale({ title, image_url, active }) {
    try {
        const [rows] = await pool.execute("INSERT INTO sale (title, image_url, active) VALUES (?, ?, ?)", [title, image_url, active])
        return rows
    } catch (err) {
        throw new Error(err.message)
    }
}

export async function updateSale({ active, id }) {
    try {
        const [rows] = await pool.execute("UPDATE sale SET active = ? WHERE id = ?", [active, id])
        return rows
    } catch (err) {
        throw new Error(err.message)
    }
}

export async function deleteSale({ id }) {
    try {
        const [rows] = await pool.execute("DELETE FROM sale WHERE id = ?", [id])
        return rows
    } catch (err) {
        throw new Error(err.message)
    }
}