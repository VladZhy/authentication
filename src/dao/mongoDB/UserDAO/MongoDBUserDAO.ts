import type {
  IMongoDBUserDAO,
  MongoDBUserModel,
  IMongoDBUser,
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery
} from "./types";
import { mongoDBUserModel } from "../../../models/mongoDB/userModel";

export class MongoDBUserDAO implements IMongoDBUserDAO {
  private userModel: MongoDBUserModel;

  constructor(userModel: MongoDBUserModel = mongoDBUserModel) {
    this.userModel = userModel;
  }

  public create(
    username: string,
    email: string,
    password: string
  ): Promise<IMongoDBUser> {
    return this.userModel.create({ username, email, password });
  }

  public findById(
    id: string,
    projection?: ProjectionType<IMongoDBUser>,
    options?: QueryOptions<IMongoDBUser>
  ): Promise<IMongoDBUser | null> {
    return this.userModel.findById(id, projection, options);
  }

  public findOne(
    filter?: FilterQuery<IMongoDBUser>,
    projection?: ProjectionType<IMongoDBUser>,
    options?: QueryOptions<IMongoDBUser>
  ): Promise<IMongoDBUser | null> {
    return this.userModel.findOne(filter, projection, options);
  }

  public findOneAndUpdate(
    filter?: FilterQuery<IMongoDBUser>,
    update?: UpdateQuery<IMongoDBUser>,
    options?: QueryOptions<IMongoDBUser>
  ): Promise<IMongoDBUser | null> {
    return this.userModel.findOneAndUpdate(filter, update, options);
  }
}
