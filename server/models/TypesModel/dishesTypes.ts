export interface Uuid {
  uuid: string
}

export interface AddCommentByUuidDishes {
  dish_uuid: string,
  user_uuid: string,
  comment: string,
  rating: number
}

export interface DeleteCommentByUuidDishes {
  user_uuid: string,
  dish_uuid: string
}

export interface Image {
  title: string,
  image_url: string
}

export interface Images extends Image {
  dish_uuid: string
}

interface DishType {
  name: string,
  weight: number,
  price: number,
  frozen: boolean,
  spicy: boolean,
  ingredients: string,
  sub_category_uuid: string,
  active: boolean,
  corporate_type?: string | null,
  wholesale_min_qty?: number | null,
  wholesale_price?: number | null,
}

export interface AddDish extends DishType {
  images: Image[]
}

export interface UpdateDish extends AddDish {
  uuid: string
}
