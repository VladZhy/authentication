import type { IUser } from "./classes/User";
import type {
  IMongoDBUserRepository,
  UpdatedMongoDBUserFields,
  IMongoDBUser
} from "../../repositories/mongoDB/UserRepository";

export interface IUserService {
  createUser(
    username: string,
    email: string,
    password: string
  ): Promise<IUser | null>;

  updateUserById(
    id: string,
    updatedFields: UpdatedMongoDBUserFields
  ): Promise<IUser | null>;

  getUserById(id: string): Promise<IUser | null>;

  getUserByUsername(username: string): Promise<IUser | null>;

  getUserByUsernameOrEmail(
    username?: string,
    email?: string
  ): Promise<IUser | null>;
}

export {
  IUser,
  IMongoDBUserRepository,
  UpdatedMongoDBUserFields,
  IMongoDBUser
};
