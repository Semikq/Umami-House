import { ZodSchema } from "zod"
import { Request, Response, NextFunction } from "express"
import { saleShemas } from "../schemas/saleShemas"

export const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)

    if (!result.success) return res.status(400).json({ error: result.error.errors })

    req.body = result.data
    next()
}