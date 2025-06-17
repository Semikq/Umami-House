import axios from "axios"
const apiBase = "http://localhost:3001";

export const ordersByFilter = async (body) => await axios.get(`${apiBase}/order/ordersByFilter`, body)
export const updateStatus = async (id, body) => await axios.put(`${apiBase}/order/${id}/update`, body)
export const deleteOrder = async (id) => await axios.delete(`${apiBase}/order/${id}/delete`)
export const ordersByUser = async (id) => await axios.get(`${apiBase}/order/${id}`)
export const orderAddByUser = async (id, body) => await axios.post(`${apiBase}/order/${id}`, body)
export const orderDeleteByUser = async (id) => await axios.delete(`${apiBase}/order/${id}`)


route.get("/ordersByFilter", validate({ body: ordersSchemas.ordersByFilter.body }), handleOrdersByFilter)
route.put("/:id/update", validate({ params: ordersSchemas.updateStatus.params, body: ordersSchemas.updateStatus.body }), handleUpdateStatusOrder)
route.delete("/:id/delete", validate({ params: ordersSchemas.deleteOrder.params }), handleDeleteOrderById)

route.get("/:id", validate({ params: ordersSchemas.ordersByUser.params }), handleOrdersByUser)
route.post("/:id", validate({ params: ordersSchemas.addUser.params, body: ordersSchemas.addUser.body }), handleAddOrder)
route.delete("/:id", validate({ params: ordersSchemas.deleteUser.params }), handleDeleteOrder)