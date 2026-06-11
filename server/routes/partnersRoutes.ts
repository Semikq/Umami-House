import { Router } from "express";
import {
    handleAddPartners,
    handleUpdatePartners,
    handleDeletePartners,
    handleUploadPartnerLogo,
} from "../controllers/partners/partnersAdminControllers.js";
import { handleAllPartners } from "../controllers/partners/partnersUserControllers.js";
import { validate } from "../middleware/validation.js";
import { authenticateToken, authorizeAdmin } from "../middleware/authMiddleware.js";
import { partnersSchemas } from "../schemas/partnersSchemas.js";

const route = Router()

route.get("/all", handleAllPartners)

route.post("/addPartners", authenticateToken, authorizeAdmin, validate({ body: partnersSchemas.create.body }), handleAddPartners)
route.put("/updatePartners/:uuid", authenticateToken, authorizeAdmin, validate({ params: partnersSchemas.update.params, body: partnersSchemas.update.body }), handleUpdatePartners)
route.post("/uploadImage", authenticateToken, authorizeAdmin, validate({ body: partnersSchemas.uploadImage.body }), handleUploadPartnerLogo)
route.delete("/deletePartners/:uuid", authenticateToken, authorizeAdmin, validate({ params: partnersSchemas.delete.params }), handleDeletePartners)

export default route
