import type {
  IUserHandler,
  IUserController,
  Request,
  Response,
  NextFunction
} from "./types";
import { UserController } from "../../controllers/UserController";
import jwt from "jsonwebtoken";
import {
  JWT_SECRET,
  JWT_SIGN_OPTIONS,
  AUTH_COOKIE_NAME,
  AUTH_COOKIE_OPTIONS,
  EXPIRED_COOKIE_OPTIONS,
  LOGIN_SUCCESS_MESSAGE,
  SIGNUP_SUCCESS_MESSAGE,
  LOGOUT_SUCCESS_MESSAGE,
  UPDATE_SETTINGS_SUCCESS_MESSAGE
} from "./config";
import { statusCodes } from "../../utils/statusCodes";

export class UserHandler implements IUserHandler {
  private userController: IUserController;

  constructor(userController: IUserController = new UserController()) {
    this.userController = userController;
  }

  public handleLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { username, password } = req.body;
      const userData = await this.userController.logIn(username, password);
      const token = jwt.sign(
        { userId: userData.id },
        JWT_SECRET,
        JWT_SIGN_OPTIONS
      );

      res.cookie(AUTH_COOKIE_NAME, token, AUTH_COOKIE_OPTIONS);
      res.json({ userData, message: LOGIN_SUCCESS_MESSAGE });
    } catch (error) {
      res.status(statusCodes.BAD_REQUEST);
      next(error);
    }
  };

  public handleSignup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { username, email, password } = req.body;
      const userData = await this.userController.signUp(
        username,
        email,
        password
      );
      const token = jwt.sign(
        { userId: userData.id },
        JWT_SECRET,
        JWT_SIGN_OPTIONS
      );

      res.cookie(AUTH_COOKIE_NAME, token, AUTH_COOKIE_OPTIONS);
      res
        .status(statusCodes.CREATED)
        .json({ userData, message: SIGNUP_SUCCESS_MESSAGE });
    } catch (error) {
      res.status(statusCodes.BAD_REQUEST);
      next(error);
    }
  };

  public handleLogout = (req: Request, res: Response): void => {
    res.cookie(AUTH_COOKIE_NAME, "", EXPIRED_COOKIE_OPTIONS);
    res.json({ message: LOGOUT_SUCCESS_MESSAGE });
  };

  public handleUpdateSettings = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id, ...updatedFields } = req.body;
      const userData = await this.userController.updateSettings(
        id,
        updatedFields
      );

      res.json({ userData, message: UPDATE_SETTINGS_SUCCESS_MESSAGE });
    } catch (error) {
      res.status(statusCodes.NOT_FOUND);
      next(error);
    }
  };
}
