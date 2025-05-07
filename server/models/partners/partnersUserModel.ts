import { pool } from "../../pool.js"
import { AllPartners } from "../TypesModel/partnersTypes.js"

export async function fetchAllPartners(): Promise<AllPartners[]> {
    try {
        const [partners] = await pool.execute<AllPartners[]>("SELECT * FROM partners")
        return partners
    } catch (error) {
        throw new Error((error as Error).message)
    }
}