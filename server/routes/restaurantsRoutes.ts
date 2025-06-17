import { Router } from "express";
import { handleAddRestaurant, handleUpdateRestaurant, handleDeleteRestaurant } from "../controllers/restaurants/restaurantsAdminControllers";
import { handleAllCities, handleRestaurantsByCity } from "../controllers/restaurants/restaurantsUserControllers";
import { validate } from "../middleware/validation";
import { restaurantsShemas } from "../schemas/restaurantsSchemas";

const route = Router()

route.post("/", validate({ body: restaurantsShemas.create.body }), handleAddRestaurant)
route.put("/:id", validate({ params: restaurantsShemas.update.params, body: restaurantsShemas.update.body }), handleUpdateRestaurant)
route.delete("/:id", validate({ params: restaurantsShemas.delete.params }), handleDeleteRestaurant)

route.get("/cities", handleAllCities)
route.get("/:city", validate({ params: restaurantsShemas.restaurants.params }), handleRestaurantsByCity)

export default route