import { Router } from "express"
import { handleAddDish, handleUpdateDish, handleDeleteDish, handleDeleteCommentUserById } from "../controllers/dishes/dishesAdminControllers.js"
import { handleGetAllCategories, handleGetAllDishesByCategory, handleGetDishById, handleDishCommentsById, handleAddCommentByIdDishes, handleDeleteCommentByIdDishes } from "../controllers/dishes/dishesUserControllers.js"
import { validate } from "../middleware/validation.js";
import { dishesSchemas } from "../schemas/dishesSchemas.js";

const route = Router()

route.get("/categoryDishes/:id",validate({params: dishesSchemas.dishById.params}), handleGetAllDishesByCategory)
route.get("/categories", handleGetAllCategories)
route.get("/:id", validate({ params: dishesSchemas.dishById.params }), handleGetDishById)
route.post("/", validate({ body: dishesSchemas.create.body }), handleAddDish)
route.put("/:id", validate({ params: dishesSchemas.update.params, body: dishesSchemas.update.body }), handleUpdateDish)
route.delete("/:id", validate({ params: dishesSchemas.delete.params }), handleDeleteDish)

route.get("/:dish_id/comments", validate({ params: dishesSchemas.dishCommentsById.params }), handleDishCommentsById)
route.post("/:dish_id/comments", validate({ body: dishesSchemas.addCommentByIdDishes.body }), handleAddCommentByIdDishes)
route.delete("/:dish_id/comments", validate({ params: dishesSchemas.deleteCommentByIdDishes.params }), handleDeleteCommentByIdDishes)

export default route