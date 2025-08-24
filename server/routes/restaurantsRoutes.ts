import { Router } from "express";
import { handleAddRestaurant, handleUpdateRestaurant, handleDeleteRestaurant, handleAddCity, handleDeleteCity } from "../controllers/restaurants/restaurantsAdminControllers";
import {handleAllCities, handleAllRestaurants, handleRestaurantsByCity} from "../controllers/restaurants/restaurantsUserControllers";
import { validate } from "../middleware/validation";
import { authenticateToken, authorizeAdmin } from "../middleware/authMiddleware";
import { restaurantsShemas } from "../schemas/restaurantsSchemas";

const route = Router()

route.post("/addRestaurant", authenticateToken, authorizeAdmin, validate({ body: restaurantsShemas.create.body }), handleAddRestaurant)
route.put("/:id/updateRestaurant", authenticateToken, authorizeAdmin, validate({ params: restaurantsShemas.update.params ,body: restaurantsShemas.update.body }), handleUpdateRestaurant)
route.delete("/deleteRestaurant", authenticateToken, authorizeAdmin, validate({ body: restaurantsShemas.delete.params }), handleDeleteRestaurant)
route.post("/addCity", authenticateToken, authorizeAdmin, validate({ body: restaurantsShemas.addCity.body }), handleAddCity)
route.delete("/deleteCity", authenticateToken, authorizeAdmin, validate({ body: restaurantsShemas.deleteCity.params }), handleDeleteCity)

route.get("/cities", handleAllCities)
route.get("/city/:city_id", validate({ params: restaurantsShemas.restaurants.params }), handleRestaurantsByCity)
route.get("/", handleAllRestaurants)

export default route