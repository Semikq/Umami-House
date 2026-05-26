import { z } from "zod";
import { uuidSchema, uuidParamsSchema } from "./common.js";
export const favoritesSchemas = {
    allfavorites: {
        params: uuidParamsSchema
    },
    addFavorite: {
        body: z.object({
            user_uuid: uuidSchema,
            dish_uuid: uuidSchema
        })
    },
    deleteFavorite: {
        body: z.object({
            user_uuid: uuidSchema,
            dish_uuid: uuidSchema
        })
    }
};
