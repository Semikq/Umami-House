import {z} from "zod";

enum Status{
    PROCESSING = 'processing',
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled',
    DELIVERING = 'delivering',
    DELIVERED = 'delivered',
    PREPARING = 'preparing',
    PACKING = 'packing'
}

enum PaymentMethod {
    CARD = 'card',
    CASH = 'cash'
}

export interface Id{
    id: number
}

export interface OrdersByFilter{
    status: Status
}

export interface UpdateStatusOrder extends OrdersByFilter{
    id: number
}

interface DishImages {
    id: number
    title: string
    image_url: string
    dish_id: number
    created_at: string
}

export interface OrderDishInput {
    id: number
    count: number
    name: string
    weight: number
    price: number
    frozen: boolean
    spicy: boolean
    ingredients: string
    sub_category_id: number
    active: boolean
    created_at: string
    dish_images: DishImages[]
}

export interface AddOrder extends Id {
    user_id: number,
    delivery_address: string,
    payment_method: PaymentMethod,
    dishes: OrderDishInput[],
    total_price: number
}