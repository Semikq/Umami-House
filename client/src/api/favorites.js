import axios from "axios";

export const fetchAllFavoritesById = async (id) => {
    return await axios.get(`/user/${id}/favorites`)
}

export const addFavoriteById = async (body) => {
    return await axios.post(`/favorites`, body)
}

export const deleteFavoriteById = async (body) => {
    return await axios.delete(`/favorites`, { data: body })
}