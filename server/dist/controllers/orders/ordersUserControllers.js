import { fetchOrdersByUser, addOrder, deleteOrder } from "../../models/orders/ordersUserModel.js";
export async function handleOrdersByUser(req, res) {
    try {
        const result = await fetchOrdersByUser({ uuid: req.params.uuid });
        res.status(200).json({ data: result });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleAddOrder(req, res) {
    try {
        const result = await addOrder(req.body);
        res.status(201).json({ data: result });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleDeleteOrder(req, res) {
    try {
        await deleteOrder({ uuid: req.params.uuid });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
