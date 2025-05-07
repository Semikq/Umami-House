import { fetchAllFavorites, addFavorites, deleteFavorites } from "../../models/favorites/favoritesUserModel";
import { Request, Response } from "express";

export async function handleGetAllFavorites(req: Request, res: Response): Promise<void> {
    try {
        const user_id = Number(req.params.id)

        if(isNaN(user_id)){
            res.status(400).json("Invalid user id")
            return
        }

        const result = await fetchAllFavorites({ user_id });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json((error as Error).message);
    }
}

export async function handleAddFavorites(req: Request, res: Response): Promise<void> {
    try {
        await addFavorites(req.body)
        res.status(201).json("Favorites successfully added")
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleDeleteFavorites(req: Request, res: Response): Promise<void> {
    try {
        await deleteFavorites(req.body)
        res.status(204).send()
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}