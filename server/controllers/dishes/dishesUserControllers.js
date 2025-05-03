import { fetchAllDishes, fetchDishById, fetchDishCommentsById } from "../../models/dishes/dishesUserModel";

export async function handleGetAllDishes(req, res) {
    try {
        const result = await fetchAllDishes()
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function handleGetDishById(req, res) {
    try {
        const result = await fetchDishById(req.params)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function handleDishCommentsById(req, res) {
    try {
        const result = await fetchDishCommentsById(req.params)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}