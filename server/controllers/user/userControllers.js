import { updateUser, deleteUser } from "../../models/user/userModel"

export async function handleUpdateUser(req, res) {
    try {
        const result = await updateUser(req.body)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function handleDeleteUser(req, res) {
    try {
        const result = await deleteUser(req.body)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}