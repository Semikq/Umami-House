import axios from "axios"

export const fetchAllUsers = async () => await axios.get(`/user/`)
export const choiceRole = async (id, body) => await axios.put(`/${id}/user/choiceRole`, body)

export const register = async (body) => await axios.post(`/user/register`, body)
export const login = async (body) => await axios.post(`/user/login`, body)

export const updateUser = async (id, body) => await axios.put(`/user/${id}`, body)
export const deleteUser = async (id) => await axios.delete(`/user/${id}`)