import { pool } from "../../config/dbConfig.js"
import { AllSale } from "../TypesModel/saleTypes.js";

export async function fetchAllSale(): Promise<AllSale[]> {
  try {
    const result = await pool.query<AllSale>("SELECT * FROM umamihouse.sale");
    return result.rows;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
