import { pool } from "../../config/dbConfig";
import { UpdateUser, IdUser, DeleteResult, User } from "../TypesModel/userTypes";
import { ResultSetHeader } from 'mysql2'

export async function updateUser({ id }: IdUser, { email, password, name, surname, phone, company_type, company_name }: UpdateUser): Promise<User> {
    try {
        const [result] = await pool.execute<ResultSetHeader>("UPDATE users SET email = ?, password = ?, name = ?, surname = ?, phone = ?, company_type = ?, company_name = ? WHERE id = ?", [email, password, name, surname, phone, company_type, company_name, id])

        if (result.affectedRows === 0) {
            throw new Error("User not found or no changes made")
        }

        const [rows] = await pool.execute<User[]>("SELECT * FROM users WHERE id = ?", [id])
        return rows[0]
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function deleteUser({ id }: IdUser): Promise<DeleteResult> {
    try {
        const [result] = await pool.execute<ResultSetHeader>("DELETE FROM users WHERE id = ?", [id])
        return result
    } catch (error) {
        throw new Error((error as Error).message)
    }
}