import { addDish, updateDish, deleteDish, deleteCommentUserByUuid } from "../../models/dishes/dishesAdminModel.js";
export async function handleAddDish(req, res) {
    try {
        const result = await addDish(req.body);
        res.status(201).json({ message: "Dish successfully added", data: result });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleUpdateDish(req, res) {
    try {
        const result = await updateDish({ uuid: req.params.uuid }, req.body);
        res.status(200).json({ message: "Dish successfully update", data: result });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleDeleteDish(req, res) {
    try {
        await deleteDish({ uuid: req.params.uuid });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleDeleteCommentUserByUuid(req, res) {
    try {
        await deleteCommentUserByUuid(req.body);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
