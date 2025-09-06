import { registerUser, loginUser } from "../../models/user/authModel";
import { Request, Response } from "express";
import { generateAccessToken, generateRefreshToken } from "../../config/jwtToken";

export async function handleRegisterUser(req: Request , res: Response): Promise<void> {
    try {
        const result = await registerUser(req.body)
        const { password, ...user } = result

        const accessToken = generateAccessToken(result.id, result.role);
        const refreshToken = generateRefreshToken(result.id);

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

export async function handleLoginUsers(req: Request , res: Response): Promise<void> {
    try {
        const result = await loginUser(req.body)
        const { password, ...user } = result

        const accessToken = generateAccessToken(result.id, result.role);
        const refreshToken = generateRefreshToken(result.id);

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