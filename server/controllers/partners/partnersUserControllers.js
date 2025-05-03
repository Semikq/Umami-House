import { fetchAllPartners } from "../../models/partners/partnersUserModel";

export async function handleAllPartners(req, res) {
    try {
        const result = await fetchAllPartners()
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}