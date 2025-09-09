interface UserType{
    email: string,
    name: string,
    surname: string,
    phone: string,
    role: string,
    company_type?: string | null,
    company_name?: string | null,
    bonuses: number,
    created_at: Date
}

export interface Id{
    id: number
}

export interface changeUserRole extends Id{
    role: string,
}

export interface LoginUser{
    userInput: string,
    password: string
}

export interface User extends UserType, Id{
    password: string
}

export interface UserRefresh extends UserType{}