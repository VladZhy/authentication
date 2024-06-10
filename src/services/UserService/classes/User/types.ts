export interface IUser {
  readonly id: string;
  readonly username: string;
  readonly email: string;

  matchPassword(enteredPassword: string): Promise<boolean>;
}
