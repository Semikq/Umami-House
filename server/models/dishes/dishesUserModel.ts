import { Uuid, AddCommentByUuidDishes, DeleteCommentByUuidDishes } from "../TypesModel/dishesTypes.js"
import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

export async function fetchCategoryWithDishes({ uuid }: Uuid): Promise<any> {
  try {
    return await prisma.categories.findUniqueOrThrow({
      where: { uuid },
      select: {
        title: true,
        sub_categories:{
          select: {
            uuid: true,
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

export async function fetchDishByUuid({ uuid }: Uuid): Promise<any> {
  try{
    return await prisma.dishes.findUniqueOrThrow({
      where: { uuid },
      include: {
        sub_categories: {
          include: {
            categories: true
          }
        },
        dish_comments: {
          include: {
            users: {
              select: {
                name: true,
                surname: true
              },
            }
          }
        },
        dish_images: true
      }
    })
  }catch (error) {
    throw new Error((error as Error).message)
  }
}

export async function fetchDishCommentsByUuid({ uuid }: Uuid): Promise<Prisma.dish_commentsGetPayload<{ include: { users: true }}>[]> {
  try {
    return await prisma.dish_comments.findMany({
      where: { dish_uuid: uuid },
      include: { users: true }
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export async function addCommentByUuidDishes({ dish_uuid, user_uuid, comment, rating }: AddCommentByUuidDishes): Promise<Prisma.dish_commentsGetPayload<{ include: { users: true } }>> {
  try {
    return await prisma.dish_comments.create({
      data: { dish_uuid, user_uuid, comment, rating },
      include: { users: true }
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export async function deleteCommentByUuidDishes({ user_uuid, dish_uuid }: DeleteCommentByUuidDishes): Promise<void> {
  try {
    await prisma.dish_comments.deleteMany({
      where: { user_uuid, dish_uuid }
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
