import { Router } from "express";
import { handleAllUsers, handleChoiceRoleUserByUuid, handleDeleteUserByUuid } from "../controllers/user/adminControllers.js";
import {handleRegisterUser, handleLoginUsers, handleRefreshToken, handleLogout} from "../controllers/user/authControllers.js";
import { handleUpdateUser, handleDeleteUser } from "../controllers/user/userControllers.js";
import { validate } from "../middleware/validation.js";
import { authenticateToken, authorizeAdmin } from "../middleware/authMiddleware.js";
import { userSchemas } from "../schemas/userSchemas.js";
import { hashPassword } from "../middleware/hashPassword.js";

const route = Router()

route.post("/register", validate({ body: userSchemas.register.body }), hashPassword, handleRegisterUser)
route.post("/login", validate({ body: userSchemas.login.body }), handleLoginUsers)
route.post("/refresh", handleRefreshToken)
route.post("/logout", handleLogout)

route.get("/all", handleAllUsers)
route.put("/role/:uuid", authenticateToken, authorizeAdmin, validate({ params: userSchemas.choiceRoleUserByUuid.params, body: userSchemas.choiceRoleUserByUuid.body }), handleChoiceRoleUserByUuid)
route.delete("/delete/:uuid", authenticateToken, authorizeAdmin, validate({ params: userSchemas.deleteUserByUuid.params }), handleDeleteUserByUuid)

route.put("/updateUser/:uuid", authenticateToken, validate({ params: userSchemas.updateUser.params, body: userSchemas.updateUser.body }), hashPassword,  handleUpdateUser)
route.delete("/deleteUser/:uuid", authenticateToken, validate({ params: userSchemas.deleteUser.params }), handleDeleteUser)

export default route
