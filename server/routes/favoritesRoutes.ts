import { Router } from "express";
import { handleGetAllFavorites, handleAddFavorite, handleDeleteFavorite } from "../controllers/favorites/favoritesUserControllers";
import { validate } from "../middleware/validation";
import { authenticateToken } from "../middleware/authMiddleware";
import { favoritesSchemas } from "../schemas/favoritesSchemas";

const route = Router()

route.get("/user/:id/favorites", authenticateToken, validate({ params: favoritesSchemas.allfavorites.params }), handleGetAllFavorites)
route.post("/addFavorite", authenticateToken, validate({ body: favoritesSchemas.addFavorite.body }), handleAddFavorite)
route.delete("/deleteFavorite", authenticateToken, validate({ body: favoritesSchemas.deleteFavorite.body }), handleDeleteFavorite)

export default route