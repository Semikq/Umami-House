import { Router } from "express";
import { handleGetAllFavorites, handleAddFavorite, handleDeleteFavorite } from "../controllers/favorites/favoritesUserControllers";
import { validate } from "../middleware/validation";
import { favoritesSchemas } from "../schemas/favoritesSchemas";

const route = Router()

route.get("/user/:id/favorites", validate({ params: favoritesSchemas.allfavorites.params }), handleGetAllFavorites)
route.post("/favorites", validate({ body: favoritesSchemas.addFavorite.body }), handleAddFavorite)
route.delete("/favorites", validate({ body: favoritesSchemas.deleteFavorite.body }), handleDeleteFavorite)

export default route