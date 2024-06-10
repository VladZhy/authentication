import type { Request, Response } from "./types";
import { isMongooseNotFoundError } from "./helpers";
import { requestMock } from "../../tests/mocks/requestMock";
import { getResponseMock } from "../../tests/helpers/getResponseMock";
import { nextMock } from "../../tests/mocks/nextMock";
import { errorHandler } from "./errorHandler";
import { statusCodes } from "../../utils/statusCodes";
import { RESOURCE_NOT_FOUND_MESSAGE } from "./config";

jest.mock("./helpers", () => ({
  isMongooseNotFoundError: jest.fn()
}));

describe("errorHandler", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("errorHandler_statusCode_OK", () => {
    const err = new Error("Internal server error");
    const res = getResponseMock(statusCodes.OK);

    (isMongooseNotFoundError as jest.Mock).mockReturnValue(false);

    errorHandler(err, requestMock as Request, res as Response, nextMock);

    expect(res.status).toHaveBeenCalledWith(statusCodes.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({ message: err.message });
  });

  it("errorHandler_statusCode_BAD_REQUEST", () => {
    const err = new Error("Bad request");
    const res = getResponseMock(statusCodes.BAD_REQUEST);

    (isMongooseNotFoundError as jest.Mock).mockReturnValue(false);

    errorHandler(err, requestMock as Request, res as Response, nextMock);

    expect(res.status).toHaveBeenCalledWith(statusCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({ message: err.message });
  });

  it("errorHandler_mongooseNotFoundError", () => {
    const err = new Error("MongooseNotFoundError");
    const res = getResponseMock(statusCodes.OK);

    (isMongooseNotFoundError as jest.Mock).mockReturnValue(true);

    errorHandler(err, requestMock as Request, res as Response, nextMock);

    expect(res.status).toHaveBeenCalledWith(statusCodes.NOT_FOUND);
    expect(res.json).toHaveBeenCalledWith({
      message: RESOURCE_NOT_FOUND_MESSAGE
    });
  });
});
