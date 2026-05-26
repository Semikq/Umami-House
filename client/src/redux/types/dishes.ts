export interface Categories {
    uuid: string,
    image_url: string
    title: string
    created_at: string
}

interface DishImage {
    created_at: string
    dish_uuid: string
    uuid: string
    image_url: string
    title: string
}

export interface Dish {
    active: boolean
    created_at: string
    dish_images: DishImage[]
    frozen: boolean
    uuid: string
    ingredients: string
    name: string
    price: number
    spicy: boolean
    sub_category_uuid: string
    weight: number
}

export interface Category {
    title: string
    sub_categories: {
        name: string
        dishes: Dish[]
    }[]
}
