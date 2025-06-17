import { pool } from "../../config/dbConfig.js";
export async function fetchAllUsers() {
    try {
        const result = await pool.query("SELECT * FROM users");
        return result.rows;
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function choiceRoleUser({ id }, { role }) {
    try {
        await pool.query("UPDATE users SET role = $1 WHERE id = $2", [role, id]);
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function deleteUser({ id }) {
    try {
        await pool.query("DELETE FROM users WHERE id = $1", [id]);
    }
    catch (error) {
        throw new Error(error.message);
    }
}
//# sourceMappingURL=adminModel.js.map