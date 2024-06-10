import type { Types, Model } from "mongoose";

export interface IMongoDBUser {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
}

export type MongoDBUserModel = Model<IMongoDBUser>;
