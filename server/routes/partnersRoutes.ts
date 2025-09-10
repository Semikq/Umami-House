import { Router } from "express";
import { handleAddPartners, handleUpdatePartners, handleDeletePartners } from "../controllers/partners/partnersAdminControllers.js";
import { handleAllPartners } from "../controllers/partners/partnersUserControllers.js";
import { validate } from "../middleware/validation.js";
import { authenticateToken, authorizeAdmin } from "../middleware/authMiddleware.js";
import { partnersSchemas } from "../schemas/partnersSchemas.js";

const route = Router()

route.get("/", handleAllPartners)

route.post("/addPartners", authenticateToken, authorizeAdmin, validate({ body: partnersSchemas.create.body }), handleAddPartners)
route.put("/updatePartners", authenticateToken, authorizeAdmin, validate({ body: partnersSchemas.update.body }), handleUpdatePartners)
route.delete("/deletePartners", authenticateToken, authorizeAdmin, validate({ body: partnersSchemas.delete.params }), handleDeletePartners)

export default route