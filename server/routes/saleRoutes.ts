import { Router } from "express";
import { handleAddSale, handleUpdateSale, handleDeleteSale } from "../controllers/sale/saleAdminControllers";
import { handleAllSale } from "../controllers/sale/saleUserControllers";
import { validate } from "../middleware/validation";

const route = Router()

route.get("/sale", validate(), handleAllSale)
route.post("/sale", validate(), handleAddSale)
route.put("/sale/:id", validate(), handleUpdateSale)
route.delete("/sale/:id", validate(), handleDeleteSale)

export default route