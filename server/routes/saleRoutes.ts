import { Router } from "express";
import { handleAddSale, handleUpdateSale, handleDeleteSale } from "../controllers/sale/saleAdminControllers";
import { handleAllSale } from "../controllers/sale/saleUserControllers";
import { validate } from "../middleware/validation";
import { authenticateToken, authorizeAdmin } from "../middleware/authMiddleware";
import { saleShemas } from "../schemas/saleSchemas";

const route = Router()

route.get("/", handleAllSale)

route.post("/addSale", authenticateToken, authorizeAdmin, validate({ body: saleShemas.create.body }), handleAddSale)
route.put("/:id/updateSale", authenticateToken, authorizeAdmin, validate({ params: saleShemas.update.params, body: saleShemas.update.body }), handleUpdateSale)
route.delete("/:id/deleteSale", authenticateToken, authorizeAdmin, validate({ params: saleShemas.delete.params }), handleDeleteSale)

export default route