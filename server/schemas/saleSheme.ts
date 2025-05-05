import { z } from "zod";

const addSale = z.object({
    title: z.coerce.string(),
    image_url: z.coerce.string().url(),
    active: z.coerce.boolean()
})

const updateSale = z.object({
    active: z.coerce.boolean(),
    id: z.coerce.number()
})

const deleteSale = z.object({
    id: z.coerce.number()
})