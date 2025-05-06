import { RowDataPacket } from "mysql2"

export interface AllFavorites{
    user_id: number
}

export interface Favorites extends AllFavorites{
    dish_id: number
}

export interface Dish extends RowDataPacket {
    id: number,
    name: string,
    weight: string,
    price: number,
    frozen: boolean,
    spicy: boolean,
    ingredients: string,
    active: boolean,
    subcategories_id: number,
    created_at: string
}