import type { CastError } from "./types";
import { CAST_ERROR_NAME, OBJECT_ID_ERROR_KIND } from "./config";

export function isMongooseNotFoundError(error: CastError): boolean {
  return error.name === CAST_ERROR_NAME && error?.kind === OBJECT_ID_ERROR_KIND;
}
