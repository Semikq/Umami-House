import axios from "axios"
const apiBase = "http://localhost:3001";

export const addResturants = async (body) => await axios.post(`${apiBase}/restaurants`, body)
export const updateResturants = async (id, body) => await axios.put(`${apiBase}/restaurants/${id}`, body)
export const deleteResturants = async (id) => await axios.delete(`${apiBase}/restaurants/${id}`)

export const fetchAllCities = async () => await axios.get(`${apiBase}/restaurants/cities`)
export const fetchRestaurantsByCity = async (id) => await axios.get(`${apiBase}/restaurants/${id}`)