import { fetchOrdersByUser, addOrder, deleteOrder } from "../../models/orders/ordersUserModel";

export async function handleOrdersByUser(req, res) {
    try {
        const result = await fetchOrdersByUser(req.body)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function handleAddOrder(req, res) {
    try {
        const result = await addOrder(req.body)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function handleDeleteOrder(req, res) {
    try {
        const result = await deleteOrder(req.body)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}