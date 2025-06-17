import { fetchAllPartners } from "../../models/partners/partnersUserModel.js";
import { Request, Response } from "express";

export async function handleAllPartners(req: Request, res: Response): Promise<void> {
    try {
        const result = await fetchAllPartners()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}