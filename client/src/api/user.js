import axios from "axios"
const apiBase = "http://localhost:3001";

export const fetchAllUsers = async () => await axios.get(`${apiBase}/user/`)
export const choiceRole = async (id, body) => await axios.put(`${apiBase}/${id}/user/choiceRole`, body)

export const register = async (body) => await axios.post(`${apiBase}/user/register`, body)
export const login = async (body) => await axios.post(`${apiBase}/user/login`, body)

export const updateUser = async (id, body) => await axios.put(`${apiBase}/user/${id}`, body)
export const deleteUser = async (id) => await axios.delete(`${apiBase}/user/${id}`)