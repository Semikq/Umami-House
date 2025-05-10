import { Router } from "express";
import { handleAllUsers, handleChoiceRoleUserById, handleDeleteUserById } from "../controllers/user/adminControllers";
import { handleRegisterUser, handleLoginUsers } from "../controllers/user/authControllers";
import { handleUpdateUser, handleDeleteUser } from "../controllers/user/userControllers";
import { validate } from "../middleware/validation";

const route = Router()

route.get("/users", validate(), handleAllUsers)
route.put("/users/:id/choiceRole", validate(), handleChoiceRoleUserById)
route.delete("/users/:id/deleteById", validate(), handleDeleteUserById)

route.post("/users/register", validate(), handleRegisterUser)
route.post("/users/login", validate(), handleLoginUsers)

route.post("/users/:id", validate(), handleUpdateUser)
route.delete("/users/:id", validate(), handleDeleteUser)

export default route