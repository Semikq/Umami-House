export interface Uuid {
    uuid: string
}

interface PartnersType {
    name: string,
    logo_img: string,
    link_website?: string,
    active: boolean
}

export interface AddPartners extends PartnersType {}

export interface UpdatePartners extends Uuid, PartnersType {}
