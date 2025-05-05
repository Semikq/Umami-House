import { Request, Response } from "express";
import { addSale, updateSale, deleteSale } from "../../models/sale/saleAdminModel";

export async function handleAddSale(req: Request, res: Response):Promise<void> {
    try {
        await addSale(req.body)
        res.status(201).json({ message: "Sale successfully added" })
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleUpdateSale(req: Request, res: Response):Promise<void> {
    try {
        await updateSale(req.body)
        res.status(200).json({ message: "Sale successfully updated" })
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleDeleteSale(req: Request, res: Response):Promise<void> {
    try {
        await deleteSale(req.body)
        res.status(200).json({ message: "Sale successfully deleted" })
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}