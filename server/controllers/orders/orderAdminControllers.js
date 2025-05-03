import { fetchOrdersByFilter, updateStatusOrder, deleteOrder } from "../../models/orders/orderAdminModel";

export async function handleOrdersByFilter(req, res) {
    try {
        const result = await fetchOrdersByFilter(req.body)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function handleUpdateStatusOrder(req, res) {
    try {
        const result = await updateStatusOrder(req.body)
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