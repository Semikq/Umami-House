export interface AllFavorites{
    user_id: number
}

export interface Favorites extends AllFavorites{
    dish_id: number
}

interface Images{
    title: string,
    image_url: string
}

export interface Dish {
    id: number,
    name: string,
    weight: number,
    price: number,
    frozen: boolean,
    spicy: boolean,
    ingredients: string,
    active: boolean,
    subcategories_id: number,
    created_at: string,
    images: Images[]
}