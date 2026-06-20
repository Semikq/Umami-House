import { EMAIL_ALREADY_EXISTS, INVALID_PASSWORD, USER_NOT_FOUND, registerUser, loginUser } from "../../models/user/authModel.js";
import { findUserByUuid } from "../../models/user/userModel.js";
import { generateAccessToken, generateRefreshToken } from "../../config/jwtToken.js";
import jwt from "jsonwebtoken";
export async function handleRegisterUser(req, res) {
    try {
        const result = await registerUser(req.body);
        const accessToken = generateAccessToken(result.uuid, result.role);
        const refreshToken = generateRefreshToken(result.uuid, result.role);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        const user = await findUserByUuid({ uuid: result.uuid });
        res.status(200).json({ user, accessToken });
    }
    catch (error) {
        if (error.name === EMAIL_ALREADY_EXISTS) {
            res.status(409).json({ error: error.message });
            return;
        }
        res.status(500).json({ error: error.message });
    }
}
export async function handleLoginUsers(req, res) {
    try {
        const result = await loginUser(req.body);
        const accessToken = generateAccessToken(result.uuid, result.role);
        const refreshToken = generateRefreshToken(result.uuid, result.role);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        const user = await findUserByUuid({ uuid: result.uuid });
        res.status(200).json({ user, accessToken });
    }
    catch (error) {
        if (error.name === USER_NOT_FOUND) {
            res.status(404).json({ error: error.message });
            return;
        }
        if (error.name === INVALID_PASSWORD) {
            res.status(401).json({ error: error.message });
            return;
        }
        res.status(500).json({ error: error.message || "Помилка входу" });
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
