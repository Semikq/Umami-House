import { pool } from "../../config/dbConfig.js";
import { AllUser, ChoiceRoleUser, IdUser } from "../TypesModel/userTypes.js";

export async function fetchAllUsers(): Promise<AllUser[]> {
    try {
        const result = await pool.query<AllUser>("SELECT * FROM users");
        return result.rows;
    } catch (error) {
        throw new Error((error as Error).message);
    }
}


export async function choiceRoleUser(
    { id }: IdUser,
    { role }: ChoiceRoleUser
): Promise<void> {
    try {
        await pool.query("UPDATE users SET role = $1 WHERE id = $2", [role, id]);
    } catch (error) {
        throw new Error((error as Error).message);
    }
}


export async function deleteUser({ id }: IdUser): Promise<void> {
    try {
        await pool.query("DELETE FROM users WHERE id = $1", [id]);
    } catch (error) {
        throw new Error((error as Error).message);
    }
}
