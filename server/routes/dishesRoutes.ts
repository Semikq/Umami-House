import { Router } from "express"
import { handleAddDish, handleUpdateDish, handleDeleteDish, handleDeleteCommentUserById } from "../controllers/dishes/dishesAdminControllers"
import { handleGetAllDishes, handleGetDishById, handleDishCommentsById, handleAddCommentByIdDishes, handleDeleteCommentByIdDishes } from "../controllers/dishes/dishesUserControllers"
import { validate } from "../middleware/validation"
import { dishesSchemas } from "../schemas/dishesSchemas"

const route = Router()

route.get("/dishes", handleGetAllDishes)
route.get("/dishes/:dish_id", validate({ params: dishesSchemas.dishById.params }), handleGetDishById)
route.post("/dishes", validate({ body: dishesSchemas.create.body }), handleAddDish)
route.put("/dishes/:id", validate({ params: dishesSchemas.update.params, body: dishesSchemas.update.body }), handleUpdateDish)
route.delete("/dishes/:id", validate({ params: dishesSchemas.delete.params }), handleDeleteDish)

route.get("/dishes/:dish_id/comments", validate({ params: dishesSchemas.dishCommentsById.params }), handleDishCommentsById)
route.post("/dishes/:dish_id/comments", validate({ body: dishesSchemas.addCommentByIdDishes.body }), handleAddCommentByIdDishes)
route.delete("/dishes/:dish_id/comments", validate({ params: dishesSchemas.deleteCommentByIdDishes.params }), handleDeleteCommentByIdDishes)

export default route