import { z } from "zod";

export const ordersSchemas = {
    ordersByFilter: {
        body: z.object({
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
        body: z.object({
            user_id: z.number(),
            delivery_address: z.string(),
            payment_method: z.string(),
            total_price: z.number(),
            dishes: z.array(z.object({
                id: z.number(),
                name: z.string(),
                weight: z.number(),
                price: z.number(),
                frozen: z.boolean(),
                spicy: z.boolean(),
                ingredients: z.string(),
                sub_category_id: z.number(),
                active: z.boolean(),
                count: z.number(),
                created_at: z.string().datetime(),
                dish_images: z.array(z.object({
                    id: z.number(),
                    title: z.string(),
                    image_url: z.string(),
                    dish_id: z.number(),
                    created_at: z.string()
                }))
            }))
        })
    },
    deleteUser: {
        params: z.object({ id: z.number() })
    }
}