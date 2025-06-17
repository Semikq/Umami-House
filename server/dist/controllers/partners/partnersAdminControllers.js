import { addPartners, updatePartners, deletePartners } from "../../models/partners/partnersAdminModel.js";
export async function handleAddPartners(req, res) {
    try {
        await addPartners(req.body);
        res.status(201).json("Partners successfully added");
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleUpdatePartners(req, res) {
    try {
        const id = Number(req.params.id);
        await updatePartners({ id }, req.body);
        res.status(200).json("Partners successfully update");
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleDeletePartners(req, res) {
    try {
        const id = Number(req.params.id);
        await deletePartners({ id });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
//# sourceMappingURL=partnersAdminControllers.js.map