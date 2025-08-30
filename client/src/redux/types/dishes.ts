export interface Categories {
    id: number,
    image_url: string
    title: string
    created_at: string
}

interface DishImage {
    created_at: string
    dish_id: number
    id: number
    image_url: string
    title: string
}

export interface Dish {
    active: boolean
    created_at: string
    dish_images: DishImage[]
    frozen: boolean
    id: number
    ingredients: string
    name: string
    price: number
    spicy: boolean
    sub_category_id: number
    weight: number
}

export interface Category {
    title: string
    sub_categories: {
        name: string
        dishes: Dish[]
    }[]
}