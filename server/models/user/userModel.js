import { pool } from "../../pool";

export async function updateUser({ email, password, name, username, phone, company_type, company_name, id }){
    try {
        const [rows] = await pool.execute("UPDATE users SET email = ?, password = ?, name = ?, username = ?, phone = ?, company_type = ?, company_name = ? WHERE id = ?", [email, password, name, username, phone, company_type, company_name, id])
        return rows
    } catch (error) {
        throw new Error(error.message)
    }
}

export async function deleteUser({ id }) {
    try {
        const [rows] = await pool.execute("DELETE FROM users WHERE id = ?", [id])
        return rows
    } catch (error) {
        throw new Error(error.message)
    }
}