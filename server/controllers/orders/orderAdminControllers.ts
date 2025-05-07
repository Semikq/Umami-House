import { fetchOrdersByFilter, updateStatusOrder, deleteOrder } from "../../models/orders/ordersAdminModel";
import { Request, Response } from "express";

export async function handleOrdersByFilter(req: Request, res: Response): Promise<void> {
    try {
        const result = await fetchOrdersByFilter(req.body)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleUpdateStatusOrder(req: Request, res: Response): Promise<void> {
    try {
        await updateStatusOrder(req.body)
        res.status(200).json("Status Order successfully update")
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleDeleteOrder(req: Request, res: Response): Promise<void> {
    try {
        await deleteOrder(req.body)
        res.status(204).send()
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}