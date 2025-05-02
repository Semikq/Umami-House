import { pool } from "../../pool";

export async function fetchAllUsers() {
    try {
        const [rows] = await pool.execute("SELECT * FROM users")
        return rows
    }catch (err){
        throw new Error(err.message)
    }
}

export async function choiceRoleUser(role, id){
    try {
        const [rows] = await pool.execute("UPDATE users SET role = ? WHERE id = ?", [role, id])
        return rows
    } catch (err) {
        throw new Error(err.message)
    }
}

export async function deleteUser(id) {
    try {
        const [rows] = await pool.execute("DELETE FROM users WHERE id = ?", [id])
        return rows
    }catch (err){
        throw new Error(err.message)
    }
}