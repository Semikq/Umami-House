import { fetchOrdersByUser, addOrder, deleteOrder } from "../../models/orders/ordersUserModel.js";
import { Request, Response } from "express";

export async function handleOrdersByUser(req: Request, res: Response): Promise<void> {
    try {
        const id = Number(req.params.id)

        if(isNaN(id)){
            res.status(400).json("Invalid user id")
            return
        }

        const result = await fetchOrdersByUser({ id })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleAddOrder(req: Request, res: Response): Promise<void> {
    try {
        const id = Number(req.params.id)

        if(isNaN(id)){
            res.status(400).json("Invalid user id")
            return
        }

        await addOrder({ id }, req.body)
        res.status(201).json("Order successfully added")
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleDeleteOrder(req: Request, res: Response): Promise<void> {
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