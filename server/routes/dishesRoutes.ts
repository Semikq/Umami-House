import { Router } from "express"
import { handleAddDish, handleUpdateDish, handleDeleteDish, handleDeleteCommentUserById } from "../controllers/dishes/dishesAdminControllers"
import { handleGetAllDishes, handleGetDishById, handleDishCommentsById, handleAddCommentByIdDishes, handleDeleteCommentByIdDishes } from "../controllers/dishes/dishesUserControllers"
import { validate } from "../middleware/validation"

const route = Router()

route.get("/dishes", validate(), handleGetAllDishes)
route.get("/dishes/:dish_id", validate(), handleGetDishById)
route.post("/dishes", validate(), handleAddDish)
route.put("/dishes/:id", validate(), handleUpdateDish)
route.delete("/dishes/:id", validate(), handleDeleteDish)

route.get("/dishes/:dish_id/comments", validate(), handleDishCommentsById)
route.post("/dishes/:dish_id/comments", validate(), handleAddCommentByIdDishes)
route.delete("/dishes/:dish_id/comments", validate(), handleDeleteCommentByIdDishes)

export default route