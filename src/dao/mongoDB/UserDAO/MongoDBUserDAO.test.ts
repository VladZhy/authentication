import type {
  MongoDBUserModel,
  FilterQuery,
  IMongoDBUser,
  UpdateQuery
} from "./types";
import { MongoDBUserDAO } from "./MongoDBUserDAO";
import {
  mongoDBUserMock,
  mongoDBUserMockIdString
} from "../../../tests/mocks/mongoDBUserMock";

const mongoDBUserModelMock = {
  create: jest.fn(),
  findById: jest.fn(),
  findOne: jest.fn(),
  findOneAndUpdate: jest.fn()
} as unknown as MongoDBUserModel;
const mongoDBUserDAO = new MongoDBUserDAO(mongoDBUserModelMock);

describe("MongoDBUserDAO", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("create", async () => {
    const userData = {
      username: mongoDBUserMock.username,
      email: mongoDBUserMock.email,
      password: mongoDBUserMock.password
    };

    (mongoDBUserModelMock.create as jest.Mock).mockResolvedValue(
      mongoDBUserMock
    );

    const result = await mongoDBUserDAO.create(
      userData.username,
      userData.email,
      userData.password
    );

    expect(mongoDBUserModelMock.create).toHaveBeenCalledWith(userData);
    expect(result).toEqual(mongoDBUserMock);
  });

  it("findById", async () => {
    (mongoDBUserModelMock.findById as jest.Mock).mockResolvedValue(
      mongoDBUserMock
    );

    const result = await mongoDBUserDAO.findById(mongoDBUserMockIdString);

    expect(mongoDBUserModelMock.findById).toHaveBeenCalledWith(
      mongoDBUserMockIdString,
      undefined,
      undefined
    );
    expect(result).toBe(mongoDBUserMock);
  });

  it("findOne", async () => {
    const filter: FilterQuery<IMongoDBUser> = {
      username: mongoDBUserMock.username
    };

    (mongoDBUserModelMock.findOne as jest.Mock).mockResolvedValue(
      mongoDBUserMock
    );

    const result = await mongoDBUserDAO.findOne(filter);

    expect(mongoDBUserModelMock.findOne).toHaveBeenCalledWith(
      filter,
      undefined,
      undefined
    );
    expect(result).toBe(mongoDBUserMock);
  });

  it("findOneAndUpdate", async () => {
    const filter: FilterQuery<IMongoDBUser> = {
      username: mongoDBUserMock.username
    };
    const update: UpdateQuery<IMongoDBUser> = { email: mongoDBUserMock.email };

    (mongoDBUserModelMock.findOneAndUpdate as jest.Mock).mockResolvedValue(
      mongoDBUserMock
    );

    const result = await mongoDBUserDAO.findOneAndUpdate(filter, update);

    expect(mongoDBUserModelMock.findOneAndUpdate).toHaveBeenCalledWith(
      filter,
      update,
      undefined
    );
    expect(result).toBe(mongoDBUserMock);
  });
});
