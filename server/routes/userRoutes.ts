import { Router } from "express";
import { handleAllUsers, handleChoiceRoleUserById, handleDeleteUserById } from "../controllers/user/adminControllers";
import {handleRegisterUser, handleLoginUsers, handleRefreshToken, handleLogout} from "../controllers/user/authControllers";
import { handleUpdateUser, handleDeleteUser } from "../controllers/user/userControllers";
import { validate } from "../middleware/validation";
import { authenticateToken, authorizeAdmin } from "../middleware/authMiddleware";
import { userSchemas } from "../schemas/userSchemas";
import { hashPassword } from "../middleware/hashPassword";

const route = Router()

route.post("/register", validate({ body: userSchemas.register.body }), hashPassword, handleRegisterUser)
route.post("/login", validate({ body: userSchemas.login.body }), handleLoginUsers)
route.post("/refresh", handleRefreshToken)
route.post("/logout", handleLogout)

route.get("/", handleAllUsers)
route.put("/:id/role", authenticateToken, authorizeAdmin, validate({ params: userSchemas.choiceRoleUserById.params, body: userSchemas.choiceRoleUserById.body }), handleChoiceRoleUserById)
route.delete("/:id", authenticateToken, authorizeAdmin, validate({ params: userSchemas.deleteUserById.params }), handleDeleteUserById)

route.put("/:id/updateUser", authenticateToken, validate({ params: userSchemas.updateUser.params, body: userSchemas.updateUser.body }), hashPassword,  handleUpdateUser)
route.delete("/:id/deleteUser", authenticateToken, validate({ params: userSchemas.deleteUser.params }), handleDeleteUser)

export default route