import express from "express"
import {
  handleAddDish,
  handleUpdateDish,
  handleDeleteDish,
  handleAddImageByDish,
  handleDeleteImageByDish,
  handleGetDishById,
} from "../controllers/dishes/dishesAdminControllers"

const router = express.Router()

router.post("/dishes/add", validete(addDish), handleAddDish)
router.post("/dishes/update", handleUpdateDish)
router.post("/dishes/delete", handleDeleteDish)
router.post("/dishes/add-image", handleAddImageByDish)
router.post("/dishes/delete-image", handleDeleteImageByDish)

router.get("/dishes/:id", handleGetDishById)

export default router