import axios from "axios";

export const fetchAllPartners = async () => {
    return await axios.get(`/partners`)
}

export const addPartners = async (body) => {
    return await axios.post(`/partners`, body)
}

export const updatePartners = async (id, body) => {
    return await axios.put(`/partners/${id}`, body)
}

export const deletePartners = async (id) => {
    return await axios.delete(`/partners/${id}`)
}