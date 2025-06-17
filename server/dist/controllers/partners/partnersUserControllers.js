import { fetchAllPartners } from "../../models/partners/partnersUserModel.js";
export async function handleAllPartners(req, res) {
    try {
        const result = await fetchAllPartners();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
//# sourceMappingURL=partnersUserControllers.js.map