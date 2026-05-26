import { registerUser, loginUser } from "../../models/user/authModel.js";
import { findUserByUuid } from "../../models/user/userModel.js";
import { generateAccessToken, generateRefreshToken } from "../../config/jwtToken.js";
import jwt from "jsonwebtoken";
export async function handleRegisterUser(req, res) {
    try {
        const result = await registerUser(req.body);
        const { password, ...user } = result;
        const accessToken = generateAccessToken(result.uuid, result.role);
        const refreshToken = generateRefreshToken(result.uuid, result.role);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({ user, accessToken });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleLoginUsers(req, res) {
    try {
        const result = await loginUser(req.body);
        const { password, ...user } = result;
        const accessToken = generateAccessToken(result.uuid, result.role);
        const refreshToken = generateRefreshToken(result.uuid, result.role);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({ user, accessToken });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
export async function handleRefreshToken(req, res) {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        res.status(401).json({ error: "No refresh token" });
        return;
    }
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const userUuid = decoded.userUuid ?? decoded.userId;
        const accessToken = generateAccessToken(userUuid, decoded.role);
        const user = await findUserByUuid({ uuid: userUuid });
        res.json({ user, accessToken });
    }
    catch {
        res.status(401).json({ error: "Invalid refresh token" });
    }
}
export async function handleLogout(req, res) {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    res.status(200).json({ message: "Logged out" });
}
