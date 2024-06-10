import type {
  IUserService,
  IUser,
  UpdatedMongoDBUserFields
} from "../../services/UserService";

export type UserData = {
  id: string;
  username: string;
  email: string;
};

export type UpdatedUserSettings = {
  newUsername?: string;
  newEmail?: string;
  newPassword?: string;
};

export interface IUserController {
  logIn(username: string, password: string): Promise<UserData>;
  signUp(username: string, email: string, password: string): Promise<UserData>;
  updateSettings(
    id: string,
    updatedUserSettings: UpdatedUserSettings
  ): Promise<UserData | null>;
}

export type { IUserService, IUser, UpdatedMongoDBUserFields };
