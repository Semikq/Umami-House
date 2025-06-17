import { addRestaurant , updateRestaurant, deleteRestaurant } from "../../models/restaurants/restaurantsAdminModel.js";
import { Request, Response } from "express";

export async function handleAddRestaurant(req: Request, res: Response): Promise<void> {
    try {
        await addRestaurant(req.body)
        res.status(201).json("Restaurant successfully added")
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleUpdateRestaurant(req: Request, res: Response): Promise<void> {
    try {
        const id = Number(req.params.id)

        await updateRestaurant({ id }, req.body)
        res.status(200).json("Restaurant successfully update")
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleDeleteRestaurant(req: Request, res: Response): Promise<void> {
    try {
        const id = Number(req.params.id)

        await deleteRestaurant({ id })
        res.status(204).send()
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}