interface UserType {
    email: string,
    password: string,
    name: string,
    surname: string,
    phone: string,
    role: string,
    company_type?: string | null,
    company_name?: string | null,
    bonuses: number,
    created_at: Date
}

export interface Uuid {
    uuid: string
}

export interface changeUserRole extends Uuid {
    role: string,
}

export interface LoginUser {
    userInput: string,
    password: string
}

export interface User extends UserType, Uuid {}

export interface UserCity {
    uuid: string
    name: string
}

export interface UserRefresh extends Omit<UserType, "password">, Uuid {
    city_uuid?: string | null
    cities?: UserCity | null
}
