import { fetchOrdersByFilter, updateStatusOrder, deleteOrder } from "../../models/orders/ordersAdminModel.js";
export async function handleOrdersByFilter(req, res) {
    try {
        const result = await fetchOrdersByFilter(req.body);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleUpdateStatusOrder(req, res) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            res.status(400).json("Invalid user id");
            return;
        }
        await updateStatusOrder({ id }, req.body);
        res.status(200).json("Status Order successfully update");
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleDeleteOrderById(req, res) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            res.status(400).json("Invalid user id");
            return;
        }
        await deleteOrder({ id });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
//# sourceMappingURL=orderAdminControllers.js.map