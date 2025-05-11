import { z } from "zod";

export const saleShemas = {
    create: {
        body: z.object({
            title: z.string(),
            image_url: z.string(),
            active: z.boolean()
        })
    },
    update: {
        params: z.object({ id: z.number() }),
        body: z.object({ active: z.boolean() })
    },
    delete: {
        params: z.object({ id: z.number() })
    }
}