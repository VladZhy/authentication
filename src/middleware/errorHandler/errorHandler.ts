import type { Request, Response, NextFunction } from "./types";
import { statusCodes } from "../../utils/statusCodes";
import { isMongooseNotFoundError } from "./helpers";
import { RESOURCE_NOT_FOUND_MESSAGE } from "./config";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  let statusCode =
    res.statusCode === statusCodes.OK
      ? statusCodes.INTERNAL_SERVER_ERROR
      : res.statusCode;
  let message = err.message;

  if (isMongooseNotFoundError(err)) {
    statusCode = statusCodes.NOT_FOUND;
    message = RESOURCE_NOT_FOUND_MESSAGE;
  }

  res.status(statusCode).json({
    message
  });
}
