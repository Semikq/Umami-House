import { Router } from "express";
import { handleAllUsers, handleChoiceRoleUserByUuid, handleDeleteUserByUuid } from "../controllers/user/adminControllers.js";
import {handleRegisterUser, handleLoginUsers, handleRefreshToken, handleLogout} from "../controllers/user/authControllers.js";
import { handleUpdateUser, handleUpdateUserCity, handleDeleteUser } from "../controllers/user/userControllers.js";
import {
    handleActiveBonusCardsByUser,
    handleBonusCardsByUser,
    handleCreateBonusCard,
    handleDeleteBonusCard,
} from "../controllers/user/bonusCardsControllers.js";
import { validate } from "../middleware/validation.js";
import { authenticateToken, authorizeAdmin } from "../middleware/authMiddleware.js";
import { userSchemas } from "../schemas/userSchemas.js";
import { hashPassword } from "../middleware/hashPassword.js";

const route = Router()

route.post("/register", validate({ body: userSchemas.register.body }), hashPassword, handleRegisterUser)
route.post("/login", validate({ body: userSchemas.login.body }), handleLoginUsers)
route.post("/refresh", handleRefreshToken)
route.post("/logout", handleLogout)

route.get("/all", authenticateToken, authorizeAdmin, handleAllUsers)
route.put("/role/:uuid", authenticateToken, authorizeAdmin, validate({ params: userSchemas.choiceRoleUserByUuid.params, body: userSchemas.choiceRoleUserByUuid.body }), handleChoiceRoleUserByUuid)
route.delete("/delete/:uuid", authenticateToken, authorizeAdmin, validate({ params: userSchemas.deleteUserByUuid.params }), handleDeleteUserByUuid)

route.put("/updateUser/:uuid", authenticateToken, validate({ params: userSchemas.updateUser.params, body: userSchemas.updateUser.body }), hashPassword,  handleUpdateUser)
route.put("/updateCity/:uuid", authenticateToken, validate({ params: userSchemas.updateUserCity.params, body: userSchemas.updateUserCity.body }), handleUpdateUserCity)
route.get("/bonusCards/:uuid/active", authenticateToken, validate({ params: userSchemas.bonusCardsByUser.params }), handleActiveBonusCardsByUser)
route.get("/bonusCards/:uuid", authenticateToken, validate({ params: userSchemas.bonusCardsByUser.params }), handleBonusCardsByUser)
route.post("/bonusCards/:uuid", authenticateToken, authorizeAdmin, validate({ params: userSchemas.createBonusCard.params, body: userSchemas.createBonusCard.body }), handleCreateBonusCard)
route.delete("/bonusCards/card/:uuid", authenticateToken, authorizeAdmin, validate({ params: userSchemas.deleteBonusCard.params }), handleDeleteBonusCard)
route.delete("/deleteUser/:uuid", authenticateToken, validate({ params: userSchemas.deleteUser.params }), handleDeleteUser)

export default route
