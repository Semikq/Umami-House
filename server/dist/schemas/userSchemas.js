import { z } from "zod";
export const userSchemas = {
    choiceRoleUserById: {
        params: z.object({ id: z.number() }),
        body: z.object({
            role: z.string()
        })
    },
    deleteUserById: {
        params: z.object({ id: z.number() })
    },
    register: {
        body: z.object({
            email: z.string(),
            password: z.coerce.string(),
            name: z.string(),
            surname: z.string().optional(),
            phone: z.string(),
            role: z.string(),
            company_type: z.string().optional(),
            company_name: z.string().optional()
        })
    },
    login: {
        body: z.object({
            userInput: z.coerce.string(),
            password: z.coerce.string()
        })
    },
    updateUser: {
        params: z.object({ id: z.number() }),
        body: z.object({
            email: z.string(),
            password: z.coerce.string(),
            name: z.string(),
            surname: z.string().optional(),
            phone: z.string(),
            company_type: z.string().optional(),
            company_name: z.string().optional()
        })
    },
    deleteUser: {
        params: z.object({ id: z.number() })
    }
};
//# sourceMappingURL=userSchemas.js.map