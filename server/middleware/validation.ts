import { ZodTypeAny } from "zod"
import { Request, Response, NextFunction } from "express"

type Schemas = {
  body?: ZodTypeAny;
  params?: ZodTypeAny;
};

export const validate = (schema: Schemas) => (req: Request, res: Response, next: NextFunction): void => {
  try {
    if(schema.params) req.params = schema.params.parse(req.params)
    if(schema.body) req.body = schema.body.parse(req.body)
    next()
  } catch (error) {
    res.status(400).json({ message: error })
  }
}