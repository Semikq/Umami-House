import { fetchAllCities, fetchRestaurantByCity } from "../../models/restaurants/restaurantsUserModel";
import { Request, Response } from "express";

export async function handleAllCities(req: Request, res: Response): Promise<void> {
    try {
        const result = await fetchAllCities()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleRestaurantByCity(req: Request, res: Response): Promise<void> {
    try {
        const city = req.params.name

        if(!city || typeof city !== "string"){
            res.status(400).json("Invalid restaurant id")
            return
        }

        const result = await fetchRestaurantByCity({ city })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}