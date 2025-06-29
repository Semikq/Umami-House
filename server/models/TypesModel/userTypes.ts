interface UserType{
    email: string,
    password: string,
    name: string,
    surname?: string,
    phone: string,
    role: string,
    company_type?: string,
    company_name?: string,
    created_at: string
}

export interface AllUser extends UserType{
    id: number,
}

export interface ChoiceRoleUser{
    role: string,
    id: number
}

export interface IdUser{
    id: number
}

export interface RegisterUser extends UserType{}

export interface LoginUser{
    userInput: string,
    password: string
}

export interface User extends RegisterUser{
    id: number
}

export interface UpdateUser extends UserType{
    id: number
}

export interface DeleteResult {
    rowCount: number;
}