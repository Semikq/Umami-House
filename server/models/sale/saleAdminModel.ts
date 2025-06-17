import { pool } from "../../config/dbConfig";
import { AddSale, UpdateSale, IdSale } from "../TypesModel/saleTypes";

export async function addSale({ title, image_url, active }: AddSale): Promise<void> {
    try {
        await pool.query(
            "INSERT INTO umamihouse.sale (title, image_url, active) VALUES ($1, $2, $3)",
            [title, image_url, active]
        );
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export async function updateSale({ id }: IdSale, { active }: UpdateSale): Promise<void> {
    try {
        await pool.query(
            "UPDATE umamihouse.sale SET active = $1 WHERE id = $2",
            [active, id]
        );
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export async function deleteSale({ id }: IdSale): Promise<void> {
    try {
        await pool.query(
            "DELETE FROM umamihouse.sale WHERE id = $1",
            [id]
        );
    } catch (error) {
        throw new Error((error as Error).message);
    }
}
