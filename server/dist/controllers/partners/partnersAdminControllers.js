import { addPartners, updatePartners, deletePartners, uploadPartnerLogo, } from "../../models/partners/partnersAdminModel.js";
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
        const result = await updatePartners({ uuid: req.params.uuid, ...req.body });
        res.status(200).json({ message: "Partners successfully update", data: result });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleUploadPartnerLogo(req, res) {
    try {
        const result = await uploadPartnerLogo(req.body);
        res.status(201).json({ message: "Logo uploaded", data: result });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleDeletePartners(req, res) {
    try {
        await deletePartners({ uuid: req.params.uuid });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
