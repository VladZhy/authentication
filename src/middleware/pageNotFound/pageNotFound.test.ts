import type { Request, Response } from "./types";
import { getRequestMock } from "../../tests/helpers/getRequestMock";
import { responseMock } from "../../tests/mocks/responseMock";
import { nextMock } from "../../tests/mocks/nextMock";
import { pageNotFound } from "./pageNotFound";
import { statusCodes } from "../../utils/statusCodes";

describe("pageNotFound", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("pageNotFound", () => {
    const originalUrl = "http://example.com/";
    const req = getRequestMock();
    req.originalUrl = originalUrl;
    const error = new Error(`Not Found - ${originalUrl}`);

    pageNotFound(req as Request, responseMock as Response, nextMock);

    expect(responseMock.status).toHaveBeenCalledWith(statusCodes.NOT_FOUND);
    expect(nextMock).toHaveBeenCalledWith(error);
  });
});
