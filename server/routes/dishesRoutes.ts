import { Router } from "express"
import { handleAddDish, handleUpdateDish, handleDeleteDish, handleDeleteCommentUserById } from "../controllers/dishes/dishesAdminControllers.js"
import { handleCategoryWithDishes, handleAllCategories, handleGetAllDishes, handleGetDishById, handleDishCommentsById, handleAddCommentByIdDishes, handleDeleteCommentByIdDishes } from "../controllers/dishes/dishesUserControllers.js"
import { validate } from "../middleware/validation.js"
import { authenticateToken, authorizeAdmin } from "../middleware/authMiddleware.js"
import { dishesSchemas } from "../schemas/dishesSchemas.js"

const route = Router()

route.get("/", handleGetAllDishes)
route.get("/categories", handleAllCategories)
route.get("/category/:id", handleCategoryWithDishes)
route.get("/dish/:id", validate({ params: dishesSchemas.dishById.params }), handleGetDishById)
route.post("/addDish", authenticateToken, authorizeAdmin, validate({ body: dishesSchemas.create.body }), handleAddDish)
route.put("/updateDish/:id", authenticateToken, authorizeAdmin, validate({ params: dishesSchemas.update.params, body: dishesSchemas.update.body }), handleUpdateDish)
route.delete("/deleteDish/:id", authenticateToken, authorizeAdmin, validate({ params: dishesSchemas.delete.params }), handleDeleteDish)

route.get("/comments/:id", validate({ params: dishesSchemas.dishCommentsById.params }), handleDishCommentsById)
route.post("/addComment", authenticateToken, validate({ body: dishesSchemas.addCommentByIdDishes.body }), handleAddCommentByIdDishes)
route.delete("/deleteComment", authenticateToken, validate({ body: dishesSchemas.deleteCommentByIdDishes.body }), handleDeleteCommentByIdDishes)

export default route