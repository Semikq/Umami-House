import { pool } from "../../pool";
import { AddSale, UpdateSale, DeleteSale } from "../TypesModel/saleTypes";

export async function addSale({ title, image_url, active}: AddSale):Promise<void> {
    try {
        await pool.execute("INSERT INTO sale (title, image_url, active) VALUES (?, ?, ?)", [title, image_url, active])
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function updateSale({ active, id }: UpdateSale):Promise<void> {
    try {
        await pool.execute("UPDATE sale SET active = ? WHERE id = ?", [active, id])
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export async function deleteSale({ id }: DeleteSale):Promise<void> {
    try {
        await pool.execute("DELETE FROM sale WHERE id = ?", [id])
    } catch (error) {
        throw new Error((error as Error).message)
    }
}