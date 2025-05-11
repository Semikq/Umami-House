import { Router } from "express";
import { handleAddPartners, handleUpdatePartners, handleDeletePartners } from "../controllers/partners/partnersAdminControllers";
import { handleAllPartners } from "../controllers/partners/partnersUserControllers";
import { validate } from "../middleware/validation";
import { partnersSchemas } from "../schemas/partnersSchemas";

const route = Router()

route.get("/partners", handleAllPartners)

route.post("/partners", validate({ body: partnersSchemas.create.body }), handleAddPartners)
route.put("/partners/:id", validate({ params: partnersSchemas.update.params, body: partnersSchemas.update.body }), handleUpdatePartners)
route.delete("/partners/:id", validate({ params: partnersSchemas.delete.params }), handleDeletePartners)

export default route