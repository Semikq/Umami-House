import { pool } from "../../config/dbConfig.js";
export async function addSale({ title, image_url, active }) {
    try {
        await pool.query("INSERT INTO umamihouse.sale (title, image_url, active) VALUES ($1, $2, $3)", [title, image_url, active]);
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function updateSale({ id }, { active }) {
    try {
        await pool.query("UPDATE umamihouse.sale SET active = $1 WHERE id = $2", [active, id]);
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function deleteSale({ id }) {
    try {
        await pool.query("DELETE FROM umamihouse.sale WHERE id = $1", [id]);
    }
    catch (error) {
        throw new Error(error.message);
    }
}
//# sourceMappingURL=saleAdminModel.js.map