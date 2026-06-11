import {Dish} from "./dishes.ts";

export interface OrderDish {
    uuid: string,
    order_uuid: string,
    dish_uuid: string,
    count: number,
    dishes: Dish,
}

export interface OrderUserInfo {
    uuid: string,
    name: string,
    surname: string,
    email: string,
    phone: string,
    role?: string,
    company_type?: string | null,
    company_name?: string | null,
}

export interface Order {
    uuid: string,
    user_uuid: string,
    status: string,
    delivery_address: string,
    payment_method: string,
    created_at: string,
    total_price: number,
    order_dish: OrderDish[],
    users?: OrderUserInfo,
}

export type OrderStatus =
    | "processing"
    | "confirmed"
    | "preparing"
    | "packing"
    | "delivering"
    | "delivered"
    | "cancelled";
