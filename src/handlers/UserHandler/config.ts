import type { Secret, SignOptions, CookieOptions } from "./types";
import env from "../../env";

export const JWT_SECRET: Secret = env.secretTokens.access;

const TOKEN_EXPIRATION_DAYS = 30;
export const JWT_SIGN_OPTIONS: SignOptions = {
  expiresIn: `${TOKEN_EXPIRATION_DAYS}d`
};

export const AUTH_COOKIE_NAME = "jwt";

const IS_COOKIE_HTTP_ONLY = true;
const IS_COOKIE_SECURE = true;
const SAME_SITE_COOKIE_OPTION = "strict";
const DAY_IN_MS = 24 * 60 * 60 * 1000;
const AUTH_COOKIE_MAX_AGE = TOKEN_EXPIRATION_DAYS * DAY_IN_MS;
export const AUTH_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: IS_COOKIE_HTTP_ONLY,
  secure: IS_COOKIE_SECURE,
  sameSite: SAME_SITE_COOKIE_OPTION,
  maxAge: AUTH_COOKIE_MAX_AGE
};

const PAST_DATE = new Date(0);
export const EXPIRED_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: IS_COOKIE_HTTP_ONLY,
  secure: IS_COOKIE_SECURE,
  sameSite: SAME_SITE_COOKIE_OPTION,
  expires: PAST_DATE
};

export const LOGIN_SUCCESS_MESSAGE = "Logged in successfully";
export const SIGNUP_SUCCESS_MESSAGE = "Signed up successfully";
export const LOGOUT_SUCCESS_MESSAGE = "Logged out successfully";
export const UPDATE_SETTINGS_SUCCESS_MESSAGE = "Settings updated successfully";
