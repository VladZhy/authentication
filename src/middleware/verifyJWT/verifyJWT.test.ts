import type { Request, Response } from "./types";
import { getRequestMock } from "../../tests/helpers/getRequestMock";
import { token } from "../../tests/mocks/userDataMock";
import jwt from "jsonwebtoken";
import { verifyJWT } from "./verifyJWT";
import { responseMock } from "../../tests/mocks/responseMock";
import { nextMock } from "../../tests/mocks/nextMock";
import {
  JWT_SECRET,
  TOKEN_VERIFICATION_ERROR_MESSAGE,
  NO_TOKEN_ERROR_MESSAGE
} from "./config";
import { statusCodes } from "../../utils/statusCodes";
import { requestMock } from "../../tests/mocks/requestMock";

jest.mock("jsonwebtoken", () => {
  return {
    default: {
      verify: jest.fn()
    }
  };
});

describe("verifyJWT", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("verifyJWT_success", async () => {
    const req = getRequestMock();
    req.cookies = { jwt: token };

    (jwt.verify as jest.Mock).mockReturnValue(token);

    await verifyJWT(req as Request, responseMock as Response, nextMock);

    expect(jwt.verify).toHaveBeenCalledWith(token, JWT_SECRET);
    expect(nextMock).toHaveBeenCalledWith();
  });

  it("verifyJWT_tokenVerificationError", async () => {
    const req = getRequestMock();
    req.cookies = { jwt: token };

    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error("Invalid token");
    });

    await verifyJWT(req as Request, responseMock as Response, nextMock);

    expect(jwt.verify).toHaveBeenCalledWith(token, JWT_SECRET);
    expect(responseMock.status).toHaveBeenCalledWith(statusCodes.UNAUTHORIZED);
    expect(nextMock).toHaveBeenCalledWith(
      new Error(TOKEN_VERIFICATION_ERROR_MESSAGE)
    );
  });

  it("verifyJWT_noTokenError", async () => {
    await verifyJWT(requestMock as Request, responseMock as Response, nextMock);

    expect(responseMock.status).toHaveBeenCalledWith(statusCodes.UNAUTHORIZED);
    expect(nextMock).toHaveBeenCalledWith(new Error(NO_TOKEN_ERROR_MESSAGE));
  });
});
