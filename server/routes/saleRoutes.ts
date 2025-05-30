import { Router } from "express";
import { handleAddSale, handleUpdateSale, handleDeleteSale } from "../controllers/sale/saleAdminControllers";
import { handleAllSale } from "../controllers/sale/saleUserControllers";
import { validate } from "../middleware/validation";
import { saleShemas } from "../schemas/saleSchemas";

const route = Router()

route.get("/sale", handleAllSale)
route.post("/sale", validate({ body: saleShemas.create.body }), handleAddSale)
route.put("/sale/:id", validate({ params: saleShemas.update.params, body: saleShemas.update.body }), handleUpdateSale)
route.delete("/sale/:id", validate({ params: saleShemas.delete.params }), handleDeleteSale)

export default route