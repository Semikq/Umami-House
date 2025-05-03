import { fetchAllCities, fetchRestaurantByCity } from "../../models/restaurants/restaurantsUserModel";

export async function handleAllCities(req, res) {
    try {
        const result = await fetchAllCities()
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function handleRestaurantByCity(req, res) {
    try {
        const result = await fetchRestaurantByCity(req.params)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}