import type { IMongoDBUserDAO, UpdatedMongoDBUserFields } from "./types";
import { MongoDBUserRepository } from "./MongoDBUserRepository";
import {
  mongoDBUserMock,
  mongoDBUserMockIdString
} from "../../../tests/mocks/mongoDBUserMock";

const mongoDBUserDAOMock: jest.Mocked<IMongoDBUserDAO> = {
  create: jest.fn(),
  findById: jest.fn(),
  findOne: jest.fn(),
  findOneAndUpdate: jest.fn()
};
const mongoDBUserRepository = new MongoDBUserRepository(mongoDBUserDAOMock);

describe("MongoDBUserRepository", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("createUser", async () => {
    mongoDBUserDAOMock.create.mockResolvedValue(mongoDBUserMock);

    const result = await mongoDBUserRepository.createUser(
      mongoDBUserMock.username,
      mongoDBUserMock.email,
      mongoDBUserMock.password
    );

    expect(mongoDBUserDAOMock.create).toHaveBeenCalledWith(
      mongoDBUserMock.username,
      mongoDBUserMock.email,
      mongoDBUserMock.password
    );
    expect(result).toEqual(mongoDBUserMock);
  });

  it("updateUserById", async () => {
    const updatedFields: UpdatedMongoDBUserFields = {
      email: mongoDBUserMock.email
    };

    mongoDBUserDAOMock.findOneAndUpdate.mockResolvedValue(mongoDBUserMock);

    const result = await mongoDBUserRepository.updateUserById(
      mongoDBUserMockIdString,
      updatedFields
    );

    expect(mongoDBUserDAOMock.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: mongoDBUserMockIdString },
      updatedFields
    );
    expect(result).toEqual(mongoDBUserMock);
  });

  it("getUserById", async () => {
    mongoDBUserDAOMock.findById.mockResolvedValue(mongoDBUserMock);

    const result = await mongoDBUserRepository.getUserById(
      mongoDBUserMockIdString
    );

    expect(mongoDBUserDAOMock.findById).toHaveBeenCalledWith(
      mongoDBUserMockIdString
    );
    expect(result).toEqual(mongoDBUserMock);
  });

  it("getUserByUsername", async () => {
    mongoDBUserDAOMock.findOne.mockResolvedValue(mongoDBUserMock);

    const result = await mongoDBUserRepository.getUserByUsername(
      mongoDBUserMock.username
    );

    expect(mongoDBUserDAOMock.findOne).toHaveBeenCalledWith({
      username: mongoDBUserMock.username
    });
    expect(result).toEqual(mongoDBUserMock);
  });

  it("getUserByUsernameOrEmail", async () => {
    mongoDBUserDAOMock.findOne.mockResolvedValue(mongoDBUserMock);

    const result = await mongoDBUserRepository.getUserByUsernameOrEmail(
      mongoDBUserMock.username,
      mongoDBUserMock.email
    );

    expect(mongoDBUserDAOMock.findOne).toHaveBeenCalledWith({
      $or: [
        { username: mongoDBUserMock.username },
        { email: mongoDBUserMock.email }
      ]
    });
    expect(result).toEqual(mongoDBUserMock);
  });
});
