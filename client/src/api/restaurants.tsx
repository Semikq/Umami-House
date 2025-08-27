import axios from "axios";

export async function getAllRestaurants() {
    return await axios.get("/restaurants")
}

export async function getCities(){
    return await axios.get("/restaurants/cities");
}

export async function getRestaurantsByCity(city_id) {
    return await axios.get(`/restaurants/city/${city_id}`);
}