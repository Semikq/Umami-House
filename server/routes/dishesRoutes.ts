import { Router } from "express"
import {
    handleAddDish,
    handleUpdateDish,
    handleDeleteDish,
    handleDeleteCommentUserByUuid,
    handleUploadDishImage,
    handleAddSubCategory,
    handleUpdateSubCategory,
    handleDeleteSubCategory,
} from "../controllers/dishes/dishesAdminControllers.js"
import { handleCategoryWithDishes, handleAllCategories, handleGetAllDishes, handleGetDishByUuid, handleDishCommentsByUuid, handleAddCommentByUuidDishes, handleDeleteCommentByUuidDishes } from "../controllers/dishes/dishesUserControllers.js"
import { validate } from "../middleware/validation.js"
import { authenticateToken, authorizeAdmin } from "../middleware/authMiddleware.js"
import { dishesSchemas } from "../schemas/dishesSchemas.js"

const route = Router()

route.get("/", handleGetAllDishes)
route.get("/categories", handleAllCategories)
route.get("/category/:uuid", handleCategoryWithDishes)
route.get("/dish/:uuid", validate({ params: dishesSchemas.dishByUuid.params }), handleGetDishByUuid)
route.post("/addDish", authenticateToken, authorizeAdmin, validate({ body: dishesSchemas.create.body }), handleAddDish)
route.put("/updateDish/:uuid", authenticateToken, authorizeAdmin, validate({ params: dishesSchemas.update.params, body: dishesSchemas.update.body }), handleUpdateDish)
route.post("/uploadImage", authenticateToken, authorizeAdmin, validate({ body: dishesSchemas.uploadImage.body }), handleUploadDishImage)
route.post("/subCategory", authenticateToken, authorizeAdmin, validate({ body: dishesSchemas.subCategoryCreate.body }), handleAddSubCategory)
route.put("/subCategory/:uuid", authenticateToken, authorizeAdmin, validate({ params: dishesSchemas.subCategoryUpdate.params, body: dishesSchemas.subCategoryUpdate.body }), handleUpdateSubCategory)
route.delete("/subCategory/:uuid", authenticateToken, authorizeAdmin, validate({ params: dishesSchemas.subCategoryDelete.params }), handleDeleteSubCategory)
route.delete("/deleteDish/:uuid", authenticateToken, authorizeAdmin, validate({ params: dishesSchemas.delete.params }), handleDeleteDish)
route.delete("/admin/comment/:uuid", authenticateToken, authorizeAdmin, validate({ params: dishesSchemas.delete.params }), handleDeleteCommentUserByUuid)

route.get("/comments/:uuid", validate({ params: dishesSchemas.dishCommentsByUuid.params }), handleDishCommentsByUuid)
route.post("/addComment", authenticateToken, validate({ body: dishesSchemas.addCommentByUuidDishes.body }), handleAddCommentByUuidDishes)
route.delete("/deleteComment", authenticateToken, validate({ body: dishesSchemas.deleteCommentByUuidDishes.body }), handleDeleteCommentByUuidDishes)

export default route
