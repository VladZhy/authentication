import type { IUser } from "./types";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "./config";

export class User implements IUser {
  private readonly _id: string;
  private readonly _username: string;
  private readonly _email: string;
  private readonly _password: string;

  constructor(id: string, username: string, email: string, password: string) {
    this._id = id;
    this._username = username;
    this._email = email;
    this._password = password;
  }

  public get id(): string {
    return this._id;
  }

  public get username(): string {
    return this._username;
  }

  public get email(): string {
    return this._email;
  }

  public async matchPassword(enteredPassword: string): Promise<boolean> {
    return bcrypt.compare(enteredPassword, this._password);
  }

  public static async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);

    return bcrypt.hash(password, salt);
  }
}
