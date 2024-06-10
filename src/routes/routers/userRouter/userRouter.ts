import { Router } from "express";
import { UserHandler } from "../../../handlers/UserHandler";
import {
  LOGIN_ROUTE,
  SIGNUP_ROUTE,
  LOGOUT_ROUTE,
  SETTINGS_ROUTE
} from "./config";
import { verifyJWT } from "../../../middleware/verifyJWT";

const userHandler = new UserHandler();

const userRouter = Router();

userRouter.post(LOGIN_ROUTE, userHandler.handleLogin);
userRouter.post(SIGNUP_ROUTE, userHandler.handleSignup);
userRouter.post(LOGOUT_ROUTE, userHandler.handleLogout);
userRouter
  .route(SETTINGS_ROUTE)
  .put(verifyJWT, userHandler.handleUpdateSettings);

export { userRouter };
