import { registerUser, loginUser } from "../../models/user/authModel";

export async function handleRegisterUser(req, res) {
    try {
        const result = await registerUser(req.body)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function handleLoginUsers(req, res) {
    try {
        const result = await loginUser(req.body)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}