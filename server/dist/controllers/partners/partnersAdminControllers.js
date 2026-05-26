import { addPartners, updatePartners, deletePartners } from "../../models/partners/partnersAdminModel.js";
export async function handleAddPartners(req, res) {
    try {
        const result = await addPartners(req.body);
        res.status(201).json({ message: "Partners successfully added", data: result });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleUpdatePartners(req, res) {
    try {
        const result = await updatePartners(req.body);
        res.status(200).json({ message: "Partners successfully update", data: result });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleDeletePartners(req, res) {
    try {
        await deletePartners(req.body);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
