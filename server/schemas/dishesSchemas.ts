import { z } from "zod";
import { uuidSchema, uuidParamsSchema } from "./common.js";

export const dishesSchemas = {
    dishByUuid: {
        params: uuidParamsSchema
    },
    create: {
        body: z.object({
            name: z.string(),
            weight: z.string(),
            price: z.number(),
            frozen: z.boolean(),
            spicy: z.boolean(),
            ingredients: z.string(),
            sub_category_uuid: uuidSchema,
            active: z.boolean(),
            images: z.array(z.object({
                title: z.string(),
                image_url: z.string()
            }))
        })
    },
    update: {
        params: uuidParamsSchema,
        body: z.object({
            name: z.string(),
            weight: z.string(),
            price: z.number(),
            frozen: z.boolean(),
            spicy: z.boolean(),
            ingredients: z.string(),
            sub_category_uuid: uuidSchema,
            active: z.boolean(),
            images: z.array(z.object({
                title: z.string(),
                image_url: z.string()
            }))
        })
    },
    delete: {
        params: uuidParamsSchema
    },
    dishCommentsByUuid: {
        params: uuidParamsSchema
    },
    addCommentByUuidDishes: {
        body: z.object({
            dish_uuid: uuidSchema,
            user_uuid: uuidSchema,
            comment: z.string().optional(),
            rating: z.number()
        })
    },
    deleteCommentByUuidDishes: {
        body: z.object({
            user_uuid: uuidSchema,
            uuid: uuidSchema
        }),
    }
}
