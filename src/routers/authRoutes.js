import { Router } from "express";
import { signUp, signIn } from "../controllers/authController.js";
import {
  userLoginSchemaValidationMiddleware,
  userRegisterSchemaValidationMiddleware,
} from "../middlewares/userValidationMiddleware.js";

const authRouter = Router();
authRouter.post(
  "/auth/sign-up",
  userRegisterSchemaValidationMiddleware,
  signUp
);
authRouter.post("/auth/sign-in", userLoginSchemaValidationMiddleware, signIn);

export default authRouter;
