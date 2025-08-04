import { Id, AddCommentByIdDishes, DeleteCommentByIdDishes } from "../TypesModel/dishesTypes.js"
import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

export async function fetchCategoryWithDishes({ id }: Id): Promise<any> {
  try {
    return await prisma.categories.findUniqueOrThrow({
      where: { id },
      select: {
        title: true,
        sub_categories:{
          select: {
            name: true,
            dishes: {
              include: {
                dish_images: true,
              }
            }
          }
        }
      }
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export async function fetchAllCategories(): Promise<Prisma.categoriesGetPayload<{}>[]> {
  try {
    return await prisma.categories.findMany({})
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export async function fetchAllDishes(): Promise<Prisma.dishesGetPayload<{ include: { dish_images: true }}>[]> {
  try {
    return await prisma.dishes.findMany({
      include: { dish_images: true}
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export async function fetchDishById({ id }: Id): Promise<Prisma.dishesGetPayload<{ include: { dish_images: true }}>> {
  try{
    return await prisma.dishes.findUniqueOrThrow({
      where: { id },
      include: { dish_images: true }
    })
  }catch (error) {
    throw new Error((error as Error).message)
  }
}

export async function fetchDishCommentsById({ id }: Id): Promise<Prisma.dish_commentsGetPayload<{ include: { users: true }}>[]> {
  try {
    return await prisma.dish_comments.findMany({
      where: { dish_id: id },
      include: { users: true }
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export async function addCommentByIdDishes({ dish_id, user_id, comment, rating }: AddCommentByIdDishes): Promise<Prisma.dish_commentsGetPayload<{ include: { users: true } }>> {
  try {
    return await prisma.dish_comments.create({
      data: { dish_id, user_id, comment, rating },
      include: { users: true }
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export async function deleteCommentByIdDishes({ user_id, dish_id }: DeleteCommentByIdDishes): Promise<void> {
  try {
    await prisma.dish_comments.deleteMany({
      where: { user_id, dish_id }
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}