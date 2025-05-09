import { pool } from "../../pool";
import { AddPartners, UpdatePartners, IdPartners } from "../TypesModel/partnersTypes";

export async function addPartners({ name, logo, link_website, active }: AddPartners): Promise<void> {
    try {
        await pool.execute("INSERT INTO partners (name, logo, link_website, active) VALUES (?, ?, ?, ?)", [name, logo, link_website, active])
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function updatePartners({ id }: IdPartners, { active }: UpdatePartners): Promise<void> {
    try {
        await pool.execute("UPDATE partners SET active = ? WHERE id = ?", [active, id])
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function deletePartners({ id }: IdPartners): Promise<void> {
    try {
        await pool.execute("DELETE FROM partners WHERE id = ?", [id])
    } catch (error) {
        throw new Error((error as Error).message)
    }
}