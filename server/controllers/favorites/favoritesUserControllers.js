import { fetchAllFavorites, addFavorites, deleteFavorites } from "../../models/favorites/favoritesUserModel";

export async function handleGetAllFavorites(req, res) {
    try {
        const result = await fetchAllFavorites(req.params)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function handleAddFavorites(req, res) {
    try {
        const result = await addFavorites(req.body)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function handleDeleteFavorites(req, res) {
    try {
        const result = await deleteFavorites(req.body)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}