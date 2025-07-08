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

interface Images{
  title: string,
  image_url: string
}

export interface AllDishes extends DishType{
  id: number,
  created_at: string,
  dish_images: Images[] | null
}



export interface AddDish extends DishType{
  dish_images: Images[]
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

export interface DishComments{
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