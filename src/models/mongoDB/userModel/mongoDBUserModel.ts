import type { IMongoDBUser, MongoDBUserModel } from "./types";
import { model } from "mongoose";
import { NAME } from "./config";
import { schema } from "./schema";

export const mongoDBUserModel = model<IMongoDBUser, MongoDBUserModel>(
  NAME,
  schema
);
