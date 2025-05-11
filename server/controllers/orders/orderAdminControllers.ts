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
        const id = Number(req.params.id)

        if(isNaN(id)){
            res.status(400).json("Invalid user id")
            return
        }

        await updateStatusOrder({ id }, req.body)
        res.status(200).json("Status Order successfully update")
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleDeleteOrderById(req: Request, res: Response): Promise<void> {
    try {
        const id = Number(req.params.id)

        if(isNaN(id)){
            res.status(400).json("Invalid user id")
            return
        }

        await deleteOrder({ id })
        res.status(204).send()
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}