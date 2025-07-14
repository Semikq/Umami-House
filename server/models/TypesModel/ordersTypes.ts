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

export interface OrderDishInput {
    dish_id: number;
    count: number;
}

export interface AddOrder extends Id {
    user_id: number,
    status: Status,
    delivery_address: string,
    payment_method: PaymentMethod,
    dishes: OrderDishInput[]
}