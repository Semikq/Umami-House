import { pool } from "../../config/dbConfig.js";
export async function fetchAllSale() {
    try {
        const result = await pool.query("SELECT * FROM umamihouse.sale");
        return result.rows;
    }
    catch (error) {
        throw new Error(error.message);
    }
}
//# sourceMappingURL=saleUserModul.js.map