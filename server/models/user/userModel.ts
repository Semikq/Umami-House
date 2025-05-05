import { pool } from "../../pool";

interface UpdateUser{
    email: string,
    password: string,
    name: string,
    surname?: string,
    phone: string,
    role: string,
    company_type?: string,
    company_name?: string,
    created_at: string,
    id: number
}

interface DeleteUser{
    id: number
}

export async function updateUser({ email, password, name, surname, phone, company_type, company_name, id }:UpdateUser):Promise<void> {
    try {
        await pool.execute("UPDATE users SET email = ?, password = ?, name = ?, surname = ?, phone = ?, company_type = ?, company_name = ? WHERE id = ?", [email, password, name, surname, phone, company_type, company_name, id])
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