import axios from "axios";
const apiBase = "http://localhost:3001";

export const fetchAllFavoritesById = async (id) => {
    return await axios.get(`${apiBase}/user/${id}/favorites`)
}

export const addFavoriteById = async (body) => {
    return await axios.post(`${apiBase}/favorites`, body)
}

export const deleteFavoriteById = async (body) => {
    return await axios.delete(`${apiBase}/favorites`, { data: body })
}