import { Router } from "express";
import { handleGetAllFavorites, handleAddFavorites, handleDeleteFavorites } from "../controllers/favorites/favoritesUserControllers";
import { validate } from "../middleware/validation";

const route = Router()

route.get("/user/:id/favorites", validate(), handleGetAllFavorites)
route.post("/addFavorites", validate(), handleAddFavorites)
route.post("/deleteFavorites", validate(), handleDeleteFavorites)

export default route