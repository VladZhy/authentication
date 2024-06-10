import type { UserData } from "../../controllers/UserController";
import { userMock, password } from "../../tests/mocks/userMock";

export const userDataMock: UserData = {
  id: userMock.id,
  username: userMock.username,
  email: userMock.email
};

export const token = "token";

export { password };
