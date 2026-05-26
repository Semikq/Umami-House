export interface AllFavorites {
    user_uuid: string
}

export interface VariousEventsInTheFavorites extends AllFavorites {
    dish_uuid: string
}
