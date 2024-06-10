export type NodeEnvironment = {
  node: {
    env: string;
    port: number;
  };

  db: {
    username: string;
    password: string;
    cluster: string;
    domain: string;
    name: string;
  };

  secretTokens: {
    access: string;
    refresh: string;
  };
};
