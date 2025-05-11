import { Router } from "express";
import { handleOrdersByFilter, handleUpdateStatusOrder, handleDeleteOrderById } from "../controllers/orders/orderAdminControllers";
import { handleOrdersByUser, handleAddOrder, handleDeleteOrder } from "../controllers/orders/ordersUserControllers";
import { validate } from "../middleware/validation";
import { ordersSchemas } from "../schemas/ordersSchemas";

const route = Router()

route.get("/ordersByFilter", validate({ body: ordersSchemas.ordersByFilter.body }), handleOrdersByFilter)
route.put("/orders/:id/update", validate({ params: ordersSchemas.updateStatus.params, body: ordersSchemas.updateStatus.body }), handleUpdateStatusOrder)
route.delete("/orders/:id/delete", validate({ params: ordersSchemas.deleteOrder.params }), handleDeleteOrderById)

route.get("/orders/:id", validate({ params: ordersSchemas.ordersByUser.params }), handleOrdersByUser)
route.post("/orders/:id", validate({ params: ordersSchemas.addUser.params, body: ordersSchemas.addUser.body }), handleAddOrder)
route.delete("/orders/:id", validate({ params: ordersSchemas.deleteUser.params }), handleDeleteOrder)

export default route