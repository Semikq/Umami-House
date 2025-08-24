import axios from "axios";

export async function getAllRestaurants() {
    return await axios.get("/restaurants")
}