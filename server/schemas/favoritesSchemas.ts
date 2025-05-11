import { z } from "zod";

export const favoritesSchemas = {
    allfavorites: {
        params: z.object({ id: z.number() })
    },
    addFavorite:{
        body: z.object({
            user_id: z.number(),
            dish_id: z.number()
        })
    },
    deleteFavorite:{
        body: z.object({
            user_id: z.number(),
            dish_id: z.number()
        })
    }
}