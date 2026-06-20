import { addRestaurant, updateRestaurant, deleteRestaurant, addCity, deleteCity, uploadRestaurantImage, } from "../../models/restaurants/restaurantsAdminModel.js";
export async function handleAddRestaurant(req, res) {
    try {
        const result = await addRestaurant(req.body);
        res.status(201).json({ message: "Restaurant successfully added", data: result });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleUpdateRestaurant(req, res) {
    try {
        const result = await updateRestaurant({ uuid: req.params.uuid }, req.body);
        res.status(200).json({ message: "Restaurant successfully update", data: result });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleDeleteRestaurant(req, res) {
    try {
        await deleteRestaurant({ uuid: req.params.uuid });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleAddCity(req, res) {
    try {
        const result = await addCity(req.body);
        res.status(201).json({ message: "City successfully added", data: result });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleUploadRestaurantImage(req, res) {
    try {
        const result = await uploadRestaurantImage(req.body);
        res.status(201).json({ message: "Image uploaded", data: result });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleDeleteCity(req, res) {
    try {
        await deleteCity({ uuid: req.params.uuid });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
