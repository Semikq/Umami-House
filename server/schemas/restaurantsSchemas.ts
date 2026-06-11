import { z } from "zod";
import { uuidSchema, uuidParamsSchema } from "./common.js";

export const restaurantsSchemas = {
    create: {
        body: z.object({
            city_uuid: uuidSchema,
            name: z.string(),
            address: z.string(),
            phone: z.string(),
            description: z.string(),
            active: z.boolean(),
            latitude: z.number().min(-90).max(90),
            longitude: z.number().min(-180).max(180),
            time_work: z.string(),
            restaurant_image: z.string(),
        }),
    },
    update: {
        params: uuidParamsSchema,
        body: z.object({
            city_uuid: uuidSchema,
            name: z.string(),
            address: z.string(),
            phone: z.string(),
            description: z.string(),
            active: z.boolean(),
            latitude: z.number().min(-90).max(90),
            longitude: z.number().min(-180).max(180),
            time_work: z.string(),
            restaurant_image: z.string(),
        }),
    },
    delete: {
        params: uuidParamsSchema
    },
    restaurants: {
        body: z.object({ city_uuid: uuidSchema })
    },
    addCity: {
        body: z.object({
            name: z.string(),
        })
    },
    deleteCity: {
        params: uuidParamsSchema
    },
    uploadImage: {
        body: z.object({
            data: z.string().min(1),
            mimeType: z.enum(["image/jpeg", "image/png", "image/webp"]),
            title: z.string().optional(),
        }),
    },
}
