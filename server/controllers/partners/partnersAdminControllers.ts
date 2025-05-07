import { addPartners, updatePartners, deletePartners } from "../../models/partners/partnersAdminModel";
import { Request, Response } from "express";

export async function handleAddPartners(req: Request, res: Response): Promise<void> {
    try {
        await addPartners(req.body)
        res.status(201).json("Partners successfully added")
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleUpdatePartners(req: Request, res: Response): Promise<void> {
    try {
        await updatePartners(req.body)
        res.status(200).json("Partners successfully added")
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleDeletePartners(req: Request, res: Response): Promise<void> {
    try {
        await deletePartners(req.body)
        res.status(204).send()
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}