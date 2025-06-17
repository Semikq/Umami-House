import { Router } from "express";
import { handleOrdersByFilter, handleUpdateStatusOrder, handleDeleteOrderById } from "../controllers/orders/orderAdminControllers.js";
import { handleOrdersByUser, handleAddOrder, handleDeleteOrder } from "../controllers/orders/ordersUserControllers.js";
import { validate } from "../middleware/validation.js";
import { ordersSchemas } from "../schemas/ordersSchemas.js";

const route = Router()

route.get("/ordersByFilter", validate({ query: ordersSchemas.ordersByFilter.query }), handleOrdersByFilter)
route.put("/:id/update", validate({ params: ordersSchemas.updateStatus.params, body: ordersSchemas.updateStatus.body }), handleUpdateStatusOrder)
route.delete("/:id/delete", validate({ params: ordersSchemas.deleteOrder.params }), handleDeleteOrderById)

route.get("/:id", validate({ params: ordersSchemas.ordersByUser.params }), handleOrdersByUser)
route.post("/:id", validate({ params: ordersSchemas.addUser.params, body: ordersSchemas.addUser.body }), handleAddOrder)
route.delete("/:id", validate({ params: ordersSchemas.deleteUser.params }), handleDeleteOrder)

export default route