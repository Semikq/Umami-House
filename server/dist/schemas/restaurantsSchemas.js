import { z } from "zod";
export const restaurantsShemas = {
    create: {
        body: z.object({
            name: z.string(),
            addres: z.string(),
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
            addres: z.string(),
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
        params: z.object({ city: z.string() })
    }
};
//# sourceMappingURL=restaurantsSchemas.js.map