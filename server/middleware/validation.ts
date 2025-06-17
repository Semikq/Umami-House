import { ZodTypeAny } from "zod"
import { Request, Response, NextFunction } from "express"

type Schemas = {
  body?: ZodTypeAny;
  params?: ZodTypeAny;
  query?: ZodTypeAny;
};

export const validate = (schema: Schemas) => (req: Request, res: Response, next: NextFunction): void => {
  try {
    if(schema.params) req.params = schema.params.parse(req.params)
    if(schema.body) req.body = schema.body.parse(req.body)
      if (schema.query) req.query = schema.query.parse(req.query)
    next()
  } catch (error) {
    res.status(400).json({ message: error })
  }
}