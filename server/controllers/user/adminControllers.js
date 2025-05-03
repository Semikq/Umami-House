import { fetchAllUsers, choiceRoleUser, deleteUser } from "../../models/user/adminModel";

export async function handleAllUsers(req, res) {
    try {
        const result = await fetchAllUsers(req.body)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function handleChoiceUser(req, res) {
    try {
        const result = await choiceRoleUser(req.body)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function handleDeleteUser(req, res) {
    try {
        const result = await deleteUser(req.body)
        res.json(result)
    } catch (err) {
        throw new Error(err.message)
    }
}