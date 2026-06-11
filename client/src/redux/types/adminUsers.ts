export type UserRole = "user" | "admin" | "company";

export interface AdminUserListItem {
    uuid: string,
    email: string,
    name: string,
    surname: string,
    phone: string,
    role: UserRole,
    company_name: string | null,
    company_type: string | null,
    bonuses: number,
    created_at: string,
    city_name: string | null,
    total_spent: number,
    orders_count: number,
}
