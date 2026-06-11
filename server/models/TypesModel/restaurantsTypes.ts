export interface Uuid {
    uuid: string
}

interface RestaurantType {
    city_uuid: string,
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
    uuid: string
}

export interface RestaurantsByCity {
    city_uuid: string
}

export interface addCity {
    name: string
}
