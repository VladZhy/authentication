import type { IMongoDBUser } from "../../models/mongoDB/userModel";
import { Types } from "mongoose";

const _id = new Types.ObjectId();
const username = "test";
const email = "test@example.com";
const password = "hashedPassword";

export const mongoDBUserMock: IMongoDBUser = {
  _id,
  username,
  email,
  password
};

export const mongoDBUserMockIdString = _id.toString();
