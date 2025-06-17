import { Router } from "express";
import { handleAddPartners, handleUpdatePartners, handleDeletePartners } from "../controllers/partners/partnersAdminControllers";
import { handleAllPartners } from "../controllers/partners/partnersUserControllers";
import { validate } from "../middleware/validation";
import { partnersSchemas } from "../schemas/partnersSchemas";

const route = Router()

route.get("/", handleAllPartners)

route.post("/", validate({ body: partnersSchemas.create.body }), handleAddPartners)
route.put("/:id", validate({ params: partnersSchemas.update.params, body: partnersSchemas.update.body }), handleUpdatePartners)
route.delete("/:id", validate({ params: partnersSchemas.delete.params }), handleDeletePartners)

export default route