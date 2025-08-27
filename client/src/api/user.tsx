import axios from "axios";

export async function login({userInput, password}) {
    return await axios.post("/users/login", {userInput, password})
}

export async function register({email, password, name, surname, phone, company_type, company_name}){
    return await axios.post("/users/register", {email, password, name, surname, phone, company_type, company_name})
}