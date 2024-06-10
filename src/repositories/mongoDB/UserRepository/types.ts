import type {
  IMongoDBUserDAO,
  IMongoDBUser
} from "../../../dao/mongoDB/UserDAO";

export type UpdatedMongoDBUserFields = {
  username?: string;
  email?: string;
  password?: string;
};

export interface IMongoDBUserRepository {
  createUser(
    username: string,
    email: string,
    password: string
  ): Promise<IMongoDBUser>;

  updateUserById(
    _id: string,
    updatedFields: UpdatedMongoDBUserFields
  ): Promise<IMongoDBUser | null>;

  getUserById(id: string): Promise<IMongoDBUser | null>;

  getUserByUsername(username: string): Promise<IMongoDBUser | null>;

  getUserByUsernameOrEmail(
    username?: string,
    email?: string
  ): Promise<IMongoDBUser | null>;
}

export type { IMongoDBUserDAO, IMongoDBUser };
