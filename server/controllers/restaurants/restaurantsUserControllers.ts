import {fetchAllCities, fetchAllRestaurants, fetchRestaurantsByCity} from "../../models/restaurants/restaurantsUserModel.js";
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
        const result = await fetchRestaurantsByCity({ city_uuid: req.params.city_uuid });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export async function handleAllRestaurants(req: Request, res: Response): Promise<void> {
    try {
        const result = await fetchAllRestaurants()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}
