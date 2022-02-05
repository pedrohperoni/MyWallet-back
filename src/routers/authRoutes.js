import { Router } from "express";
import { signUp, signIn } from "../controllers/authController.js";

const authRouter = Router();
authRouter.post("/auth/sign-up", signUp);
authRouter.post("/auth/sign-in", signIn);

export default authRouter;