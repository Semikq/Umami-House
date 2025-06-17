import axios from "axios"

export const addResturants = async (body) => await axios.post(`/restaurants`, body)
export const updateResturants = async (id, body) => await axios.put(`/restaurants/${id}`, body)
export const deleteResturants = async (id) => await axios.delete(`/restaurants/${id}`)

export const fetchAllCities = async () => await axios.get(`/restaurants/cities`)
export const fetchRestaurantsByCity = async (id) => await axios.get(`/restaurants/${id}`)