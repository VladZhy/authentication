import type { WriteConcern, ConnectOptions } from "mongoose";

export type MongooseEvents = {
  CONNECTED: string;
  ERROR: string;
  DISCONNECTED: string;
};

export interface IMongoDBProvider {
  connect(): Promise<void>;
}

export type { WriteConcern, ConnectOptions };
