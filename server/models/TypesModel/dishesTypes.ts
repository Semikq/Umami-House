export interface Id{
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

export interface Image{
  title: string,
  image_url: string
}

export interface Images extends Image{
  dish_id: number
}

interface DishType{
  name: string,
  weight: number,
  price: number,
  frozen: boolean,
  spicy: boolean,
  ingredients: string,
  sub_category_id: number,
  active: boolean,
}

export interface AddDish extends DishType{
  images: Image[]
}

export interface UpdateDish extends AddDish{
  id: number
}