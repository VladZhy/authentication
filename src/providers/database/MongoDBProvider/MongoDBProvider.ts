import type { IMongoDBProvider } from "./types";
import { connection, connect as mongooseConnect } from "mongoose";
import {
  URI,
  CONNECT_OPTIONS,
  MONGOOSE_EVENTS,
  MONGOOSE_CONNECTED_MESSAGE,
  MONGOOSE_DISCONNECTED_MESSAGE
} from "./config";

export class MongoDBProvider implements IMongoDBProvider {
  public async connect(): Promise<void> {
    this.addMongooseListeners();

    await mongooseConnect(URI, CONNECT_OPTIONS);
  }

  private addMongooseListeners(): void {
    connection.on(MONGOOSE_EVENTS.CONNECTED, () =>
      console.log(MONGOOSE_CONNECTED_MESSAGE)
    );
    connection.on(MONGOOSE_EVENTS.ERROR, (err: any) => {
      throw new Error(`Mongoose connection error: ${err?.message}`);
    });
    connection.on(MONGOOSE_EVENTS.DISCONNECTED, () =>
      console.log(MONGOOSE_DISCONNECTED_MESSAGE)
    );
  }
}
