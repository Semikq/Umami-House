export interface BonusCard {
    uuid: string,
    user_uuid: string,
    name: string,
    amount: number,
    description: string,
    active_until: string,
    is_active: boolean,
    created_at: string,
}
