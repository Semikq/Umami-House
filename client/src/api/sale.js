import axios from "axios"
const apiBase = "http://localhost:3001";

export const fetchAllSale = async () => await axios.get(`${apiBase}/sale/`)
export const addSale = async (body) => await axios.post(`${apiBase}/`, body)
export const updateSale = async (id, body) => await axios.put(`${apiBase}/${id}`, body)
export const deleteSale = async (id) => await axios.delete(`${apiBase}/${id}`)