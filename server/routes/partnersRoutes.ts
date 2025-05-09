import { Router } from "express";
import { handleAddPartners, handleUpdatePartners, handleDeletePartners } from "../controllers/partners/partnersAdminControllers";
import { fetchAllPartners } from "../models/partners/partnersUserModel";
import { validate } from "../middleware/validation";

const route = Router()

route.get("/partners", validate(), fetchAllPartners)

route.post("/partners", validate(), handleAddPartners)
route.put("/partners/:id", validate(), handleUpdatePartners)
route.delete("/partners/:id", validate(), handleDeletePartners)

export default route