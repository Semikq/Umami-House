import { Request, Response } from "express";
import { addSale, updateSale, deleteSale } from "../../models/sale/saleAdminModel";

export async function handleAddSale(req: Request, res: Response): Promise<void> {
    try {
        await addSale(req.body)
        res.status(201).json("Sale successfully added")
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleUpdateSale(req: Request, res: Response): Promise<void> {
    try {
        const id = Number(req.params.id)

        await updateSale({ id },req.body)
        res.status(200).json("Sale successfully updated")
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleDeleteSale(req: Request, res: Response): Promise<void> {
    try {
        const id = Number(req.params.id)

        await deleteSale({ id })
        res.status(204).send()
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}