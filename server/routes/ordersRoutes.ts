import { Router } from "express";
import { handleOrdersByFilter, handleUpdateStatusOrder, handleDeleteOrder } from "../controllers/orders/orderAdminControllers";
import { fetchOrdersByUser, addOrder, deleteOrder } from "../models/orders/ordersUserModel";
import { validate } from "../middleware/validation";

const route = Router()

route.get("/ordersByFilter", validate(), handleOrdersByFilter)
route.put("/orders/:id/update", validate(), handleUpdateStatusOrder)
route.delete("/orders/:id/delete", validate(), handleDeleteOrder)

route.get("/orders/:id", validate(), fetchOrdersByUser)
route.post("/orders/:id", validate(), addOrder)
route.delete("/orders/:id", validate(), deleteOrder)

export default route