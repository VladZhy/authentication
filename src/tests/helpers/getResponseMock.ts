import type { Response } from "express";

export const getResponseMock = (statusCode?: number): Partial<Response> => {
  const res: Partial<Response> = {};

  if (statusCode) {
    res.statusCode = statusCode;
  }

  res.cookie = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);

  return res;
};
