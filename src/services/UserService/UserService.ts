import type {
  IUserService,
  IMongoDBUserRepository,
  IUser,
  IMongoDBUser,
  UpdatedMongoDBUserFields
} from "./types";
import { User } from "./classes/User";
import { MongoDBUserRepository } from "../../repositories/mongoDB/UserRepository";

export class UserService implements IUserService {
  private mongoDBUserRepository: IMongoDBUserRepository;

  constructor(
    mongoDBUserRepository: IMongoDBUserRepository = new MongoDBUserRepository()
  ) {
    this.mongoDBUserRepository = mongoDBUserRepository;
  }

  public async createUser(
    username: string,
    email: string,
    password: string
  ): Promise<IUser | null> {
    const encryptedPassword = await User.encryptPassword(password);

    const userData = await this.mongoDBUserRepository.createUser(
      username,
      email,
      encryptedPassword
    );

    return this.getUserFromUserData(userData);
  }

  public async updateUserById(
    id: string,
    updatedFields: UpdatedMongoDBUserFields
  ): Promise<IUser | null> {
    const formattedUpdatedFields =
      await this.getFormattedUpdatedFields(updatedFields);

    const updatedUserData = await this.mongoDBUserRepository.updateUserById(
      id,
      formattedUpdatedFields
    );

    return this.getUserFromUserData(updatedUserData);
  }

  public async getUserById(id: string): Promise<IUser | null> {
    const userData = await this.mongoDBUserRepository.getUserById(id);

    return this.getUserFromUserData(userData);
  }

  public async getUserByUsername(username: string): Promise<IUser | null> {
    const userData =
      await this.mongoDBUserRepository.getUserByUsername(username);

    return this.getUserFromUserData(userData);
  }

  public async getUserByUsernameOrEmail(
    username?: string,
    email?: string
  ): Promise<IUser | null> {
    const userData = await this.mongoDBUserRepository.getUserByUsernameOrEmail(
      username,
      email
    );

    return this.getUserFromUserData(userData);
  }

  private getUserFromUserData(userData?: IMongoDBUser | null): IUser | null {
    if (!userData) {
      return null;
    }

    return new User(
      userData._id.toString(),
      userData.username,
      userData.email,
      userData.password
    );
  }

  private async getFormattedUpdatedFields(
    updatedFields: UpdatedMongoDBUserFields
  ): Promise<UpdatedMongoDBUserFields> {
    const formattedUpdatedFields = structuredClone(updatedFields);

    if (formattedUpdatedFields.password) {
      formattedUpdatedFields.password = await User.encryptPassword(
        formattedUpdatedFields.password
      );
    }

    return formattedUpdatedFields;
  }
}
