import { addSale, updateSale, deleteSale, uploadSaleImage } from "../../models/sale/saleAdminModel.js";
export async function handleAddSale(req, res) {
    try {
        const result = await addSale(req.body);
        res.status(201).json({ message: "Sale successfully added", data: result });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleUpdateSale(req, res) {
    try {
        const result = await updateSale({ uuid: req.params.uuid }, req.body);
        res.status(200).json({ comment: "Sale successfully updated", data: result });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleUploadSaleImage(req, res) {
    try {
        const result = await uploadSaleImage(req.body);
        res.status(201).json({ message: "Image uploaded", data: result });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleDeleteSale(req, res) {
    try {
        await deleteSale({ uuid: req.params.uuid });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
