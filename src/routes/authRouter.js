import express from "express";
import userAuth from "../Auth/createToken.js";
const authRouter = express.Router();
const {login} = userAuth;
import { googleLogin, googleCallback, logout } from "../controllers/authController.js";

authRouter.post("/createSession", login);

// Google OAuth callback
authRouter.get("/google", googleLogin);
authRouter.get("/google/callback", googleCallback);
authRouter.post("/logout", logout);

export default authRouter;
