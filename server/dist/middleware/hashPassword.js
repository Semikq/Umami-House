import bcrypt from "bcrypt";
export async function hashPassword(req, res, next) {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        req.body.password = hashedPassword;
        next();
    }
    catch (error) {
        res.status(500).json({ message: "Error while hashing password" });
    }
}
//# sourceMappingURL=hashPassword.js.map