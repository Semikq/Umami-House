import { z } from "zod";

export const saleShemas = {
    create: z.object({
        title: z.coerce.string(),
        image_url: z.coerce.string(),
        active: z.coerce.boolean()
    }),
    update: z.object({
        params: z.object({ id: z.coerce.number() }),
        body: z.object({ id: z.coerce.boolean() })
    }),
    delete: z.object({
        params: z.object({ id: z.coerce.number() })
    })
}