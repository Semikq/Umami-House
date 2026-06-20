import { EMAIL_ALREADY_EXISTS, registerUser, loginUser } from "../../models/user/authModel.js";
import { findUserByUuid } from "../../models/user/userModel.js";
import { Request, Response } from "express";
import { generateAccessToken, generateRefreshToken } from "../../config/jwtToken.js";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function handleRegisterUser(req: Request , res: Response): Promise<void> {
    try {
        const result = await registerUser(req.body)

        const accessToken = generateAccessToken(result.uuid, result.role);
        const refreshToken = generateRefreshToken(result.uuid, result.role);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7*24*60*60*1000,
        })

        const user = await findUserByUuid({ uuid: result.uuid })

        res.status(200).json({ user, accessToken })
    } catch (error) {
        if ((error as Error).name === EMAIL_ALREADY_EXISTS) {
            res.status(409).json({ error: (error as Error).message })
            return
        }

        res.status(500).json({ error: (error as Error).message })
    }
}

export async function handleLoginUsers(req: Request , res: Response): Promise<void> {
    try {
        const result = await loginUser(req.body)

        const accessToken = generateAccessToken(result.uuid, result.role);
        const refreshToken = generateRefreshToken(result.uuid, result.role);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7*24*60*60*1000,
        })

        const user = await findUserByUuid({ uuid: result.uuid })

        res.status(200).json({ user, accessToken })
    } catch (error) {
        res.status(500).json((error as Error).message)
    }
}

export async function handleRefreshToken(req: Request, res: Response): Promise<void> {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        res.status(401).json({ error: "No refresh token" });
        return
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as JwtPayload;
        const userUuid = decoded.userUuid ?? decoded.userId;
        const accessToken = generateAccessToken(userUuid, decoded.role);
        const user = await findUserByUuid({ uuid: userUuid })
        res.json({ user, accessToken });
    } catch {
        res.status(401).json({ error: "Invalid refresh token" });
    }
}

export async function handleLogout(req: Request, res: Response) {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    res.status(200).json({ message: "Logged out" });
}
