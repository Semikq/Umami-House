import { pool } from "../../config/dbConfig.js";
export async function addPartners({ name, logo, link_website, active }) {
    try {
        await pool.query("INSERT INTO umamihouse.partners (name, logo, link_website, active) VALUES ($1, $2, $3, $4)", [name, logo, link_website, active]);
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function updatePartners({ id }, { name, logo, link_website, active }) {
    try {
        await pool.query("UPDATE umamihouse.partners SET name = $1, logo = $2, link_website = $3, active = $4 WHERE id = $5", [name, logo, link_website, active, id]);
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function deletePartners({ id }) {
    try {
        await pool.query("DELETE FROM umamihouse.partners WHERE id = $1", [id]);
    }
    catch (error) {
        throw new Error(error.message);
    }
}
//# sourceMappingURL=partnersAdminModel.js.map