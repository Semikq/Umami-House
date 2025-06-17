import { fetchAllCategories, fetchAllDishesByCategory, fetchDishById, fetchDishCommentsById, addCommentByIdDishes, deleteCommentByIdDishes } from "../../models/dishes/dishesUserModel.js";
export async function handleGetAllCategories(req, res) {
    try {
        const result = await fetchAllCategories();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleGetAllDishesByCategory(req, res) {
    try {
        const id = Number(req.params.id);
        const result = await fetchAllDishesByCategory({ id });
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleGetDishById(req, res) {
    try {
        const id = Number(req.params.id);
        const result = await fetchDishById({ id });
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleDishCommentsById(req, res) {
    try {
        const id = Number(req.params.id);
        const result = await fetchDishCommentsById({ id });
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleAddCommentByIdDishes(req, res) {
    try {
        await addCommentByIdDishes(req.body);
        res.status(201).json("Comment added");
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleDeleteCommentByIdDishes(req, res) {
    try {
        await deleteCommentByIdDishes(req.body);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
//# sourceMappingURL=dishesUserControllers.js.map