import express from "express";
import user from "../controllers/userController.js";
const {createUser,deleteUser,getAllUser,getByIdUser,updateUser} = user;
const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.get("/", getAllUser);
userRouter.get("/:id", getByIdUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
