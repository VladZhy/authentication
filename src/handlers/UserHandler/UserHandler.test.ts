import type {
  IUserController,
  UpdatedUserSettings,
  Request,
  Response
} from "./types";
import { userDataMock, password, token } from "../../tests/mocks/userDataMock";
import { UserHandler } from "./UserHandler";
import { getRequestMock } from "../../tests/helpers/getRequestMock";
import { requestMock } from "../../tests/mocks/requestMock";
import { responseMock } from "../../tests/mocks/responseMock";
import { nextMock } from "../../tests/mocks/nextMock";
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

jest.mock("jsonwebtoken", () => {
  return {
    default: {
      sign: jest.fn()
    }
  };
});

const userControllerMock: jest.Mocked<IUserController> = {
  logIn: jest.fn(),
  signUp: jest.fn(),
  updateSettings: jest.fn()
};
const userHandler = new UserHandler(userControllerMock);

describe("UserController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("handleLogin", async () => {
    const req = getRequestMock({ username: userDataMock.username, password });

    userControllerMock.logIn.mockResolvedValue(userDataMock);
    (jwt.sign as jest.Mock).mockReturnValue(token);

    await userHandler.handleLogin(
      req as Request,
      responseMock as Response,
      nextMock
    );

    expect(userControllerMock.logIn).toHaveBeenCalledWith(
      userDataMock.username,
      password
    );
    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: userDataMock.id },
      JWT_SECRET,
      JWT_SIGN_OPTIONS
    );
    expect(responseMock.cookie).toHaveBeenCalledWith(
      AUTH_COOKIE_NAME,
      token,
      AUTH_COOKIE_OPTIONS
    );
    expect(responseMock.json).toHaveBeenCalledWith({
      userData: userDataMock,
      message: LOGIN_SUCCESS_MESSAGE
    });
  });

  it("handleLogin_error", async () => {
    const error = new Error("Invalid credentials");
    const req = getRequestMock({ username: userDataMock.username, password });

    userControllerMock.logIn.mockRejectedValue(error);

    await userHandler.handleLogin(
      req as Request,
      responseMock as Response,
      nextMock
    );

    expect(userControllerMock.logIn).toHaveBeenCalledWith(
      userDataMock.username,
      password
    );
    expect(responseMock.status).toHaveBeenCalledWith(statusCodes.BAD_REQUEST);
    expect(nextMock).toHaveBeenCalledWith(error);
  });

  it("handleSignup", async () => {
    const req = getRequestMock({
      username: userDataMock.username,
      email: userDataMock.email,
      password
    });

    userControllerMock.signUp.mockResolvedValue(userDataMock);
    (jwt.sign as jest.Mock).mockReturnValue(token);

    await userHandler.handleSignup(
      req as Request,
      responseMock as Response,
      nextMock
    );

    expect(userControllerMock.signUp).toHaveBeenCalledWith(
      userDataMock.username,
      userDataMock.email,
      password
    );
    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: userDataMock.id },
      JWT_SECRET,
      JWT_SIGN_OPTIONS
    );
    expect(responseMock.cookie).toHaveBeenCalledWith(
      AUTH_COOKIE_NAME,
      token,
      AUTH_COOKIE_OPTIONS
    );
    expect(responseMock.status).toHaveBeenCalledWith(statusCodes.CREATED);
    expect(responseMock.json).toHaveBeenCalledWith({
      userData: userDataMock,
      message: SIGNUP_SUCCESS_MESSAGE
    });
  });

  it("handleSignup_error", async () => {
    const error = new Error("Failed to sign up");
    const req = getRequestMock({
      username: userDataMock.username,
      email: userDataMock.email,
      password
    });

    userControllerMock.signUp.mockRejectedValue(error);

    await userHandler.handleSignup(
      req as Request,
      responseMock as Response,
      nextMock
    );

    expect(userControllerMock.signUp).toHaveBeenCalledWith(
      userDataMock.username,
      userDataMock.email,
      password
    );
    expect(responseMock.status).toHaveBeenCalledWith(statusCodes.BAD_REQUEST);
    expect(nextMock).toHaveBeenCalledWith(error);
  });

  it("handleLogout", () => {
    userHandler.handleLogout(requestMock as Request, responseMock as Response);

    expect(responseMock.cookie).toHaveBeenCalledWith(
      AUTH_COOKIE_NAME,
      "",
      EXPIRED_COOKIE_OPTIONS
    );
    expect(responseMock.json).toHaveBeenCalledWith({
      message: LOGOUT_SUCCESS_MESSAGE
    });
  });

  it("handleUpdateSettings", async () => {
    const updatedUserSettings: UpdatedUserSettings = {
      newUsername: userDataMock.username,
      newEmail: userDataMock.email,
      newPassword: password
    };
    const req = getRequestMock({
      id: userDataMock.id,
      ...updatedUserSettings
    });

    userControllerMock.updateSettings.mockResolvedValue(userDataMock);

    await userHandler.handleUpdateSettings(
      req as Request,
      responseMock as Response,
      nextMock
    );

    expect(userControllerMock.updateSettings).toHaveBeenCalledWith(
      userDataMock.id,
      updatedUserSettings
    );
    expect(responseMock.json).toHaveBeenCalledWith({
      userData: userDataMock,
      message: UPDATE_SETTINGS_SUCCESS_MESSAGE
    });
  });

  it("handleUpdateSettings_error", async () => {
    const error = new Error("User not found");
    const updatedUserSettings: UpdatedUserSettings = {
      newUsername: userDataMock.username,
      newEmail: userDataMock.email,
      newPassword: password
    };
    const req = getRequestMock({
      id: userDataMock.id,
      ...updatedUserSettings
    });

    userControllerMock.updateSettings.mockRejectedValue(error);

    await userHandler.handleUpdateSettings(
      req as Request,
      responseMock as Response,
      nextMock
    );

    expect(userControllerMock.updateSettings).toHaveBeenCalledWith(
      userDataMock.id,
      updatedUserSettings
    );
    expect(responseMock.status).toHaveBeenCalledWith(statusCodes.NOT_FOUND);
    expect(nextMock).toHaveBeenCalledWith(error);
  });
});
