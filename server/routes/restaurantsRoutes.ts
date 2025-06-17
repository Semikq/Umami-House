import { Router } from "express";
import { handleAddRestaurant, handleUpdateRestaurant, handleDeleteRestaurant } from "../controllers/restaurants/restaurantsAdminControllers.js";
import { handleAllCities, handleRestaurantsByCity } from "../controllers/restaurants/restaurantsUserControllers.js";
import { validate } from "../middleware/validation.js";
import { restaurantsShemas } from "../schemas/restaurantsSchemas.js";

const route = Router()

route.post("/", validate({ body: restaurantsShemas.create.body }), handleAddRestaurant)
route.put("/:id", validate({ params: restaurantsShemas.update.params, body: restaurantsShemas.update.body }), handleUpdateRestaurant)
route.delete("/:id", validate({ params: restaurantsShemas.delete.params }), handleDeleteRestaurant)

route.get("/cities", handleAllCities)
route.get("/:city", validate({ params: restaurantsShemas.restaurants.params }), handleRestaurantsByCity)

export default route