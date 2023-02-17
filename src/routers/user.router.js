import { Router } from "express";
import {
  createUserValidator,
  loginUserValidator,
} from "../validators/user.validator.js";
import {
  singUpUserController,
  logInUserController,
  logoutUserController,
} from "../controllers/user.controller.js";
import { userAuthMiddleware } from "../middlewares/auth.middleware.js";

//user validatore
const userRouter = Router();

userRouter.post("/singUp", createUserValidator, singUpUserController);

userRouter.post("/logIn", loginUserValidator, logInUserController);

userRouter.get("/logOut", userAuthMiddleware, logoutUserController);

export { userRouter };
