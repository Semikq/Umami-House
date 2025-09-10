import { z } from "zod";

export const restaurantsShemas = {
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
        params: z.object({ id: z.number() }),
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
        params: z.object({ id: z.number() })
    },
    restaurants: {
        body: z.object({ city_id: z.number() })
    },
    addCity: {
        body: z.object({
            name: z.string(),
        })
    },
    deleteCity: {
        params: z.object({
            id: z.number()
        })
    }
}