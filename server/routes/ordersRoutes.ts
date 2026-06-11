import { Router } from "express";
import {
    handleAllOrders,
    handleOrdersByFilter,
    handleUpdateStatusOrder,
    handleDeleteOrderByUuid,
} from "../controllers/orders/orderAdminControllers.js";
import { handleOrdersByUser, handleAddOrder, handleDeleteOrder } from "../controllers/orders/ordersUserControllers.js";
import { validate } from "../middleware/validation.js";
import { authenticateToken, authorizeAdmin } from "../middleware/authMiddleware.js";
import { ordersSchemas } from "../schemas/ordersSchemas.js";

const route = Router()

route.get("/all", authenticateToken, authorizeAdmin, handleAllOrders)
route.get("/filter", authenticateToken, authorizeAdmin, validate({ body: ordersSchemas.ordersByFilter.body }), handleOrdersByFilter)
route.put("/status/:uuid", authenticateToken, authorizeAdmin, validate({ params: ordersSchemas.updateStatus.params, body: ordersSchemas.updateStatus.body }), handleUpdateStatusOrder)
route.delete("/deleteOrder/:uuid", authenticateToken, authorizeAdmin, validate({ params: ordersSchemas.deleteOrder.params }), handleDeleteOrderByUuid)

route.get("/user/:uuid", authenticateToken, validate({ params: ordersSchemas.ordersByUser.params }), handleOrdersByUser)
route.post("/addOrder", validate({ body: ordersSchemas.addUser.body }), handleAddOrder)
route.delete("/order/:uuid", authenticateToken, validate({ params: ordersSchemas.deleteUser.params }), handleDeleteOrder)

export default route
