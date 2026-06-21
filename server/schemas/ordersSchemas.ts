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
            bonuses_spent: z.number().int().min(0).optional(),
            bonus_card_uuid: uuidSchema.optional(),
            dishes: z.array(z.object({
                uuid: uuidSchema,
                count: z.number().int().positive(),
            }).passthrough())
        })
    },
    deleteUser: {
        params: uuidParamsSchema
    }
}
