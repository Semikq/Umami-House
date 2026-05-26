import { fetchAllFavorites, addFavorite, deleteFavorite } from "../../models/favorites/favoritesUserModel.js";
export async function handleGetAllFavorites(req, res) {
    try {
        const result = await fetchAllFavorites({ user_uuid: req.params.uuid });
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleAddFavorite(req, res) {
    try {
        const result = await addFavorite(req.body);
        res.status(201).json({ data: result });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleDeleteFavorite(req, res) {
    try {
        await deleteFavorite(req.body);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
