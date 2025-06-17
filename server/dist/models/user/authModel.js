import { pool } from "../../config/dbConfig.js";
import bcrypt from "bcrypt";
export async function registerUser({ email, password, name, surname, phone, role, company_type, company_name }) {
    try {
        const insertQuery = `
            INSERT INTO users (email, password, name, surname, phone, role, company_type, company_name)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `;
        const values = [email, password, name, surname, phone, role, company_type, company_name];
        const result = await pool.query(insertQuery, values);
        return result.rows[0]; // result.rows — це масив обʼєктів
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function loginUser({ userInput, password }) {
    try {
        const query = `SELECT * FROM users WHERE email = $1 OR phone = $2`;
        const result = await pool.query(query, [userInput, userInput]);
        if (result.rows.length === 0) {
            throw new Error("User not found");
        }
        const user = result.rows[0];
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new Error("Invalid password");
        }
        return user;
    }
    catch (error) {
        throw new Error(error.message);
    }
}
//# sourceMappingURL=authModel.js.map