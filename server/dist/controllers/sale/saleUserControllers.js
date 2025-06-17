import { fetchAllSale } from "../../models/sale/saleUserModul.js";
export async function handleAllSale(req, res) {
    try {
        const result = await fetchAllSale();
        res.json(result);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
//# sourceMappingURL=saleUserControllers.js.map