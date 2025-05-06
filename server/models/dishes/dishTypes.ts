import { RowDataPacket } from "mysql2"

interface DishType{
    name: string,
    weight: number,
    price: number,
    frozen: boolean,
    spicy: boolean,
    ingredients: string,
    subcategories_id: number,
    active: boolean,
}

interface Photos{
    title: string,
    image_url: string
}

export interface AddDish extends DishType{
    photos: Photos[]
}

export interface UpdateDish extends AddDish{
    id: number
}

export interface DeleteDish{
    id: number
}

export interface AllDishes extends RowDataPacket, DishType{
  id: number,
  created_at: string,
  images: Photos[] | null
}

export interface DishComments extends RowDataPacket{
  comment: string,
  rating: number,
  created_at: string
  name: string
}

export interface DishAndCommentsById{
  id: number
}

export interface AddCommentByIdDishes{
    dish_id: number,
    user_id: number,
    comment: string,
    rating: number
  }
  
export interface DeleteCommentByIdDishes{
    id: number
}