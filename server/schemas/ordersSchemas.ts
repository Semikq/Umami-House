import { z } from "zod";
import { uuidSchema, uuidParamsSchema } from "./common.js";

export const ordersSchemas = {
    ordersByFilter: {
        body: z.object({
            status: z.string()
        })
    },
    updateStatus: {
        params: uuidParamsSchema,
        body: z.object({
            status: z.string()
        })
    },
    deleteOrder: {
        params: uuidParamsSchema
    },
    ordersByUser: {
        params: uuidParamsSchema
    },
    addUser: {
        body: z.object({
            user_uuid: uuidSchema,
            delivery_address: z.string(),
            payment_method: z.string(),
            total_price: z.number(),
            dishes: z.array(z.object({
                uuid: uuidSchema,
                name: z.string(),
                weight: z.number(),
                price: z.number(),
                frozen: z.boolean(),
                spicy: z.boolean(),
                ingredients: z.string(),
                sub_category_uuid: uuidSchema,
                active: z.boolean(),
                count: z.number(),
                created_at: z.string().datetime(),
                dish_images: z.array(z.object({
                    uuid: uuidSchema,
                    title: z.string(),
                    image_url: z.string(),
                    dish_uuid: uuidSchema,
                    created_at: z.string()
                }))
            }))
        })
    },
    deleteUser: {
        params: uuidParamsSchema
    }
}
