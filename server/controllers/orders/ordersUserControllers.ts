import { fetchOrdersByUser, addOrder, deleteOrder } from "../../models/orders/ordersUserModel";
import { Request, Response } from "express";

export async function handleOrdersByUser(req: Request, res: Response): Promise<void> {
    try {
        const id = Number(req.params.id)
        const result = await fetchOrdersByUser({ id })
        res.status(200).json({ message: result, data: result })
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleAddOrder(req: Request, res: Response): Promise<void> {
    try {
        const id = Number(req.params.id)
        const result = await addOrder({ id }, req.body)
        res.status(201).json({ message: "Order successfully added", data: result })
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleDeleteOrder(req: Request, res: Response): Promise<void> {
    try {
        const id = Number(req.params.id)
        await deleteOrder({ id })
        res.status(204).send()
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}