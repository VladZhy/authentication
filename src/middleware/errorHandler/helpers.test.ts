import type { CastError } from "./types";
import { CAST_ERROR_NAME, OBJECT_ID_ERROR_KIND } from "./config";
import { isMongooseNotFoundError } from "./helpers";

describe("helpers", () => {
  it("isMongooseNotFoundError_true", () => {
    const error = {
      name: CAST_ERROR_NAME,
      kind: OBJECT_ID_ERROR_KIND
    } as CastError;

    const result = isMongooseNotFoundError(error);

    expect(result).toBe(true);
  });

  it("isMongooseNotFoundError_false", () => {
    const error = {
      name: CAST_ERROR_NAME
    } as CastError;

    const result = isMongooseNotFoundError(error);

    expect(result).toBe(false);
  });
});
