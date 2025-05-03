import { addSale, updateSale, deleteSale } from "../../models/sale/saleAdminModel";

export async function handleAddSale(req, res) {
    try {
        const result = await addSale(req.body)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function handleUpdateSale(req, res) {
    try {
        const result = await updateSale(req.body)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function handleDeleteSale(req, res) {
    try {
        const result = await deleteSale(req.body)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}