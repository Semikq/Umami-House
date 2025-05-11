import { pool } from "../../config/dbConfig";
import { AllUser, ChoiceRoleUser, IdUser } from "../TypesModel/userTypes";

export async function fetchAllUsers(): Promise<AllUser[]> {
    try {
        const [rows] = await pool.query<AllUser[]>("SELECT * FROM users")
        return rows
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function choiceRoleUser({ id }: IdUser, { role }: ChoiceRoleUser): Promise<void> {
    try {
        await pool.execute("UPDATE users SET role = ? WHERE id = ?", [role, id])
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function deleteUser({ id }: IdUser): Promise<void> {
    try {
        await pool.execute("DELETE FROM users WHERE id = ?", [id])
    } catch (error) {
        throw new Error((error as Error).message)
    }
}