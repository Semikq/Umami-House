import { fetchOrdersByUser, addOrder, deleteOrder } from "../../models/orders/ordersUserModel.js";
import { Request, Response } from "express";

export async function handleOrdersByUser(req: Request, res: Response): Promise<void> {
    try {
        const result = await fetchOrdersByUser({ uuid: req.params.uuid })
        res.status(200).json({ data: result })
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleAddOrder(req: Request, res: Response): Promise<void> {
    try {
        const result = await addOrder(req.body)
        res.status(201).json({ data: result })
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleDeleteOrder(req: Request, res: Response): Promise<void> {
    try {
        await deleteOrder({ uuid: req.params.uuid })
        res.status(204).send()
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}
