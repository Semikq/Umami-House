import { Router } from "express"
import { handleAddDish, handleUpdateDish, handleDeleteDish, handleDeleteCommentUserById } from "../controllers/dishes/dishesAdminControllers"
import { handleGetAllDishes, handleGetDishById, handleDishCommentsById, handleAddCommentByIdDishes, handleDeleteCommentByIdDishes } from "../controllers/dishes/dishesUserControllers"
import { validate } from "../middleware/validation"

const route = Router()

route.post("/admin/:name/editDishes/dishes/:id", validate(), handleAddDish)
route.put("/admin/:name/editDishes/dishes/:id", validate(), handleUpdateDish)
route.delete("/admin/:name/editDishes/dishes/:id", validate(), handleDeleteDish)

route.get("/dishes", validate(), handleGetAllDishes)
route.get("/dishes/:dish_id", validate(), handleGetDishById)
route.get("/dishes/:dish_id/comment", validate(), handleDishCommentsById)
route.post("/dishes/:dish_id/comment", validate(), handleAddCommentByIdDishes)
route.delete("/dishes/:dish_id/comment", validate(), handleDeleteCommentByIdDishes)

export default route