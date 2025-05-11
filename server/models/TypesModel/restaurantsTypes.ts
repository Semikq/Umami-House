import { RowDataPacket } from "mysql2"

interface RestaurantType{
    name: string,
    address: string,
    phone: string,
    description: string,
    active: boolean,
    latitude: number,
    longitude: number
}

export interface AddRestaurant extends RestaurantType{}

export interface UpdateRestaurant extends AddRestaurant{
    id: number
}

export interface IdRestaurant{
    id: number
}

export interface AllCities extends RowDataPacket, RestaurantType{
    id: number,
    city_id: number,
    created_at: string
}

export interface RestaurantsByCity{
    city: string
}
