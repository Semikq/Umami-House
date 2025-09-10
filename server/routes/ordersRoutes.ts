import { Router } from "express";
import { handleOrdersByFilter, handleUpdateStatusOrder, handleDeleteOrderById } from "../controllers/orders/orderAdminControllers.js";
import { handleOrdersByUser, handleAddOrder, handleDeleteOrder } from "../controllers/orders/ordersUserControllers.js";
import { validate } from "../middleware/validation.js";
import { authenticateToken, authorizeAdmin } from "../middleware/authMiddleware.js";
import { ordersSchemas } from "../schemas/ordersSchemas.js";

const route = Router()

route.get("/ordersByFilter", authenticateToken, authorizeAdmin, validate({ body: ordersSchemas.ordersByFilter.body }), handleOrdersByFilter)
route.put("/:id/updateOrder", authenticateToken, authorizeAdmin, validate({ params: ordersSchemas.updateStatus.params, body: ordersSchemas.updateStatus.body }), handleUpdateStatusOrder)
route.delete("/:id/deleteOrder", authenticateToken, authorizeAdmin, validate({ params: ordersSchemas.deleteOrder.params }), handleDeleteOrderById)

route.get("/user/:id", authenticateToken, validate({ params: ordersSchemas.ordersByUser.params }), handleOrdersByUser)
route.post("/addOrder", validate({ body: ordersSchemas.addUser.body }), handleAddOrder)
route.delete("/order/:id", authenticateToken, validate({ params: ordersSchemas.deleteUser.params }), handleDeleteOrder)

export default route