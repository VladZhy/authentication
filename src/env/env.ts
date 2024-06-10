import type { NodeEnvironment } from "./types";
import { CURRENT_ENVIRONMENT } from "./config";

const env: NodeEnvironment = {
  node: {
    env: CURRENT_ENVIRONMENT.NODE_ENV!,
    port: Number(CURRENT_ENVIRONMENT.NODE_PORT)
  },

  db: {
    username: CURRENT_ENVIRONMENT.DB_USERNAME!,
    password: CURRENT_ENVIRONMENT.DB_PASSWORD!,
    cluster: CURRENT_ENVIRONMENT.DB_CLUSTER!,
    domain: CURRENT_ENVIRONMENT.DB_DOMAIN!,
    name: CURRENT_ENVIRONMENT.DB_NAME!
  },

  secretTokens: {
    access: CURRENT_ENVIRONMENT.SECRET_ACCESS_TOKEN!,
    refresh: CURRENT_ENVIRONMENT.SECRET_REFRESH_TOKEN!
  }
};

export default env;
