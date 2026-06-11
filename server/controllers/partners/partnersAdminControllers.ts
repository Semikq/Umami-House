import {
    addPartners,
    updatePartners,
    deletePartners,
    uploadPartnerLogo,
} from "../../models/partners/partnersAdminModel.js";
import { Request, Response } from "express";

export async function handleAddPartners(req: Request, res: Response): Promise<void> {
    try {
        const result = await addPartners(req.body)
        res.status(201).json({ message: "Partners successfully added", data: result })
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleUpdatePartners(req: Request, res: Response): Promise<void> {
    try {
        const result = await updatePartners({ uuid: req.params.uuid, ...req.body })
        res.status(200).json({ message: "Partners successfully update", data: result })
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleUploadPartnerLogo(req: Request, res: Response): Promise<void> {
    try {
        const result = await uploadPartnerLogo(req.body);
        res.status(201).json({ message: "Logo uploaded", data: result });
    } catch (error) {
        res.status(500).json((error as Error).message);
    }
}

export async function handleDeletePartners(req: Request, res: Response): Promise<void> {
    try {
        await deletePartners({ uuid: req.params.uuid })
        res.status(204).send()
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}