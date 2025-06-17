import { Router } from "express";
import { handleGetAllFavorites, handleAddFavorite, handleDeleteFavorite } from "../controllers/favorites/favoritesUserControllers.js";
import { validate } from "../middleware/validation.js";
import { favoritesSchemas } from "../schemas/favoritesSchemas.js";

const route = Router()

route.get("/user/:id/favorites", validate({ params: favoritesSchemas.allfavorites.params }), handleGetAllFavorites)
route.post("/", validate({ body: favoritesSchemas.addFavorite.body }), handleAddFavorite)
route.delete("/", validate({ body: favoritesSchemas.deleteFavorite.body }), handleDeleteFavorite)

export default route