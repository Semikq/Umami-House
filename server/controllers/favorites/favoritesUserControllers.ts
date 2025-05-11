import { fetchAllFavorites, addFavorite, deleteFavorite } from "../../models/favorites/favoritesUserModel";
import { Request, Response } from "express";

export async function handleGetAllFavorites(req: Request, res: Response): Promise<void> {
    try {
        const user_id = Number(req.params.id)

        const result = await fetchAllFavorites({ user_id });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json((error as Error).message);
    }
}

export async function handleAddFavorite(req: Request, res: Response): Promise<void> {
    try {
        await addFavorite(req.body)
        res.status(201).json("Favorites successfully added")
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleDeleteFavorite(req: Request, res: Response): Promise<void> {
    try {
        await deleteFavorite(req.body)
        res.status(204).send()
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}