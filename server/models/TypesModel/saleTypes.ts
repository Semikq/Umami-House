import { RowDataPacket } from "mysql2"

export interface AddSale{
    title: string,
    image_url: string,
    active: boolean
}

export interface UpdateSale{
    active: boolean,
    id: number
}

export interface DeleteSale{
    id: number
}

export interface AllSale extends RowDataPacket {
    id: number
    title: string
    image_url: string
    active: boolean
    created_at: string
}