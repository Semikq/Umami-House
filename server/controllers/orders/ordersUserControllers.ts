import { fetchOrdersByUser, addOrder, deleteOrder } from "../../models/orders/ordersUserModel";
import { Request, Response } from "express";

export async function handleOrdersByUser(req: Request, res: Response): Promise<void> {
    try {
        const result = await fetchOrdersByUser(req.body)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleAddOrder(req: Request, res: Response): Promise<void> {
    try {
        await addOrder(req.body)
        res.status(201).json("Order successfully added")
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