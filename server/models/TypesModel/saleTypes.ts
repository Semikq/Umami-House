export interface Id{
    id: number
}

export interface AddSale{
    title: string,
    image_url: string,
    active: boolean
}

export interface UpdateSale{
    active: boolean,
    id: number
}