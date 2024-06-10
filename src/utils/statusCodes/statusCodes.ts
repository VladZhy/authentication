import {
  OK,
  CREATED,
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR
} from "./config";

export const statusCodes = {
  OK,
  CREATED,
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR
} as const;
