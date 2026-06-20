import { createBonusCardForUser, deleteBonusCardByUuid, fetchActiveBonusCardsByUser, fetchBonusCardsByUser, } from "../../models/user/bonusCardsModel.js";
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
export async function handleCreateBonusCard(req, res) {
    try {
        const result = await createBonusCardForUser({
            user_uuid: req.params.uuid,
            name: req.body.name,
            amount: req.body.amount,
            description: req.body.description,
            active_until: new Date(req.body.active_until),
        });
        res.status(201).json({ data: result });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleDeleteBonusCard(req, res) {
    try {
        await deleteBonusCardByUuid(req.params.uuid);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
