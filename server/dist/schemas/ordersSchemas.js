import { z } from "zod";
export const ordersSchemas = {
    ordersByFilter: {
        query: z.object({
            status: z.string()
        })
    },
    updateStatus: {
        params: z.object({ id: z.number() }),
        body: z.object({
            status: z.string()
        })
    },
    deleteOrder: {
        params: z.object({ id: z.number() })
    },
    ordersByUser: {
        params: z.object({ id: z.number() })
    },
    addUser: {
        params: z.object({ id: z.number() }),
        body: z.object({
            status: z.string(),
            delivery_address: z.string(),
            payment_method: z.string(),
            dishes: z.array(z.object({
                name: z.string(),
                weight: z.string(),
                price: z.number(),
                frozen: z.boolean(),
                spicy: z.boolean(),
                ingredients: z.string(),
                subcategories_id: z.number(),
                active: z.boolean(),
                images: z.array(z.object({
                    title: z.string(),
                    image_url: z.string()
                }))
            }))
        })
    },
    deleteUser: {
        params: z.object({ id: z.number() })
    }
};
//# sourceMappingURL=ordersSchemas.js.map