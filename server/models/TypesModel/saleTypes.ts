export interface Uuid {
    uuid: string
}

export interface AddSale {
    title: string,
    image_url: string,
    active: boolean
}

export interface UpdateSale {
    active: boolean,
    uuid: string
}
