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

export interface OrderDishInput {
    uuid: string
    count: number
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
