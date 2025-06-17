import { pool } from "../../config/dbConfig.js";
import { UpdateUser, IdUser, DeleteResult, User } from "../TypesModel/userTypes.js";

export async function updateUser(
    { id }: IdUser,
    { email, password, name, surname, phone, company_type, company_name }: UpdateUser
): Promise<User> {
    try {
        const result = await pool.query(
            `UPDATE users 
             SET email = $1, password = $2, name = $3, surname = $4, phone = $5, company_type = $6, company_name = $7 
             WHERE id = $8`,
            [email, password, name, surname, phone, company_type, company_name, id]
        );

        if (result.rowCount === 0) {
            throw new Error("User not found or no changes made");
        }

        const userResult = await pool.query<User>("SELECT * FROM users WHERE id = $1", [id]);
        return userResult.rows[0];
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export async function deleteUser({ id }: IdUser): Promise<{ rowCount: number, command: string }> {
    try {
        const result = await pool.query("DELETE FROM users WHERE id = $1", [id]);
        return {
            rowCount: result.rowCount ?? 0,
            command: result.command
        };
    } catch (error) {
        throw new Error((error as Error).message);
    }
}