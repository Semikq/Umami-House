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

interface Images{
  title: string,
  image_url: string 
}

export interface AllCategories extends RowDataPacket{
  id: number,
  title: string,
  image_url: string 
}

export interface AddDish extends DishType{
  images: Images[]
}

export interface UpdateDish extends AddDish{
  id: number
}

export interface DishId{
  id: number
}

export interface DeleteCommentUserById{
  id: number
}

export interface AllDishes extends RowDataPacket, DishType{
  id: number,
  created_at: string,
  images: Images[] | null
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
  user_id: number,
  dish_id: number
}