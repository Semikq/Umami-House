import express from "express"
import { getDishesController, getDishIdController } from "./controllers/dishesController"

export const router = express.Router()

router.get("/dishes", getDishesController)
router.post("/dish", getDishIdController)