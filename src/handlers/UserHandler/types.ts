import type { Request, Response, NextFunction, CookieOptions } from "express";
import type {
  IUserController,
  UpdatedUserSettings
} from "../../controllers/UserController";
import type { Secret, SignOptions } from "jsonwebtoken";

export interface IUserHandler {
  handleLogin(req: Request, res: Response, next: NextFunction): Promise<void>;
  handleSignup(req: Request, res: Response, next: NextFunction): Promise<void>;
  handleLogout(req: Request, res: Response): void;
  handleUpdateSettings(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
}

export type {
  Request,
  Response,
  NextFunction,
  CookieOptions,
  IUserController,
  UpdatedUserSettings,
  Secret,
  SignOptions
};
