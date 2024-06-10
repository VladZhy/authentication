import type {
  IMongoDBUser,
  MongoDBUserModel
} from "../../../models/mongoDB/userModel";
import type {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery
} from "mongoose";

export interface IMongoDBUserDAO {
  create(
    username: string,
    email: string,
    password: string
  ): Promise<IMongoDBUser>;
  findById(
    id: string,
    projection?: ProjectionType<IMongoDBUser>,
    options?: QueryOptions<IMongoDBUser>
  ): Promise<IMongoDBUser | null>;
  findOne(
    filter?: FilterQuery<IMongoDBUser>,
    projection?: ProjectionType<IMongoDBUser>,
    options?: QueryOptions<IMongoDBUser>
  ): Promise<IMongoDBUser | null>;
  findOneAndUpdate(
    filter?: FilterQuery<IMongoDBUser>,
    update?: UpdateQuery<IMongoDBUser>,
    options?: QueryOptions<IMongoDBUser>
  ): Promise<IMongoDBUser | null>;
}

export type {
  MongoDBUserModel,
  IMongoDBUser,
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery
};
