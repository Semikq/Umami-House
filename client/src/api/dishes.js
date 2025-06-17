import axios from "axios";

export const fetchAllDishesByCategory = async (id) => {
    return await axios.get(`/dishes/categoryDishes/${id}`)
}

export const fetchAllCategories = async () => {
    return await axios.get(`/dishes/categories`)
}

export const dishById = async (id) => {
    return await axios.get(`/dishes/${id}`)
}

export const addDish = async (body) => {
    return await axios.post(`/dishes`, body)
}

export const updateDish = async (id, body) => {
    return await axios.put(`/dishes/${id}`, body)
}

export const deleteDish = async (id) => {
    return await axios.delete(`/dishes/${id}`)
}

export const fetchCommenstByIdDish = async (id) => {
    return await axios.get(`/dishes/${id}/comments`)
}

export const addCommenstByIdDish = async (id, body) => {
    return await axios.post(`/dishes/${id}/comments`, body)
}

export const deleteCommentByIdDish = async (id, params) => {
    return await axios.delete(`/dishes/${id}/comments`, { params });
}