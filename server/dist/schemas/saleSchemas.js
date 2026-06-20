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
        body: z.object({
            title: z.string(),
            image_url: z.string(),
            active: z.boolean(),
        }),
    },
    delete: {
        params: uuidParamsSchema
    },
    uploadImage: {
        body: z.object({
            data: z.string().min(1),
            mimeType: z.enum(["image/jpeg", "image/png", "image/webp"]),
            title: z.string().optional(),
        }),
    },
};
