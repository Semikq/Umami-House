import { Router } from "express";
import { handleAddRestaurant, handleUpdateRestaurant, handleDeleteRestaurant } from "../controllers/restaurants/restaurantsAdminControllers";
import { handleAllCities, handleRestaurantByCity } from "../controllers/restaurants/restaurantsUserControllers";
import { validate } from "../middleware/validation";

const route = Router()

route.post("/restaurant", validate(), handleAddRestaurant)
route.put("/restaurant/:id", validate(), handleUpdateRestaurant)
route.delete("/restaurant/:id", validate(), handleDeleteRestaurant)

route.get("/cities", validate(), handleAllCities)
route.get("/restaurant/:name", validate(), handleRestaurantByCity)

export default route