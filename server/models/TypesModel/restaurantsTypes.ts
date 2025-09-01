export interface Id {
    id: number
}

interface RestaurantType {
    city_id: number,
    name: string,
    address: string,
    phone: string,
    description: string,
    active: boolean,
    latitude: number,
    longitude: number,
    time_work: string
    restaurant_image: string
}

export interface AddRestaurant extends RestaurantType {}

export interface UpdateRestaurant extends AddRestaurant {
    id: number
}

export interface RestaurantsByCity {
    city_id: number
}

export interface addCity{
    city_name: string
}
