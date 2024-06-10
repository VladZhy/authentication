import { User } from "./User";
import bcrypt from "bcrypt";
import {
  mongoDBUserMockIdString,
  mongoDBUserMock
} from "../../../../tests/mocks/mongoDBUserMock";
import { password } from "../../../../tests/mocks/userMock";

jest.mock("bcrypt", () => {
  return {
    default: {
      compare: jest.fn(),
      genSalt: jest.fn(),
      hash: jest.fn()
    }
  };
});

describe("User", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("matchPassword", async () => {
    const user = new User(
      mongoDBUserMockIdString,
      mongoDBUserMock.username,
      mongoDBUserMock.email,
      mongoDBUserMock.password
    );

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const result = await user.matchPassword(password);

    expect(bcrypt.compare).toHaveBeenCalledWith(
      password,
      mongoDBUserMock.password
    );
    expect(result).toEqual(true);
  });

  it("encryptPassword", async () => {
    const salt = "salt";

    (bcrypt.genSalt as jest.Mock).mockResolvedValue(salt);
    (bcrypt.hash as jest.Mock).mockResolvedValue(mongoDBUserMock.password);

    const result = await User.encryptPassword(password);

    expect(bcrypt.hash).toHaveBeenCalledWith(password, salt);
    expect(result).toEqual(mongoDBUserMock.password);
  });
});
