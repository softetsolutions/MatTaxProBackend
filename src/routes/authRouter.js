import express from "express";
import userAuth from "../Auth/createToken.js";
const authRouter = express.Router();
const {login} = userAuth;

authRouter.post("/createSession", login);


export default authRouter;
