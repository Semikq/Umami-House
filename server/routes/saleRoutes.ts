import { Router } from "express";
import { handleAddSale, handleUpdateSale, handleDeleteSale } from "../controllers/sale/saleAdminControllers.js";
import { handleAllSale } from "../controllers/sale/saleUserControllers.js";
import { validate } from "../middleware/validation.js";
import { saleShemas } from "../schemas/saleSchemas.js";

const route = Router()

route.get("/", handleAllSale)
route.post("/", validate({ body: saleShemas.create.body }), handleAddSale)
route.put("/:id", validate({ params: saleShemas.update.params, body: saleShemas.update.body }), handleUpdateSale)
route.delete("/:id", validate({ params: saleShemas.delete.params }), handleDeleteSale)

export default route