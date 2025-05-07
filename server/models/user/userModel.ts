import { pool } from "../../pool";
import { UpdateUser, DeleteUser, DeleteResult } from "../TypesModel/userTypes";
import { ResultSetHeader } from 'mysql2'

export async function updateUser({ email, password, name, surname, phone, company_type, company_name, id }: UpdateUser): Promise<void> {
    try {
        await pool.execute("UPDATE users SET email = ?, password = ?, name = ?, surname = ?, phone = ?, company_type = ?, company_name = ? WHERE id = ?", [email, password, name, surname, phone, company_type, company_name, id])
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function deleteUser({ id }: DeleteUser): Promise<DeleteResult> {
    try {
        const [result] = await pool.execute<ResultSetHeader>("DELETE FROM users WHERE id = ?", [id])
        return result
    } catch (error) {
        throw new Error((error as Error).message)
    }
}