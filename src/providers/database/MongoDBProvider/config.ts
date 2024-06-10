import type { WriteConcern, ConnectOptions, MongooseEvents } from "./types";
import env from "../../../env";

const { username, password, cluster, domain, name } = env.db;
export const URI = `mongodb+srv://${username}:${password}@${cluster}.${domain}/${name}`;

const WRITE_CONCERN: WriteConcern = { w: "majority" };
const IS_RETRY_WRITES_ENABLED = true;
export const CONNECT_OPTIONS: ConnectOptions = {
  writeConcern: WRITE_CONCERN,
  retryWrites: IS_RETRY_WRITES_ENABLED
};

export const MONGOOSE_EVENTS: MongooseEvents = {
  CONNECTED: "connected",
  ERROR: "error",
  DISCONNECTED: "disconnected"
};
export const MONGOOSE_CONNECTED_MESSAGE = "MongoDB connected";
export const MONGOOSE_DISCONNECTED_MESSAGE = "Mongoose disconnected";
