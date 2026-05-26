export interface Restaurants {
    active: boolean
    address: string
    city_uuid: string
    created_at: string
    description: string
    uuid: string
    latitude: string
    longitude: string
    name: string
    phone: string
    time_work: string
    restaurant_image: string
}

export interface Cities {
    created_at: string
    uuid: string
    name: string
}

export interface RestaurantsByCity extends Restaurants {}
