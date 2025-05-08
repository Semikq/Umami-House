import { pool } from "../../pool"
import { AllSale } from "../TypesModel/saleTypes";

export async function fetchAllSale(): Promise<AllSale[]> {
    try {
        const [rows] = await pool.query<AllSale[]>("SELECT * FROM sale");
        return rows
    } catch (error) {
        throw new Error((error as Error).message)
    }
}