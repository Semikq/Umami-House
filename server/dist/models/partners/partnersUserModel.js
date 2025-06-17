import { pool } from "../../config/dbConfig.js";
export async function fetchAllPartners() {
    try {
        const result = await pool.query("SELECT * FROM umamihouse.partners");
        return result.rows;
    }
    catch (error) {
        throw new Error(error.message);
    }
}
//# sourceMappingURL=partnersUserModel.js.map