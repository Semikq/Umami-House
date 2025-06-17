import { Router } from "express";
import { handleAddPartners, handleUpdatePartners, handleDeletePartners } from "../controllers/partners/partnersAdminControllers.js";
import { handleAllPartners } from "../controllers/partners/partnersUserControllers.js";
import { validate } from "../middleware/validation.js";
import { partnersSchemas } from "../schemas/partnersSchemas.js";

const route = Router()

route.get("/", handleAllPartners)

route.post("/", validate({ body: partnersSchemas.create.body }), handleAddPartners)
route.put("/:id", validate({ params: partnersSchemas.update.params, body: partnersSchemas.update.body }), handleUpdatePartners)
route.delete("/:id", validate({ params: partnersSchemas.delete.params }), handleDeletePartners)

export default route