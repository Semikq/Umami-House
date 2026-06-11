import {z} from "zod";

enum Status {
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

export interface Uuid {
    uuid: string
}

export interface OrdersByFilter {
    status: Status
}

export interface UpdateStatusOrder extends OrdersByFilter {
    uuid: string
}

interface DishImages {
    uuid: string
    title: string
    image_url: string
    dish_uuid: string
    created_at: string
}

export interface OrderDishInput {
    uuid: string
    count: number
    name: string
    weight: number
    price: number
    frozen: boolean
    spicy: boolean
    ingredients: string
    sub_category_uuid: string
    active: boolean
    created_at: string
    dish_images: DishImages[]
}

export interface AddOrder {
    user_uuid: string,
    delivery_address: string,
    payment_method: string,
    dishes: OrderDishInput[],
    total_price: number,
    bonuses_spent?: number,
    bonus_card_uuid?: string,
}
