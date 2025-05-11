import { z } from "zod";

export const partnersSchemas = {
    create: {
        body: z.object({
            name: z.string(),
            logo: z.string(),
            link_website: z.string().optional(),
            active: z.boolean()
        })
    },
    update: {
        params: z.object({ id: z.number() }),
        body: z.object({
            name: z.string(),
            logo: z.string(),
            link_website: z.string().optional(),
            active: z.boolean()
        })
    },
    delete: {
        params: z.object({ id: z.number() })
    }
}