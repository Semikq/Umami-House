import { addRestaurant, updateRestaurant, deleteRestaurant } from "../../models/restaurants/restaurantsAdminModel.js";
export async function handleAddRestaurant(req, res) {
    try {
        await addRestaurant(req.body);
        res.status(201).json("Restaurant successfully added");
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleUpdateRestaurant(req, res) {
    try {
        const id = Number(req.params.id);
        await updateRestaurant({ id }, req.body);
        res.status(200).json("Restaurant successfully update");
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleDeleteRestaurant(req, res) {
    try {
        const id = Number(req.params.id);
        await deleteRestaurant({ id });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
//# sourceMappingURL=restaurantsAdminControllers.js.map