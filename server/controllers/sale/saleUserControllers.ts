import { Request, Response } from "express";
import { fetchAllSale } from "../../models/sale/saleUserModul.js";

export async function handleAllSale(req: Request, res: Response):Promise<void> {
    try {
        const result = await fetchAllSale()
        res.json(result)
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}