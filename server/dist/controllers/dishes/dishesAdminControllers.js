import { addDish, updateDish, deleteDish, deleteCommentUserById } from "../../models/dishes/dishesAdminModel.js";
export async function handleAddDish(req, res) {
    try {
        await addDish(req.body);
        res.status(201).json("Dish successfully added");
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleUpdateDish(req, res) {
    try {
        const id = Number(req.params.id);
        await updateDish({ id }, req.body);
        res.status(200).json("Dish successfully update");
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleDeleteDish(req, res) {
    try {
        const id = Number(req.params.id);
        await deleteDish({ id });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleDeleteCommentUserById(req, res) {
    try {
        await deleteCommentUserById(req.body);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
//# sourceMappingURL=dishesAdminControllers.js.map