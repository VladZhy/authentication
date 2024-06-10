import type { Request, Response, NextFunction } from "./types";
import jwt from "jsonwebtoken";
import {
  JWT_SECRET,
  TOKEN_VERIFICATION_ERROR_MESSAGE,
  NO_TOKEN_ERROR_MESSAGE
} from "./config";
import { statusCodes } from "../../utils/statusCodes";

export async function verifyJWT(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = req.cookies?.jwt;

    if (token) {
      try {
        jwt.verify(token, JWT_SECRET);

        next();
      } catch {
        throw new Error(TOKEN_VERIFICATION_ERROR_MESSAGE);
      }
    } else {
      throw new Error(NO_TOKEN_ERROR_MESSAGE);
    }
  } catch (error) {
    res.status(statusCodes.UNAUTHORIZED);
    next(error);
  }
}
