import { fetchAllUsers, choiceRoleUser, deleteUser } from "../../models/user/adminModel.js";
export async function handleAllUsers(req, res) {
    try {
        const result = await fetchAllUsers();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleChoiceRoleUserByUuid(req, res) {
    try {
        const result = await choiceRoleUser({ uuid: req.params.uuid, role: req.body.role });
        res.status(200).json({ message: "Choice user successfully added", data: result });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleDeleteUserByUuid(req, res) {
    try {
        await deleteUser({ uuid: req.params.uuid });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
