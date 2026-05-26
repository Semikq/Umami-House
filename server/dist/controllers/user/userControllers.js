import { updateUser, deleteUser } from "../../models/user/userModel.js";
export async function handleUpdateUser(req, res) {
    try {
        const result = await updateUser({ uuid: req.params.uuid }, req.body);
        res.status(200).json({ message: "User successfully updated", data: result });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleDeleteUser(req, res) {
    try {
        await deleteUser({ uuid: req.params.uuid });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
