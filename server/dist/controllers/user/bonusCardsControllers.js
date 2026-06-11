import { fetchActiveBonusCardsByUser, fetchBonusCardsByUser } from "../../models/user/bonusCardsModel.js";
export async function handleBonusCardsByUser(req, res) {
    try {
        const result = await fetchBonusCardsByUser({ uuid: req.params.uuid });
        res.status(200).json({ data: result });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleActiveBonusCardsByUser(req, res) {
    try {
        const result = await fetchActiveBonusCardsByUser({ uuid: req.params.uuid });
        res.status(200).json({ data: result });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
