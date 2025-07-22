import { Router } from "express";
import { handleOrdersByFilter, handleUpdateStatusOrder, handleDeleteOrderById } from "../controllers/orders/orderAdminControllers";
import { handleOrdersByUser, handleAddOrder, handleDeleteOrder } from "../controllers/orders/ordersUserControllers";
import { validate } from "../middleware/validation";
import { authenticateToken, authorizeAdmin } from "../middleware/authMiddleware";
import { ordersSchemas } from "../schemas/ordersSchemas";

const route = Router()

route.get("/ordersByFilter", authenticateToken, authorizeAdmin, validate({ body: ordersSchemas.ordersByFilter.body }), handleOrdersByFilter)
route.put("/:id/updateOrder", authenticateToken, authorizeAdmin, validate({ params: ordersSchemas.updateStatus.params, body: ordersSchemas.updateStatus.body }), handleUpdateStatusOrder)
route.delete("/:id/deleteOrder", authenticateToken, authorizeAdmin, validate({ params: ordersSchemas.deleteOrder.params }), handleDeleteOrderById)

route.get("user/:id", authenticateToken, validate({ params: ordersSchemas.ordersByUser.params }), handleOrdersByUser)
route.post("/order/:id", authenticateToken, validate({ params: ordersSchemas.addUser.params, body: ordersSchemas.addUser.body }), handleAddOrder)
route.delete("/order/:id", authenticateToken, validate({ params: ordersSchemas.deleteUser.params }), handleDeleteOrder)

export default route