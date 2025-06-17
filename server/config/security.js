import rateLimit from "express-rate-limit";
export const rateLimitConfig = () => {
    return rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 75,
        message: "Too many requests, please try again later.",
    });
};
