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
        const result = await updateStatusOrder({ uuid: req.params.uuid }, req.body);
        res.status(200).json({ message: "Status Order successfully update", data: result });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleDeleteOrderByUuid(req, res) {
    try {
        await deleteOrder({ uuid: req.params.uuid });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
