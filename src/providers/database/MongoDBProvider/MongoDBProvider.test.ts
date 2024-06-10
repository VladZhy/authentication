import { MongoDBProvider } from "./MongoDBProvider";
import { connection, connect as mongooseConnect } from "mongoose";
import { URI, CONNECT_OPTIONS, MONGOOSE_EVENTS } from "./config";

jest.mock("mongoose", () => ({
  connection: {
    on: jest.fn()
  },
  connect: jest.fn()
}));

const mongoDBProvider = new MongoDBProvider();

describe("MongoDBProvider", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("connect", async () => {
    await mongoDBProvider.connect();

    expect(connection.on).toHaveBeenCalledWith(
      MONGOOSE_EVENTS.CONNECTED,
      expect.any(Function)
    );
    expect(connection.on).toHaveBeenCalledWith(
      MONGOOSE_EVENTS.ERROR,
      expect.any(Function)
    );
    expect(connection.on).toHaveBeenCalledWith(
      MONGOOSE_EVENTS.DISCONNECTED,
      expect.any(Function)
    );
    expect(mongooseConnect).toHaveBeenCalledWith(URI, CONNECT_OPTIONS);
  });
});
