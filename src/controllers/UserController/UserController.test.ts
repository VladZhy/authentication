import type {
  IUserService,
  UserData,
  UpdatedUserSettings,
  UpdatedMongoDBUserFields
} from "./types";
import { userMock, password } from "../../tests/mocks/userMock";
import { UserController } from "./UserController";
import {
  INVALID_CREDENTIALS_ERROR_MESSAGE,
  FAILED_TO_SIGN_UP_ERROR_MESSAGE,
  NO_UPDATED_USER_SETTINGS_ERROR_MESSAGE,
  USER_NOT_FOUND_ERROR_MESSAGE,
  FAILED_TO_UPDATE_SETTINGS_ERROR_MESSAGE,
  USERNAME_IS_TAKEN_ERROR_MESSAGE,
  EMAIL_IS_TAKEN_ERROR_MESSAGE
} from "./config";

const userServiceMock: jest.Mocked<IUserService> = {
  createUser: jest.fn(),
  updateUserById: jest.fn(),
  getUserById: jest.fn(),
  getUserByUsername: jest.fn(),
  getUserByUsernameOrEmail: jest.fn()
};
const userController = new UserController(userServiceMock);

describe("UserController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("logIn", async () => {
    const expectedResult: UserData = {
      id: userMock.id,
      username: userMock.username,
      email: userMock.email
    };

    userServiceMock.getUserByUsername.mockResolvedValue(userMock);
    userMock.matchPassword.mockResolvedValue(true);

    const result = await userController.logIn(userMock.username, password);

    expect(userServiceMock.getUserByUsername).toHaveBeenCalledWith(
      userMock.username
    );
    expect(userMock.matchPassword).toHaveBeenCalledWith(password);
    expect(result).toEqual(expectedResult);
  });

  it("logIn_invalidCredentials", async () => {
    userServiceMock.getUserByUsername.mockResolvedValue(userMock);
    userMock.matchPassword.mockResolvedValue(false);

    await expect(
      userController.logIn(userMock.username, password)
    ).rejects.toThrow(INVALID_CREDENTIALS_ERROR_MESSAGE);
    expect(userServiceMock.getUserByUsername).toHaveBeenCalledWith(
      userMock.username
    );
    expect(userMock.matchPassword).toHaveBeenCalledWith(password);
  });

  it("signUp", async () => {
    const expectedResult: UserData = {
      id: userMock.id,
      username: userMock.username,
      email: userMock.email
    };

    userServiceMock.getUserByUsernameOrEmail.mockResolvedValue(null);
    userServiceMock.createUser.mockResolvedValue(userMock);

    const result = await userController.signUp(
      userMock.username,
      userMock.email,
      password
    );

    expect(userServiceMock.getUserByUsernameOrEmail).toHaveBeenCalledWith(
      userMock.username,
      userMock.email
    );
    expect(userServiceMock.createUser).toHaveBeenCalledWith(
      userMock.username,
      userMock.email,
      password
    );
    expect(result).toEqual(expectedResult);
  });

  it("signUp_failed", async () => {
    userServiceMock.getUserByUsernameOrEmail.mockResolvedValue(null);
    userServiceMock.createUser.mockResolvedValue(null);

    await expect(
      userController.signUp(userMock.username, userMock.email, password)
    ).rejects.toThrow(FAILED_TO_SIGN_UP_ERROR_MESSAGE);
    expect(userServiceMock.getUserByUsernameOrEmail).toHaveBeenCalledWith(
      userMock.username,
      userMock.email
    );
    expect(userServiceMock.createUser).toHaveBeenCalledWith(
      userMock.username,
      userMock.email,
      password
    );
  });

  it("signUp_usernameIsTaken", async () => {
    userServiceMock.getUserByUsernameOrEmail.mockResolvedValue(userMock);

    await expect(
      userController.signUp(userMock.username, userMock.email, password)
    ).rejects.toThrow(USERNAME_IS_TAKEN_ERROR_MESSAGE);
    expect(userServiceMock.getUserByUsernameOrEmail).toHaveBeenCalledWith(
      userMock.username,
      userMock.email
    );
  });

  it("signUp_emailIsTaken", async () => {
    const uniqueUsername = "uniqueUsername";

    userServiceMock.getUserByUsernameOrEmail.mockResolvedValue(userMock);

    await expect(
      userController.signUp(uniqueUsername, userMock.email, password)
    ).rejects.toThrow(EMAIL_IS_TAKEN_ERROR_MESSAGE);
    expect(userServiceMock.getUserByUsernameOrEmail).toHaveBeenCalledWith(
      uniqueUsername,
      userMock.email
    );
  });

  it("updateSettings", async () => {
    const updatedUserSettings: UpdatedUserSettings = {
      newUsername: userMock.username,
      newEmail: userMock.email,
      newPassword: password
    };
    const updatedMongoDBUserFields: UpdatedMongoDBUserFields = {
      username: updatedUserSettings.newUsername!,
      email: updatedUserSettings.newEmail!,
      password: updatedUserSettings.newPassword!
    };
    const expectedResult: UserData = {
      id: userMock.id,
      username: userMock.username,
      email: userMock.email
    };

    userServiceMock.getUserByUsernameOrEmail.mockResolvedValue(null);
    userServiceMock.getUserById.mockResolvedValue(userMock);
    userServiceMock.updateUserById.mockResolvedValue(userMock);

    const result = await userController.updateSettings(
      userMock.id,
      updatedUserSettings
    );

    expect(userServiceMock.getUserByUsernameOrEmail).toHaveBeenCalledWith(
      updatedUserSettings.newUsername,
      updatedUserSettings.newEmail
    );
    expect(userServiceMock.getUserById).toHaveBeenCalledWith(userMock.id);
    expect(userServiceMock.updateUserById).toHaveBeenCalledWith(
      userMock.id,
      updatedMongoDBUserFields
    );
    expect(result).toEqual(expectedResult);
  });

  it("updateSettings_noUpdatedSettings", async () => {
    const updatedUserSettings: UpdatedUserSettings = {};

    await expect(
      userController.updateSettings(userMock.id, updatedUserSettings)
    ).rejects.toThrow(NO_UPDATED_USER_SETTINGS_ERROR_MESSAGE);
  });

  it("updateSettings_userNotFound", async () => {
    const updatedUserSettings: UpdatedUserSettings = {
      newUsername: userMock.username,
      newEmail: userMock.email,
      newPassword: password
    };

    userServiceMock.getUserByUsernameOrEmail.mockResolvedValue(null);
    userServiceMock.getUserById.mockResolvedValue(null);

    await expect(
      userController.updateSettings(userMock.id, updatedUserSettings)
    ).rejects.toThrow(USER_NOT_FOUND_ERROR_MESSAGE);
    expect(userServiceMock.getUserByUsernameOrEmail).toHaveBeenCalledWith(
      updatedUserSettings.newUsername,
      updatedUserSettings.newEmail
    );
    expect(userServiceMock.getUserById).toHaveBeenCalledWith(userMock.id);
  });

  it("updateSettings_failedToUpdate", async () => {
    const updatedUserSettings: UpdatedUserSettings = {
      newUsername: userMock.username,
      newEmail: userMock.email,
      newPassword: password
    };
    const updatedMongoDBUserFields: UpdatedMongoDBUserFields = {
      username: updatedUserSettings.newUsername!,
      email: updatedUserSettings.newEmail!,
      password: updatedUserSettings.newPassword!
    };

    userServiceMock.getUserByUsernameOrEmail.mockResolvedValue(null);
    userServiceMock.getUserById.mockResolvedValue(userMock);
    userServiceMock.updateUserById.mockResolvedValue(null);

    await expect(
      userController.updateSettings(userMock.id, updatedUserSettings)
    ).rejects.toThrow(FAILED_TO_UPDATE_SETTINGS_ERROR_MESSAGE);
    expect(userServiceMock.getUserByUsernameOrEmail).toHaveBeenCalledWith(
      updatedUserSettings.newUsername,
      updatedUserSettings.newEmail
    );
    expect(userServiceMock.getUserById).toHaveBeenCalledWith(userMock.id);
    expect(userServiceMock.updateUserById).toHaveBeenCalledWith(
      userMock.id,
      updatedMongoDBUserFields
    );
  });
});
