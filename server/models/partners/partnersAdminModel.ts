import { pool } from "../../config/dbConfig";
import { AddPartners, UpdatePartners, IdPartners } from "../TypesModel/partnersTypes";

export async function addPartners({ name, logo, link_website, active }: AddPartners): Promise<void> {
    try {
        await pool.execute("INSERT INTO partners (name, logo, link_website, active) VALUES (?, ?, ?, ?)", [name, logo, link_website, active])
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function updatePartners({ id }: IdPartners, { name, logo, link_website, active }: UpdatePartners): Promise<void> {
    try {
        await pool.execute("UPDATE partners SET name = ?, logo = ?, link_website = ?, active = ? WHERE id = ?", [name, logo, link_website, active, id])
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