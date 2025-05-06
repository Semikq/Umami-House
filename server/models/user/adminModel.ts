import { RowDataPacket } from "mysql2";
import { pool } from "../../pool";

interface AllUser extends RowDataPacket{
    id: number,
    email: string,
    password: string,
    name: string,
    surname?: string,
    phone: string,
    role: string,
    company_type?: string,
    company_name?: string,
    created_at: string
}

interface ChoiceRoleUser{
    role: string,
    id: number
}

interface DeleteUser{
    id: string
}

export async function fetchAllUsers():Promise<AllUser[]> {
    try {
        const [rows] = await pool.execute<AllUser[]>("SELECT * FROM users")
        return rows
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function choiceRoleUser({ role, id }:ChoiceRoleUser):Promise<void> {
    try {
        await pool.execute("UPDATE users SET role = ? WHERE id = ?", [role, id])
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function deleteUser({ id }:DeleteUser):Promise<void> {
    try {
        await pool.execute("DELETE FROM users WHERE id = ?", [id])
    } catch (error) {
        throw new Error((error as Error).message)
    }
}