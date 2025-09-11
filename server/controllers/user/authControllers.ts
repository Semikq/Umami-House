import { registerUser, loginUser } from "../../models/user/authModel.js";
import { findUserByID } from "../../models/user/userModel.js";
import { Request, Response } from "express";
import { generateAccessToken, generateRefreshToken } from "../../config/jwtToken.js";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function handleRegisterUser(req: Request , res: Response): Promise<void> {
    try {
        const result = await registerUser(req.body)
        const { password, ...user } = result

        const accessToken = generateAccessToken(result.id, result.role);
        const refreshToken = generateRefreshToken(result.id, result.role);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7*24*60*60*1000,
        })

        res.status(200).json({ user, accessToken })
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleLoginUsers(req: Request , res: Response): Promise<void> {
    try {
        const result = await loginUser(req.body)
        const { password, ...user } = result

        const accessToken = generateAccessToken(result.id, result.role);
        const refreshToken = generateRefreshToken(result.id, result.role);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7*24*60*60*1000,
        })

        res.status(200).json({ user, accessToken })
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

// export async function handleRefreshToken(req: Request, res: Response): Promise<void> {
//     const { refreshToken } = req.cookies;
//     if (!refreshToken) {
//         res.status(401).json({ error: "No refresh token" });
//         return
//     }
//
//     try {
//         const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as JwtPayload;
//         const accessToken = generateAccessToken(decoded.userId, decoded.role);
//         const user = await findUserByID({ id: decoded.userId })
//         res.json({ user, accessToken });
//     } catch {
//         res.status(401).json({ error: "Invalid refresh token" });
//     }
// }

export async function handleLogout(req: Request, res: Response) {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    });
    res.status(200).json({ message: "Logged out" });
}