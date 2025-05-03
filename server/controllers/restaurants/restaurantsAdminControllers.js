import { addRestaurant , updateRestaurant, deleteRestaurant } from "../../models/restaurants/restaurantsAdminModel";

export async function handleAddRestaurant(req, res) {
    try {
        const result = await addRestaurant(req.body)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function handleUpdateRestaurant(req, res) {
    try {
        const result = await updateRestaurant(req.body)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function handleDeleteRestaurant(req, res) {
    try {
        const result = await deleteRestaurant(req.body)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}