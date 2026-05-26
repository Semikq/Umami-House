import { z } from "zod";
import { uuidSchema, uuidParamsSchema } from "./common.js";
export const restaurantsSchemas = {
    create: {
        body: z.object({
            name: z.string(),
            address: z.string(),
            phone: z.string(),
            description: z.string(),
            active: z.boolean(),
            latitude: z.number(),
            longitude: z.number()
        })
    },
    update: {
        params: uuidParamsSchema,
        body: z.object({
            name: z.string(),
            address: z.string(),
            phone: z.string(),
            description: z.string(),
            active: z.boolean(),
            latitude: z.number(),
            longitude: z.number()
        })
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
    }
};
