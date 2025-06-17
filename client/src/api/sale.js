import axios from "axios"

export const fetchAllSale = async () => await axios.get(`/sale/`)
export const addSale = async (body) => await axios.post(`/`, body)
export const updateSale = async (id, body) => await axios.put(`/${id}`, body)
export const deleteSale = async (id) => await axios.delete(`/${id}`)