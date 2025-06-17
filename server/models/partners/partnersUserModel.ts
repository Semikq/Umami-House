import { pool } from "../../config/dbConfig.js"
import { AllPartners } from "../TypesModel/partnersTypes.js"

export async function fetchAllPartners(): Promise<AllPartners[]> {
  try {
    const result = await pool.query<AllPartners>("SELECT * FROM umamihouse.partners");
    return result.rows;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}