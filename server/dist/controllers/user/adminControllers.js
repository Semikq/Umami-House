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
export async function handleChoiceRoleUserById(req, res) {
    try {
        const id = Number(req.params.id);
        await choiceRoleUser({ id }, req.body);
        res.status(200).json("Choice user successfully added");
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleDeleteUserById(req, res) {
    try {
        const id = Number(req.params.id);
        await deleteUser({ id });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
//# sourceMappingURL=adminControllers.js.map