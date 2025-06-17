import { registerUser, loginUser } from "../../models/user/authModel.js";
import { generateToken } from "../../config/jwtToken.js";
export async function handleRegisterUser(req, res) {
    try {
        const user = await registerUser(req.body);
        const { password, ...PublicUser } = user;
        const token = generateToken({ id: user.id, email: user.email, role: user.role });
        res.status(200).json({
            user: PublicUser,
            token,
        });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleLoginUsers(req, res) {
    try {
        const user = await loginUser(req.body);
        const { password, ...PublicUser } = user;
        const token = generateToken({ id: user.id, email: user.email, role: user.role });
        res.status(200).json({
            user: PublicUser,
            token,
        });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
//# sourceMappingURL=authControllers.js.map