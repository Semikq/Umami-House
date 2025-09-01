export interface Restaurants {
    active: boolean
    address: string
    city_id: number
    created_at: string
    description: string
    id: number
    latitude: string
    longitude: string
    name: string
    phone: string
    time_work: string
    restaurant_image: string
}

export interface Cities {
    created_at: string
    id: number
    name: string
}

export interface RestaurantsByCity extends Restaurants {}