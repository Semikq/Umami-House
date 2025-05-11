import { Router } from "express";
import { handleAllUsers, handleChoiceRoleUserById, handleDeleteUserById } from "../controllers/user/adminControllers";
import { handleRegisterUser, handleLoginUsers } from "../controllers/user/authControllers";
import { handleUpdateUser, handleDeleteUser } from "../controllers/user/userControllers";
import { validate } from "../middleware/validation";
import { userSchemas } from "../schemas/userSchemas";
import { hashPassword } from "../middleware/hashPassword";

const route = Router()

route.get("/users", handleAllUsers)
route.put("/users/:id/choiceRole", validate({ params: userSchemas.choiceRoleUserById.params, body: userSchemas.choiceRoleUserById.body }), handleChoiceRoleUserById)
route.delete("admin/users/:id", validate({ params: userSchemas.deleteUserById.params }), handleDeleteUserById)

route.post("/users/register", validate({ body: userSchemas.register.body }), hashPassword, handleRegisterUser)
route.post("/users/login", validate({ body: userSchemas.login.body }), handleLoginUsers)

route.put("/users/:id", validate({ params: userSchemas.updateUser.params, body: userSchemas.updateUser.body }), hashPassword,  handleUpdateUser)
route.delete("/users/:id", validate({ params: userSchemas.deleteUser.params }), handleDeleteUser)

export default route