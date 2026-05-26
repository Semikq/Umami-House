import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).send("No token provided");
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = {
            userUuid: decoded.userUuid ?? decoded.userId,
            role: decoded.role
        };
        next();
    }
    catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
}
export function authorizeAdmin(req, res, next) {
    const user = req.user;
    if (user.role !== "admin") {
        res.status(403).json({ error: "Forbidden: Admin access required" });
        return;
    }
    next();
}
export async function handleLogout(req, res) {
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out" });
}
