import { Router } from "express";
import { UserControllers } from "../controllers/user.controllers.js";

export const userRouter = Router()

 
const { getUsers,
        getUserBy,
        createUser,
        updateUser,
        deleteUser}= new UserControllers()


userRouter.get("/", getUsers)

userRouter.get("/:uid", getUserBy)

userRouter.post("/",createUser)

userRouter.put("/:uid", updateUser)

userRouter.delete("/:uid", deleteUser)