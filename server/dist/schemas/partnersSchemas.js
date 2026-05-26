import { z } from "zod";
import { uuidParamsSchema } from "./common.js";
export const partnersSchemas = {
    create: {
        body: z.object({
            name: z.string(),
            logo_img: z.string(),
            link_website: z.string().optional(),
            active: z.boolean()
        })
    },
    update: {
        params: uuidParamsSchema,
        body: z.object({
            name: z.string(),
            logo_img: z.string(),
            link_website: z.string().optional(),
            active: z.boolean()
        })
    },
    delete: {
        params: uuidParamsSchema
    }
};
