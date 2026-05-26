import { z } from "zod";
import { uuidParamsSchema } from "./common.js";

export const saleSchemas = {
    create: {
        body: z.object({
            title: z.string(),
            image_url: z.string(),
            active: z.boolean()
        })
    },
    update: {
        params: uuidParamsSchema,
        body: z.object({ active: z.boolean() })
    },
    delete: {
        params: uuidParamsSchema
    }
}
