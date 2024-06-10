import type { NextFunction } from "express";

export const nextMock: jest.Mocked<NextFunction> = jest.fn();
