import { MongoDBProvider } from "./providers/database/MongoDBProvider";
import { app } from "./app";
import { PORT } from "./config";

const mongoDBProvider = new MongoDBProvider();

(async () => {
  await mongoDBProvider.connect();

  app.listen(PORT, () => {
    console.info(`Server running on port ${PORT}...`);
  });
})();
