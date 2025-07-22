import { addRestaurant , updateRestaurant, deleteRestaurant, addCity, deleteCity } from "../../models/restaurants/restaurantsAdminModel";
import { Request, Response } from "express";

export async function handleAddRestaurant(req: Request, res: Response): Promise<void> {
    try {
        const result = await addRestaurant(req.body)
        res.status(201).json({ message: "Restaurant successfully added", data: result });
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleUpdateRestaurant(req: Request, res: Response): Promise<void> {
    try {
        const id= Number(req.params.id);
        const result = await updateRestaurant({ id }, req.body)
        res.status(200).json({ message: "Restaurant successfully update", data: result });
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleDeleteRestaurant(req: Request, res: Response): Promise<void> {
    try {
        await deleteRestaurant(req.body)
        res.status(204).send()
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleAddCity(req: Request, res: Response): Promise<void> {
    try {
        const result = await addCity(req.body)
        res.status(201).json({ message: "City successfully added", data: result });
    }catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleDeleteCity(req: Request, res: Response): Promise<void> {
    try {
        await deleteCity(req.body)
        res.status(204).send()
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}