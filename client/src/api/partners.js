import axios from "axios";
const apiBase = "http://localhost:3001";

export const fetchAllPartners = async () => {
    return await axios.get(`${apiBase}/partners`)
}

export const addPartners = async (body) => {
    return await axios.post(`${apiBase}/partners`, body)
}

export const updatePartners = async (id, body) => {
    return await axios.put(`${apiBase}/partners/${id}`, body)
}

export const deletePartners = async (id) => {
    return await axios.delete(`${apiBase}/partners/${id}`)
}