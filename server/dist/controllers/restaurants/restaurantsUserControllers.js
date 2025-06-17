import { fetchAllCities, fetchRestaurantsByCity } from "../../models/restaurants/restaurantsUserModel.js";
export async function handleAllCities(req, res) {
    try {
        const result = await fetchAllCities();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleRestaurantsByCity(req, res) {
    try {
        const city = req.params.name;
        const result = await fetchRestaurantsByCity({ city });
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
//# sourceMappingURL=restaurantsUserControllers.js.map