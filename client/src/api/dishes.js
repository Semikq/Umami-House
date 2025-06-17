import axios from "axios";
const apiBase = "http://localhost:3001";

export const fetchAllDishesByCategory = async (id) => {
    return await axios.get(`${apiBase}/dishes/categoryDishes/${id}`)
}

export const fetchAllCategories = async () => {
    return await axios.get(`${apiBase}/dishes/categories`)
}

export const dishById = async (id) => {
    return await axios.get(`${apiBase}/dishes/${id}`)
}

export const addDish = async (body) => {
    return await axios.post(`${apiBase}/dishes`, body)
}

export const updateDish = async (id, body) => {
    return await axios.put(`${apiBase}/dishes/${id}`, body)
}

export const deleteDish = async (id) => {
    return await axios.delete(`${apiBase}/dishes/${id}`)
}

export const fetchCommenstByIdDish = async (id) => {
    return await axios.get(`${apiBase}/dishes/${id}/comments`)
}

export const addCommenstByIdDish = async (id, body) => {
    return await axios.post(`${apiBase}/dishes/${id}/comments`, body)
}

export const deleteCommentByIdDish = async (id, params) => {
    return await axios.delete(`${apiBase}/dishes/${id}/comments`, { params });
}