interface PartnersType{
    name: string,
    logo: string,
    link_website?: string,
    active: boolean
}

export interface AddPartners extends PartnersType {}

export interface UpdatePartners extends PartnersType{
    id:number
}

export interface IdPartners{
    id:number
}

export interface AllPartners extends PartnersType{
    id: number,
    created_at: string
}