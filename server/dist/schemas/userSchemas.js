import { z } from "zod";
import { uuidParamsSchema } from "./common.js";
export const userSchemas = {
    choiceRoleUserByUuid: {
        params: uuidParamsSchema,
        body: z.object({
            role: z.enum(["user", "admin", "company"]),
        })
    },
    deleteUserByUuid: {
        params: uuidParamsSchema
    },
    register: {
        body: z.object({
            email: z.string(),
            password: z.coerce.string(),
            name: z.string(),
            surname: z.string().optional(),
            phone: z.string(),
            company_type: z.string().optional(),
            company_name: z.string().optional(),
            city_uuid: z.string().uuid().optional(),
        })
    },
    login: {
        body: z.object({
            userInput: z.coerce.string(),
            password: z.coerce.string()
        })
    },
    updateUser: {
        params: uuidParamsSchema,
        body: z.object({
            email: z.string(),
            password: z.coerce.string().optional(),
            name: z.string(),
            surname: z.string().optional(),
            phone: z.string(),
            company_type: z.string().optional(),
            company_name: z.string().optional()
        })
    },
    deleteUser: {
        params: uuidParamsSchema
    },
    updateUserCity: {
        params: uuidParamsSchema,
        body: z.object({
            city_uuid: z.string().uuid(),
        }),
    },
    bonusCardsByUser: {
        params: uuidParamsSchema,
    },
};
