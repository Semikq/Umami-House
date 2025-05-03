import { addPartners, updatePartners, deletePartners } from "../../models/partners/partnersAdminModel";

export async function handleAddPartners(req, res) {
    try {
        const result = await addPartners(req.body)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function handleUpdatePartners(req, res) {
    try {
        const result = await updatePartners(req.body)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function handleDeletePartners(req, res) {
    try {
        const result = await deletePartners(req.body)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}