import { fetchAllCities, fetchRestaurantsByCity } from "../../models/restaurants/restaurantsUserModel";
import { Request, Response } from "express";

export async function handleAllCities(req: Request, res: Response): Promise<void> {
    try {
        const result = await fetchAllCities()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleRestaurantsByCity(req: Request, res: Response): Promise<void> {
    try {
        const city_id = Number(req.params.city_id);
        const result = await fetchRestaurantsByCity({ city_id });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}