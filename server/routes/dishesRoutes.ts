import { Router } from "express"
import { handleAddDish, handleUpdateDish, handleDeleteDish, handleDeleteCommentUserById } from "../controllers/dishes/dishesAdminControllers"
import { handleCategoryWithDishes, handleAllCategories, handleGetAllDishes, handleGetDishById, handleDishCommentsById, handleAddCommentByIdDishes, handleDeleteCommentByIdDishes } from "../controllers/dishes/dishesUserControllers"
import { validate } from "../middleware/validation"
import { authenticateToken, authorizeAdmin } from "../middleware/authMiddleware"
import { dishesSchemas } from "../schemas/dishesSchemas"

const route = Router()

route.get("/", handleGetAllDishes)
route.get("/categories", handleAllCategories)
route.get("/category/:id", handleCategoryWithDishes)
route.get("/dish/:id", validate({ params: dishesSchemas.dishById.params }), handleGetDishById)
route.post("/addDish", authenticateToken, authorizeAdmin, validate({ body: dishesSchemas.create.body }), handleAddDish)
route.put("/updateDish/:id", authenticateToken, authorizeAdmin, validate({ params: dishesSchemas.update.params, body: dishesSchemas.update.body }), handleUpdateDish)
route.delete("/deleteDish/:id", authenticateToken, authorizeAdmin, validate({ params: dishesSchemas.delete.params }), handleDeleteDish)

route.get("/:id/comments", validate({ params: dishesSchemas.dishCommentsById.params }), handleDishCommentsById)
route.post("/id/addComment", authenticateToken, validate({ body: dishesSchemas.addCommentByIdDishes.body }), handleAddCommentByIdDishes)
route.delete("/:id/deleteComment", authenticateToken, validate({ params: dishesSchemas.deleteCommentByIdDishes.params }), handleDeleteCommentByIdDishes)

export default route