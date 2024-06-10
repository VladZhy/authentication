import type { CorsOptions, OptionsUrlencoded } from "./types";
import { statusCodes } from "./utils/statusCodes";
import env from "./env";

const WHITELIST: string[] = ["http://localhost:3000"];
const NOT_ALLOWED_ORIGIN_ERROR_MESSAGE = "Not allowed by CORS";
const IS_CORS_CREDENTIALS_OPTION_ENABLED = true;
export const CORS_OPTIONS: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || WHITELIST.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(NOT_ALLOWED_ORIGIN_ERROR_MESSAGE));
    }
  },
  credentials: IS_CORS_CREDENTIALS_OPTION_ENABLED,
  optionsSuccessStatus: statusCodes.OK
};

const IS_URLENCODED_EXTENDED = true;
export const URLENCODED_OPTIONS: OptionsUrlencoded = {
  extended: IS_URLENCODED_EXTENDED
};

export const PRIMARY_ROUTE = "/";
export const PORT = env.node.port;
