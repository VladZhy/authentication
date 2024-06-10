import type {
  IMongoDBUserRepository,
  IMongoDBUserDAO,
  IMongoDBUser,
  UpdatedMongoDBUserFields
} from "./types";
import { MongoDBUserDAO } from "../../../dao/mongoDB/UserDAO";

export class MongoDBUserRepository implements IMongoDBUserRepository {
  private userDAO: IMongoDBUserDAO;

  constructor(userDAO: IMongoDBUserDAO = new MongoDBUserDAO()) {
    this.userDAO = userDAO;
  }

  public createUser(
    username: string,
    email: string,
    password: string
  ): Promise<IMongoDBUser> {
    return this.userDAO.create(username, email, password);
  }

  public updateUserById(
    _id: string,
    updatedFields: UpdatedMongoDBUserFields
  ): Promise<IMongoDBUser | null> {
    return this.userDAO.findOneAndUpdate({ _id }, updatedFields);
  }

  public getUserById(id: string): Promise<IMongoDBUser | null> {
    return this.userDAO.findById(id);
  }

  public getUserByUsername(username: string): Promise<IMongoDBUser | null> {
    return this.userDAO.findOne({ username });
  }

  public getUserByUsernameOrEmail(
    username?: string,
    email?: string
  ): Promise<IMongoDBUser | null> {
    return this.userDAO.findOne({
      $or: [{ username }, { email }]
    });
  }
}
