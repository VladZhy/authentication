import type { Secret } from "./types";
import env from "../../env";

export const JWT_SECRET: Secret = env.secretTokens.access;

export const TOKEN_VERIFICATION_ERROR_MESSAGE =
  "Not authorized, token verification failed";
export const NO_TOKEN_ERROR_MESSAGE = "Not authorized, no token";
