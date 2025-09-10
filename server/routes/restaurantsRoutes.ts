import { Router } from "express";
import { handleAddRestaurant, handleUpdateRestaurant, handleDeleteRestaurant, handleAddCity, handleDeleteCity } from "../controllers/restaurants/restaurantsAdminControllers.js";
import {handleAllCities, handleAllRestaurants, handleRestaurantsByCity} from "../controllers/restaurants/restaurantsUserControllers.js";
import { validate } from "../middleware/validation.js";
import { authenticateToken, authorizeAdmin } from "../middleware/authMiddleware.js";
import { restaurantsSchemas } from "../schemas/restaurantsSchemas.js";

const route = Router()

route.post("/addRestaurant", authenticateToken, authorizeAdmin, validate({ body: restaurantsSchemas.create.body }), handleAddRestaurant)
route.put("/updateRestaurant/:id", authenticateToken, authorizeAdmin, validate({ params: restaurantsSchemas.update.params ,body: restaurantsSchemas.update.body }), handleUpdateRestaurant)
route.delete("/deleteRestaurant/:id", authenticateToken, authorizeAdmin, validate({ params: restaurantsSchemas.delete.params }), handleDeleteRestaurant)

route.post("/addCity", authenticateToken, authorizeAdmin, validate({ body: restaurantsSchemas.addCity.body }), handleAddCity)
route.delete("/deleteCity/:id", authenticateToken, authorizeAdmin, validate({ params: restaurantsSchemas.deleteCity.params }), handleDeleteCity)

route.get("/cities", handleAllCities)
route.get("/city/:city_id", handleRestaurantsByCity)
route.get("/", handleAllRestaurants)
// validate({ body: restaurantsShemas.restaurants.body })
export default route