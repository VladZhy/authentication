import type { Request } from "express";

export const getRequestMock = (body = {}): Partial<Request> => ({
  body
});
