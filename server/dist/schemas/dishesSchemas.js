import { z } from "zod";
export const dishesSchemas = {
    dishById: {
        params: z.object({ id: z.coerce.number() })
    },
    create: {
        body: z.object({
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
        })
    },
    update: {
        params: z.object({ id: z.number() }),
        body: z.object({
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
        })
    },
    delete: {
        params: z.object({ id: z.number() })
    },
    dishCommentsById: {
        params: z.object({ id: z.number() })
    },
    addCommentByIdDishes: {
        body: z.object({
            dish_id: z.number(),
            user_id: z.number(),
            comment: z.string().optional(),
            rating: z.number()
        })
    },
    deleteCommentByIdDishes: {
        params: z.object({
            user_id: z.number(),
            id: z.number()
        })
    }
};
//# sourceMappingURL=dishesSchemas.js.map