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

interface OrderType{
    status: Status,
    delivery_address: string,
    payment_method: PaymentMethod,
}

interface Images{
    title: string,
    image_url: string
}

export interface DishByFilter{
    id: number,
    name: string,
    weight: number,
    price: number,
    frozen: boolean,
    spicy: boolean,
    images: Images[] | null
}

export interface Order extends OrderType{
    id: number,
    user_id: number,
    created_at: string,
    dishes: DishByFilter[]
}

export interface OrdersByFilter{
    status: Status
}

export interface UpdateStatusOrder extends OrdersByFilter{
    id: number
}

export interface OrderId{
    id: number
}

export interface DishInOrder {
    dish_id: number;
    count: number;
  }

export interface AddOrder extends OrderId, OrderType{
    dishes: DishInOrder[]
}