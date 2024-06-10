import type { IMongoDBUserRepository, UpdatedMongoDBUserFields } from "./types";
import { User } from "./classes/User";
import {
  mongoDBUserMock,
  mongoDBUserMockIdString
} from "../../tests/mocks/mongoDBUserMock";
import { userMock, password } from "../../tests/mocks/userMock";
import { UserService } from "./UserService";

jest.mock("./classes/User");

const mongoDBUserRepositoryMock: jest.Mocked<IMongoDBUserRepository> = {
  createUser: jest.fn(),
  updateUserById: jest.fn(),
  getUserById: jest.fn(),
  getUserByUsername: jest.fn(),
  getUserByUsernameOrEmail: jest.fn()
};
const userService = new UserService(mongoDBUserRepositoryMock);

describe("UserService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("createUser", async () => {
    const newUserData = {
      username: mongoDBUserMock.username,
      email: mongoDBUserMock.email,
      password
    };

    (User.encryptPassword as jest.Mock).mockResolvedValue(
      mongoDBUserMock.password
    );
    mongoDBUserRepositoryMock.createUser.mockResolvedValue(mongoDBUserMock);
    (User as unknown as jest.Mock).mockReturnValue(userMock);

    const result = await userService.createUser(
      newUserData.username,
      newUserData.email,
      newUserData.password
    );

    expect(User.encryptPassword).toHaveBeenCalledWith(newUserData.password);
    expect(mongoDBUserRepositoryMock.createUser).toHaveBeenCalledWith(
      newUserData.username,
      newUserData.email,
      mongoDBUserMock.password
    );
    expect(User).toHaveBeenCalledWith(
      mongoDBUserMockIdString,
      mongoDBUserMock.username,
      mongoDBUserMock.email,
      mongoDBUserMock.password
    );
    expect(result).toEqual(userMock);
  });

  it("updateUserById", async () => {
    const updatedFields: UpdatedMongoDBUserFields = {
      username: mongoDBUserMock.username,
      email: mongoDBUserMock.email,
      password
    };
    const formattedUpdatedFields: UpdatedMongoDBUserFields = {
      username: mongoDBUserMock.username,
      email: mongoDBUserMock.email,
      password: mongoDBUserMock.password
    };

    (User.encryptPassword as jest.Mock).mockResolvedValue(
      mongoDBUserMock.password
    );
    mongoDBUserRepositoryMock.updateUserById.mockResolvedValue(mongoDBUserMock);
    (User as unknown as jest.Mock).mockReturnValue(userMock);

    const result = await userService.updateUserById(
      mongoDBUserMockIdString,
      updatedFields
    );

    expect(User.encryptPassword).toHaveBeenCalledWith(updatedFields.password);
    expect(mongoDBUserRepositoryMock.updateUserById).toHaveBeenCalledWith(
      mongoDBUserMockIdString,
      formattedUpdatedFields
    );
    expect(User).toHaveBeenCalledWith(
      mongoDBUserMockIdString,
      mongoDBUserMock.username,
      mongoDBUserMock.email,
      mongoDBUserMock.password
    );
    expect(result).toEqual(userMock);
  });

  it("getUserById", async () => {
    mongoDBUserRepositoryMock.getUserById.mockResolvedValue(mongoDBUserMock);
    (User as unknown as jest.Mock).mockReturnValue(userMock);

    const result = await userService.getUserById(mongoDBUserMockIdString);

    expect(mongoDBUserRepositoryMock.getUserById).toHaveBeenCalledWith(
      mongoDBUserMockIdString
    );
    expect(User).toHaveBeenCalledWith(
      mongoDBUserMockIdString,
      mongoDBUserMock.username,
      mongoDBUserMock.email,
      mongoDBUserMock.password
    );
    expect(result).toEqual(userMock);
  });

  it("getUserByUsername", async () => {
    mongoDBUserRepositoryMock.getUserByUsername.mockResolvedValue(
      mongoDBUserMock
    );
    (User as unknown as jest.Mock).mockReturnValue(userMock);

    const result = await userService.getUserByUsername(
      mongoDBUserMock.username
    );

    expect(mongoDBUserRepositoryMock.getUserByUsername).toHaveBeenCalledWith(
      mongoDBUserMock.username
    );
    expect(User).toHaveBeenCalledWith(
      mongoDBUserMockIdString,
      mongoDBUserMock.username,
      mongoDBUserMock.email,
      mongoDBUserMock.password
    );
    expect(result).toEqual(userMock);
  });

  it("getUserByUsernameOrEmail", async () => {
    mongoDBUserRepositoryMock.getUserByUsernameOrEmail.mockResolvedValue(
      mongoDBUserMock
    );
    (User as unknown as jest.Mock).mockReturnValue(userMock);

    const result = await userService.getUserByUsernameOrEmail(
      mongoDBUserMock.username,
      mongoDBUserMock.email
    );

    expect(
      mongoDBUserRepositoryMock.getUserByUsernameOrEmail
    ).toHaveBeenCalledWith(mongoDBUserMock.username, mongoDBUserMock.email);
    expect(User).toHaveBeenCalledWith(
      mongoDBUserMockIdString,
      mongoDBUserMock.username,
      mongoDBUserMock.email,
      mongoDBUserMock.password
    );
    expect(result).toEqual(userMock);
  });

  it("getUserByUsernameOrEmail_userDataIsNull", async () => {
    mongoDBUserRepositoryMock.getUserByUsernameOrEmail.mockResolvedValue(null);

    const result = await userService.getUserByUsernameOrEmail();

    expect(
      mongoDBUserRepositoryMock.getUserByUsernameOrEmail
    ).toHaveBeenCalledWith(undefined, undefined);
    expect(result).toEqual(null);
  });
});
