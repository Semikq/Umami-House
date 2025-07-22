import { Router } from "express";
import { handleAddPartners, handleUpdatePartners, handleDeletePartners } from "../controllers/partners/partnersAdminControllers";
import { handleAllPartners } from "../controllers/partners/partnersUserControllers";
import { validate } from "../middleware/validation";
import { authenticateToken, authorizeAdmin } from "../middleware/authMiddleware";
import { partnersSchemas } from "../schemas/partnersSchemas";

const route = Router()

route.get("/", handleAllPartners)

route.post("/addPartners", authenticateToken, authorizeAdmin, validate({ body: partnersSchemas.create.body }), handleAddPartners)
route.put("/updatePartners", authenticateToken, authorizeAdmin, validate({ body: partnersSchemas.update.body }), handleUpdatePartners)
route.delete("/deletePartners", authenticateToken, authorizeAdmin, validate({ body: partnersSchemas.delete.params }), handleDeletePartners)

export default route