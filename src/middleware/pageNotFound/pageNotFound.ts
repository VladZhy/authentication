import type { Request, Response, NextFunction } from "./types";
import { statusCodes } from "../../utils/statusCodes";

export function pageNotFound(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const error = new Error(`Not Found - ${req.originalUrl}`);

  res.status(statusCodes.NOT_FOUND);
  next(error);
}
