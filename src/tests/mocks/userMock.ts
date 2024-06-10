import type { IUser } from "../../services/UserService/classes/User";
import {
  mongoDBUserMockIdString,
  mongoDBUserMock
} from "../../tests/mocks/mongoDBUserMock";

export const password = "password";

export const userMock: jest.Mocked<IUser> = {
  id: mongoDBUserMockIdString,
  username: mongoDBUserMock.username,
  email: mongoDBUserMock.email,
  matchPassword: jest.fn()
};
